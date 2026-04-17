"""
enrich_tracker.py — Append Snowflake traffic metrics to Sara Vallone's content tracker.

Reads all Published URL/Link values from the Google Sheet, joins to
STORY_TRAFFIC_MAIN + STORY_TRAFFIC_MAIN_LE in Snowflake, and writes
11 new columns (all-time totals) to the far right.

Usage:
    python3 scripts/enrich_tracker.py

Authentication:
    Uses McClatchy SSO via Okta. A browser window will open for MFA — complete
    it once and the session is live for the duration of the script.

    SNOWFLAKE_USER must be set (or will be prompted) — your McClatchy email/SSO
    username (e.g. pierce.williams@mcclatchy.com or just pierce.williams).

Env vars (optional — will prompt if not set):
    SNOWFLAKE_USER      your McClatchy SSO username
    GOOGLE_SERVICE_ACCOUNT_FILE  path to service account JSON
                                 (default: ~/.credentials/pierce-tools.json)

Snowflake account: wvb49304-mcclatchy_eval
"""

import os
import sys
from pathlib import Path

import gspread
from google.oauth2.service_account import Credentials
import snowflake.connector

# ── Config ────────────────────────────────────────────────────────────────────

SHEET_ID   = "14_0eK46g3IEj7L_yp9FIdWwvnuYI5f-vAuP7DDhSPg8"
SA_FILE    = os.getenv("GOOGLE_SERVICE_ACCOUNT_FILE",
                        str(Path.home() / ".credentials" / "pierce-tools.json"))

SF_ACCOUNT  = "wvb49304-mcclatchy_eval"
SF_DATABASE = "MCC_PRESENTATION"
SF_SCHEMA   = "TABLEAU_REPORTING"

