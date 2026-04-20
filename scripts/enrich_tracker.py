"""
enrich_tracker.py — Append Snowflake traffic metrics to Sara Vallone's content tracker.

Reads every Published URL from the Google Sheet, fetches all-time traffic totals from
Snowflake, and writes 14 columns back to the sheet (cols AA–AN).  The script is
idempotent: every run overwrites existing values, so Snowflake figures stay current as
articles accumulate pageviews and new rows are added to the tracker.

Three Snowflake lookup strategies (applied in order, first match wins):
  1. Article ID extracted from URL → STORY_TRAFFIC_MAIN.STORY_ID
     (national O&O pubs — sacbee, miamiherald, kansascity, etc.)
  2. URL → DYN_STORY_META_DATA.ID → STORY_TRAFFIC_MAIN
     (AI-tagged articles with asset_type filter)
  3. CANONICAL_URL → STORY_TRAFFIC_MAIN_LE
     (L&E pubs: Us Weekly, Woman's World, Life & Style)

Performance vs company median uses Chris Palo's exact methodology from
national_team_deep_dive.xlsx (Oct 2025+ benchmark window):
  article_vs_co.median = (article_pvs − pub_median) / pub_median  → "+15%" or "−38%"
  cluster_vs_co.median = (cluster_pvs − sum_of_pub_medians) / sum_of_pub_medians
  Aggregate hit rate (cluster-level) = "1-in-N" written to a summary row.

Usage:
    python3 scripts/enrich_tracker.py

Authentication:
    Snowflake: McClatchy SSO via Okta.  A browser window opens for MFA once per session.
    Google Sheets: service account at ~/.credentials/pierce-tools.json

Env vars (optional — prompted if absent):
    SNOWFLAKE_USER               McClatchy SSO username (e.g. pierce.williams@mcclatchy.com)
    GOOGLE_SERVICE_ACCOUNT_FILE  path to service account JSON

Snowflake account: wvb49304-mcclatchy_eval
"""

import argparse
import os
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse, urlunparse

import gspread
from google.oauth2.service_account import Credentials
import snowflake.connector


# ── Config ────────────────────────────────────────────────────────────────────

SHEET_ID   = "14_0eK46g3IEj7L_yp9FIdWwvnuYI5f-vAuP7DDhSPg8"
SA_FILE    = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE",
                        str(Path.home() / ".credentials" / "pierce-tools.json"))

SF_ACCOUNT   = "wvb49304-mcclatchy_eval"
SF_USER_SA   = "GROWTH_AND_STRATEGY_SERVICE_USER"   # headless RSA key path
SF_KEY_PATH  = os.getenv("SNOWFLAKE_PRIVATE_KEY_PATH",
                          str(Path.home() / ".credentials" / "growth_strategy_service_rsa_key.p8"))
SF_DATABASE  = "MCC_PRESENTATION"
SF_SCHEMA    = "TABLEAU_REPORTING"

# Company-median benchmark window (Chris Palo method): rolling 12-month cutoff.
# MUST match model_tracker.py BENCHMARK_START_DATE. Bump each October so the
# window stays ~6–12 months of fresh data. Older traffic skews medians low
# and inflates "hit rate" (articles that look like they beat a weak median).
BENCHMARK_START_DATE = "2025-10-01"

# Output column names written to the sheet, in order.
OUTPUT_COLS = [
    "story_id",
    "total_pvs",
    "search_pvs",
    "social_pvs",
    "direct_pvs",
    "applenews_pvs",
    "smartnews_pvs",
    "newsbreak_pvs",
    "subscriber_pvs",
    # Performance vs company median — same methodology as national_team_deep_dive.xlsx.
    # "+15%" means the article's PVs were 15% above its publication's company median.
    # "" means no national O&O benchmark exists (L&E pub, staging, unpublished).
    "article_vs_co.median",  # per-article
    "cluster_id",            # cluster code — parent rows only; "" for children
    "cluster_total_pvs",
    "cluster_vs_co.median",  # per-cluster — parent rows only
    # ── Pre-computed from TRACKER_ENRICHED (model_tracker.py) ─────────────────
    "cluster_avg_sim_desc",
    # IAB content topic (e.g. "Crime", "Pop Culture", "Sports")
    "topic",
]

PARENT_ONLY_EXTRAS = {"cluster_avg_sim_desc"}

# L&E publication domains — traffic lives in STORY_TRAFFIC_MAIN_LE keyed by
# CANONICAL_URL, not in STORY_TRAFFIC_MAIN keyed by STORY_ID.
LE_DOMAINS = {"usmagazine.com", "womansworld.com", "lifeandstylemag.com"}

# Syndication destination domains — the original O&O article URL is the Snowflake key,
# not the syndication URL.  These are expected misses; flagged as SKIP_SYNDICATION.
SYNDICATION_DOMAINS = {"msn.com", "news.google.com", "yahoo.com", "apple.news"}

# URL patterns that indicate a non-published URL.  These are skipped silently.
SKIP_PATHS   = ("/wp-admin/",)                           # CMS edit links
SKIP_DOMAINS = ("modmomsclub", "wpenginepowered")        # staging domains

# Legacy column header names that were renamed in OUTPUT_COLS.
# If the sheet still has an old header, reuse that column slot and rename it.
LEGACY_COL_ALIASES = {
    "article_vs_co.median": ["article_batting_avg", "hit", "batting_avg",
                              "article_avg", "pvs_vs_median"],
    "cluster_vs_co.median": ["cluster_batting_avg", "cluster_hit", "cluster_avg"],
    "topic":                ["primary_iab_topic"],
}

# Columns that were previously written but have since been removed from OUTPUT_COLS.
# Deleted from the sheet before each run so they don't persist as orphan columns.
STALE_COLS = [
    "cluster_avg_sim_first400w",
    "cluster_min_sim_desc",
    "cluster_max_sim_desc",
    "cluster_min_sim_first400w",
    "cluster_max_sim_first400w",
    "cluster_pair_count",
    "author_avg_sim_desc",
    "author_avg_sim_first400w",
    "author_article_count",
    "author_cluster_diversity",
    "author_hit_rate",
    "author_avg_pvs",
    "author_pv_stddev",
    "author_avg_weekly_output",
]


# ── Google Sheets helpers ─────────────────────────────────────────────────────

def load_sheet():
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.readonly",
    ]
    creds = Credentials.from_service_account_file(SA_FILE, scopes=scopes)
    gc = gspread.authorize(creds)
    return gc.open_by_key(SHEET_ID).sheet1


def find_url_column(headers):
    """Return 0-based index of the Published URL/Link column."""
    lower = [h.lower() for h in headers]
    # Prefer a column explicitly labelled "published"
    for i, h in enumerate(lower):
        if "published" in h and ("url" in h or "link" in h):
            return i
    for i, h in enumerate(lower):
        if "url" in h or "link" in h:
            return i
    raise ValueError(f"No URL/Link column found. Headers: {headers}")


# ── URL normalization ─────────────────────────────────────────────────────────

def normalize_url(u):
    """
    Normalize a URL to Snowflake's canonical form:
      • strip whitespace
      • amp.* → www.*
      • force https
      • strip trailing slash from path
    """
    u = u.strip()
    if not u:
        return u
    p = urlparse(u)
    host = p.netloc
    if host.startswith("amp."):
        host = "www." + host[4:]
    scheme = "https" if p.scheme in ("http", "https") else p.scheme
    return urlunparse((scheme, host, p.path.rstrip("/"), "", "", ""))


def _norm_variants(u):
    """Return (https_url, http_url) for a normalized URL (both schemes for Snowflake joins)."""
    p = urlparse(u)
    return (
        urlunparse(("https", p.netloc, p.path, "", "", "")),
        urlunparse(("http",  p.netloc, p.path, "", "", "")),
    )


