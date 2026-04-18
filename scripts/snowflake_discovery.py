"""
snowflake_discovery.py — Schema discovery for Tarrow enrichment planning.

Explores unexplored tables in MCC_PRESENTATION.TABLEAU_REPORTING and
MCC_AMPLITUDE to understand what enrichment data is available beyond
the currently-used STORY_TRAFFIC_MAIN + DYN_STORY_META_DATA.

Usage:
    python3 scripts/snowflake_discovery.py
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
    print(f"\n{'='*70}")
    print(f"  {title}")
    print('='*70)


def show_columns(cur, db, schema, table):
    try:
        rows, _ = run(cur, f"DESCRIBE TABLE {db}.{schema}.{table}")
        print(f"\n--- {db}.{schema}.{table} ({len(rows)} columns) ---")
        for r in rows:
            print(f"  {r[0]:<45} {r[1]}")
    except Exception as e:
        print(f"\n--- {db}.{schema}.{table} --- ERROR: {e}")


def show_sample_count(cur, db, schema, table):
    try:
        rows, _ = run(cur, f"SELECT COUNT(*) FROM {db}.{schema}.{table}")
        print(f"  Row count: {rows[0][0]:,}")
    except Exception as e:
        print(f"  Row count ERROR: {e}")


def show_tables_in_schema(cur, db, schema):
    try:
        rows, _ = run(cur, f"SHOW TABLES IN {db}.{schema}")
        print(f"\n  Tables in {db}.{schema}:")
        for r in rows:
            print(f"    {r[1]}")
        return [r[1] for r in rows]
    except Exception as e:
        print(f"  ERROR listing {db}.{schema}: {e}")
        return []


def show_schemas_in_db(cur, db):
    try:
        rows, _ = run(cur, f"SHOW SCHEMAS IN DATABASE {db}")
        print(f"\n  Schemas in {db}:")
        for r in rows:
            print(f"    {r[1]}")
        return [r[1] for r in rows]
    except Exception as e:
        print(f"  ERROR listing schemas in {db}: {e}")
        return []


def main():
    print("Connecting to Snowflake...")
    conn = get_conn()
    cur = conn.cursor()
    print("Connected.\n")

    # ── 1. Unexplored tables in TABLEAU_REPORTING ─────────────────────────
    section("1. MCC_PRESENTATION.TABLEAU_REPORTING — unexplored tables")
    targets = [
        "DYN_STORY_FACTS_DETAIL_WITH_KPIS",
        "DYN_CONTENT_API_LATEST",
        "NEWSROOMPAGES",
        "CSA_CONTENT_TRACKER",
    ]
    for t in targets:
        show_columns(cur, "MCC_PRESENTATION", "TABLEAU_REPORTING", t)
        show_sample_count(cur, "MCC_PRESENTATION", "TABLEAU_REPORTING", t)

    # ── 2. MCC_AMPLITUDE — full schema exploration ─────────────────────────
    section("2. MCC_AMPLITUDE — full schema exploration")
    amp_schemas = show_schemas_in_db(cur, "MCC_AMPLITUDE")
    for schema in amp_schemas:
        tables = show_tables_in_schema(cur, "MCC_AMPLITUDE", schema)
        for t in tables[:10]:  # cap at 10 per schema to avoid flooding
            show_columns(cur, "MCC_AMPLITUDE", schema, t)
            show_sample_count(cur, "MCC_AMPLITUDE", schema, t)

    # ── 3. MCC_CLEAN — schema exploration ─────────────────────────────────
    section("3. MCC_CLEAN — schema exploration")
    clean_schemas = show_schemas_in_db(cur, "MCC_CLEAN")
    for schema in clean_schemas[:5]:
        tables = show_tables_in_schema(cur, "MCC_CLEAN", schema)
        for t in tables[:5]:
            show_columns(cur, "MCC_CLEAN", schema, t)

    # ── 4. Any syndication-specific tables anywhere ────────────────────────
    section("4. Keyword search — tables with 'SYNDIC' or 'APPLE' or 'SMARTNEWS' in name")
    for keyword in ["SYNDIC", "APPLE", "SMARTNEWS", "PLATFORM"]:
        try:
            rows, _ = run(cur, f"""
                SELECT TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME
                FROM INFORMATION_SCHEMA.TABLES
                WHERE TABLE_NAME ILIKE '%{keyword}%'
                  AND TABLE_CATALOG IN ('MCC_PRESENTATION','MCC_AMPLITUDE','MCC_CLEAN','MCC_RAW')
                ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME
            """)
            if rows:
                print(f"\n  Tables matching '%{keyword}%':")
                for r in rows:
                    print(f"    {r[0]}.{r[1]}.{r[2]}")
            else:
                print(f"\n  No tables matching '%{keyword}%'")
        except Exception as e:
            print(f"\n  Keyword '{keyword}' search ERROR: {e}")

    # ── 5. Sample from DYN_STORY_FACTS_DETAIL_WITH_KPIS ───────────────────
    section("5. Sample rows — DYN_STORY_FACTS_DETAIL_WITH_KPIS")
    try:
        rows, cols = run(cur, """
            SELECT * FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_FACTS_DETAIL_WITH_KPIS
            LIMIT 3
        """)
        print(f"  Columns: {cols}")
        for r in rows:
            print(f"  {r}")
    except Exception as e:
        print(f"  ERROR: {e}")

    cur.close()
    conn.close()
    print("\n\nDiscovery complete.")


if __name__ == "__main__":
    main()