# Column names to write into the sheet (in order)
OUTPUT_COLS = [
    "story_id",
    "total_pvs",
    "search_pvs",
    "social_pvs",
    "direct_pvs",
    "newsletter_pvs",
    "applenews_pvs",
    "smartnews_pvs",
    "newsbreak_pvs",
    "subscriber_pvs",
    "conversions",
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
    # Prefer a column explicitly labeled "published"
    for i, h in enumerate(lower):
        if "published" in h and ("url" in h or "link" in h):
            return i
    # Fall back to any url/link column
    for i, h in enumerate(lower):
        if "url" in h or "link" in h:
            return i
    raise ValueError(f"No URL/Link column found. Headers: {headers}")


# ── Snowflake helpers ─────────────────────────────────────────────────────────

def sf_connect(user):
    print("A browser window will open for Okta MFA — complete it to continue.")
    return snowflake.connector.connect(
        account=SF_ACCOUNT,
        user=user,
        authenticator="externalbrowser",
        database=SF_DATABASE,
        schema=SF_SCHEMA,
    )


METRICS_SQL = """
WITH traffic AS (
    -- National pubs (O&O): join STORY_TRAFFIC_MAIN → DYN_STORY_META_DATA via STORY_ID = ID
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
        SUM(t.SUBS_PAGEVIEWS)         AS subscriber_pvs,
        SUM(t.CONVERSIONS)            AS conversions
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN t
    JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA m
        ON t.STORY_ID = m.ID
    WHERE RTRIM(m.URL, '/') IN ({placeholders})
      AND m.ASSET_TYPE IN ('storyline', 'story', 'wirestory')
    GROUP BY m.URL, m.ID

    UNION ALL

    -- L&E pubs (Us Weekly, Woman's World, Life & Style)
    -- CANONICAL_URL is the direct key; no STORY_ID or CONVERSIONS column in this table
    SELECT
        RTRIM(t.CANONICAL_URL, '/') AS URL,
        NULL                          AS story_id,
        SUM(t.ALL_PAGEVIEWS)          AS total_pvs,
        SUM(t.SEARCH_PAGEVIEWS)       AS search_pvs,
        SUM(t.SOCIAL_PAGEVIEWS)       AS social_pvs,
        SUM(t.DIRECT_PAGEVIEWS)       AS direct_pvs,
        SUM(t.NEWSLETTER_PAGEVIEWS)   AS newsletter_pvs,
        SUM(t.APPLENEWS_PAGEVIEWS)    AS applenews_pvs,
        SUM(t.SMARTNEWSAPP_PAGEVIEWS) AS smartnews_pvs,
        SUM(t.NEWSBREAKAPP_PAGEVIEWS) AS newsbreak_pvs,
        SUM(t.SUBS_PAGEVIEWS)         AS subscriber_pvs,
        0                             AS conversions
    FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN_LE t
    WHERE RTRIM(t.CANONICAL_URL, '/') IN ({placeholders})
    GROUP BY t.CANONICAL_URL
)
-- Aggregate (handles any edge case where a URL somehow appears in both tables)
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
    SUM(subscriber_pvs) AS subscriber_pvs,
    SUM(conversions)    AS conversions
FROM traffic
GROUP BY URL
"""

# Column names as returned by Snowflake (in the SELECT above, after URL)
SF_RESULT_COLS = [
    "STORY_ID", "TOTAL_PVS", "SEARCH_PVS", "SOCIAL_PVS", "DIRECT_PVS",
    "NEWSLETTER_PVS", "APPLENEWS_PVS", "SMARTNEWS_PVS", "NEWSBREAK_PVS",
    "SUBSCRIBER_PVS", "CONVERSIONS",
]


def normalize_url(u):
    """Normalize a URL to match Snowflake's canonical form."""
    from urllib.parse import urlparse, urlunparse
    u = u.strip()
    if not u:
        return u
    p = urlparse(u)
    host = p.netloc
    if host.startswith("amp."):
        host = "www." + host[4:]
    clean = urlunparse((p.scheme, host, p.path.rstrip("/"), "", "", ""))
    return clean


def extract_mcc_story_id(url):
    """
    Extract the numeric McClatchy STORY_ID from a URL like:
      https://www.sacbee.com/entertainment/living/article314923832.html
    Returns the ID string ('314923832') or None.
    Uses 7+ digit threshold to avoid false matches on short numeric segments.
    """
    import re
    m = re.search(r'article(\d{7,})', url)
    return m.group(1) if m else None


# SQL for querying national articles directly by STORY_ID (no URL join needed)
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
    SUM(t.SUBS_PAGEVIEWS)         AS subscriber_pvs,
    SUM(t.CONVERSIONS)            AS conversions
FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN t
WHERE t.STORY_ID IN ({placeholders})
GROUP BY t.STORY_ID
"""


def _row_to_metrics(story_id, row_offset, row):
    """Convert a Snowflake result row to a metrics dict."""
    return {
        "story_id":       story_id,
        "total_pvs":      int(row[row_offset]     or 0),
        "search_pvs":     int(row[row_offset + 1] or 0),
        "social_pvs":     int(row[row_offset + 2] or 0),
        "direct_pvs":     int(row[row_offset + 3] or 0),
        "newsletter_pvs": int(row[row_offset + 4] or 0),
        "applenews_pvs":  int(row[row_offset + 5] or 0),
        "smartnews_pvs":  int(row[row_offset + 6] or 0),
        "newsbreak_pvs":  int(row[row_offset + 7] or 0),
        "subscriber_pvs": int(row[row_offset + 8] or 0),
        "conversions":    int(row[row_offset + 9] or 0),
    }


def fetch_metrics(cur, urls):
    """
    Return dict keyed by normalized URL → metrics dict.

    Three lookup strategies, applied in order (later results don't overwrite earlier):
      1. McClatchy article ID extracted from URL → STORY_TRAFFIC_MAIN.STORY_ID
         (covers sacbee, miamiherald, kansascity, etc.)
      2. URL → DYN_STORY_META_DATA.ID → STORY_TRAFFIC_MAIN
         (covers AI-tagged articles with asset_type filter)
      3. CANONICAL_URL → STORY_TRAFFIC_MAIN_LE
         (covers L&E pubs: Us Weekly, Woman's World, Life & Style)
    """
    result = {}

    clean_urls = [normalize_url(u) for u in urls if u and u.strip()]
    clean_urls = [u for u in clean_urls if u]
    if not clean_urls:
        return result

    # ── Strategy 1: direct STORY_ID extraction from McClatchy article URLs ──
    id_to_url = {}   # story_id_str → normalized_url (first occurrence wins)
    for u in clean_urls:
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
        print(f"  Strategy 1 (article ID): {len([u for u in id_to_url.values() if u in result])} / {len(id_to_url)} matched")

    # ── Strategies 2 + 3: URL-based lookups ──
    urls_needing_lookup = [u for u in clean_urls if u not in result]
    if urls_needing_lookup:
        ph = ", ".join(["%s"] * len(urls_needing_lookup))
        sql = METRICS_SQL.format(placeholders=ph)
        cur.execute(sql, urls_needing_lookup + urls_needing_lookup)
        for row in cur.fetchall():
            url_key = row[0].strip().rstrip("/")
            if url_key not in result:  # don't overwrite strategy 1 hits
                result[url_key] = _row_to_metrics(str(row[1]) if row[1] else "", 2, row)
        matched_url = sum(1 for u in urls_needing_lookup if u in result)
        print(f"  Strategy 2+3 (URL lookup): {matched_url} / {len(urls_needing_lookup)} matched")

    return result


def _UNUSED_fetch_metrics(cur, urls):
    """Original single-strategy fetch — kept for reference."""
    clean_urls = [normalize_url(u) for u in urls if u and u.strip()]
    clean_urls = [u for u in clean_urls if u]
    if not clean_urls:
        return {}

    placeholders = ", ".join(["%s"] * len(clean_urls))
    sql = METRICS_SQL.format(placeholders=placeholders)
    cur.execute(sql, clean_urls + clean_urls)

    result = {}
    for row in cur.fetchall():
        url = row[0]
        result[url.strip().rstrip("/")] = {
            "story_id":      row[1],
            "total_pvs":     int(row[2] or 0),
            "search_pvs":    int(row[3] or 0),
            "social_pvs":    int(row[4] or 0),
            "direct_pvs":    int(row[5] or 0),
            "newsletter_pvs":int(row[6] or 0),
            "applenews_pvs": int(row[7] or 0),
            "smartnews_pvs": int(row[8] or 0),
            "newsbreak_pvs": int(row[9] or 0),
            "subscriber_pvs":int(row[10] or 0),
            "conversions":   int(row[11] or 0),
        }
    return result


# ── Main ──────────────────────────────────────────────────────────────────────

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


def debug_url_format(cur, sheet_headers, sheet_urls):
    """Test published URLs against both Snowflake traffic tables."""
    from urllib.parse import urlparse

    # Filter out wp-admin / staging URLs — only test real published URLs
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

    # Test against DYN_STORY_META_DATA (national pubs)
    cur.execute(f"""
        SELECT URL, ID FROM MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA
        WHERE URL IN ({ph}) LIMIT 10
    """, sample)
    rows = cur.fetchall()
    print(f"\n── DYN_STORY_META_DATA matches ({len(rows)}) ──")
    for row in rows:
        print(f"  {repr(row[0])}  id={row[1]}")

    # Test against STORY_TRAFFIC_MAIN_LE (L&E pubs)
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

    # If still no matches, try stripping trailing slash on one URL
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


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Enrich Sara Vallone's tracker with Snowflake PV data")
    parser.add_argument("--discover", action="store_true",
                        help="Print table column names and exit")
    parser.add_argument("--debug-urls", action="store_true",
                        help="Compare URL formats between sheet and Snowflake to diagnose mismatches")
    args = parser.parse_args()

    # Credentials
    sf_user = os.getenv("SNOWFLAKE_USER") or input("Snowflake SSO username (e.g. pierce.williams@mcclatchy.com): ").strip()

    # Connect to Google Sheets
    print("Connecting to Google Sheets…")
    sheet = load_sheet()
    all_values = sheet.get_all_values()

    if not all_values:
        print("Sheet is empty — nothing to do.")
        return

    headers = all_values[0]
    rows    = all_values[1:]

    url_col = find_url_column(headers)
    print(f"Found URL column: '{headers[url_col]}' (col {url_col + 1})")
    print(f"Total data rows: {len(rows)}")

    urls = [r[url_col] if len(r) > url_col else "" for r in rows]
    urls_set = [u for u in urls if u.strip()]
    print(f"URLs to look up: {len(urls_set)}")

    # Connect to Snowflake
    print("Connecting to Snowflake…")
    con = sf_connect(sf_user)
    cur = con.cursor()

    if args.discover:
        discover_columns(cur)
        cur.close()
        con.close()
        return

    if args.debug_urls:
        debug_url_format(cur, headers, urls_set)
        cur.close()
        con.close()
        return

    print("Querying traffic metrics (this may take 30–60 seconds)…")
    metrics = fetch_metrics(cur, urls_set)
    cur.close()
    con.close()

    matched = sum(1 for u in urls_set if normalize_url(u) in metrics)
    print(f"Rows matched in Snowflake: {matched} / {len(urls_set)}")

    # ── Determine column positions — never touch existing columns ─────────────
    # For each output col: use its existing position if already in the sheet,
    # otherwise append after the last column. Existing columns to the left are
    # never rewritten.
    existing_col_count = len(headers)
    col_positions = {}  # col_name → 0-based index in the sheet
    new_headers = {}    # 0-based index → header label (only for new columns)

    next_new_col = existing_col_count
    for col_name in OUTPUT_COLS:
        if col_name in headers:
            col_positions[col_name] = headers.index(col_name)
            print(f"  '{col_name}' already exists at col {headers.index(col_name) + 1} — will overwrite")
        else:
            col_positions[col_name] = next_new_col
            new_headers[next_new_col] = col_name
            next_new_col += 1

    # Group output cols into contiguous blocks for efficient range writes.
    # Sort by sheet position so we can detect gaps.
    sorted_cols = sorted(col_positions.items(), key=lambda x: x[1])
    first_output_col = sorted_cols[0][1]   # 0-based
    last_output_col  = sorted_cols[-1][1]  # 0-based
    block_width = last_output_col - first_output_col + 1

    print(f"Writing {len(OUTPUT_COLS)} columns at cols "
          f"{first_output_col + 1}–{last_output_col + 1} "
          f"({_col_letter(first_output_col + 1)}–{_col_letter(last_output_col + 1)})…")

    # ── Expand the grid if new columns exceed current sheet width ────────────
    if new_headers:
        cols_needed = last_output_col + 1  # 1-based total columns required
        current_cols = sheet.col_count
        if cols_needed > current_cols:
            sheet.add_cols(cols_needed - current_cols)
            print(f"  Expanded sheet from {current_cols} to {cols_needed} columns.")

    # ── Write header row — only the new columns ───────────────────────────────
    if new_headers:
        # Write all new headers in one batch update
        header_updates = [[label] for label in
                          [new_headers[i] for i in sorted(new_headers)]]
        first_new = min(new_headers)
        last_new  = max(new_headers)
        hdr_range = (f"{_col_letter(first_new + 1)}1"
                     f":{_col_letter(last_new + 1)}1")
        sheet.update([[ new_headers[i] for i in sorted(new_headers) ]], hdr_range)
        print(f"  Added {len(new_headers)} new header(s).")

    # ── Build and write output block — one column-range update ───────────────
    # We write a contiguous block from first_output_col to last_output_col.
    # Any positions in that range that are NOT output cols get an empty string
    # only if they are new columns we just created; pre-existing columns in the
    # gap (unlikely but possible) are preserved by reading their current values.
    output_data = []   # list of rows, each row = [val for first..last output col]

    for row, url in zip(rows, urls):
        key = normalize_url(url)
        m = metrics.get(key, {})

        block = []
        for col_idx in range(first_output_col, last_output_col + 1):
            # Find which output_col name lives at this position (if any)
            matching = [name for name, pos in col_positions.items() if pos == col_idx]
            if matching:
                val = m.get(matching[0], "")
                block.append(val if val != "" else "")
            else:
                # Gap position: read existing value from the row to preserve it
                block.append(row[col_idx] if col_idx < len(row) else "")
        output_data.append(block)

    # Single range update for the entire output block
    start_cell = f"{_col_letter(first_output_col + 1)}2"
    end_cell   = f"{_col_letter(last_output_col + 1)}{len(output_data) + 1}"
    sheet.update(output_data, f"{start_cell}:{end_cell}")

    print(f"Done. {matched} rows enriched with traffic data.")
    if matched < len(urls_set):
        missing = len(urls_set) - matched
        print(f"  {missing} URLs had no match in Snowflake.")
        unmatched = [u for u in urls_set if normalize_url(u) not in metrics]
        skip_domains = ("modmomsclub", "wpenginepowered", "wp-admin")
        unexpected = [u for u in unmatched if not any(d in u for d in skip_domains)]
        print(f"  {len(unexpected)} of those are NOT modmomsclub/staging (unexpected misses).")
        if unexpected:
            print("  Sample unmatched URLs (first 10):")
            for u in unexpected[:10]:
                print(f"    {repr(u)}")
    print("All columns to the left of the output block were not touched.")


def _col_letter(n):
    """Convert 1-based column number to spreadsheet letter (A, B, … Z, AA, …)."""
    result = ""
    while n > 0:
        n, rem = divmod(n - 1, 26)
        result = chr(65 + rem) + result
    return result


if __name__ == "__main__":
    main()