def _pub_from_url(url):
    """Extract bare domain (no www./amp.) from a normalized URL."""
    netloc = urlparse(url).netloc
    if netloc.startswith(("www.", "amp.")):
        return netloc[4:]
    return netloc


def _is_hit(pct_str):
    """Return True if a '+N%' / '-N%' string represents ≥ 0 (at or above median)."""
    if not isinstance(pct_str, str):
        return False
    try:
        return float(pct_str.replace("%", "")) >= 0
    except ValueError:
        return False


# ── Snowflake helpers ─────────────────────────────────────────────────────────

def sf_connect(user=None):
    # Prefer headless RSA key auth (works in CI and locally if key file present).
    # Falls back to Okta browser MFA when key file is absent (interactive use).
    key_file = Path(SF_KEY_PATH)
    if key_file.exists():
        from cryptography.hazmat.primitives.serialization import (
            load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
        )
        raw = key_file.read_bytes()
        key = load_pem_private_key(raw, password=None)
        der = key.private_bytes(Encoding.DER, PrivateFormat.PKCS8, NoEncryption())
        print(f"Connecting to Snowflake as {SF_USER_SA} (RSA key)…")
        return snowflake.connector.connect(
            account=SF_ACCOUNT,
            user=SF_USER_SA,
            private_key=der,
            warehouse="GROWTH_AND_STRATEGY_ROLE_WH",
            role="GROWTH_AND_STRATEGY_ROLE",
            database=SF_DATABASE,
            schema=SF_SCHEMA,
        )
    print("RSA key not found — opening browser for Okta MFA…")
    return snowflake.connector.connect(
        account=SF_ACCOUNT,
        user=user or input("Snowflake SSO username: ").strip(),
        authenticator="externalbrowser",
        database=SF_DATABASE,
        schema=SF_SCHEMA,
    )


# Strategy 1: query STORY_TRAFFIC_MAIN directly by STORY_ID.
# Used for national O&O articles whose URLs contain the numeric McClatchy article ID
# (e.g. https://www.sacbee.com/entertainment/living/article314923832.html → 314923832).
STORY_ID_SQL = """
SELECT
    t.STORY_ID,
    SUM(t.ALL_PAGEVIEWS)          AS total_pvs,
    SUM(t.SEARCH_PAGEVIEWS)       AS search_pvs,
    SUM(t.SOCIAL_PAGEVIEWS)       AS social_pvs,
    SUM(t.DIRECT_PAGEVIEWS)       AS direct_pvs,
    SUM(t.NEWSLETTER_PAGEVIEWS)   AS newsletter_pvs,
    SUM(t.APPLENEWS_PAGEVIEWS)    AS applenews_pvs,
    SUM(t.SMARTNEWSAPP_PAGEVIEWS) AS smartnews_pvs,
    SUM(t.NEWSBREAKAPP_PAGEVIEWS) AS newsbreak_pvs,
    SUM(t.SUBS_PAGEVIEWS)         AS subscriber_pvs
FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN t
WHERE t.STORY_ID IN ({placeholders})
GROUP BY t.STORY_ID
"""

# Strategy 2+3: join via URL.
# Strategy 2 (national pubs): URL → DYN_STORY_META_DATA.ID → STORY_TRAFFIC_MAIN.
# Strategy 3 (L&E pubs): CANONICAL_URL → STORY_TRAFFIC_MAIN_LE.
# Both strategies run in a single query via UNION ALL.
METRICS_SQL = """
WITH traffic AS (
    -- Strategy 2: national pubs — join DYN_STORY_META_DATA URL to STORY_TRAFFIC_MAIN
    SELECT
        RTRIM(m.URL, '/') AS URL,
        m.ID                          AS story_id,
        SUM(t.ALL_PAGEVIEWS)          AS total_pvs,
        SUM(t.SEARCH_PAGEVIEWS)       AS search_pvs,
        SUM(t.SOCIAL_PAGEVIEWS)       AS social_pvs,
        SUM(t.DIRECT_PAGEVIEWS)       AS direct_pvs,
        SUM(t.NEWSLETTER_PAGEVIEWS)   AS newsletter_pvs,
        SUM(t.APPLENEWS_PAGEVIEWS)    AS applenews_pvs,
        SUM(t.SMARTNEWSAPP_PAGEVIEWS) AS smartnews_pvs,
        SUM(t.NEWSBREAKAPP_PAGEVIEWS) AS newsbreak_pvs,
        SUM(t.SUBS_PAGEVIEWS)         AS subscriber_pvs
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN t
    JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA m
        ON t.STORY_ID = m.ID
    WHERE RTRIM(m.URL, '/') IN ({placeholders})
      AND m.ASSET_TYPE IN ('storyline', 'story', 'wirestory')
    GROUP BY m.URL, m.ID

    UNION ALL

    -- Strategy 3: L&E pubs (Us Weekly, Woman's World, Life & Style)
    -- LEFT JOIN DYN_STORY_META_DATA to backfill story_id where available
    SELECT
        RTRIM(t.CANONICAL_URL, '/') AS URL,
        MAX(m.ID)                     AS story_id,
        SUM(t.ALL_PAGEVIEWS)          AS total_pvs,
        SUM(t.SEARCH_PAGEVIEWS)       AS search_pvs,
        SUM(t.SOCIAL_PAGEVIEWS)       AS social_pvs,
        SUM(t.DIRECT_PAGEVIEWS)       AS direct_pvs,
        SUM(t.NEWSLETTER_PAGEVIEWS)   AS newsletter_pvs,
        SUM(t.APPLENEWS_PAGEVIEWS)    AS applenews_pvs,
        SUM(t.SMARTNEWSAPP_PAGEVIEWS) AS smartnews_pvs,
        SUM(t.NEWSBREAKAPP_PAGEVIEWS) AS newsbreak_pvs,
        SUM(t.SUBS_PAGEVIEWS)         AS subscriber_pvs
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN_LE t
    LEFT JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA m
        ON RTRIM(t.CANONICAL_URL, '/') = RTRIM(m.URL, '/')
    WHERE RTRIM(t.CANONICAL_URL, '/') IN ({placeholders})
    GROUP BY t.CANONICAL_URL
)
-- Final aggregate handles rare cases where a URL appears in both tables
SELECT
    URL,
    MAX(story_id)       AS story_id,
    SUM(total_pvs)      AS total_pvs,
    SUM(search_pvs)     AS search_pvs,
    SUM(social_pvs)     AS social_pvs,
    SUM(direct_pvs)     AS direct_pvs,
    SUM(newsletter_pvs) AS newsletter_pvs,
    SUM(applenews_pvs)  AS applenews_pvs,
    SUM(smartnews_pvs)  AS smartnews_pvs,
    SUM(newsbreak_pvs)  AS newsbreak_pvs,
    SUM(subscriber_pvs) AS subscriber_pvs
FROM traffic
GROUP BY URL
"""

# Used by backfill_story_ids() to resolve story_id from URL for L&E + unmatched articles.
STORY_ID_FROM_URL_SQL = """
SELECT RTRIM(URL, '/') AS url, ID
FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA
WHERE RTRIM(URL, '/') IN ({placeholders})
  AND ASSET_TYPE IN ('storyline', 'story', 'wirestory')
"""

