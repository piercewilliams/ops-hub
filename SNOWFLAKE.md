# Snowflake — Comprehensive Reference

Everything needed to connect, query, and build on McClatchy's Snowflake instance.
Updated in place as new tables, quirks, and scripts are discovered.

---

## Account & Connection

| Item | Value |
|------|-------|
| Account | `wvb49304-mcclatchy_eval` |
| Auth (interactive) | `externalbrowser` — Okta SSO browser popup, one MFA challenge per session |
| Auth (headless / scheduled) | RSA key-pair — service user, no browser popup. **Live as of 2026-04-18.** |
| Interactive role | `growth_and_strategy_role` |
| Interactive warehouse | `growth_and_strategy_role_wh` |
| Engineering role | `GROWTH_AND_STRATEGY_ENGINEER` — full read/write on `MCC_RAW.GROWTH_AND_STRATEGY` |
| Service user | `GROWTH_AND_STRATEGY_SERVICE_USER` — used by headless scripts only |

---

## Credentials & Secrets Locations

| Secret | Location | Notes |
|--------|----------|-------|
| RSA private key (.p8) | `~/.credentials/growth_strategy_service_rsa_key.p8` | DER-encoded; never commit |
| Google service account | `~/.credentials/pierce-tools.json` | Used by gspread for Google Sheets API |
| Snowflake interactive login | Okta SSO (externalbrowser) | No stored password; one popup per session |

**Environment variable overrides (optional):**
```bash
export GOOGLE_SERVICE_ACCOUNT_FILE=~/.credentials/pierce-tools.json
export SNOWFLAKE_PRIVATE_KEY_PATH=~/.credentials/growth_strategy_service_rsa_key.p8
```

---

## Session Startup Checklists

### Interactive session (enrich_tracker.py, ad-hoc SQL, Sigma)

Prerequisites:
- [ ] Be on a network that can reach `wvb49304-mcclatchy_eval.snowflakecomputing.com`
- [ ] Okta / SSO session active (or be ready for browser popup)
- [ ] Python env with `snowflake-connector-python` and `gspread` installed

Start:
```python
import snowflake.connector
con = snowflake.connector.connect(
    account="wvb49304-mcclatchy_eval",
    user="<your-mcclatchy-email>",
    authenticator="externalbrowser",
    database="MCC_PRESENTATION",
    schema="TABLEAU_REPORTING",
    warehouse="growth_and_strategy_role_wh",
    role="growth_and_strategy_role",
)
```

### Headless session (ingest_tracker.py, scheduled scripts)

Prerequisites:
- [ ] `~/.credentials/growth_strategy_service_rsa_key.p8` exists
- [ ] `~/.credentials/pierce-tools.json` (service account) exists
- [ ] Python env with `snowflake-connector-python`, `cryptography`, `gspread`

Start:
```python
from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
)
import snowflake.connector

with open("~/.credentials/growth_strategy_service_rsa_key.p8", "rb") as f:
    private_key = load_pem_private_key(f.read(), password=None)
pkb = private_key.private_bytes(
    encoding=Encoding.DER,
    format=PrivateFormat.PKCS8,
    encryption_algorithm=NoEncryption(),
)
con = snowflake.connector.connect(
    account="wvb49304-mcclatchy_eval",
    user="GROWTH_AND_STRATEGY_SERVICE_USER",
    private_key=pkb,
    database="MCC_RAW",
    schema="GROWTH_AND_STRATEGY",
)
```

---

## Databases & Schemas

| Database | Status | Purpose |
|----------|--------|---------|
| `MCC_PRESENTATION` | **Active — primary** | Analytics/reporting layer; all Pierce query work goes here |
| `MCC_RAW` | **Active — dev** | Raw ingest; `GROWTH_AND_STRATEGY` schema provisioned for Pierce 2026-04-18 |
| `MCC_AMPLITUDE` | Available, not yet directly queried | Amplitude event data (clicks, sessions, engagement) — confirmed in Snowflake by Chad |
| `MCC_CLEAN` | Available, not yet explored | Intermediate layer between RAW and PRESENTATION |
| `USER$PIERCE_WILLIAMS` | Personal scratch | Pierce's personal Snowflake scratch space |

### Dev vs. Production Split

