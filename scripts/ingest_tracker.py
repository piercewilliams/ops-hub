"""
ingest_tracker.py — Load Sara Vallone's content tracker into Snowflake.

Reads the 26 editorial metadata columns from the Google Sheet and writes them
to MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER.  Full replace on every run
(TRUNCATE + INSERT) — the sheet is the source of truth.

Authentication:
    Snowflake: RSA key-pair (headless — no browser popup)
    Google Sheets: service account at ~/.credentials/pierce-tools.json

Env vars (optional):
    GOOGLE_SERVICE_ACCOUNT_FILE  path to service account JSON
    SNOWFLAKE_PRIVATE_KEY_PATH   path to RSA private key (.p8 file)

Usage:
    python3 scripts/ingest_tracker.py
"""

import os
from pathlib import Path

import gspread
from google.oauth2.service_account import Credentials
from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
)
import snowflake.connector


# ── Config ────────────────────────────────────────────────────────────────────

SHEET_ID    = "14_0eK46g3IEj7L_yp9FIdWwvnuYI5f-vAuP7DDhSPg8"
SA_FILE     = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE",
                        str(Path.home() / ".credentials" / "pierce-tools.json"))

SF_ACCOUNT  = "wvb49304-mcclatchy_eval"
SF_USER     = "GROWTH_AND_STRATEGY_SERVICE_USER"
SF_KEY_PATH = os.getenv("SNOWFLAKE_PRIVATE_KEY_PATH",
                        str(Path.home() / ".credentials" / "growth_strategy_service_rsa_key.p8"))
SF_DATABASE = "MCC_RAW"
SF_SCHEMA   = "GROWTH_AND_STRATEGY"
SF_TABLE    = "NATIONAL_CONTENT_TRACKER"

BATCH_SIZE  = 500

# Safety: abort rather than truncate if the sheet appears malformed. Sara's
# tracker has ~1,900 rows; a partial read that returned <500 is almost
# certainly an API issue, not a legitimate content drop.
MIN_SAFE_ROWS = 500

# Columns required for every downstream consumer (model_tracker, enrich_tracker,
# data-headlines generate_site). If any is missing from the sheet, abort without
# truncating — a silent NULL would corrupt every downstream aggregate.
REQUIRED_SHEET_COLUMNS = {
    "Asset_ID", "Author", "Published URL/Link", "Headline", "Content_Type",
}

# Sheet header → Snowflake column name.
# Exact matches tried first; falls back to case-insensitive strip.
COLUMN_MAP = {
    "Asset_ID":                   "ASSET_ID",
    "Brand Type":                 "BRAND_TYPE",
    "Content_Type":               "CONTENT_TYPE",
    "Parent_ID":                  "PARENT_ID",
    "Draft URL/Link":             "DRAFT_URL",
    "Published URL/Link":         "PUBLISHED_URL",
    "Author":                     "AUTHOR",
    "Syndication platform":       "SYNDICATION_PLATFORM",
    "Headline":                   "HEADLINE",
    "Week #":                     "WEEK_NUM",
    "Week Of":                    "WEEK_OF",
    "Creation Date Month":        "CREATION_DATE_MONTH",
    "Pub Date Month":             "PUB_DATE_MONTH",
    "Created Date":               "CREATED_DATE",
    "Publication Date":           "PUBLICATION_DATE",
    "Vertical":                   "VERTICAL",
    "Word Count":                 "WORD_COUNT",
    "Primary Keywords":           "PRIMARY_KEYWORDS",
    "Meta Description":           "META_DESCRIPTION",
    "Personas (Target Audience)": "TARGET_AUDIENCE",
    "Draft Doc":                  "DRAFT_DOC",
    "Peer Reviewer":              "PEER_REVIEWER",
    "UPDATE?":                    "UPDATE_FLAG",
    "Test category? Yes":         "TEST_CATEGORY",
    "Reuters photo Use? Yes":     "REUTERS_PHOTO",
    "Reuters Link Used? Yes":     "REUTERS_LINK",
}

SF_COLS = list(COLUMN_MAP.values())  # ordered list of Snowflake column names

CREATE_TABLE_SQL = f"""
CREATE TABLE IF NOT EXISTS {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE} (
    ASSET_ID              VARCHAR,
    BRAND_TYPE            VARCHAR,
    CONTENT_TYPE          VARCHAR,
    PARENT_ID             VARCHAR,
    DRAFT_URL             VARCHAR,
    PUBLISHED_URL         VARCHAR,
    AUTHOR                VARCHAR,
    SYNDICATION_PLATFORM  VARCHAR,
    HEADLINE              VARCHAR,
    WEEK_NUM              VARCHAR,
    WEEK_OF               VARCHAR,
    CREATION_DATE_MONTH   VARCHAR,
    PUB_DATE_MONTH        VARCHAR,
    CREATED_DATE          VARCHAR,
    PUBLICATION_DATE      VARCHAR,
    VERTICAL              VARCHAR,
    WORD_COUNT            VARCHAR,
    PRIMARY_KEYWORDS      VARCHAR,
    META_DESCRIPTION      VARCHAR,
    TARGET_AUDIENCE       VARCHAR,
    DRAFT_DOC             VARCHAR,
    PEER_REVIEWER         VARCHAR,
    UPDATE_FLAG           VARCHAR,
    TEST_CATEGORY         VARCHAR,
    REUTERS_PHOTO         VARCHAR,
    REUTERS_LINK          VARCHAR,
    _ROW_NUM              INTEGER,
    _LOADED_AT            TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP()
)
"""