# Company-wide median PVs per domain, national O&O (Oct 2025+ — matches Chris's benchmark).
# Used as the threshold for article_vs_co.median and cluster_vs_co.median.
COMPANY_MEDIANS_SQL = """
WITH article_totals AS (
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
    WHERE t.EVENT_DATE >= '{benchmark_start}'
      AND m.ASSET_TYPE IN ('storyline', 'story', 'wirestory')
    GROUP BY domain, t.STORY_ID
)
SELECT
    domain,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY story_pvs) AS median_pvs,
    COUNT(*) AS n
FROM article_totals
WHERE domain IS NOT NULL AND domain != ''
GROUP BY domain
HAVING COUNT(*) >= 10
"""


# Pre-computed enrichment from TRACKER_ENRICHED (model_tracker.py).
# Fetches the full table (small: ~2K rows) and keys by normalized URL.
# Wrapped in try/except in fetch_enriched_extras — gracefully degrades if the
# role lacks SELECT access on the CONTENT_SCALING_AGENT schema.
ENRICHED_EXTRAS_SQL = """
SELECT
    RTRIM(
        CASE WHEN PUBLISHED_URL LIKE '%://amp.%'
             THEN REPLACE(PUBLISHED_URL, '://amp.', '://www.')
             ELSE PUBLISHED_URL END,
        '/'
    )                          AS url_norm,
    cluster_avg_sim_desc,
    primary_iab_topic AS topic,
    author_article_count,
    author_cluster_diversity,
    author_hit_rate,
    author_avg_pvs,
    author_pv_stddev,
    author_avg_weekly_output,
    author_avg_sim_desc,
    author_avg_sim_first400w
FROM MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED
QUALIFY ROW_NUMBER() OVER (PARTITION BY url_norm ORDER BY url_norm) = 1
"""


def fetch_enriched_extras(cur):
    """
    Fetch pre-computed similarity, IAB topic, and author stats from TRACKER_ENRICHED.
    Returns dict: normalized_url → {col: value, ...}.
    Returns {} and prints a warning if the role lacks access to CONTENT_SCALING_AGENT.
    """
    try:
        cur.execute(ENRICHED_EXTRAS_SQL)
        rows = cur.fetchall()
        cols = [d[0].lower() for d in cur.description]
        result = {}
        for row in rows:
            d = dict(zip(cols, row))
            url_key = d.pop("url_norm", None)
            if url_key:
                result[url_key] = d
        print(f"  TRACKER_ENRICHED: {len(result)} rows loaded for extras enrichment.")
        return result
    except Exception as e:
        print(f"  WARNING: could not fetch TRACKER_ENRICHED extras ({e}). "
              f"Similarity/IAB/author columns will be empty.")
        return {}


def extract_mcc_story_id(url):
    """
    Extract the numeric McClatchy STORY_ID from a URL.
    Pattern: 'article' followed by 7+ digits (avoids false matches on short segments).
    Example: https://www.sacbee.com/.../article314923832.html → '314923832'
    Returns the ID string or None.
    """
    m = re.search(r'article(\d{7,})', url)
    return m.group(1) if m else None


def _row_to_metrics(story_id, row_offset, row):
    """Convert a Snowflake result row to a metrics dict.  row_offset is the index of total_pvs."""
    return {
        "story_id":             story_id,
        "total_pvs":            int(row[row_offset]     or 0),
        "search_pvs":           int(row[row_offset + 1] or 0),
        "social_pvs":           int(row[row_offset + 2] or 0),
        "direct_pvs":           int(row[row_offset + 3] or 0),
        "newsletter_pvs":       int(row[row_offset + 4] or 0),
        "applenews_pvs":        int(row[row_offset + 5] or 0),
        "smartnews_pvs":        int(row[row_offset + 6] or 0),
        "newsbreak_pvs":        int(row[row_offset + 7] or 0),
        "subscriber_pvs":       int(row[row_offset + 8] or 0),
        "article_vs_co.median": "",   # filled in by compute_hit_flags()
    }


def fetch_metrics(cur, urls):
    """
    Return dict: normalized_url → metrics dict.

    Applies SKIP_PATHS / SKIP_DOMAINS filters before querying Snowflake so that
    preview links, wp-admin URLs, staging domains, and syndication destinations are
    dropped immediately — they have no traffic data.

    Strategy 1 runs first for national O&O articles with a parseable article ID;
    Strategies 2+3 handle everything else in a single combined query.
    """
    # Filter to valid, published article URLs only
    clean_urls = []
    for u in urls:
        if not u or not u.strip():
            continue
        n = normalize_url(u)
        if not n:
            continue
        parsed = urlparse(n)
        bare   = parsed.netloc[4:] if parsed.netloc.startswith("www.") else parsed.netloc
        if not parsed.path.rstrip("/"):
            continue  # preview / root URL
        if any(parsed.path.startswith(sp) for sp in SKIP_PATHS):
            continue  # wp-admin edit link
        if any(skip in parsed.netloc for skip in SKIP_DOMAINS):
            continue  # staging domain
        if bare in SYNDICATION_DOMAINS:
            continue  # syndication destination — no O&O traffic data
        clean_urls.append(n)

    if not clean_urls:
        return {}

    result = {}

    # ── Strategy 1: STORY_ID extracted from URL → STORY_TRAFFIC_MAIN ──────────
    # Skipped for L&E domains — their articles live in STORY_TRAFFIC_MAIN_LE,
    # keyed by CANONICAL_URL, not by STORY_ID.
    id_to_url = {}  # story_id_str → normalized_url (first occurrence wins)
    for u in clean_urls:
        if any(d in u for d in LE_DOMAINS):
            continue
        sid = extract_mcc_story_id(u)
        if sid and sid not in id_to_url:
            id_to_url[sid] = u

    if id_to_url:
        ph = ", ".join(["%s"] * len(id_to_url))
        cur.execute(STORY_ID_SQL.format(placeholders=ph), list(id_to_url.keys()))
        for row in cur.fetchall():
            sid = str(row[0])
            url_key = id_to_url.get(sid)
            if url_key:
                result[url_key] = _row_to_metrics(sid, 1, row)
        matched_s1 = sum(1 for u in id_to_url.values() if u in result)
        print(f"  Strategy 1 (article ID): {matched_s1} / {len(id_to_url)} matched")

    # ── Strategies 2+3: URL-based lookup for remaining unmatched articles ──────
    # Pass both https and http variants of each URL so Snowflake can match
    # regardless of which scheme is stored in CANONICAL_URL / DYN_STORY_META_DATA.
    unmatched = [u for u in clean_urls if u not in result]
    if unmatched:
        variants = []
        for u in unmatched:
            variants.extend(_norm_variants(u))
        ph_v = ", ".join(["%s"] * len(variants))
        cur.execute(METRICS_SQL.format(placeholders=ph_v), variants + variants)
        for row in cur.fetchall():
            url_key = normalize_url(row[0])
            if url_key and url_key not in result:
                result[url_key] = _row_to_metrics(str(row[1]) if row[1] else "", 2, row)
        matched_s23 = sum(1 for u in unmatched if u in result)
        print(f"  Strategy 2+3 (URL lookup): {matched_s23} / {len(unmatched)} matched")

    return result


