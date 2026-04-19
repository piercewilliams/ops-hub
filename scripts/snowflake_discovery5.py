"""
snowflake_discovery5.py — Targeted deep-dive on remaining unknowns.

Key questions:
1. Google Search Console (MCC_RAW.GOOGLE_SEARCH_CONSOLE) — schema, grain, sample rows
2. Amplitude EVENTS_412950 — what app/event types are in this table?
3. Amplitude EVENTS_669032 — what app/event types are in this table?
4. PLAINTEXT in DYN_STORY_FACTS_DETAIL_WITH_KPIS — full body or truncated? Length stats?
5. ARTICLE_ACCESS_TYPE — where does it live, what values?
6. AMP column name in STORY_TRAFFIC_MAIN — confirm exact column name for AMP pageviews
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


def section(title):
    print(f"\n{'='*70}\n  {title}\n{'='*70}")


def describe_table(cur, full_table_name):
    try:
        cur.execute(f"DESCRIBE TABLE {full_table_name}")
        rows = cur.fetchall()
        print(f"\n  {'Column':<50} {'Type'}")
        print(f"  {'-'*50} {'-'*30}")
        for r in rows:
            print(f"  {r[0]:<50} {r[1]}")
        return [r[0] for r in rows]
    except Exception as e:
        print(f"  ERROR describing {full_table_name}: {e}")
        return []


def main():
    print("Connecting to Snowflake...")
    conn = get_conn()
    cur = conn.cursor()
    print("Connected.\n")

    # ── 1. Google Search Console ──────────────────────────────────────────────
    section("1. GSC — SHOW SCHEMAS in MCC_RAW.GOOGLE_SEARCH_CONSOLE")
    try:
        cur.execute("SHOW SCHEMAS IN DATABASE MCC_RAW")
        schemas = [r[1] for r in cur.fetchall()]
        gsc_schemas = [s for s in schemas if 'SEARCH' in s.upper() or 'GOOGLE' in s.upper()]
        print(f"\n  All MCC_RAW schemas: {schemas}")
        print(f"  GSC-related: {gsc_schemas}")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("1b. GSC — SHOW TABLES in GOOGLE_SEARCH_CONSOLE schema")
    try:
        cur.execute("SHOW TABLES IN SCHEMA MCC_RAW.GOOGLE_SEARCH_CONSOLE")
        rows = cur.fetchall()
        for r in rows:
            print(f"  {r[1]:<60} rows={r[5]}")
    except Exception as e:
        print(f"  ERROR (trying alternate schema names...): {e}")
        for schema_guess in ['GOOGLE_SEARCH_CONSOLE', 'GSC', 'SEARCH_CONSOLE']:
            try:
                cur.execute(f"SHOW TABLES IN SCHEMA MCC_RAW.{schema_guess}")
                rows = cur.fetchall()
                print(f"  Found in MCC_RAW.{schema_guess}:")
                for r in rows:
                    print(f"    {r[1]:<60} rows={r[5]}")
                break
            except Exception as e2:
                print(f"    MCC_RAW.{schema_guess}: {e2}")

    section("1c. GSC — SEARCH_CONSOLE_PUBLISHED_STORIES schema")
    cols_gsc = describe_table(cur, "MCC_RAW.GOOGLE_SEARCH_CONSOLE.SEARCH_CONSOLE_PUBLISHED_STORIES")

    if cols_gsc:
        section("1d. GSC — row count + date range")
        try:
            # Find date column
            date_cols = [c for c in cols_gsc if 'DATE' in c.upper() or 'TIME' in c.upper()]
            if date_cols:
                dc = date_cols[0]
                cur.execute(f"""
                    SELECT COUNT(*), MIN({dc}), MAX({dc})
                    FROM MCC_RAW.GOOGLE_SEARCH_CONSOLE.SEARCH_CONSOLE_PUBLISHED_STORIES
                """)
                r = cur.fetchone()
                print(f"\n  Rows: {r[0]:,}   {dc}: {r[1]} → {r[2]}")
            else:
                cur.execute("SELECT COUNT(*) FROM MCC_RAW.GOOGLE_SEARCH_CONSOLE.SEARCH_CONSOLE_PUBLISHED_STORIES")
                print(f"\n  Rows: {cur.fetchone()[0]:,}")
        except Exception as e:
            print(f"  ERROR: {e}")

        section("1e. GSC — 5 sample rows (non-null values only)")
        try:
            cur.execute("""
                SELECT * FROM MCC_RAW.GOOGLE_SEARCH_CONSOLE.SEARCH_CONSOLE_PUBLISHED_STORIES
                LIMIT 5
            """)
            rows = cur.fetchall()
            col_names = [d[0] for d in cur.description]
            for i, row in enumerate(rows):
                print(f"\n  --- Row {i+1} ---")
                for col, val in zip(col_names, row):
                    if val is not None and str(val).strip():
                        print(f"  {col}: {str(val)[:120]}")
        except Exception as e:
            print(f"  ERROR: {e}")

        section("1f. GSC — distinct dimension values (site, country, device, query sample)")
        try:
            # Check for site/property, country, device columns
            for col_check in ['SITE_URL', 'PROPERTY', 'COUNTRY', 'DEVICE', 'SEARCH_TYPE']:
                if col_check in [c.upper() for c in cols_gsc]:
                    cur.execute(f"""
                        SELECT {col_check}, COUNT(*) AS cnt
                        FROM MCC_RAW.GOOGLE_SEARCH_CONSOLE.SEARCH_CONSOLE_PUBLISHED_STORIES
                        GROUP BY {col_check} ORDER BY cnt DESC LIMIT 10
                    """)
                    rows = cur.fetchall()
                    print(f"\n  {col_check} distinct values:")
                    for r in rows:
                        print(f"    {str(r[0]):<60} {r[1]:>10,}")
        except Exception as e:
            print(f"  ERROR: {e}")

        section("1g. GSC — top queries by clicks (if QUERY and CLICKS columns exist)")
        try:
            cols_upper = [c.upper() for c in cols_gsc]
            if 'QUERY' in cols_upper and 'CLICKS' in cols_upper:
                cur.execute("""
                    SELECT QUERY, SUM(CLICKS) AS total_clicks, SUM(IMPRESSIONS) AS total_impressions,
                           AVG(POSITION) AS avg_position
                    FROM MCC_RAW.GOOGLE_SEARCH_CONSOLE.SEARCH_CONSOLE_PUBLISHED_STORIES
                    GROUP BY QUERY ORDER BY total_clicks DESC LIMIT 20
                """)
                rows = cur.fetchall()
                print(f"\n  {'Query':<60} {'Clicks':>10} {'Impr':>10} {'Pos':>6}")
                print(f"  {'-'*60} {'-'*10} {'-'*10} {'-'*6}")
                for r in rows:
                    print(f"  {str(r[0]):<60} {int(r[1] or 0):>10,} {int(r[2] or 0):>10,} {float(r[3] or 0):>6.1f}")
            else:
                print(f"  No QUERY/CLICKS columns. Available: {cols_gsc[:15]}")
        except Exception as e:
            print(f"  ERROR: {e}")

    # ── 2. Amplitude EVENTS_412950 ────────────────────────────────────────────
    section("2. Amplitude EVENTS_412950 — event type distribution (MCC_AMPLITUDE.AMPLITUDE)")
    try:
        cur.execute("""
            SELECT EVENT_TYPE, COUNT(*) AS cnt
            FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412950
            GROUP BY EVENT_TYPE ORDER BY cnt DESC
            LIMIT 30
        """)
        rows = cur.fetchall()
        print(f"\n  {'Event Type':<60} {'Count':>12}")
        print(f"  {'-'*60} {'-'*12}")
        for r in rows:
            print(f"  {str(r[0]):<60} {int(r[1]):>12,}")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("2b. EVENTS_412950 — row count + date range")
    try:
        cur.execute("""
            SELECT COUNT(*), MIN(EVENT_TIME), MAX(EVENT_TIME)
            FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412950
        """)
        r = cur.fetchone()
        print(f"\n  Rows: {r[0]:,}   Event time: {r[1]} → {r[2]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("2c. EVENTS_412950 — sample EVENT_PROPERTIES for top event type")
    try:
        cur.execute("""
            SELECT TOP 1 EVENT_TYPE FROM (
                SELECT EVENT_TYPE, COUNT(*) cnt
                FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412950
                GROUP BY EVENT_TYPE ORDER BY cnt DESC
            )
        """)
        top_event = cur.fetchone()
        if top_event:
            top_type = top_event[0]
            cur.execute(f"""
                SELECT EVENT_PROPERTIES, USER_PROPERTIES
                FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412950
                WHERE EVENT_TYPE = '{top_type}'
                LIMIT 3
            """)
            rows = cur.fetchall()
            print(f"\n  Top event: {top_type}")
            for i, r in enumerate(rows):
                print(f"\n  --- Sample {i+1} ---")
                print(f"  EVENT_PROPERTIES: {str(r[0])[:300]}")
                print(f"  USER_PROPERTIES:  {str(r[1])[:200]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 3. Amplitude EVENTS_669032 ────────────────────────────────────────────
    section("3. Amplitude EVENTS_669032 — event type distribution (MCC_AMPLITUDE.AMPLITUDE)")
    try:
        cur.execute("""
            SELECT EVENT_TYPE, COUNT(*) AS cnt
            FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_669032
            GROUP BY EVENT_TYPE ORDER BY cnt DESC
            LIMIT 30
        """)
        rows = cur.fetchall()
        print(f"\n  {'Event Type':<60} {'Count':>12}")
        print(f"  {'-'*60} {'-'*12}")
        for r in rows:
            print(f"  {str(r[0]):<60} {int(r[1]):>12,}")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("3b. EVENTS_669032 — row count + date range")
    try:
        cur.execute("""
            SELECT COUNT(*), MIN(EVENT_TIME), MAX(EVENT_TIME)
            FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_669032
        """)
        r = cur.fetchone()
        print(f"\n  Rows: {r[0]:,}   Event time: {r[1]} → {r[2]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("3c. EVENTS_669032 — sample EVENT_PROPERTIES for top event type")
    try:
        cur.execute("""
            SELECT TOP 1 EVENT_TYPE FROM (
                SELECT EVENT_TYPE, COUNT(*) cnt
                FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_669032
                GROUP BY EVENT_TYPE ORDER BY cnt DESC
            )
        """)
        top_event = cur.fetchone()
        if top_event:
            top_type = top_event[0]
            cur.execute(f"""
                SELECT EVENT_PROPERTIES, USER_PROPERTIES
                FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_669032
                WHERE EVENT_TYPE = '{top_type}'
                LIMIT 3
            """)
            rows = cur.fetchall()
            print(f"\n  Top event: {top_type}")
            for i, r in enumerate(rows):
                print(f"\n  --- Sample {i+1} ---")
                print(f"  EVENT_PROPERTIES: {str(r[0])[:300]}")
                print(f"  USER_PROPERTIES:  {str(r[1])[:200]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 4. PLAINTEXT in DYN_STORY_FACTS_DETAIL_WITH_KPIS ─────────────────────
    section("4. PLAINTEXT — length stats in DYN_STORY_FACTS_DETAIL_WITH_KPIS")
    try:
        cur.execute("""
            SELECT
                COUNT(*) AS total_rows,
                COUNT(PLAINTEXT) AS non_null_rows,
                AVG(LENGTH(PLAINTEXT)) AS avg_len,
                MIN(LENGTH(PLAINTEXT)) AS min_len,
                MAX(LENGTH(PLAINTEXT)) AS max_len,
                PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY LENGTH(PLAINTEXT)) AS median_len,
                PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY LENGTH(PLAINTEXT)) AS p90_len
            FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_FACTS_DETAIL_WITH_KPIS
            WHERE PLAINTEXT IS NOT NULL
        """)
        r = cur.fetchone()
        print(f"\n  Total rows:    {r[0]:,}")
        print(f"  Non-null:      {r[1]:,}")
        print(f"  Avg length:    {int(r[2] or 0):,} chars")
        print(f"  Min length:    {int(r[3] or 0):,} chars")
        print(f"  Max length:    {int(r[4] or 0):,} chars")
        print(f"  Median length: {int(r[5] or 0):,} chars")
        print(f"  P90 length:    {int(r[6] or 0):,} chars")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("4b. PLAINTEXT — 3 sample articles (first 500 chars of each)")
    try:
        cur.execute("""
            SELECT HEADLINE, BYLINE, LENGTH(PLAINTEXT) AS pt_len, LEFT(PLAINTEXT, 500) AS pt_sample
            FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_FACTS_DETAIL_WITH_KPIS
            WHERE PLAINTEXT IS NOT NULL AND LENGTH(PLAINTEXT) > 1000
            LIMIT 3
        """)
        rows = cur.fetchall()
        col_names = [d[0] for d in cur.description]
        for i, row in enumerate(rows):
            print(f"\n  --- Article {i+1} ---")
            for col, val in zip(col_names, row):
                print(f"  {col}: {str(val)[:300]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 5. ARTICLE_ACCESS_TYPE ────────────────────────────────────────────────
    section("5. ARTICLE_ACCESS_TYPE — find where this column lives")
    try:
        cur.execute("""
            SELECT TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, DATA_TYPE
            FROM MCC_PRESENTATION.INFORMATION_SCHEMA.COLUMNS
            WHERE LOWER(COLUMN_NAME) LIKE '%access%'
              AND (LOWER(COLUMN_NAME) LIKE '%type%' OR LOWER(COLUMN_NAME) LIKE '%access%')
            ORDER BY TABLE_NAME, COLUMN_NAME
        """)
        rows = cur.fetchall()
        if rows:
            for r in rows:
                print(f"  {r[0]}.{r[1]}.{r[2]}.{r[3]:<40} {r[4]}")
        else:
            print("  No ACCESS-related columns in MCC_PRESENTATION")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("5b. ARTICLE_ACCESS_TYPE — check in DYN_STORY_META_DATA")
    try:
        cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA")
        rows = cur.fetchall()
        access_cols = [r for r in rows if 'ACCESS' in r[0].upper() or 'PAYWALL' in r[0].upper() or 'SUBSCRIBER' in r[0].upper()]
        print(f"\n  Access/paywall columns in DYN_STORY_META_DATA:")
        if access_cols:
            for r in access_cols:
                print(f"  {r[0]:<50} {r[1]}")
        else:
            print("  None found — checking DYN_CONTENT_API_LATEST...")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("5c. ARTICLE_ACCESS_TYPE — check in DYN_CONTENT_API_LATEST")
    try:
        cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST")
        rows = cur.fetchall()
        access_cols = [r for r in rows if 'ACCESS' in r[0].upper() or 'PAYWALL' in r[0].upper() or 'PREMIUM' in r[0].upper() or 'FREE' in r[0].upper()]
        if access_cols:
            print(f"\n  Access/paywall columns in DYN_CONTENT_API_LATEST:")
            for r in access_cols:
                print(f"  {r[0]:<50} {r[1]}")
            # Sample values
            for col_r in access_cols[:2]:
                col = col_r[0]
                try:
                    cur.execute(f"""
                        SELECT {col}, COUNT(*) AS cnt
                        FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST
                        GROUP BY {col} ORDER BY cnt DESC LIMIT 10
                    """)
                    vals = cur.fetchall()
                    print(f"\n  {col} value distribution:")
                    for v in vals:
                        print(f"    {str(v[0]):<40} {int(v[1]):>10,}")
                except Exception as e2:
                    print(f"  ERROR sampling {col}: {e2}")
        else:
            print("  No ACCESS/PAYWALL columns in DYN_CONTENT_API_LATEST")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 6. AMP column name in STORY_TRAFFIC_MAIN ─────────────────────────────
    section("6. AMP columns in STORY_TRAFFIC_MAIN — exact names + totals")
    try:
        cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN")
        all_cols = [r[0] for r in cur.fetchall()]
        amp_cols = [c for c in all_cols if 'AMP' in c.upper()]
        print(f"\n  AMP-related columns: {amp_cols}")

        if amp_cols:
            sums_sql = ", ".join([f"SUM({c}) AS {c}" for c in amp_cols])
            cur.execute(f"SELECT {sums_sql} FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN")
            row = cur.fetchone()
            col_names = [d[0] for d in cur.description]
            print(f"\n  {'Column':<50} {'Total':>15}")
            print(f"  {'-'*50} {'-'*15}")
            for col, val in zip(col_names, row):
                print(f"  {col:<50} {int(val or 0):>15,}")
    except Exception as e:
        print(f"  ERROR: {e}")

    section("6b. All STORY_TRAFFIC_MAIN columns containing platform names")
    try:
        cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN")
        all_cols = [r[0] for r in cur.fetchall()]
        platform_keys = ['AMP', 'APPLE', 'SMART', 'NEWSBREAK', 'NEWS_BREAK', 'YAHOO',
                         'MSN', 'SOCIAL', 'SEARCH', 'DIRECT', 'SUBSCRIBER', 'EMAIL',
                         'NEWSLETTER', 'FLIPBOARD', 'GOOGLE', 'PLATFORM']
        platform_cols = [c for c in all_cols if any(k in c.upper() for k in platform_keys)]
        print(f"\n  Platform-related columns ({len(platform_cols)}):")
        for c in platform_cols:
            print(f"    {c}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 7. MCC_CLEAN — all schemas/tables survey ─────────────────────────────
    section("7. MCC_CLEAN — all schemas survey")
    try:
        cur.execute("SHOW SCHEMAS IN DATABASE MCC_CLEAN")
        schemas = [r[1] for r in cur.fetchall()]
        print(f"\n  Schemas in MCC_CLEAN: {schemas}")
        for schema in schemas:
            try:
                cur.execute(f"SHOW TABLES IN SCHEMA MCC_CLEAN.{schema}")
                tables = cur.fetchall()
                print(f"\n  MCC_CLEAN.{schema}:")
                for t in tables:
                    print(f"    {t[1]:<60} rows={t[5]}")
            except Exception as e2:
                print(f"    ERROR listing MCC_CLEAN.{schema}: {e2}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 8. MCC_RAW — all schemas survey ──────────────────────────────────────
    section("8. MCC_RAW — all schemas survey")
    try:
        cur.execute("SHOW SCHEMAS IN DATABASE MCC_RAW")
        schemas = [r[1] for r in cur.fetchall()]
        print(f"\n  Schemas in MCC_RAW: {schemas}")
        for schema in schemas:
            try:
                cur.execute(f"SHOW TABLES IN SCHEMA MCC_RAW.{schema}")
                tables = cur.fetchall()
                if tables:
                    print(f"\n  MCC_RAW.{schema}:")
                    for t in tables:
                        print(f"    {t[1]:<60} rows={t[5]}")
            except Exception as e2:
                print(f"    MCC_RAW.{schema}: {e2}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 9. CONTENT_SCALING_AGENT — current state ──────────────────────────────
    section("9. MCC_PRESENTATION.CONTENT_SCALING_AGENT — current tables")
    try:
        cur.execute("SHOW TABLES IN SCHEMA MCC_PRESENTATION.CONTENT_SCALING_AGENT")
        tables = cur.fetchall()
        print(f"\n  {'Table':<60} {'Rows':>12}")
        print(f"  {'-'*60} {'-'*12}")
        for t in tables:
            print(f"  {t[1]:<60} {str(t[5] or '?'):>12}")
    except Exception as e:
        print(f"  ERROR: {e}")

    cur.close()
    conn.close()
    print("\n\nDiscovery 5 complete.")


if __name__ == "__main__":
    main()