INSERT_SQL = f"""
INSERT INTO {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE}
    ({', '.join(SF_COLS)}, _ROW_NUM)
VALUES
    ({', '.join(['%s'] * (len(SF_COLS) + 1))})
"""


# ── Google Sheets ─────────────────────────────────────────────────────────────

def load_sheet():
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets.readonly",
        "https://www.googleapis.com/auth/drive.readonly",
    ]
    creds = Credentials.from_service_account_file(SA_FILE, scopes=scopes)
    gc    = gspread.authorize(creds)
    return gc.open_by_key(SHEET_ID).sheet1


def resolve_columns(headers):
    """
    Map each COLUMN_MAP key to its 0-based index in the sheet header row.
    Tries exact match first, then case-insensitive strip.
    Warns (does not abort) if an optional column is missing; raises if a
    REQUIRED_SHEET_COLUMNS entry is missing — that would silently NULL a
    column every downstream script depends on.
    Returns dict: sheet_header_key → col_index.
    """
    lower_map = {h.strip().lower(): i for i, h in enumerate(headers)}
    col_indices = {}
    missing_required = []
    for sheet_key in COLUMN_MAP:
        if sheet_key in headers:
            col_indices[sheet_key] = headers.index(sheet_key)
        elif sheet_key.strip().lower() in lower_map:
            col_indices[sheet_key] = lower_map[sheet_key.strip().lower()]
        else:
            if sheet_key in REQUIRED_SHEET_COLUMNS:
                missing_required.append(sheet_key)
            else:
                print(f"  ⚠ Column not found in sheet: '{sheet_key}' — will insert NULL")
            col_indices[sheet_key] = None
    if missing_required:
        raise RuntimeError(
            "Required columns missing from tracker sheet: "
            f"{missing_required}. Refusing to truncate Snowflake — fix the "
            "sheet header row first."
        )
    return col_indices


# ── Snowflake ─────────────────────────────────────────────────────────────────

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


def _cell(row, idx):
    """Return a cell value as str or None. Empty strings become None."""
    if idx is None:
        return None
    val = row[idx] if idx < len(row) else ""
    return val.strip() or None


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("Loading Google Sheet…")
    sheet      = load_sheet()
    all_values = sheet.get_all_values()
    if not all_values:
        print("Sheet is empty — nothing to do.")
        return

    headers     = all_values[0]
    data_rows   = all_values[1:]
    col_indices = resolve_columns(headers)
    print(f"  {len(data_rows)} data rows, {len(headers)} columns in sheet")

    # Build insert rows — one tuple per sheet row
    insert_rows = []
    for row_num, row in enumerate(data_rows, start=2):
        values = tuple(_cell(row, col_indices[k]) for k in COLUMN_MAP)
        insert_rows.append(values + (row_num,))  # append _ROW_NUM

    nonempty = sum(1 for r in insert_rows if any(v for v in r[:-1]))
    print(f"  {nonempty} non-empty rows to insert")

    if nonempty < MIN_SAFE_ROWS:
        raise RuntimeError(
            f"Only {nonempty} non-empty rows — below MIN_SAFE_ROWS={MIN_SAFE_ROWS}. "
            "Refusing to truncate Snowflake table. Likely a partial sheet read or "
            "API throttle. Re-run the workflow; escalate if this recurs."
        )

    print("Connecting to Snowflake (key-pair)…")
    con = sf_connect()
    cur = con.cursor()

    try:
        print(f"Creating table {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE} if not exists…")
        cur.execute(CREATE_TABLE_SQL)

        print("Truncating existing data…")
        cur.execute(f"TRUNCATE TABLE {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE}")

        print(f"Inserting {len(insert_rows)} rows in batches of {BATCH_SIZE}…")
        for i in range(0, len(insert_rows), BATCH_SIZE):
            batch = insert_rows[i:i + BATCH_SIZE]
            cur.executemany(INSERT_SQL, batch)
            print(f"  …{min(i + BATCH_SIZE, len(insert_rows))} / {len(insert_rows)}")

        cur.execute(f"SELECT COUNT(*) FROM {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE}")
        count = cur.fetchone()[0]
        print(f"\nDone. {count} rows in {SF_DATABASE}.{SF_SCHEMA}.{SF_TABLE}.")

        if count != len(insert_rows):
            raise RuntimeError(
                f"Row count mismatch: inserted {len(insert_rows)}, table reports {count}. "
                "Snowflake may have rejected a batch silently."
            )
    finally:
        cur.close()
        con.close()


if __name__ == "__main__":
    main()