def backfill_story_ids(cur, result):
    """
    For any matched article that still has no story_id, query DYN_STORY_META_DATA
    by URL.  Covers L&E articles and any article where the Strategy 3 LEFT JOIN
    didn't fire.
    """
    missing = [(url_key, m) for url_key, m in result.items() if not m.get("story_id")]
    if not missing:
        return

    # Build both https and http variants so the URL join can match either scheme
    variants = []
    url_map  = {}  # normalized_url_variant → metrics dict
    for url_key, m in missing:
        p = urlparse(url_key)
        for scheme in ("https", "http"):
            v = urlunparse((scheme, p.netloc, p.path, "", "", ""))
            variants.append(v)
            url_map[v] = m

    ph = ", ".join(["%s"] * len(variants))
    cur.execute(STORY_ID_FROM_URL_SQL.format(placeholders=ph), variants)
    filled = 0
    for row in cur.fetchall():
        url_norm = row[0].rstrip("/")
        sid = str(row[1]) if row[1] else ""
        if not sid:
            continue
        p = urlparse(url_norm)
        for scheme in ("https", "http"):
            candidate = urlunparse((scheme, p.netloc, p.path, "", "", ""))
            if candidate in url_map and not url_map[candidate].get("story_id"):
                url_map[candidate]["story_id"] = sid
                filled += 1
                break

    still_missing = sum(1 for _, m in missing if not m.get("story_id"))
    print(f"  story_id backfill: {filled} filled, {still_missing} still missing "
          f"(out of {len(missing)} that lacked IDs)")


def fetch_company_medians(cur):
    """
    Query Snowflake for the company-wide median PVs per domain (Oct 2025+).
    Returns dict: bare_domain → median_pvs (float).

    National O&O only.  L&E pubs (usmagazine, womansworld, lifeandstylemag) are
    excluded because thousands of low-traffic articles drag their median near zero,
    making every L&E cluster a trivial "hit" — not an informative signal.
    L&E rows get "" in article_vs_co.median and cluster_vs_co.median.
    """
    medians = {}
    print("  Querying company medians — national O&O (Oct 2025+, ~30–60 s)…")
    cur.execute(COMPANY_MEDIANS_SQL.replace("{benchmark_start}", BENCHMARK_START_DATE))
    for row in cur.fetchall():
        domain = (row[0] or "").strip()
        if domain:
            medians[domain] = float(row[1] or 0)
    print(f"  Company medians loaded: {len(medians)} domains")
    print("  Top 12 by median:")
    for d, med in sorted(medians.items(), key=lambda x: -x[1])[:12]:
        print(f"    {d:<35} median={int(med):>7,}")
    return medians


def compute_hit_flags(metrics, company_medians):
    """
    Stamp article_vs_co.median on every matched entry.
    Formula: (article_pvs − pub_median) / pub_median → "+15%" or "−38%".
    "" for L&E pubs or domains with no benchmark.
    """
    flagged = hits = 0
    for url_key, m in metrics.items():
        domain = _pub_from_url(url_key)
        median = company_medians.get(domain)
        pvs    = m.get("total_pvs", 0)
        if median and median > 0 and pvs > 0:
            pct = round((pvs - median) / median * 100)
            m["article_vs_co.median"] = f"+{pct}%" if pct >= 0 else f"{pct}%"
            hits    += pvs >= median
            flagged += 1
        else:
            m["article_vs_co.median"] = ""
    if flagged:
        print(f"  vs co. median: {hits}/{flagged} at/above median ({100*hits//flagged}%)")


def compute_cluster_stats(rows, metrics, url_col, company_medians):
    """
    Derive cluster_id, cluster_total_pvs, and cluster_vs_co.median for every row.

    Sheet layout (0-based cols):
      col 0 — article code  (e.g. MH-P-1933 for parent, MH-P-1933-KC-C01 for child)
      col 2 — role          (contains 'Parent' or 'Child')
      col 3 — parent ref    (cluster ID for children; empty for parents)

    Cluster stats are written ONLY on parent rows; children get "" for all three columns.
    The aggregate hit rate across all national O&O clusters is written as "1-in-N"
    to a summary row below the data (Chris's exact format).

    Returns:
      row_stats       — dict: row_index (0-based) → {cluster_id, cluster_total_pvs,
                                                      cluster_vs_co.median, _threshold}
      batting_avg_str — "1-in-N" string, or "" if no national O&O clusters
    """
    # Pass 1 — assign cluster_id per row; track canonical parent row per cluster.
    # Duplicate parent entries (same code appearing twice) use the first as canonical;
    # later occurrences aggregate into the same cluster but don't write cluster summary.
    row_cluster  = {}   # row_index → cluster_id
    parent_rows  = set()
    seen_parents = {}   # cluster_id → first parent row_index

    for i, row in enumerate(rows):
        code       = row[0].strip() if len(row) > 0 else ""
        role       = row[2].strip() if len(row) > 2 else ""
        parent_ref = row[3].strip() if len(row) > 3 else ""
        if not code:
            continue
        if "Child" in role and parent_ref:
            row_cluster[i] = parent_ref       # child → points to its parent cluster
        else:
            if code in seen_parents:
                print(f"  ⚠ Duplicate cluster parent '{code}' at row {i+2} "
                      f"(first at row {seen_parents[code]+2}) — using first as canonical")
                row_cluster[i] = code          # still aggregates into same cluster
            else:
                row_cluster[i] = code
                parent_rows.add(i)
                seen_parents[code] = i

    # Pass 2 — group all row indices by cluster_id
    cluster_members = {}
    for idx, cid in row_cluster.items():
        cluster_members.setdefault(cid, []).append(idx)

    # Pass 3 — aggregate PVs + unique pubs per cluster, compute % vs threshold
    cluster_results = {}
    for cid, indices in cluster_members.items():
        total = 0
        pubs  = set()
        for idx in indices:
            row = rows[idx]
            url = row[url_col] if len(row) > url_col else ""
            key = normalize_url(url)
            m   = metrics.get(key, {})
            total += m.get("total_pvs", 0)
            if key:
                pub = _pub_from_url(key)
                if pub:
                    pubs.add(pub)

        # Chris's formula: threshold = sum of company medians for each unique pub in cluster.
        # "" = no benchmark (L&E-only cluster, or no matched traffic at all).
        threshold = sum(company_medians.get(p, 0) for p in pubs)
        if threshold > 0 and total > 0:
            pct   = round((total - threshold) / threshold * 100)
            c_hit = f"+{pct}%" if pct >= 0 else f"{pct}%"
        else:
            c_hit = ""

        cluster_results[cid] = {
            "cluster_total_pvs":    total if total > 0 else "",
            "cluster_vs_co.median": c_hit,
            "_threshold":           threshold,  # internal — not written to sheet
            "_pubs":                pubs,        # internal — for audit
        }

    # Pass 4 — emit per-row output; only canonical parent rows get non-empty cluster stats
    row_stats = {}
    for idx, cid in row_cluster.items():
        if idx in parent_rows:
            r = cluster_results[cid]
            row_stats[idx] = {
                "cluster_id":          cid,
                "cluster_total_pvs":   r["cluster_total_pvs"],
                "cluster_vs_co.median": r["cluster_vs_co.median"],
                "_threshold":          r["_threshold"],
            }
        else:
            row_stats[idx] = {
                "cluster_id": "", "cluster_total_pvs": "",
                "cluster_vs_co.median": "", "_threshold": 0,
            }

    hits    = sum(1 for v in cluster_results.values() if _is_hit(v["cluster_vs_co.median"]))
    misses  = sum(1 for v in cluster_results.values()
                  if v["cluster_vs_co.median"] and not _is_hit(v["cluster_vs_co.median"]))
    no_data = len(cluster_results) - hits - misses
    print(f"  Cluster stats: {len(cluster_results)} clusters — "
          f"{hits} hits (≥median), {misses} misses (<median)"
          + (f", {no_data} no-benchmark (L&E)" if no_data else ""))

    batting_avg_str = ""
    if hits + misses > 0:
        rate = hits / (hits + misses)
        n    = round(1 / rate, 1) if rate > 0 else "∞"
        batting_avg_str = f"1-in-{n}"
        print(f"\n  ★ BATTING AVERAGE (national O&O) ★")
        print(f"    {hits} hits / {hits+misses} clusters = {rate:.1%}  →  {batting_avg_str}")
        print(f"    (Chris's workbook target: 1-in-4; Discover benchmark: 1-in-2.0)\n")

    return row_stats, batting_avg_str


