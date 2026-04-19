"""
model_tracker.py — Build TRACKER_ENRICHED in MCC_PRESENTATION.CONTENT_SCALING_AGENT.

Full refresh (CREATE OR REPLACE TABLE ... AS SELECT) on every run.
Run after ingest_tracker.py has loaded the latest sheet data.

Reads from:
    MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER           (raw sheet ingest)
    MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN          (national O&O traffic)
    MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN_LE       (L&E traffic)
    MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA         (URL↔STORY_ID bridge)
    MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST      (full-text + description vectors, IAB tags)
    MCC_RAW.STORY_DATA.PUBLISHED_STORIES                           (article access type: Free/Metered/Sub-Only)
    MCC_AMPLITUDE.AMPLITUDE.EVENTS_412949                          (Yahoo News platform reads)

Writes to:
    MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED

Authentication: RSA key-pair (headless — no browser popup)

Env vars (optional):
    SNOWFLAKE_PRIVATE_KEY_PATH   path to RSA private key (.p8 file)

Usage:
    python3 scripts/model_tracker.py
"""

import os
from pathlib import Path

from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
)
import snowflake.connector


# ── Config ────────────────────────────────────────────────────────────────────

SF_ACCOUNT   = "wvb49304-mcclatchy_eval"
SF_USER      = "GROWTH_AND_STRATEGY_SERVICE_USER"
SF_KEY_PATH  = os.getenv("SNOWFLAKE_PRIVATE_KEY_PATH",
                         str(Path.home() / ".credentials" / "growth_strategy_service_rsa_key.p8"))
SF_DATABASE  = "MCC_PRESENTATION"
SF_SCHEMA    = "CONTENT_SCALING_AGENT"
SF_TABLE     = "TRACKER_ENRICHED"


# ── Data model SQL ────────────────────────────────────────────────────────────
#
# Lookup strategies (mirrors enrich_tracker.py):
#   1. Article ID extracted from URL  → STORY_TRAFFIC_MAIN.STORY_ID
#   2. URL join → DYN_STORY_META_DATA → STORY_TRAFFIC_MAIN
#   3. CANONICAL_URL join → STORY_TRAFFIC_MAIN_LE  (L&E pubs only)
#
# article_vs_co_median / cluster_vs_co_median are stored as FLOAT (e.g. 0.15
# for +15%) — format as percentage in Sigma.  NULL means no benchmark exists
# (L&E pub, staging URL, or article published before Oct 2025 benchmark window).
#
# cluster_id = ASSET_ID for parent rows; PARENT_ID for child rows — lets every
# row join to its cluster's aggregate without a self-join.