| Schema | Purpose |
|--------|---------|
| `MCC_RAW.GROWTH_AND_STRATEGY` | **Build here.** Full permissions. Raw ingest tables (Sara's tracker, future assets). |
| `MCC_PRESENTATION.CONTENT_SCALING_AGENT` | **Final output.** Typed, modeled data for Sigma consumption. Moves here when dev is done. |

---

## MCC_PRESENTATION.TABLEAU_REPORTING — Active Tables

### STORY_TRAFFIC_MAIN
National O&O traffic (McClatchy newspaper titles). One row per story per event date.

| Column | Type | Notes |
|--------|------|-------|
| `STORY_ID` | VARCHAR | Join key → `DYN_STORY_META_DATA.ID` |
| `EVENT_DATE` | DATE | One row per day |
| `ALL_PAGEVIEWS` | NUMBER | Total PVs for that day |
| `SEARCH_PAGEVIEWS` | NUMBER | Search-sourced PVs |
| `SOCIAL_PAGEVIEWS` | NUMBER | Social-sourced PVs |
| `DIRECT_PAGEVIEWS` | NUMBER | Direct-sourced PVs |
| `NEWSLETTER_PAGEVIEWS` | NUMBER | Newsletter-sourced PVs |
| `APPLENEWS_PAGEVIEWS` | NUMBER | **Click-throughs back to O&O** from Apple News — NOT platform-side views |
| `SMARTNEWSAPP_PAGEVIEWS` | NUMBER | Click-throughs back to O&O from SmartNews — NOT platform-side views |
| `NEWSBREAKAPP_PAGEVIEWS` | NUMBER | Click-throughs from Newsbreak |
| `SUBS_PAGEVIEWS` | NUMBER | Subscriber page views |

### STORY_TRAFFIC_MAIN_LE
L&E pub traffic (Us Weekly, Women's World, Life & Style). Keyed by URL, not STORY_ID.

| Column | Type | Notes |
|--------|------|-------|
| `CANONICAL_URL` | VARCHAR | Join key — normalize before use (see patterns) |
| `EVENT_DATE` | DATE | — |
| Same PV columns as STORY_TRAFFIC_MAIN | — | — |

### DYN_STORY_META_DATA
Article metadata + URL↔STORY_ID bridge.

| Column | Type | Notes |
|--------|------|-------|
| `ID` | VARCHAR | = STORY_ID in STORY_TRAFFIC_MAIN |
| `URL` | VARCHAR | Published URL |
| `ASSET_TYPE` | VARCHAR | Filter: `IN ('storyline','story','wirestory')` |
| `AUTHOR` | VARCHAR | Author name |
| `CANONICAL_URL` | VARCHAR | Canonical URL (may differ from URL) |
| + SEO / keyword / section fields | | — |

---

## MCC_RAW.GROWTH_AND_STRATEGY — Active Tables

### NATIONAL_CONTENT_TRACKER
Sara Vallone's Google Sheet loaded verbatim. All columns VARCHAR. Full replace on every run (TRUNCATE + INSERT). Sheet is source of truth.

| Column | Source in Sheet |
|--------|-----------------|
| `ASSET_ID` | Asset_ID |
| `BRAND_TYPE` | Brand Type |
| `CONTENT_TYPE` | Content_Type (Parent-P / Child-C) |
| `PARENT_ID` | Parent_ID |
| `DRAFT_URL` | Draft URL/Link |
| `PUBLISHED_URL` | Published URL/Link |
| `AUTHOR` | Author |
| `SYNDICATION_PLATFORM` | Syndication platform |
| `HEADLINE` | Headline |
| `WEEK_NUM` | Week # |
| `WEEK_OF` | Week Of |
| `CREATION_DATE_MONTH` | Creation Date Month |
| `PUB_DATE_MONTH` | Pub Date Month |
| `CREATED_DATE` | Created Date |
| `PUBLICATION_DATE` | Publication Date |
| `VERTICAL` | Vertical |
| `WORD_COUNT` | Word Count |
| `PRIMARY_KEYWORDS` | Primary Keywords |
| `META_DESCRIPTION` | Meta Description |
| `TARGET_AUDIENCE` | Personas (Target Audience) |
| `DRAFT_DOC` | Draft Doc |
| `PEER_REVIEWER` | Peer Reviewer |
| `UPDATE_FLAG` | UPDATE? |
| `TEST_CATEGORY` | Test category? Yes |
| `REUTERS_PHOTO` | Reuters photo Use? Yes |
| `REUTERS_LINK` | Reuters Link Used? Yes |
| `_ROW_NUM` | INTEGER — sheet row number (starts at 2) |
| `_LOADED_AT` | TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP() |

---

## SQL Patterns & Quirks

### Joins

```sql
-- National O&O: traffic + metadata
FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN t
JOIN MCC_PRESENTATION.TABLEAU_REPORTING.DYN_STORY_META_DATA m
  ON t.STORY_ID = m.ID
WHERE m.ASSET_TYPE IN ('storyline', 'story', 'wirestory')

-- L&E: traffic by URL (no STORY_ID)
FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN_LE t
WHERE RTRIM(t.CANONICAL_URL, '/') = '<normalized_url>'
```

### URL normalization (Python)

```python
# Extract article ID from McClatchy URL (7+ digit threshold avoids false matches)
import re
m = re.search(r'article(\d{7,})', url)
story_id = m.group(1) if m else None

# Normalize URL for L&E joins
url = url.strip().rstrip('/')
url = re.sub(r'^https?://', '', url)
url = re.sub(r'^(www\.|amp\.)', '', url)
```

### URL scheme quirk
URLs in Snowflake are stored inconsistently — some have `https://`, some `http://`. **Always pass both variants** when filtering by URL:
```sql
WHERE RTRIM(CANONICAL_URL, '/') IN (%(https_url)s, %(http_url)s)
```

### Company median benchmark

```sql
-- Rolling 6-month median for benchmarking (Chris Palo's methodology)
SELECT
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY SUM(ALL_PAGEVIEWS)) AS MEDIAN_PVS
FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN
WHERE EVENT_DATE >= '2025-10-01'
GROUP BY STORY_ID
```

**Exclude L&E from this benchmark** — L&E is a separate content type (STORY_TRAFFIC_MAIN_LE) and commingling inflates/deflates the national median. Always compute separately.

### Aggregate traffic per article

```sql
-- Total lifetime PVs for a national article
SELECT
    t.STORY_ID,
    SUM(t.ALL_PAGEVIEWS) AS total_pvs,
    SUM(t.SUBS_PAGEVIEWS) AS subs_pvs,
    SUM(t.APPLENEWS_PAGEVIEWS) AS applenews_clickbacks,
    SUM(t.SMARTNEWSAPP_PAGEVIEWS) AS smartnews_clickbacks
FROM MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TRAFFIC_MAIN t
WHERE t.STORY_ID = %(story_id)s
GROUP BY t.STORY_ID
```

### APPLENEWS_PAGEVIEWS vs. Apple News platform views
**Critical distinction:** `APPLENEWS_PAGEVIEWS` in Snowflake = click-throughs **back to O&O** from Apple News. This is NOT the same as Apple News platform-side views (time spent on Apple News, total impressions on the Apple News app). Those platform numbers only exist in Tarrow's sheet. Do not conflate them — they measure completely different things.

Same distinction applies to `SMARTNEWSAPP_PAGEVIEWS`.

### Cortex (semantic similarity)
`SNOWFLAKE.CORTEX.EMBED_TEXT_768` is **not available** on the `wvb49304-mcclatchy_eval` account (confirmed 2026-04-18, SQL compilation error). Do not attempt semantic similarity via Cortex on this account.

---

## Scripts

### `ops-hub/scripts/enrich_tracker.py`
Reads Sara's Google Sheet → joins all article URLs to Snowflake traffic data → writes enriched columns back to the sheet. Interactive auth (`externalbrowser`).

**What it adds:** 13 columns including total PVs, subscriber PVs, channel breakdowns, article vs. company median, cluster batting average, green/red conditional formatting, Trends tab with line chart.

**Lookup strategy (3 passes):**
1. Article ID regex from URL → `STORY_TRAFFIC_MAIN` by STORY_ID
2. Full URL join → `DYN_STORY_META_DATA` → STORY_ID → `STORY_TRAFFIC_MAIN`
3. CANONICAL_URL match → `STORY_TRAFFIC_MAIN_LE` (L&E only)

**Run:** `python3 scripts/enrich_tracker.py` — idempotent, safe to rerun.

### `ops-hub/scripts/ingest_tracker.py`
Reads Sara's Google Sheet → loads 26 metadata columns + row number into `MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER`. Headless auth (RSA key-pair).

**Pattern:** TRUNCATE + INSERT (full replace every run — sheet is source of truth).
**Batch size:** 500 rows per `executemany` call.
**Result:** 2035 rows loaded as of 2026-04-18.

**Run:** `python3 scripts/ingest_tracker.py` — requires `~/.credentials/growth_strategy_service_rsa_key.p8` and `~/.credentials/pierce-tools.json`.

### `ops-hub/scripts/model_tracker.py`
Builds `MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED`. Full refresh (`CREATE OR REPLACE TABLE ... AS SELECT`) on every run. Headless auth (RSA key-pair). Run after `ingest_tracker.py`.

**What it produces:**

| Column | Type | Notes |
|--------|------|-------|
| All 26 editorial columns | Typed (DATE, NUMBER, VARCHAR) | From NATIONAL_CONTENT_TRACKER; dates parsed with TRY_TO_DATE |
| `cluster_id` | VARCHAR | Parent = own ASSET_ID; child = PARENT_ID. Unified join anchor. |
| `story_id` | VARCHAR | URL extraction or DYN_STORY_META_DATA URL join |
| `total_pvs` … `subscriber_pvs` | INTEGER | All traffic channels; national via STORY_TRAFFIC_MAIN, L&E via STORY_TRAFFIC_MAIN_LE |
| `pub_median_pvs` | FLOAT | Per-domain benchmark (Oct 2025+, ≥10 articles) |
| `article_vs_co_median` | FLOAT | e.g. 0.15 = +15% above median. NULL if no benchmark. |
| `is_hit` | INTEGER | 1 = at/above median, 0 = below, NULL = no benchmark |
| `cluster_total_pvs` | INTEGER | Sum of all articles in cluster |
| `cluster_hits` | INTEGER | Count of articles at/above median in cluster |
| `cluster_hit_rate` | FLOAT | cluster_hits / cluster_article_count (e.g. 0.33 = 1-in-3) |
| `cluster_vs_co_median` | FLOAT | Cluster total vs. sum of per-article benchmarks |
| `_modeled_at` | TIMESTAMP_NTZ | When this row was last refreshed |

**Run:** `python3 scripts/model_tracker.py`

**Transitional note (Chad Bruton, 2026-04-18):** The Google Sheet goes away in a few weeks/months once CMS/CSA centralizes tracking. When that happens, swap `NATIONAL_CONTENT_TRACKER` in `model_tracker.py` for the CMS-derived source — the rest of the model is unchanged.

---

## TABLEAU_REPORTING — Tables Mapped but Not Yet Queried

| Table | Likely contents | Why relevant |
|-------|-----------------|--------------|
| `DYN_STORY_FACTS_DETAIL_WITH_KPIS` | Per-article KPI detail | May surface engagement beyond PVs — time on page, scroll depth |
| `DYN_CONTENT_API_LATEST` | Live content API snapshot | Possibly real-time headline, author, publish date per article |
| `NEWSROOMPAGES` | Newsroom-level page metrics | Section/channel aggregates — useful for benchmark comparisons |
| `CSA_CONTENT_TRACKER` | Unknown — NOT Sara's tracker | Misleading name; do not use as a substitute |

---

## Revenue Data

Confirmed in Snowflake as of 2026-04-16 (Ryan Spalding's team):
- **Direct sold:** Naviga
- **Programmatic:** GAM
- **Sigma dashboard:** `STAR-Automation-3wA6q4da4CrVGCyhIMqk2E`
- **Architecture contact:** Derek Knostman (built it); Ryan Spalding (domain contact)
- Not yet integrated into any Pierce scripts — gate: Ryan Spalding meeting 2026-04-20.

---

## Known Limitations

| Limitation | Detail |
|------------|--------|
| Cortex not available | `SNOWFLAKE.CORTEX.EMBED_TEXT_768` returns SQL compilation error on this eval account |
| L&E excluded from national median | `STORY_TRAFFIC_MAIN_LE` is a separate table from `STORY_TRAFFIC_MAIN`; never mix in benchmark calculations |
| URL scheme inconsistency | https vs http stored inconsistently — always pass both variants |
| Tarrow ≠ Snowflake for syndication | Tarrow has platform-side views (Apple News native views, MSN pageviews on MSN); Snowflake has O&O click-throughs only. Both are valuable; they are not the same metric |
| Eval account constraints | Some Snowflake enterprise features (Cortex, etc.) may not be enabled on the `mcclatchy_eval` account |
| Cluster structure only in sheet | Parent/child cluster relationships, Asset_ID format, and editorial grouping only exist in Sara's Google Sheet. NATIONAL_CONTENT_TRACKER in Snowflake preserves this — it is the bridge to any data model that needs cluster structure |