# ── Cell coloring ────────────────────────────────────────────────────────────

_GREEN = {"red": 0.576, "green": 0.769, "blue": 0.490}
_RED   = {"red": 0.918, "green": 0.263, "blue": 0.208}
_WHITE = {"red": 1.0,   "green": 1.0,   "blue": 1.0  }

def _pct_color(val):
    if isinstance(val, str) and val.startswith("+"):
        return _GREEN
    if isinstance(val, str) and val.startswith("-"):
        return _RED
    return _WHITE


def apply_median_colors(sheet, output_data, col_positions, first_output_col):
    """
    Color article_vs_co.median and cluster_vs_co.median cells in the sheet.
    First resets all output columns to white (prevents color bleed into newly
    appended columns), then applies green/red only to the two target columns.
    """
    target_cols    = ["article_vs_co.median", "cluster_vs_co.median"]
    sheet_id       = sheet.id
    last_output_col = max(col_positions.values())
    requests        = []

    # Reset all output columns to white before applying targeted colors.
    requests.append({
        "repeatCell": {
            "range": {
                "sheetId":          sheet_id,
                "startRowIndex":    1,
                "endRowIndex":      len(output_data) + 1,
                "startColumnIndex": first_output_col,
                "endColumnIndex":   last_output_col + 1,
            },
            "cell":   {"userEnteredFormat": {"backgroundColor": _WHITE}},
            "fields": "userEnteredFormat.backgroundColor",
        }
    })

    for col_name in target_cols:
        if col_name not in col_positions:
            continue
        col_idx   = col_positions[col_name]       # 0-based absolute sheet column
        block_pos = col_idx - first_output_col    # position within the written block

        colors = [
            _pct_color(row[block_pos] if block_pos < len(row) else "")
            for row in output_data
        ]

        # Collapse consecutive same-color rows into contiguous ranges
        ranges, start = [], 0
        for j in range(1, len(colors)):
            if colors[j] != colors[start]:
                ranges.append((start, j - 1, colors[start]))
                start = j
        ranges.append((start, len(colors) - 1, colors[start]))

        for r_start, r_end, color in ranges:
            requests.append({
                "repeatCell": {
                    "range": {
                        "sheetId":          sheet_id,
                        "startRowIndex":    r_start + 1,   # +1 skips header row
                        "endRowIndex":      r_end   + 2,   # +1 header + 1 exclusive
                        "startColumnIndex": col_idx,
                        "endColumnIndex":   col_idx + 1,
                    },
                    "cell": {
                        "userEnteredFormat": {"backgroundColor": color}
                    },
                    "fields": "userEnteredFormat.backgroundColor",
                }
            })

    if requests:
        sheet.spreadsheet.batch_update({"requests": requests})
        print(f"  Cell colors applied ({len(requests)} range(s)).")


# ── Column layout helpers ─────────────────────────────────────────────────────

def _col_letter(n):
    """Convert 1-based column number to spreadsheet letter (A, B, … Z, AA, …)."""
    result = ""
    while n > 0:
        n, rem = divmod(n - 1, 26)
        result = chr(65 + rem) + result
    return result


def resolve_column_positions(headers):
    """
    Determine where each OUTPUT_COL will land in the sheet.

    Priority:
      1. Column already exists under the current name → reuse that position
      2. Column exists under a legacy alias → reuse + rename
      3. New column → append after the last existing column

    Returns:
      col_positions  — {col_name: 0-based_index}
      new_headers    — {0-based_index: header_label}  (truly new columns)
      legacy_renames — {0-based_index: header_label}  (renamed legacy columns)
    """
    col_positions  = {}
    new_headers    = {}
    legacy_renames = {}
    next_new_col   = len(headers)

    for col_name in OUTPUT_COLS:
        if col_name in headers:
            idx = headers.index(col_name)
            col_positions[col_name] = idx
            print(f"  '{col_name}' already at col {idx + 1} — will overwrite")
        else:
            legacy_slot = next(
                (headers.index(alias) for alias in LEGACY_COL_ALIASES.get(col_name, [])
                 if alias in headers),
                None
            )
            if legacy_slot is not None:
                col_positions[col_name] = legacy_slot
                legacy_renames[legacy_slot] = col_name
                print(f"  '{col_name}' reusing legacy col {legacy_slot + 1} (will rename)")
            else:
                col_positions[col_name] = next_new_col
                new_headers[next_new_col] = col_name
                next_new_col += 1

    return col_positions, new_headers, legacy_renames


def write_output(sheet, rows, urls, metrics, cluster_stats, extras,
                 col_positions, new_headers, legacy_renames, batting_avg_str):
    """
    Apply all changes to the Google Sheet in the fewest possible API calls:
      1. Expand sheet width if new columns were added
      2. Write new column headers
      3. Rename any legacy headers
      4. Delete trailing columns beyond the output range
      5. Write the full output data block in one range update
      6. Write the batting average summary row
    """
    sorted_cols      = sorted(col_positions.items(), key=lambda x: x[1])
    first_output_col = sorted_cols[0][1]   # 0-based
    last_output_col  = sorted_cols[-1][1]  # 0-based

    print(f"Writing {len(OUTPUT_COLS)} columns at cols "
          f"{first_output_col + 1}–{last_output_col + 1} "
          f"({_col_letter(first_output_col + 1)}–{_col_letter(last_output_col + 1)})…")

    # 1. Expand sheet if new columns push beyond current width
    if new_headers:
        cols_needed = last_output_col + 1
        if cols_needed > sheet.col_count:
            sheet.add_cols(cols_needed - sheet.col_count)
            print(f"  Expanded sheet to {cols_needed} columns.")

    # 2. Write new column headers in one range call
    if new_headers:
        first_new = min(new_headers)
        last_new  = max(new_headers)
        hdr_range = f"{_col_letter(first_new + 1)}1:{_col_letter(last_new + 1)}1"
        sheet.update([[new_headers[i] for i in sorted(new_headers)]], hdr_range)
        print(f"  Added {len(new_headers)} new header(s).")

    # 3. Rename legacy headers (one cell call each; typically 0–2 per run)
    for col_idx, new_name in sorted(legacy_renames.items()):
        sheet.update_cell(1, col_idx + 1, new_name)
        print(f"  Renamed legacy header at col {col_idx + 1} → '{new_name}'")

    # 4. Delete trailing columns beyond our output range.
    # sheet.col_count is the authoritative sheet width; get_all_values() omits trailing
    # empty columns so headers[] can't see them — always use sheet.col_count here.
    first_trail = last_output_col + 2   # 1-based index of first column to delete
    if sheet.col_count >= first_trail:
        n_trail = sheet.col_count - first_trail + 1
        for col_1based in range(sheet.col_count, first_trail - 1, -1):
            sheet.delete_columns(col_1based)
        print(f"  Deleted {n_trail} trailing column(s) beyond output range.")

    # 5. Build output block and write in one range update
    output_data = []
    for i, (row, url) in enumerate(zip(rows, urls)):
        key        = normalize_url(url)
        cs         = {k: v for k, v in cluster_stats.get(i, {}).items() if not k.startswith("_")}
        row_extras = dict(extras.get(key, {}))
        # Blank parent-only extras on non-parent rows. Parent rows always have a
        # truthy cluster_id set in compute_cluster_stats; child rows have "";
        # rows with no code (rare, e.g. header artifacts) have no entry at all.
        if not cs.get("cluster_id"):
            for col in PARENT_ONLY_EXTRAS:
                row_extras[col] = ""
        m = {**metrics.get(key, {}), **cs, **row_extras}

        block = []
        for col_idx in range(first_output_col, last_output_col + 1):
            matching = [name for name, pos in col_positions.items() if pos == col_idx]
            if matching:
                block.append(m.get(matching[0], ""))
            else:
                # Gap position (shouldn't happen with contiguous OUTPUT_COLS layout):
                # preserve whatever is already in the cell
                block.append(row[col_idx] if col_idx < len(row) else "")
        output_data.append(block)

    start_cell = f"{_col_letter(first_output_col + 1)}2"
    end_cell   = f"{_col_letter(last_output_col + 1)}{len(output_data) + 1}"
    sheet.update(output_data, f"{start_cell}:{end_cell}")

    # 6. Write batting average summary row two rows below the last data row
    if batting_avg_str:
        summary_row = len(output_data) + 3   # +1 header, +1 last data row, +1 gap
        if summary_row > sheet.row_count:
            sheet.add_rows(summary_row - sheet.row_count)
        summary     = [""] * (last_output_col - first_output_col + 1)

        cid_offset = col_positions.get("cluster_id", -1) - first_output_col
        ba_offset  = col_positions.get("cluster_vs_co.median", -1) - first_output_col
        if cid_offset >= 0:
            summary[cid_offset] = "★ Batting Avg (national O&O)"
        if ba_offset >= 0:
            summary[ba_offset]  = batting_avg_str

        ba_range = (f"{_col_letter(first_output_col + 1)}{summary_row}"
                    f":{_col_letter(last_output_col + 1)}{summary_row}")
        sheet.update([summary], ba_range)
        print(f"  Batting average written to row {summary_row}: {batting_avg_str}")

    apply_median_colors(sheet, output_data, col_positions, first_output_col)


