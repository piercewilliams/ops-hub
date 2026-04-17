"""
snowflake_discovery3.py — Vector column audit + Cortex availability check.

Key questions:
1. What columns exist in DYN_CONTENT_API_LATEST? Is there a title/headline vector?
2. What is FULL_TEXT_VECTOR — is there any comment/metadata about truncation?
3. Does our role have access to SNOWFLAKE.CORTEX embed functions?
4. What column names does CUE_CONTENT_VECTORS have (to confirm CONTENTID type)?
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


def main():
    print("Connecting to Snowflake...")
    conn = get_conn()
    cur = conn.cursor()
    print("Connected.\n")

    # ── 1. Full column list for DYN_CONTENT_API_LATEST ───────────────────────
    section("1. DYN_CONTENT_API_LATEST — all columns + data types")
    cur.execute("DESCRIBE TABLE MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST")
    rows = cur.fetchall()
    print(f"\n  {'Column':<50} {'Type':<30} {'Comment'}")
    print(f"  {'-'*50} {'-'*30} {'-'*40}")
    for r in rows:
        col_name    = r[0]
        col_type    = r[1]
        col_comment = r[8] if len(r) > 8 else ""
        print(f"  {col_name:<50} {col_type:<30} {col_comment or ''}")
        # Highlight vector columns
        if "vector" in col_type.lower() or "vector" in col_name.lower():
            print(f"    *** VECTOR COLUMN: {col_name} — {col_type} ***")

    # ── 2. TAGS_IAB sample — alternative to CUE_CONTENT_VECTORS ─────────────
    section("2. DYN_CONTENT_API_LATEST — TAGS_IAB sample values")
    cur.execute("""
        SELECT SOURCE_URL, TAGS_IAB
        FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST
        WHERE TAGS_IAB IS NOT NULL AND ARRAY_SIZE(TAGS_IAB) > 0
        LIMIT 10
    """)
    rows = cur.fetchall()
    for r in rows:
        print(f"  URL: {str(r[0])[:70]}")
        print(f"  TAGS_IAB: {r[1]}\n")

    # ── 3. Cortex embed function availability ────────────────────────────────
    section("3. Snowflake Cortex — can we call EMBED_TEXT_768?")
    try:
        cur.execute("""
            SELECT SNOWFLAKE.CORTEX.EMBED_TEXT_768(
                'snowflake-arctic-embed-m',
                'test headline for embedding'
            )
        """)
        result = cur.fetchone()
        vec_type = type(result[0]).__name__
        print(f"\n  SUCCESS — Cortex embed returned type: {vec_type}")
        print(f"  (headline embeddings can be computed on-the-fly via Cortex)")
    except Exception as e:
        print(f"\n  NOT AVAILABLE: {e}")
        print(f"  (will need pre-computed headline vector or alternative approach)")

    # ── 4. DYN_CONTENT_API_LATEST — sample a row to see FULL_TEXT_VECTOR dim ─
    section("4. DYN_CONTENT_API_LATEST — sample FULL_TEXT_VECTOR dimension check")
    try:
        cur.execute("""
            SELECT
                SOURCE_URL,
                VECTOR_DIMENSION(FULL_TEXT_VECTOR) AS vec_dim
            FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST
            WHERE FULL_TEXT_VECTOR IS NOT NULL
            LIMIT 5
        """)
        rows = cur.fetchall()
        for r in rows:
            print(f"  URL: {str(r[0])[:80]}  dim={r[1]}")
    except Exception as e:
        print(f"  ERROR: {e}")

    # ── 5. Check for any truncation signal: WORD_COUNT distribution ──────────
    section("5. Word count distribution — how often do articles exceed ~400 words?")
    cur.execute("""
        SELECT
            CASE
                WHEN WORD_COUNT <= 200  THEN '0-200'
                WHEN WORD_COUNT <= 400  THEN '201-400'
                WHEN WORD_COUNT <= 600  THEN '401-600'
                WHEN WORD_COUNT <= 800  THEN '601-800'
                WHEN WORD_COUNT <= 1200 THEN '801-1200'
                ELSE '1200+'
            END AS bucket,
            COUNT(1) AS article_count
        FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_CONTENT_API_LATEST
        WHERE WORD_COUNT IS NOT NULL AND WORD_COUNT > 0
          AND FULL_TEXT_VECTOR IS NOT NULL
        GROUP BY bucket
        ORDER BY MIN(WORD_COUNT)
    """)
    rows = cur.fetchall()
    total = sum(r[1] for r in rows)
    print(f"\n  {'Bucket':<12} {'Count':>8}  {'%':>6}")
    print(f"  {'-'*12} {'-'*8}  {'-'*6}")
    for r in rows:
        pct = 100 * r[1] / total if total else 0
        print(f"  {r[0]:<12} {r[1]:>8,}  {pct:>5.1f}%")
    print(f"\n  Note: BERT-class models truncate at ~512 tokens (~350-400 words).")
    print(f"  Articles above ~400 words may have truncated vectors.")

    cur.close()
    conn.close()
    print("\n\nDiscovery complete.")


if __name__ == "__main__":
    main()
