"""
snowflake_discovery4.py — Unexplored data sources sweep.

Key questions:
1. What is PUBLISHER_TRADEDESK_DATA — schema, grain, sample rows?
2. Is there any MSN data anywhere in Snowflake (columns, tables, event types)?
3. What's in MCC_CLEAN beyond STORYDATA?
4. What's in MCC_RAW beyond GROWTH_AND_STRATEGY?
5. Any other platform/partner/social/revenue/distribution tables we're missing?
6. What other tables in MCC_PRESENTATION.TABLEAU_REPORTING haven't we looked at?
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
        print(f"\n  {'Column':<45} {'Type'}")
        print(f"  {'-'*45} {'-'*30}")
        for r in rows:
            print(f"  {r[0]:<45} {r[1]}")
        return [r[0] for r in rows]
    except Exception as e:
        print(f"  ERROR describing {full_table_name}: {e}")
        return []


def show_tables(cur, db, schema):
    try:
        cur.execute(f"SHOW TABLES IN SCHEMA {db}.{schema}")
        rows = cur.fetchall()
        return [(r[1], r[5]) for r in rows]  # (table_name, row_count)
    except Exception as e:
        print(f"  ERROR listing {db}.{schema}: {e}")
        return []


def show_schemas(cur, db):
    try:
        cur.execute(f"SHOW SCHEMAS IN DATABASE {db}")
        return [r[1] for r in cur.fetchall()]
    except Exception as e:
        print(f"  ERROR listing schemas in {db}: {e}")
        return []


def main():
    print("Connecting to Snowflake...")
    conn = get_conn()
    cur = conn.cursor()
    print("Connected.\n")

    # ── 1. PUBLISHER_TRADEDESK_DATA — full schema + sample ───────────────────
    section("1. PUBLISHER_TRADEDESK_DATA — schema")
    cols = describe_table(cur, "MCC_PRESENTATION.TABLEAU_REPORTING.PUBLISHER_TRADEDESK_DATA")

    if cols:
        section("1b. PUBLISHER_TRADEDESK_DATA — row count + date range")
        try:
            cur.execute("""
                SELECT COUNT(*), MIN(_LOADED_AT), MAX(_LOADED_AT)
                FROM MCC_PRESENTATION.TABLEAU_REPORTING.PUBLISHER_TRADEDESK_DATA
            """)
            r = cur.fetchone()
            print(f"\n  Rows: {r[0]:,}   Loaded: {r[1]} → {r[2]}")
        except Exception as e:
            # Try other date columns
            try:
                cur.execute(f"""
                    SELECT COUNT(*) FROM MCC_PRESENTATION.TABLEAU_REPORTING.PUBLISHER_TRADEDESK_DATA
                """)
                r = cur.fetchone()
                print(f"\n  Rows: {r[0]:,}")
            except Exception as e2:
                print(f"  ERROR: {e2}")

        section("1c. PUBLISHER_TRADEDESK_DATA — 5 sample rows")
        try:
            cur.execute("""
                SELECT * FROM MCC_PRESENTATION.TABLEAU_REPORTING.PUBLISHER_TRADEDESK_DATA
                LIMIT 5
            """)
            rows = cur.fetchall()
            col_names = [d[0] for d in cur.description]
            for row in rows:
                print()
                for col, val in zip(col_names, row):
                    if val is not None and str(val).strip():
                        print(f"  {col}: {str(val)[:120]}")
        except Exception as e:
            print(f"  ERROR: {e}")

    # ── 1d. PUBLISHER_TRADEDESK_DATA_STG — schema only ───────────────────────
    section("1d. PUBLISHER_TRADEDESK_DATA_STG — schema + row count")
    cols_stg = describe_table(cur, "MCC_PRESENTATION.TABLEAU_REPORTING.PUBLISHER_TRADEDESK_DATA_STG")
    if cols_stg:
        try:
            cur.execute("SELECT COUNT(*) FROM MCC_PRESENTATION.TABLEAU_REPORTING.PUBLISHER_TRADEDESK_DATA_STG")
            print(f"\n  Rows: {cur.fetchone()[0]:,}")
        except Exception as e:
            print(f"  ERROR: {e}")

    # ── 2. MSN search — event types in Amplitude ─────────────────────────────
    section("2. MSN search — Amplitude event types containing 'msn'")
    try:
        cur.execute("""
            SELECT EVENT_TYPE, COUNT(*) AS cnt
            FROM MCC_AMPLITUDE.PUBLIC.EVENTS_412949
            WHERE LOWER(EVENT_TYPE) LIKE '%msn%'
            GROUP BY EVENT_TYPE ORDER BY cnt DESC
        """)
        rows = cur.fetchall()
        if rows:
            for r in rows:
                print(f"  {r[0]:<60} {r[1]:>12,}")
        else:
            print("  No Amplitude event types matching '%msn%'")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 2b. MSN search — any column named MSN across TABLEAU_REPORTING ───────
    section("2b. MSN search — columns named 'msn' across TABLEAU_REPORTING")
    try:
        cur.execute("""
            SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE
            FROM MCC_PRESENTATION.INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = 'TABLEAU_REPORTING'
              AND LOWER(COLUMN_NAME) LIKE '%msn%'
            ORDER BY TABLE_NAME, COLUMN_NAME
        """)
        rows = cur.fetchall()
        if rows:
            for r in rows:
                print(f"  {r[0]:<50} {r[1]:<40} {r[2]}")
        else:
            print("  No columns named '%msn%' in TABLEAU_REPORTING")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 2c. MSN in STORY_TRAFFIC_MAIN column names ───────────────────────────
    section("2c. All STORY_TRAFFIC_MAIN columns — looking for MSN + any others we missed")
    try:
        cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN")
        rows = cur.fetchall()
        print(f"\n  Total columns: {len(rows)}")
        for r in rows:
            print(f"  {r[0]:<50} {r[1]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 3. Full MCC_PRESENTATION.TABLEAU_REPORTING table list ────────────────
    section("3. All tables in MCC_PRESENTATION.TABLEAU_REPORTING")
    tables = show_tables(cur, "MCC_PRESENTATION", "TABLEAU_REPORTING")
    print(f"\n  {'Table':<60} {'Rows':>12}")
    print(f"  {'-'*60} {'-'*12}")
    for name, rows in sorted(tables):
        print(f"  {name:<60} {str(rows or '?'):>12}")

    # ── 3b. Flag interesting-looking tables we haven't examined ──────────────
    section("3b. Tables with 'partner', 'social', 'revenue', 'distribut', 'referral', 'search', 'email', 'newsletter' in name")
    keywords = ['partner', 'social', 'revenue', 'distribut', 'referral',
                'search', 'email', 'newsletter', 'msn', 'yahoo', 'apple',
                'smart', 'news_break', 'newsbreak', 'platform', 'syndic',
                'subscriber', 'subscription', 'paywall', 'seo']
    matched = [(name, rows) for name, rows in tables
               if any(kw in name.lower() for kw in keywords)]
    if matched:
        for name, rows in matched:
            print(f"  {name:<60} {str(rows or '?'):>12}")
    else:
        print("  None found beyond what we've already seen.")

    # ── 4. MCC_CLEAN schemas + tables ────────────────────────────────────────
    section("4. MCC_CLEAN — all schemas")
    schemas = show_schemas(cur, "MCC_CLEAN")
    for schema in schemas:
        print(f"\n  Schema: MCC_CLEAN.{schema}")
        tables_here = show_tables(cur, "MCC_CLEAN", schema)
        for name, rows in sorted(tables_here):
            print(f"    {name:<55} {str(rows or '?'):>12}")

    # ── 4b. MCC_CLEAN.STORYDATA full column list ──────────────────────────────
    section("4b. MCC_CLEAN — STORYDATA full column list (all platforms)")
    try:
        cur.execute("DESCRIBE TABLE MCC_CLEAN.PUBLIC.STORYDATA")
        rows = cur.fetchall()
        print(f"\n  Total columns: {len(rows)}")
        for r in rows:
            flag = " *** PLATFORM ***" if any(x in r[0].lower() for x in
                   ['apple', 'smart', 'yahoo', 'msn', 'newsbreak', 'partner',
                    'syndic', 'social', 'amp', 'google', 'flipboard']) else ""
            print(f"  {r[0]:<50} {r[1]}{flag}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 5. MCC_RAW schemas + tables ──────────────────────────────────────────
    section("5. MCC_RAW — all schemas and tables")
    schemas_raw = show_schemas(cur, "MCC_RAW")
    for schema in schemas_raw:
        print(f"\n  Schema: MCC_RAW.{schema}")
        tables_here = show_tables(cur, "MCC_RAW", schema)
        for name, rows in sorted(tables_here):
            print(f"    {name:<55} {str(rows or '?'):>12}")

    # ── 6. MCC_AMPLITUDE — all schemas + tables ───────────────────────────────
    section("6. MCC_AMPLITUDE — all schemas and tables")
    schemas_amp = show_schemas(cur, "MCC_AMPLITUDE")
    for schema in schemas_amp:
        print(f"\n  Schema: MCC_AMPLITUDE.{schema}")
        tables_here = show_tables(cur, "MCC_AMPLITUDE", schema)
        for name, rows in sorted(tables_here):
            print(f"    {name:<55} {str(rows or '?'):>12}")

    # ── 7. STORY_TRAFFIC_MAIN — non-zero platform column totals ──────────────
    section("7. STORY_TRAFFIC_MAIN — sum of every traffic column (find non-zero platforms)")
    try:
        cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN")
        all_cols = [r[0] for r in cur.fetchall()]
        # Focus on PV/traffic columns
        pv_cols = [c for c in all_cols if any(x in c.upper() for x in
                   ['PAGEVIEW', 'VISIT', 'SESSION', 'CLICK', 'VIEW', 'PV'])]
        if pv_cols:
            sums_sql = ", ".join([f"SUM({c}) AS {c}" for c in pv_cols])
            cur.execute(f"SELECT {sums_sql} FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN")
            row = cur.fetchone()
            col_names = [d[0] for d in cur.description]
            print(f"\n  {'Column':<50} {'Total':>15}")
            print(f"  {'-'*50} {'-'*15}")
            for col, val in sorted(zip(col_names, row), key=lambda x: -(x[1] or 0)):
                if val and val > 0:
                    print(f"  {col:<50} {int(val):>15,}")
                else:
                    print(f"  {col:<50} {'(zero/null)':>15}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 8. DYN_STORY_FACTS_DETAIL_WITH_KPIS — full column list ───────────────
    section("8. DYN_STORY_FACTS_DETAIL_WITH_KPIS — all columns (we used this in discovery2)")
    try:
        cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_FACTS_DETAIL_WITH_KPIS")
        rows = cur.fetchall()
        print(f"\n  Total columns: {len(rows)}")
        for r in rows:
            flag = " *** PLATFORM ***" if any(x in r[0].lower() for x in
                   ['apple', 'smart', 'yahoo', 'msn', 'newsbreak', 'partner',
                    'syndic', 'social', 'flipboard', 'google', 'amp']) else ""
            print(f"  {r[0]:<50} {r[1]}{flag}")
    except Exception as e:
        print(f"  ERROR: {e}")

    cur.close()
    conn.close()
    print("\n\nDiscovery complete.")


if __name__ == "__main__":
    main()