# ── Diagnostic helpers (--discover, --debug-urls) ─────────────────────────────

def discover_columns(cur):
    """Print all tables in TABLEAU_REPORTING + column names for key tables."""
    print("\n── All tables in MCC_PRESENTATION.TABLEAU_REPORTING ──")
    cur.execute("SHOW TABLES IN SCHEMA MCC_PRESENTATION.TABLEAU_REPORTING")
    for row in cur.fetchall():
        print(f"  {row[1]}")

    for table in ("STORY_TRAFFIC_MAIN", "STORY_TRAFFIC_MAIN_LE", "DYN_STORY_META_DATA"):
        cur.execute(f"SHOW COLUMNS IN TABLE MCC_PRESENTATION.TABLEAU_REPORTING.{table}")
        cols = [row[2] for row in cur.fetchall()]
        print(f"\n{table} columns:")
        for c in cols:
            print(f"  {c}")

    print("\n── DYN_STORY_META_DATA ASSET_TYPE values ──")
    cur.execute("""
        SELECT ASSET_TYPE, COUNT(*) AS cnt
        FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA
        GROUP BY ASSET_TYPE ORDER BY cnt DESC
    """)
    for row in cur.fetchall():
        print(f"  {repr(row[0]):<20} {row[1]:>8,} rows")

    for table in ("DYN_STORY_FACTS_DETAIL_WITH_KPIS", "DYN_CONTENT_API_LATEST", "NEWSROOMPAGES"):
        try:
            cur.execute(f"SHOW COLUMNS IN TABLE MCC_PRESENTATION.TABLEAU_REPORTING.{table}")
            cols = [row[2] for row in cur.fetchall()]
            print(f"\n{table} columns ({len(cols)}):")
            for c in cols:
                print(f"  {c}")
        except Exception as e:
            print(f"\n{table}: ERROR — {e}")
    print()


def debug_url_format(cur, sheet_urls):
    """Test published URLs against both Snowflake traffic tables."""
    published = [u for u in sheet_urls
                 if u and "wp-admin" not in u and "wpenginepowered" not in u]
    sample = published[:5]

    print(f"\n── Published URLs being tested (first 5 of {len(published)}) ──")
    for u in sample:
        print(f"  {repr(u)}")
    if not sample:
        print("  No clean published URLs found in first rows.")
        return

    ph = ", ".join(["%s"] * len(sample))

    cur.execute(f"""
        SELECT URL, ID FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA
        WHERE URL IN ({ph}) LIMIT 10
    """, sample)
    rows = cur.fetchall()
    print(f"\n── DYN_STORY_META_DATA matches ({len(rows)}) ──")
    for row in rows:
        print(f"  {repr(row[0])}  id={row[1]}")

    cur.execute(f"""
        SELECT CANONICAL_URL, SUM(ALL_PAGEVIEWS)
        FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN_LE
        WHERE CANONICAL_URL IN ({ph})
        GROUP BY CANONICAL_URL LIMIT 10
    """, sample)
    rows = cur.fetchall()
    print(f"\n── STORY_TRAFFIC_MAIN_LE matches ({len(rows)}) ──")
    for row in rows:
        print(f"  {repr(row[0])}  pvs={row[1]}")

    if not rows:
        test_url = sample[0].rstrip("/")
        cur.execute("""
            SELECT CANONICAL_URL FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN_LE
            WHERE CANONICAL_URL LIKE %s LIMIT 3
        """, (f"%{urlparse(test_url).path}%",))
        fuzzy = cur.fetchall()
        print(f"\n── Fuzzy path match for '{urlparse(test_url).path}' ──")
        for row in fuzzy:
            print(f"  {repr(row[0])}")
        if not fuzzy:
            print("  (no fuzzy matches either)")
    print()


# ── End-of-run audit ──────────────────────────────────────────────────────────