BUILD_SQL = """
CREATE OR REPLACE TABLE MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED AS

WITH

-- ── 1. Raw tracker with derived fields ──────────────────────────────────────
tracker AS (
    SELECT
        ASSET_ID, BRAND_TYPE, CONTENT_TYPE, PARENT_ID,
        DRAFT_URL, PUBLISHED_URL, AUTHOR, SYNDICATION_PLATFORM, HEADLINE,
        TRY_TO_NUMBER(WEEK_NUM)       AS week_num,
        TRY_TO_DATE(WEEK_OF)          AS week_of,
        CREATION_DATE_MONTH, PUB_DATE_MONTH,
        TRY_TO_DATE(CREATED_DATE)     AS created_date,
        TRY_TO_DATE(PUBLICATION_DATE) AS publication_date,
        VERTICAL,
        TRY_TO_NUMBER(WORD_COUNT)     AS word_count,
        PRIMARY_KEYWORDS, META_DESCRIPTION, TARGET_AUDIENCE,
        DRAFT_DOC, PEER_REVIEWER, UPDATE_FLAG, TEST_CATEGORY,
        REUTERS_PHOTO, REUTERS_LINK,
        _ROW_NUM, _LOADED_AT,
        -- Cluster anchor: child rows resolve to their parent's ASSET_ID
        COALESCE(NULLIF(TRIM(PARENT_ID), ''), ASSET_ID) AS cluster_id,
        -- L&E flag (keyed by CANONICAL_URL not STORY_ID)
        CASE
            WHEN LOWER(PUBLISHED_URL) LIKE '%usmagazine.com%'
              OR LOWER(PUBLISHED_URL) LIKE '%womansworld.com%'
              OR LOWER(PUBLISHED_URL) LIKE '%lifeandstylemag.com%'
            THEN TRUE ELSE FALSE
        END AS is_le,
        -- Normalized URL: strip trailing slash, normalize amp. → www.
        RTRIM(
            CASE
                WHEN PUBLISHED_URL LIKE '%://amp.%'
                THEN REPLACE(PUBLISHED_URL, '://amp.', '://www.')
                ELSE PUBLISHED_URL
            END,
            '/'
        ) AS pub_url_norm,
        -- Domain for median lookup
        CASE
            WHEN SPLIT_PART(SPLIT_PART(LOWER(PUBLISHED_URL), '//', 2), '/', 1) LIKE 'www.%'
                THEN SUBSTR(SPLIT_PART(SPLIT_PART(LOWER(PUBLISHED_URL), '//', 2), '/', 1), 5)
            WHEN SPLIT_PART(SPLIT_PART(LOWER(PUBLISHED_URL), '//', 2), '/', 1) LIKE 'amp.%'
                THEN SUBSTR(SPLIT_PART(SPLIT_PART(LOWER(PUBLISHED_URL), '//', 2), '/', 1), 5)
            ELSE SPLIT_PART(SPLIT_PART(LOWER(PUBLISHED_URL), '//', 2), '/', 1)
        END AS article_domain,
        -- Article ID extracted from URL (national O&O: .../article314923832.html)
        REGEXP_SUBSTR(PUBLISHED_URL, 'article([0-9]{7,})', 1, 1, 'e', 1) AS url_story_id
    FROM MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER
    WHERE PUBLISHED_URL IS NOT NULL AND TRIM(PUBLISHED_URL) != ''
      AND PUBLISHED_URL NOT LIKE '%/wp-admin/%'
      AND LOWER(PUBLISHED_URL) NOT LIKE '%modmomsclub.local%'
      AND LOWER(PUBLISHED_URL) NOT LIKE '%wpenginepowered%'
),

-- ── 2. Story ID from DYN_STORY_META_DATA (strategy 2: URL join) ─────────────
meta_ids AS (
    SELECT DISTINCT
        RTRIM(m.URL, '/') AS url_norm,
        m.ID               AS meta_story_id
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA m
    WHERE m.ASSET_TYPE IN ('storyline', 'story', 'wirestory')
),

-- ── 3. National O&O traffic totals ──────────────────────────────────────────
national_traffic AS (
    SELECT
        STORY_ID,
        SUM(ALL_PAGEVIEWS)          AS total_pvs,
        SUM(SEARCH_PAGEVIEWS)       AS search_pvs,
        SUM(SOCIAL_PAGEVIEWS)       AS social_pvs,
        SUM(DIRECT_PAGEVIEWS)       AS direct_pvs,
        SUM(APPLENEWS_PAGEVIEWS)    AS applenews_pvs,
        SUM(SMARTNEWSAPP_PAGEVIEWS) AS smartnews_pvs,
        SUM(NEWSBREAKAPP_PAGEVIEWS) AS newsbreak_pvs,
        SUM(SUBS_PAGEVIEWS)         AS subscriber_pvs,
        SUM(AMP_ARTICLE_PAGEVIEWS)  AS amp_pvs,
        SUM(NEWSLETTER_PAGEVIEWS)   AS newsletter_pvs
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN
    GROUP BY STORY_ID
),

-- ── 4. L&E traffic totals ────────────────────────────────────────────────────
le_traffic AS (
    SELECT
        RTRIM(CANONICAL_URL, '/')   AS canonical_url,
        SUM(ALL_PAGEVIEWS)          AS total_pvs,
        SUM(SEARCH_PAGEVIEWS)       AS search_pvs,
        SUM(SOCIAL_PAGEVIEWS)       AS social_pvs,
        SUM(DIRECT_PAGEVIEWS)       AS direct_pvs,
        SUM(APPLENEWS_PAGEVIEWS)    AS applenews_pvs,
        SUM(SMARTNEWSAPP_PAGEVIEWS) AS smartnews_pvs,
        SUM(NEWSBREAKAPP_PAGEVIEWS) AS newsbreak_pvs,
        SUM(SUBS_PAGEVIEWS)         AS subscriber_pvs,
        NULL::INTEGER               AS amp_pvs,
        NULL::INTEGER               AS newsletter_pvs
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN_LE
    GROUP BY RTRIM(CANONICAL_URL, '/')
),

-- ── 5. Yahoo News platform reads (Amplitude, event_type='yahoo_news_ingest') ─
-- Each event records page_view_count views for a single article on Yahoo News.
-- cms_id format: "Story:314936583" — extract numeric ID to join on STORY_ID.
yahoo_traffic AS (
    SELECT
        REGEXP_SUBSTR(EVENT_PROPERTIES:cms_id::VARCHAR, '[0-9]+')::BIGINT AS story_id,
        SUM(EVENT_PROPERTIES:page_view_count::INTEGER)                   AS yahoo_pvs
    FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412949
    WHERE EVENT_TYPE = 'yahoo_news_ingest'
      AND EVENT_PROPERTIES:cms_id IS NOT NULL
    GROUP BY 1
),

-- ── 7. Company median per domain (Oct 2025+ benchmark, Chris Palo method) ───
domain_article_totals AS (
    SELECT
        CASE
            WHEN SPLIT_PART(SPLIT_PART(LOWER(m.URL), '//', 2), '/', 1) LIKE 'www.%'
                THEN SUBSTR(SPLIT_PART(SPLIT_PART(LOWER(m.URL), '//', 2), '/', 1), 5)
            WHEN SPLIT_PART(SPLIT_PART(LOWER(m.URL), '//', 2), '/', 1) LIKE 'amp.%'
                THEN SUBSTR(SPLIT_PART(SPLIT_PART(LOWER(m.URL), '//', 2), '/', 1), 5)
            ELSE SPLIT_PART(SPLIT_PART(LOWER(m.URL), '//', 2), '/', 1)
        END AS domain,
        t.STORY_ID,
        SUM(t.ALL_PAGEVIEWS) AS story_pvs
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN t
    JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA m
        ON t.STORY_ID = m.ID
    WHERE t.EVENT_DATE >= '2025-10-01'
      AND m.ASSET_TYPE IN ('storyline', 'story', 'wirestory')
    GROUP BY domain, t.STORY_ID
),
company_medians AS (
    SELECT
        domain,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY story_pvs) AS median_pvs
    FROM domain_article_totals
    WHERE domain IS NOT NULL AND domain != ''
    GROUP BY domain
    HAVING COUNT(*) >= 10
),

-- ── 8. Assemble per-article row ──────────────────────────────────────────────
base AS (
    SELECT
        t.ASSET_ID,
        t.BRAND_TYPE,
        t.CONTENT_TYPE,
        t.PARENT_ID,
        t.cluster_id,
        t.DRAFT_URL,
        t.PUBLISHED_URL,
        t.AUTHOR,
        t.SYNDICATION_PLATFORM,
        t.HEADLINE,
        t.week_num,
        t.week_of,
        t.CREATION_DATE_MONTH,
        t.PUB_DATE_MONTH,
        t.created_date,
        t.publication_date,
        t.VERTICAL,
        t.word_count,
        t.PRIMARY_KEYWORDS,
        t.META_DESCRIPTION,
        t.TARGET_AUDIENCE,
        t.DRAFT_DOC,
        t.PEER_REVIEWER,
        t.UPDATE_FLAG,
        t.TEST_CATEGORY,
        t.REUTERS_PHOTO,
        t.REUTERS_LINK,
        t._ROW_NUM,
        t._LOADED_AT,
        -- Story ID: url extraction wins, then URL→meta join, then NULL
        COALESCE(t.url_story_id, mi.meta_story_id) AS story_id,
        -- Traffic: national O&O path or L&E path
        COALESCE(nt.total_pvs,     le.total_pvs,     0)::INTEGER AS total_pvs,
        COALESCE(nt.search_pvs,    le.search_pvs,    0)::INTEGER AS search_pvs,
        COALESCE(nt.social_pvs,    le.social_pvs,    0)::INTEGER AS social_pvs,
        COALESCE(nt.direct_pvs,    le.direct_pvs,    0)::INTEGER AS direct_pvs,
        COALESCE(nt.applenews_pvs, le.applenews_pvs, 0)::INTEGER AS applenews_pvs,
        COALESCE(nt.smartnews_pvs, le.smartnews_pvs, 0)::INTEGER AS smartnews_pvs,
        COALESCE(nt.newsbreak_pvs, le.newsbreak_pvs, 0)::INTEGER AS newsbreak_pvs,
        COALESCE(nt.subscriber_pvs,le.subscriber_pvs,0)::INTEGER AS subscriber_pvs,
        COALESCE(nt.amp_pvs,       0)::INTEGER                   AS amp_pvs,
        COALESCE(nt.newsletter_pvs,0)::INTEGER                   AS newsletter_pvs,
        COALESCE(yh.yahoo_pvs,     0)::INTEGER                   AS yahoo_pvs,
        cm.median_pvs AS pub_median_pvs
    FROM tracker t
    -- strategy 2: URL join to DYN_STORY_META_DATA
    LEFT JOIN meta_ids mi
        ON t.pub_url_norm = mi.url_norm AND NOT t.is_le
    -- strategy 1+2 national traffic
    LEFT JOIN national_traffic nt
        ON COALESCE(t.url_story_id, mi.meta_story_id) = nt.STORY_ID
        AND NOT t.is_le
    -- strategy 3: L&E traffic
    LEFT JOIN le_traffic le
        ON t.pub_url_norm = le.canonical_url AND t.is_le
    -- Yahoo News platform reads (Amplitude-sourced, STORY_ID join)
    LEFT JOIN yahoo_traffic yh
        ON COALESCE(t.url_story_id, mi.meta_story_id)::BIGINT = yh.story_id
        AND NOT t.is_le
    -- benchmark
    LEFT JOIN company_medians cm ON t.article_domain = cm.domain
),

-- ── 9. Content vectors (DYN_CONTENT_API_LATEST, URL join) ───────────────────
-- FULL_TEXT_VECTOR:       article body (first ~400 words; model truncates longer articles)
-- DESCRIPTION_SEO_VECTOR: SEO meta description (~150-300 chars; no truncation risk)
-- QUALIFY deduplicates: tracker may have 2 rows per ASSET_ID (parent+child in same cluster);
-- joining both to the same DYN_CONTENT_API_LATEST row would create phantom cluster pairs.
article_vectors AS (
    SELECT
        t.ASSET_ID,
        t.cluster_id,
        c.FULL_TEXT_VECTOR,
        c.DESCRIPTION_SEO_VECTOR
    FROM tracker t
    JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST c
        ON RTRIM(LOWER(t.PUBLISHED_URL), '/') = RTRIM(LOWER(c.SOURCE_URL), '/')
    WHERE c.FULL_TEXT_VECTOR IS NOT NULL OR c.DESCRIPTION_SEO_VECTOR IS NOT NULL
    QUALIFY ROW_NUMBER() OVER (PARTITION BY t.ASSET_ID ORDER BY t._ROW_NUM) = 1
),

-- ── 10. Pairwise cosine similarity within clusters ───────────────────────────
-- Self-join (a.ASSET_ID < b.ASSET_ID) produces each pair once.
-- Each similarity is NULL when either article in the pair is missing that vector.
cluster_pairs AS (
    SELECT
        a.cluster_id,
        CASE WHEN a.FULL_TEXT_VECTOR       IS NOT NULL AND b.FULL_TEXT_VECTOR       IS NOT NULL
             THEN VECTOR_COSINE_SIMILARITY(a.FULL_TEXT_VECTOR,       b.FULL_TEXT_VECTOR)
             ELSE NULL END AS body_similarity,
        CASE WHEN a.DESCRIPTION_SEO_VECTOR IS NOT NULL AND b.DESCRIPTION_SEO_VECTOR IS NOT NULL
             THEN VECTOR_COSINE_SIMILARITY(a.DESCRIPTION_SEO_VECTOR, b.DESCRIPTION_SEO_VECTOR)
             ELSE NULL END AS desc_similarity
    FROM article_vectors a
    JOIN article_vectors b
        ON a.cluster_id = b.cluster_id AND a.ASSET_ID < b.ASSET_ID
),

-- ── 11. Cluster similarity aggregates ────────────────────────────────────────
cluster_similarity AS (
    SELECT
        cluster_id,
        ROUND(AVG(desc_similarity),  4) AS cluster_avg_sim_desc,
        ROUND(MIN(desc_similarity),  4) AS cluster_min_sim_desc,
        ROUND(MAX(desc_similarity),  4) AS cluster_max_sim_desc,
        ROUND(AVG(body_similarity),  4) AS cluster_avg_sim_first400w,
        ROUND(MIN(body_similarity),  4) AS cluster_min_sim_first400w,
        ROUND(MAX(body_similarity),  4) AS cluster_max_sim_first400w,
        COUNT(1)                        AS cluster_pair_count
    FROM cluster_pairs
    GROUP BY cluster_id
),

-- ── 12. Cluster-level traffic aggregates ─────────────────────────────────────
cluster_stats AS (
    SELECT
        cluster_id,
        SUM(total_pvs)     AS cluster_total_pvs,
        SUM(pub_median_pvs) AS cluster_sum_of_medians,
        COUNT(*)           AS cluster_article_count,
        SUM(CASE WHEN pub_median_pvs IS NOT NULL AND total_pvs >= pub_median_pvs
                 THEN 1 ELSE 0 END) AS cluster_hits
    FROM base
    GROUP BY cluster_id
),

-- ── 13. Primary IAB topic (DYN_CONTENT_API_LATEST.TAGS_IAB[0], URL join) ─────
-- TAGS_IAB is an array of IAB taxonomy labels (e.g. ["Crime","Law","News"]).
-- QUALIFY deduplicates: same root cause as article_vectors — tracker rows with duplicate
-- ASSET_IDs joining to one DYN_CONTENT_API_LATEST row would make iab_topics multi-row
-- per ASSET_ID, causing 2x multiplication in the final LEFT JOIN on b.ASSET_ID.
iab_topics AS (
    SELECT
        t.ASSET_ID,
        c.TAGS_IAB[0]::VARCHAR AS primary_iab_topic
    FROM tracker t
    JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST c
        ON RTRIM(LOWER(t.PUBLISHED_URL), '/') = RTRIM(LOWER(c.SOURCE_URL), '/')
    WHERE c.TAGS_IAB IS NOT NULL AND ARRAY_SIZE(c.TAGS_IAB) > 0
    QUALIFY ROW_NUMBER() OVER (PARTITION BY t.ASSET_ID ORDER BY t._ROW_NUM) = 1
),

-- ── 15. Author aggregates ─────────────────────────────────────────────────────
-- hit_rate / hit_count computed only over articles with a valid benchmark;
-- article_count and cluster_diversity include all articles.
author_stats AS (
    SELECT
        AUTHOR,
        COUNT(*)                                                              AS author_article_count,
        COUNT(DISTINCT cluster_id)                                            AS author_cluster_diversity,
        SUM(CASE WHEN pub_median_pvs IS NOT NULL AND total_pvs >= pub_median_pvs THEN 1
                 WHEN pub_median_pvs IS NOT NULL THEN 0
                 ELSE NULL END)                                               AS author_hit_count,
        ROUND(AVG(CASE WHEN pub_median_pvs IS NOT NULL AND total_pvs >= pub_median_pvs THEN 1.0
                       WHEN pub_median_pvs IS NOT NULL THEN 0.0
                       ELSE NULL END), 4)                                     AS author_hit_rate,
        ROUND(AVG(total_pvs), 0)                                              AS author_avg_pvs,
        ROUND(STDDEV_POP(total_pvs), 0)                                       AS author_pv_stddev,
        -- Articles per distinct week in tracker (volume proxy)
        ROUND(COUNT(*)::FLOAT / NULLIF(COUNT(DISTINCT week_num), 0), 2)       AS author_avg_weekly_output
    FROM base
    WHERE AUTHOR IS NOT NULL AND TRIM(AUTHOR) != ''
    GROUP BY AUTHOR
),

-- ── 16. Author avg similarity across their clusters ──────────────────────────
-- Mean of each cluster's average similarity across all clusters the author contributed to.
author_similarity AS (
    SELECT
        b.AUTHOR,
        ROUND(AVG(csim.cluster_avg_sim_desc),       4) AS author_avg_sim_desc,
        ROUND(AVG(csim.cluster_avg_sim_first400w),  4) AS author_avg_sim_first400w
    FROM base b
    JOIN cluster_similarity csim ON b.cluster_id = csim.cluster_id
    WHERE b.AUTHOR IS NOT NULL AND TRIM(b.AUTHOR) != ''
    GROUP BY b.AUTHOR
),

-- ── 14. Article access type (Free / Metered / Sub-Only) ──────────────────────
-- Source: MCC_RAW.STORY_DATA.PUBLISHED_STORIES — the CMS-authoritative snapshot.
-- PUBLISHED_STORIES has 8.4M rows for 2.4M distinct STORY_IDs (multiple versions per
-- story as it gets updated). We take the most recent version per STORY_ID.
-- Values: Free, Metered, Sub-Only, Free (Automatic), Sub-Only (Automatic), NULL.
-- NOTE: MCC_CLEAN.AMPLITUDE.ARTICLE_ACCESS_TYPE uses a different STORY_ID namespace
-- (not the McClatchy CMS numeric ID) and cannot be used for this join.
article_access AS (
    SELECT STORY_ID, ACCESS_TYPE AS access_type
    FROM (
        SELECT
            STORY_ID,
            ACCESS_TYPE,
            ROW_NUMBER() OVER (PARTITION BY STORY_ID ORDER BY LAST_MODIFIED DESC NULLS LAST) AS rn
        FROM MCC_RAW.STORY_DATA.PUBLISHED_STORIES
        WHERE ACCESS_TYPE IS NOT NULL AND ACCESS_TYPE != ''
          AND ACCESS_TYPE IN ('Free', 'Metered', 'Sub-Only',
                              'Free (Automatic)', 'Sub-Only (Automatic)')
    )
    WHERE rn = 1
)

-- ── Final output ─────────────────────────────────────────────────────────────
SELECT
    -- Editorial metadata (typed)
    b.ASSET_ID,
    b.BRAND_TYPE,
    b.CONTENT_TYPE,
    b.PARENT_ID,
    b.cluster_id,
    b.DRAFT_URL,
    b.PUBLISHED_URL,
    b.AUTHOR,
    b.SYNDICATION_PLATFORM,
    b.HEADLINE,
    b.week_num,
    b.week_of,
    b.CREATION_DATE_MONTH,
    b.PUB_DATE_MONTH,
    b.created_date,
    b.publication_date,
    b.VERTICAL,
    b.word_count,
    b.PRIMARY_KEYWORDS,
    b.META_DESCRIPTION,
    b.TARGET_AUDIENCE,
    b.DRAFT_DOC,
    b.PEER_REVIEWER,
    b.UPDATE_FLAG,
    b.TEST_CATEGORY,
    b.REUTERS_PHOTO,
    b.REUTERS_LINK,
    b._ROW_NUM,
    b._LOADED_AT,
    -- Traffic KPIs
    b.story_id,
    b.total_pvs,
    b.search_pvs,
    b.social_pvs,
    b.direct_pvs,
    b.applenews_pvs,
    b.smartnews_pvs,
    b.newsbreak_pvs,
    b.subscriber_pvs,
    b.amp_pvs,
    b.newsletter_pvs,
    b.yahoo_pvs,
    b.pub_median_pvs,
    -- Cluster aggregates
    cs.cluster_article_count,
    cs.cluster_hits,
    cs.cluster_total_pvs,
    cs.cluster_sum_of_medians,
    -- Cluster semantic similarity: SEO description vectors (no truncation; ~150-300 char summaries)
    csim.cluster_avg_sim_desc,
    csim.cluster_min_sim_desc,
    csim.cluster_max_sim_desc,
    -- Cluster semantic similarity: article body (first ~400 words; longer articles truncated)
    csim.cluster_avg_sim_first400w,
    csim.cluster_min_sim_first400w,
    csim.cluster_max_sim_first400w,
    csim.cluster_pair_count,
    -- Primary IAB content topic (TAGS_IAB[0] from DYN_CONTENT_API_LATEST; NULL if no URL match)
    it.primary_iab_topic,
    -- Article access type (Free / Paywalled) from Amplitude; NULL if no event coverage
    aa.access_type AS article_access_type,
    -- Article performance vs company median (float: 0.15 = +15%; NULL if no benchmark)
    CASE
        WHEN b.pub_median_pvs > 0 AND b.total_pvs > 0
        THEN (b.total_pvs - b.pub_median_pvs) / b.pub_median_pvs
        ELSE NULL
    END::FLOAT AS article_vs_co_median,
    -- Hit flag: 1 if at or above company median
    CASE
        WHEN b.pub_median_pvs IS NOT NULL AND b.total_pvs >= b.pub_median_pvs THEN 1
        WHEN b.pub_median_pvs IS NOT NULL THEN 0
        ELSE NULL
    END::INTEGER AS is_hit,
    -- Cluster performance vs company median
    CASE
        WHEN cs.cluster_sum_of_medians > 0 AND cs.cluster_total_pvs > 0
        THEN (cs.cluster_total_pvs - cs.cluster_sum_of_medians) / cs.cluster_sum_of_medians
        ELSE NULL
    END::FLOAT AS cluster_vs_co_median,
    -- Cluster hit rate (e.g. 0.33 = 1-in-3 articles hit; NULL if no benchmarkable articles)
    CASE
        WHEN cs.cluster_article_count > 0 AND cs.cluster_hits IS NOT NULL
        THEN cs.cluster_hits::FLOAT / cs.cluster_article_count
        ELSE NULL
    END::FLOAT AS cluster_hit_rate,
    -- Author aggregates (across all tracker articles for this author)
    aus.author_article_count,
    aus.author_cluster_diversity,
    aus.author_hit_count,
    aus.author_hit_rate,
    aus.author_avg_pvs,
    aus.author_pv_stddev,
    aus.author_avg_weekly_output,
    asim.author_avg_sim_desc,
    asim.author_avg_sim_first400w,
    CURRENT_TIMESTAMP() AS _modeled_at
FROM base b
LEFT JOIN cluster_stats     cs   ON b.cluster_id = cs.cluster_id
LEFT JOIN cluster_similarity csim ON b.cluster_id = csim.cluster_id
LEFT JOIN iab_topics        it   ON b.ASSET_ID   = it.ASSET_ID
LEFT JOIN author_stats      aus  ON b.AUTHOR     = aus.AUTHOR
LEFT JOIN author_similarity asim ON b.AUTHOR     = asim.AUTHOR
LEFT JOIN article_access    aa   ON TRY_TO_NUMBER(b.story_id) = aa.STORY_ID
ORDER BY b._ROW_NUM
"""


# ── Connection ────────────────────────────────────────────────────────────────

def sf_connect():
    with open(SF_KEY_PATH, "rb") as f:
        private_key = load_pem_private_key(f.read(), password=None)
    pkb = private_key.private_bytes(
        encoding=Encoding.DER,
        format=PrivateFormat.PKCS8,
        encryption_algorithm=NoEncryption(),
    )
    return snowflake.connector.connect(
        account=SF_ACCOUNT,
        user=SF_USER,
        private_key=pkb,
        database=SF_DATABASE,
        schema=SF_SCHEMA,
    )


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("Connecting to Snowflake (key-pair)…")
    con = sf_connect()
    cur = con.cursor()

    print(f"Building {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE}…")
    cur.execute(BUILD_SQL)

    cur.execute(f"SELECT COUNT(*) FROM {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE}")
    count = cur.fetchone()[0]
    print(f"\nDone. {count} rows in {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE}.")

    cur.close()
    con.close()


if __name__ == "__main__":
    main()
