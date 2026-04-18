"""
snowflake_discovery2.py — Verify platform data sources.

Key questions:
1. What's actually in SYNDICATIONS_ARRAY — does it have platform-side view counts?
2. What do APPLENEWS_PAGEVIEWS / SMARTNEWSAPP_PAGEVIEWS actually measure in each table?
3. Do the raw Amplitude EVENTS tables capture Apple News / SmartNews app events?
4. Is there any Apple News, MSN, Yahoo, SmartNews, or publisher-portal data
   anywhere in Snowflake that goes beyond O&O click-throughs?
"""

import os
from pathlib import Path
from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
)
import snowflake.connector

SF_ACCOUNT  = "wvb49304-mcclatchy_eval"
SF_USER     = "GROWTH_AND_STRATEGY_SERVICE_USER"
SF_KEY_PATH = os.getenv("SNOWFLAKE_PRIVATE_KEY_PATH",
                        str(Path.home() / ".credentials" / "growth_strategy_service_rsa_key.p8"))


def get_conn():
    raw = Path(SF_KEY_PATH).read_bytes()
    key = load_pem_private_key(raw, password=None)
    der = key.private_bytes(Encoding.DER, PrivateFormat.PKCS8, NoEncryption())
    return snowflake.connector.connect(
        account=SF_ACCOUNT,
        user=SF_USER,
        private_key=der,
        warehouse="GROWTH_AND_STRATEGY_ROLE_WH",
        role="GROWTH_AND_STRATEGY_ROLE",
    )


def run(cur, sql):
    cur.execute(sql)
    return cur.fetchall(), [d[0] for d in cur.description]


def section(title):
    print(f"\n{'='*70}\n  {title}\n{'='*70}")