def audit_rows(rows, urls, metrics, cluster_stats):
    """
    Print a categorised count of every row and flag unexpected blank cells.

    Categories:
      SKIP_BLANK       — no URL in the sheet row
      SKIP_PREVIEW     — URL has no article path (preview/root)
      SKIP_WPADMIN     — wp-admin edit link
      SKIP_STAGING     — staging domain (modmomsclub / wpenginepowered)
      SKIP_SYNDICATION — syndication destination URL (msn.com, etc.)
      NO_MATCH         — sent to Snowflake but not found in any table
      NO_TRAFFIC       — found in Snowflake but 0 PVs returned
      LE_NO_BENCH      — L&E pub: traffic found, but no national O&O median
      CHILD_ROW        — child row (cluster stats on parent only, by design)
      OK               — fully populated
    """
    audit_counts = {k: 0 for k in (
        "SKIP_BLANK", "SKIP_PREVIEW", "SKIP_WPADMIN", "SKIP_STAGING",
        "SKIP_SYNDICATION", "NO_MATCH", "NO_TRAFFIC", "LE_NO_BENCH", "CHILD_ROW", "OK"
    )}
    problem_rows = []

    for i, (row, url) in enumerate(zip(rows, urls)):
        row_num = i + 2   # 1-based, +1 for header row
        code    = row[0].strip() if len(row) > 0 else ""
        role    = row[2].strip() if len(row) > 2 else ""
        key     = normalize_url(url) if url.strip() else ""

        if not url.strip():
            audit_counts["SKIP_BLANK"] += 1
            continue

        parsed = urlparse(key or url.strip())
        path   = parsed.path.rstrip("/")
        bare   = parsed.netloc[4:] if parsed.netloc.startswith("www.") else parsed.netloc

        if not path:
            audit_counts["SKIP_PREVIEW"] += 1
            problem_rows.append((row_num, code, url, "SKIP_PREVIEW", "preview or root URL"))
            continue
        if any(parsed.path.startswith(sp) for sp in SKIP_PATHS):
            audit_counts["SKIP_WPADMIN"] += 1
            problem_rows.append((row_num, code, url, "SKIP_WPADMIN", "wp-admin edit link"))
            continue
        if any(skip in parsed.netloc for skip in SKIP_DOMAINS):
            audit_counts["SKIP_STAGING"] += 1
            problem_rows.append((row_num, code, url, "SKIP_STAGING", f"staging ({parsed.netloc})"))
            continue
        if bare in SYNDICATION_DOMAINS:
            audit_counts["SKIP_SYNDICATION"] += 1
            problem_rows.append((row_num, code, url, "SKIP_SYNDICATION",
                                  f"syndication destination ({bare})"))
            continue

        m = metrics.get(key, {})
        if not m:
            audit_counts["NO_MATCH"] += 1
            problem_rows.append((row_num, code, url, "NO_MATCH",
                                  "not found in Snowflake (new, deleted, or URL mismatch)"))
            continue
        if m.get("total_pvs", 0) == 0:
            audit_counts["NO_TRAFFIC"] += 1
            problem_rows.append((row_num, code, url, "NO_TRAFFIC",
                                  f"in Snowflake (story_id={m.get('story_id','?')}) but 0 PVs"))
            continue
        if _pub_from_url(key) in LE_DOMAINS:
            audit_counts["LE_NO_BENCH"] += 1
            if not m.get("story_id"):
                problem_rows.append((row_num, code, url, "LE_NO_BENCH",
                                      "L&E pub, story_id not in DYN_STORY_META_DATA"))
            continue
        if "Child" in role:
            audit_counts["CHILD_ROW"] += 1
            continue

        audit_counts["OK"] += 1

    print("\n── Per-row audit ──────────────────────────────────────────────────────")
    for cat, cnt in audit_counts.items():
        if cnt:
            print(f"  {cat:<16} {cnt:>4} rows")

    unexpected = [p for p in problem_rows if not p[3].startswith("SKIP")]
    print(f"\n── Rows needing attention ({len(unexpected)} unexpected / "
          f"{len(problem_rows)} total) ──")
    for row_num, code, url, cat, detail in problem_rows:
        marker = "  " if cat.startswith("SKIP") else "⚠ "
        print(f"  {marker}row {row_num:<4} [{cat}] {code or '(no code)'}")
        print(f"         {detail}")
        print(f"         {url[:100]}")


# ── Trends tab ───────────────────────────────────────────────────────────────

MIN_WEEK_SAMPLE = 5   # weeks with fewer benchmarked articles are excluded from Trends

CLUSTER_TARGET = 0.25  # Chris's 1-in-4 target


def _parse_week(val):
    """Parse a Week Of string into a datetime for sorting. Falls back to str."""
    for fmt in ("%m/%d/%Y", "%m/%d/%y", "%Y-%m-%d", "%B %d, %Y", "%b %d, %Y"):
        try:
            return datetime.strptime(val.strip(), fmt)
        except ValueError:
            continue
    return val


def _regenerate_trends_chart(spreadsheet, trends_ws, n_rows):
    """Delete all charts on the Trends tab and create a fresh line chart."""
    sheet_id = trends_ws.id

    # Fetch existing chart IDs for this tab
    resp = spreadsheet.client.request(
        'GET',
        f'https://sheets.googleapis.com/v4/spreadsheets/{spreadsheet.id}',
        params={'fields': 'sheets(properties/sheetId,charts/chartId)'},
    )
    chart_ids = []
    for s in resp.json().get('sheets', []):
        if s.get('properties', {}).get('sheetId') == sheet_id:
            chart_ids = [c['chartId'] for c in s.get('charts', [])]
            break

    requests = [{'deleteEmbeddedObject': {'objectId': cid}} for cid in chart_ids]

    def src(start_col, end_col):
        return {"sourceRange": {"sources": [{
            "sheetId":        sheet_id,
            "startRowIndex":  0,
            "endRowIndex":    n_rows,
            "startColumnIndex": start_col,
            "endColumnIndex":   end_col,
        }]}}

    requests.append({
        "addChart": {
            "chart": {
                "spec": {
                    "title": "Weekly Hit Rate vs Target (1-in-4)",
                    "basicChart": {
                        "chartType":      "LINE",
                        "legendPosition": "BOTTOM_LEGEND",
                        "axis": [
                            {"position": "BOTTOM_AXIS", "title": "Week #"},
                            {"position": "LEFT_AXIS",   "title": "Hit Rate"},
                        ],
                        "domains": [{"domain": src(0, 1)}],
                        "series": [
                            # col D (index 3): Article Hit Rate
                            {"series": src(3, 4), "targetAxis": "LEFT_AXIS"},
                            # col G (index 6): Cluster Hit Rate
                            {"series": src(6, 7), "targetAxis": "LEFT_AXIS"},
                            # col H (index 7): Target — dashed reference line
                            {"series": src(7, 8), "targetAxis": "LEFT_AXIS",
                             "lineStyle": {"type": "MEDIUM_DASHED", "width": 1}},
                        ],
                        "headerCount": 1,
                    },
                },
                "position": {
                    "overlayPosition": {
                        # Anchor below the weekly data table (n_rows includes header row)
                        "anchorCell": {"sheetId": sheet_id, "rowIndex": n_rows + 1, "columnIndex": 0},
                        "widthPixels":  700,
                        "heightPixels": 400,
                    }
                },
            }
        }
    })

    spreadsheet.batch_update({"requests": requests})
    print(f"  Chart {'replaced' if chart_ids else 'created'} on Trends tab.")


def write_trends_tab(sheet, rows, urls, metrics, cluster_stats, headers, extras=None):
    """
    Write/refresh a 'Trends' tab grouping article and cluster hit/miss counts by Week #,
    then regenerate the embedded line chart. Weeks with fewer than MIN_WEEK_SAMPLE
    benchmarked articles are excluded to avoid noisy early-week ratios.

    Week # (integer from the tracker) is the authority — not Week Of (date string),
    which can produce spurious future-week entries when publication dates are ahead
    of the current week.
    """
    # Prefer exact "Week #" column; fall back to any column containing "week #"
    week_col = next(
        (i for i, h in enumerate(headers) if h.strip().lower() == "week #"), None
    )
    if week_col is None:
        week_col = next(
            (i for i, h in enumerate(headers) if "week #" in h.lower()), None
        )
    if week_col is None:
        print("  No 'Week #' column found — skipping Trends tab.")
        return

    weekly = defaultdict(lambda: {
        "article_hits": 0, "article_misses": 0,
        "cluster_hits": 0, "cluster_misses": 0,
    })

    for i, (row, url) in enumerate(zip(rows, urls)):
        raw = row[week_col].strip() if len(row) > week_col else ""
        if not raw:
            continue
        # Normalise to integer week number; skip non-numeric values
        try:
            week = int(float(raw))
        except (ValueError, TypeError):
            continue
        art = metrics.get(normalize_url(url), {}).get("article_vs_co.median", "")
        clu = cluster_stats.get(i, {}).get("cluster_vs_co.median", "")
        if art.startswith("+"):
            weekly[week]["article_hits"]   += 1
        elif art.startswith("-"):
            weekly[week]["article_misses"] += 1
        if clu.startswith("+"):
            weekly[week]["cluster_hits"]   += 1
        elif clu.startswith("-"):
            weekly[week]["cluster_misses"] += 1

    if not weekly:
        print("  No weekly data — skipping Trends tab.")
        return

    sorted_weeks = sorted(weekly.keys())
    filtered     = [w for w in sorted_weeks
                    if (weekly[w]["article_hits"] + weekly[w]["article_misses"]) >= MIN_WEEK_SAMPLE]
    skipped      = len(sorted_weeks) - len(filtered)

    table = [["Week #",
              "Article Hits", "Article Misses", "Article Hit Rate",
              "Cluster Hits", "Cluster Misses", "Cluster Hit Rate",
              "Target (1-in-4)"]]
    for week in filtered:
        w  = weekly[week]
        at = w["article_hits"] + w["article_misses"]
        ct = w["cluster_hits"] + w["cluster_misses"]
        table.append([
            week,
            w["article_hits"],  w["article_misses"],
            w["article_hits"] / at if at else "",
            w["cluster_hits"],  w["cluster_misses"],
            w["cluster_hits"]  / ct if ct else "",
            CLUSTER_TARGET,
        ])

    try:
        trends = sheet.spreadsheet.worksheet("Trends")
        trends.clear()
    except gspread.exceptions.WorksheetNotFound:
        trends = sheet.spreadsheet.add_worksheet(title="Trends", rows=500, cols=20)

    trends.update(table, "A1")

    # Format hit rate + target columns as percentages so the chart axis reads correctly
    if len(table) > 1:
        last = len(table)
        pct_fmt = {"numberFormat": {"type": "PERCENT", "pattern": "0%"}}
        for col in ("D", "G", "H"):
            trends.format(f"{col}2:{col}{last}", pct_fmt)

    _regenerate_trends_chart(sheet.spreadsheet, trends, len(table))

    msg = f"  Trends tab updated: {len(filtered)} weeks"
    if skipped:
        msg += f" ({skipped} excluded, <{MIN_WEEK_SAMPLE} articles)"
    print(msg + ".")

    # ── Author performance table ──────────────────────────────────────────────
    if extras:
        author_col = next(
            (i for i, h in enumerate(headers) if h.strip().lower() == "author"), None
        )
        if author_col is not None:
            _AUTHOR_ALIASES = {
                "Hanna WIckes":         "Hanna Wickes",
                "Lauren J-G":           "Lauren JG",
                "Lauren Jarvis-Gibson": "Lauren JG",
            }
            seen_authors = {}
            for row, url in zip(rows, urls):
                key    = normalize_url(url)
                ex     = extras.get(key, {})
                raw    = row[author_col].strip() if len(row) > author_col else ""
                author = _AUTHOR_ALIASES.get(raw, raw)
                if not author or author in seen_authors or ex.get("author_hit_rate") is None:
                    continue
                def _f(v):
                    try: return float(v)
                    except (TypeError, ValueError): return ""
                seen_authors[author] = {
                    "hit_rate":          _f(ex["author_hit_rate"]),
                    "article_count":     int(ex["author_article_count"]) if ex.get("author_article_count") else "",
                    "cluster_diversity": int(ex["author_cluster_diversity"]) if ex.get("author_cluster_diversity") else "",
                    "avg_pvs":           round(_f(ex.get("author_avg_pvs"))) if ex.get("author_avg_pvs") else "",
                    "weekly_output":     _f(ex.get("author_avg_weekly_output")),
                    "avg_sim_desc":      _f(ex.get("author_avg_sim_desc")),
                    "avg_sim_first400w": _f(ex.get("author_avg_sim_first400w")),
                }

            if seen_authors:
                sorted_authors = sorted(
                    seen_authors.items(),
                    key=lambda x: (x[1]["hit_rate"] or 0),
                    reverse=True,
                )
                author_table = [[
                    "Author", "Articles", "Avg Weekly Output", "Avg PVs",
                    "Cluster Diversity", "Avg Sim (Desc)", "Avg Sim (Body 400w)", "Hit Rate"
                ]]
                for author, s in sorted_authors:
                    author_table.append([
                        author,
                        s["article_count"],
                        s["weekly_output"],
                        s["avg_pvs"],
                        s["cluster_diversity"],
                        s["avg_sim_desc"],
                        s["avg_sim_first400w"],
                        s["hit_rate"],
                    ])

                # Author table starts at J1 — column I is the blank separator
                trends.update(author_table, "J1")

                if len(author_table) > 1:
                    # Hit Rate is the 8th column (J=1st → Q=8th)
                    pct_fmt = {"numberFormat": {"type": "PERCENT", "pattern": "0.0%"}}
                    trends.format(f"Q2:Q{len(author_table)}", pct_fmt)

                print(f"  Author table written: {len(seen_authors)} authors.")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Enrich Sara Vallone's content tracker with Snowflake PV data")
    parser.add_argument("--discover", action="store_true",
                        help="Print Snowflake table/column names and exit")
    parser.add_argument("--debug-urls", action="store_true",
                        help="Compare URL formats between sheet and Snowflake")
    args = parser.parse_args()

    # sf_user only used if RSA key is absent (Okta fallback)
    sf_user = os.getenv("SNOWFLAKE_USER") or None

    print("Connecting to Google Sheets…")
    sheet      = load_sheet()
    all_values = sheet.get_all_values()
    if not all_values:
        print("Sheet is empty — nothing to do.")
        return

    headers  = all_values[0]
    rows     = all_values[1:]
    url_col  = find_url_column(headers)
    print(f"Found URL column: '{headers[url_col]}' (col {url_col + 1})")
    print(f"Total data rows: {len(rows)}")

    urls          = [r[url_col] if len(r) > url_col else "" for r in rows]
    nonempty_urls = [u for u in urls if u.strip()]
    print(f"URLs to look up: {len(nonempty_urls)}")

    print("Connecting to Snowflake…")
    con = sf_connect(sf_user)
    cur = con.cursor()

    if args.discover:
        discover_columns(cur)
        cur.close(); con.close()
        return

    if args.debug_urls:
        debug_url_format(cur, nonempty_urls)
        cur.close(); con.close()
        return

    print("Querying traffic metrics (30–60 seconds)…")
    metrics = fetch_metrics(cur, nonempty_urls)
    matched = sum(1 for u in nonempty_urls if normalize_url(u) in metrics)
    print(f"Rows matched in Snowflake: {matched} / {len(nonempty_urls)}")

    print("Backfilling missing story IDs…")
    backfill_story_ids(cur, metrics)

    print("Fetching company-wide medians (Oct 2025+ benchmark)…")
    company_medians = fetch_company_medians(cur)

    print("Fetching pre-computed extras from TRACKER_ENRICHED…")
    extras = fetch_enriched_extras(cur)
    cur.close()
    con.close()

    print("Stamping article_vs_co.median…")
    compute_hit_flags(metrics, company_medians)

    print("Computing cluster stats…")
    cluster_stats, batting_avg_str = compute_cluster_stats(
        rows, metrics, url_col, company_medians)

    # Delete any stale columns (removed from OUTPUT_COLS) before resolving positions.
    # Must delete right-to-left so earlier indices don't shift.
    stale_indices = sorted(
        [headers.index(c) for c in STALE_COLS if c in headers],
        reverse=True,
    )
    if stale_indices:
        for idx in stale_indices:
            sheet.delete_columns(idx + 1)   # 1-based
            print(f"  Deleted stale column '{headers[idx]}' at col {idx + 1}.")
        # Re-fetch headers after deletion so resolve_column_positions sees the clean state.
        headers = sheet.row_values(1)

    col_positions, new_headers, legacy_renames = resolve_column_positions(headers)

    write_output(sheet, rows, urls, metrics, cluster_stats, extras,
                 col_positions, new_headers, legacy_renames, batting_avg_str)

    print(f"\nDone. {matched} rows enriched with traffic data.")

    audit_rows(rows, urls, metrics, cluster_stats)

    print("Updating Trends tab…")
    write_trends_tab(sheet, rows, urls, metrics, cluster_stats, headers, extras)


if __name__ == "__main__":
    main()