def main():
    print("Connecting to Snowflake...")
    conn = get_conn()
    cur = conn.cursor()
    print("Connected.\n")

    # ── 1. SYNDICATIONS_ARRAY — what's actually in it? ────────────────────
    section("1. DYN_CONTENT_API_LATEST — sample SYNDICATIONS_ARRAY values")
    cur.execute("""
        SELECT SOURCE_ID, SOURCE_URL, SYNDICATIONS_ARRAY
        FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST
        WHERE SYNDICATIONS_ARRAY IS NOT NULL
          AND ARRAY_SIZE(SYNDICATIONS_ARRAY) > 0
        LIMIT 10
    """)
    rows = cur.fetchall()
    for r in rows:
        print(f"\n  URL: {r[1]}")
        print(f"  SYNDICATIONS: {r[2]}")

    # ── 2. What events exist in EVENTS_412949? ────────────────────────────
    section("2. Raw Amplitude EVENTS_412949 — schema + distinct event_type sample")
    try:
        cur.execute("DESCRIBE TABLE MCC_AMPLITUDE.AMPLITUDE.EVENTS_412949")
        cols = cur.fetchall()
        print(f"\n  Columns ({len(cols)}):")
        for c in cols:
            print(f"    {c[0]:<40} {c[1]}")
        cur.execute("""
            SELECT EVENT_TYPE, COUNT(*) as cnt
            FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412949
            WHERE EVENT_DATE >= '2026-01-01'
            GROUP BY EVENT_TYPE
            ORDER BY cnt DESC
            LIMIT 30
        """)
        rows, _ = cur.fetchall(), None
        rows = cur.fetchall()
        print(f"\n  Top event types (2026):")
        for r in rows:
            print(f"    {r[0]:<50} {r[1]:,}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 3. Do Amplitude events have Apple News / SmartNews signals? ────────
    section("3. Amplitude event_type search — Apple News / SmartNews / MSN / Yahoo")
    for keyword in ["apple", "smartnews", "msn", "yahoo", "syndic", "partner", "platform"]:
        try:
            cur.execute(f"""
                SELECT EVENT_TYPE, COUNT(*) as cnt
                FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412949
                WHERE EVENT_TYPE ILIKE '%{keyword}%'
                GROUP BY EVENT_TYPE
                ORDER BY cnt DESC
                LIMIT 5
            """)
            rows = cur.fetchall()
            if rows:
                print(f"\n  '%{keyword}%' matches:")
                for r in rows:
                    print(f"    {r[0]:<50} {r[1]:,}")
            else:
                print(f"\n  '%{keyword}%' — no matches")
        except Exception as e:
            print(f"\n  '%{keyword}%' ERROR: {e}")

    # ── 4. All databases + schemas — broad table search for platform data ──
    section("4. Broad search across all accessible databases for platform tables")
    for db in ["MCC_PRESENTATION", "MCC_AMPLITUDE", "MCC_CLEAN", "MCC_RAW"]:
        for keyword in ["APPLE", "SMARTNEWS", "MSN", "YAHOO", "SYNDIC", "PUBLISHER"]:
            try:
                cur.execute(f"""
                    SELECT TABLE_SCHEMA, TABLE_NAME
                    FROM {db}.INFORMATION_SCHEMA.TABLES
                    WHERE TABLE_NAME ILIKE '%{keyword}%'
                    ORDER BY TABLE_SCHEMA, TABLE_NAME
                """)
                rows = cur.fetchall()
                if rows:
                    for r in rows:
                        print(f"  {db}.{r[0]}.{r[1]}")
            except Exception as e:
                pass  # skip inaccessible schemas quietly

    # ── 5. What does APPLENEWS_PAGEVIEWS actually measure? ────────────────
    section("5. Verify: APPLENEWS_PAGEVIEWS — is it platform-side or O&O click-through?")
    # Compare a known Apple News article: Tarrow AN views vs Snowflake AN PVs
    # Pull top articles by APPLENEWS_PAGEVIEWS and see if values look like
    # platform views (large) or click-throughs (small)
    cur.execute("""
        SELECT
            m.TITLE AS HEADLINE,
            m.URL,
            t.APPLENEWS_PAGEVIEWS,
            t.SMARTNEWSAPP_PAGEVIEWS,
            t.ALL_PAGEVIEWS,
            t.PUBLISHED
        FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_FACTS_DETAIL_WITH_KPIS t
        JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA m
          ON t.STORY_ID = m.ID
        WHERE t.APPLENEWS_PAGEVIEWS > 0
          AND t.PUBLISHED >= '2026-01-01'
        ORDER BY t.APPLENEWS_PAGEVIEWS DESC
        LIMIT 10
    """)
    rows = cur.fetchall()
    print(f"\n  Top articles by APPLENEWS_PAGEVIEWS (2026):")
    print(f"  {'Headline':<60} {'AN_PVs':>8} {'SN_PVs':>8} {'All_PVs':>10}")
    print(f"  {'-'*60} {'-'*8} {'-'*8} {'-'*10}")
    for r in rows:
        headline = (r[0] or '')[:57] + '...' if r[0] and len(r[0]) > 60 else (r[0] or '')
        print(f"  {headline:<60} {int(r[2] or 0):>8,} {int(r[3] or 0):>8,} {int(r[4] or 0):>10,}")

    # ── 6. STORYDATA clean table — what do SMARTNEWSAPP_ARTICLE_VIEW mean? ─
    section("6. MCC_CLEAN STORYDATA — sample values for app article views vs total")
    cur.execute("""
        SELECT
            HEADLINE,
            SUM(ARTICLE_VIEW) as total_article_view,
            SUM(SMARTNEWSAPP_ARTICLE_VIEW) as sn_app_view,
            SUM(NEWSBREAKAPP_ARTICLE_VIEW) as nb_app_view,
            SUM(SUBSCRIBER_PV) as sub_pv
        FROM MCC_CLEAN.AMPLITUDE.STORYDATA_BY_CONTENTTYPE_BY_PUB_DATE_WITHPWSTOPS
        WHERE PUBLISHED >= '2026-01-01'
          AND SMARTNEWSAPP_ARTICLE_VIEW > 0
        GROUP BY HEADLINE
        ORDER BY sn_app_view DESC
        LIMIT 10
    """)
    rows = cur.fetchall()
    print(f"\n  Top articles by SMARTNEWSAPP_ARTICLE_VIEW (2026):")
    print(f"  {'Headline':<60} {'SN_view':>8} {'NB_view':>8} {'Total':>8}")
    print(f"  {'-'*60} {'-'*8} {'-'*8} {'-'*8}")
    for r in rows:
        h = (r[0] or '')[:57] + '...' if r[0] and len(r[0]) > 60 else (r[0] or '')
        print(f"  {h:<60} {int(r[2] or 0):>8,} {int(r[3] or 0):>8,} {int(r[1] or 0):>8,}")

    # ── 7. Check accessible databases list ────────────────────────────────
    section("7. All databases this role can see")
    try:
        cur.execute("SHOW DATABASES")
        rows = cur.fetchall()
        for r in rows:
            print(f"  {r[1]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    cur.close()
    conn.close()
    print("\n\nDiscovery complete.")


if __name__ == "__main__":
    main()
