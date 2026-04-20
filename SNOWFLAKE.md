# Snowflake — Comprehensive Reference

Everything needed to connect, query, build on, and maintain McClatchy's Snowflake instance for the National Content team. Updated in place as new tables, quirks, and scripts are discovered.

**For the full weekly pipeline (Sara's sheet → Snowflake → Sara's sheet → Headlines site):** see [PIPELINE.md](PIPELINE.md). This document is the Snowflake reference — tables, columns, connection patterns. PIPELINE.md is the operational reference — the chained GitHub Actions workflows, failure modes, recovery paths.

---

## 1. Account & Connection

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

## 2. Credentials & Secrets Locations

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

## 3. Snowflake Access Permissions by Database

| Database | Pierce Access | Service User Access | Notes |
|----------|--------------|---------------------|-------|
| `MCC_RAW.GROWTH_AND_STRATEGY` | Full read/write (ENGINEER role) | Full read/write | Build new raw tables here |
| `MCC_RAW.STORY_DATA` | Read | Read | PUBLISHED_STORIES lives here |
| `MCC_PRESENTATION.CONTENT_SCALING_AGENT` | Read/write (via service user default role) | Full DDL + DML | Our output schema |
| `MCC_PRESENTATION.TABLEAU_REPORTING` | Read | Read | National traffic data |
| `MCC_AMPLITUDE.AMPLITUDE` | Read | Read | Amplitude event tables |
| `MCC_CLEAN.*` | Read (some schemas) | Read | Intermediate layer |
| `USER$PIERCE_WILLIAMS` | Full (personal scratch) | — | Ad-hoc exploration only |

**Critical privilege note:** `GROWTH_AND_STRATEGY_SERVICE_USER` with **no role specified** uses its default privileged role, which allows DDL (`CREATE TABLE`, `DELETE`). Connecting with `role="GROWTH_AND_STRATEGY_ROLE"` downgrades to DML/DQL only. All pipeline scripts omit the role parameter intentionally.

---

## 4. Connection Code Snippets

### Interactive session (enrich_tracker.py, ad-hoc SQL, Sigma)

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

### Headless session (ingest_tracker.py, model_tracker.py, snapshot_tracker.py)

```python
from cryptography.hazmat.primitives.serialization import (
    load_pem_private_key, Encoding, PrivateFormat, NoEncryption,
)
import snowflake.connector

with open(SF_KEY_PATH, "rb") as f:
    key = load_pem_private_key(f.read(), password=None)
pkb = key.private_bytes(Encoding.DER, PrivateFormat.PKCS8, NoEncryption())

con = snowflake.connector.connect(
    account="wvb49304-mcclatchy_eval",
    user="GROWTH_AND_STRATEGY_SERVICE_USER",
    private_key=pkb,
    database="MCC_PRESENTATION",
    schema="CONTENT_SCALING_AGENT",
    # No role= parameter — uses default privileged role for DDL
)
```

---

## 5. What We Own (Output Tables)

### MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED

Full-refresh enriched table rebuilt every pipeline run. ~1,886 rows, 69 columns. This is the primary analytical surface for the National Content team.

**Refresh:** `CREATE OR REPLACE TABLE ... AS SELECT` — full replace on every run. ~30–45 seconds.

### MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_WEEKLY

Append-only weekly snapshot history. Each row = one article's enriched state at a given Monday. 71 columns (TRACKER_ENRICHED + SNAPSHOT_DATE + WEEKS_SINCE_PUBLISH).

**Refresh:** Weekly via `snapshot_tracker.py`. DELETE+INSERT for current Monday's snapshot (idempotent — re-running updates the snapshot rather than duplicating it).

**Current state (as of 2026-04-19):** 1 snapshot (2026-04-13), 1,886 rows.

---

## 6. Data Source Map — TRACKER_ENRICHED

Eight sources joined to build TRACKER_ENRICHED:

| # | Source Table | Database.Schema | Join Key | What It Contributes |
|---|-------------|-----------------|----------|---------------------|
| 1 | `NATIONAL_CONTENT_TRACKER` | `MCC_RAW.GROWTH_AND_STRATEGY` | ASSET_ID (primary) | All editorial metadata from Sara's sheet: author, headline, dates, vertical, word count, keywords, cluster structure, etc. |
| 2 | `STORY_TRAFFIC_MAIN` | `MCC_PRESENTATION.TABLEAU_REPORTING` | STORY_ID (resolved from URL) | National O&O traffic: total, search, social, direct, Apple News, SmartNews, Newsbreak, subscriber, newsletter, AMP PVs — all cumulative lifetime |
| 3 | `STORY_TRAFFIC_MAIN_LE` | `MCC_PRESENTATION.TABLEAU_REPORTING` | CANONICAL_URL (normalized) | Same traffic channels for L&E pubs (Us Weekly, Women's World, Life & Style) |
| 4 | `DYN_STORY_META_DATA` | `MCC_PRESENTATION.TABLEAU_REPORTING` | URL → STORY_ID lookup | URL-to-STORY_ID bridge for articles where regex extraction fails |
| 5 | `EVENTS_412949` | `MCC_AMPLITUDE.AMPLITUDE` | STORY_ID via cms_id JSON field | Yahoo News platform views (event_type = 'yahoo_news_ingest', page_view_count field) |
| 6 | `DYN_CONTENT_API_LATEST` | `MCC_PRESENTATION.TABLEAU_REPORTING` | ASSET_ID → URL join | IAB topic classification (PRIMARY_IAB_TOPIC) and article embeddings for semantic similarity |
| 7 | `PUBLISHED_STORIES` | `MCC_RAW.STORY_DATA` | STORY_ID (NUMBER) | Article access type: Free / Metered / Sub-Only / Free (Automatic) / Sub-Only (Automatic) |
| 8 | Self-join aggregation | — | CLUSTER_ID | Cluster aggregates: article count, hit count, total PVs, hit rate, similarity stats |

### Story ID Resolution Strategy (3 passes)

Applied in order; first match wins per article:

| Pass | Method | Coverage |
|------|--------|----------|
| 1 | `REGEXP_SUBSTR(PUBLISHED_URL, 'article([0-9]{7,})', 1, 1, 'e', 1)` — extract 7+ digit ID from URL | ~90% of national articles |
| 2 | URL join to `DYN_STORY_META_DATA` → retrieve `ID` as story_id | Fills most gaps from pass 1 |
| 3 | `CANONICAL_URL` match in `STORY_TRAFFIC_MAIN_LE` (L&E pubs only) | Covers all L&E articles |

**POSIX regex note:** Snowflake uses POSIX ERE. `\d` is NOT a digit class. Always use `[0-9]` for digit matching in Snowflake SQL. Python uses PCRE — `\d` works fine there.

---

## 7. Complete Column Reference — TRACKER_ENRICHED (69 columns)

### Editorial metadata (from Sara's sheet → NATIONAL_CONTENT_TRACKER)

| Column | Type | Notes |
|--------|------|-------|
| `ASSET_ID` | VARCHAR | Primary key from tracker sheet |
| `BRAND_TYPE` | VARCHAR | e.g. National |
| `CONTENT_TYPE` | VARCHAR | `Parent-P` or `Child-C` |
| `PARENT_ID` | VARCHAR | Cluster anchor (null for parent articles) |
| `CLUSTER_ID` | VARCHAR | `COALESCE(PARENT_ID, ASSET_ID)` — unified cluster join key |
| `DRAFT_URL` | VARCHAR | Google Doc link |
| `PUBLISHED_URL` | VARCHAR | Live article URL |
| `AUTHOR` | VARCHAR | Byline |
| `SYNDICATION_PLATFORM` | VARCHAR | Where syndicated |
| `HEADLINE` | VARCHAR | Article title |
| `WEEK_NUM` | NUMBER | Week number in tracker |
| `WEEK_OF` | DATE | Week start date |
| `CREATION_DATE_MONTH` | VARCHAR | Human-readable month label |
| `PUB_DATE_MONTH` | VARCHAR | Human-readable month label |
| `CREATED_DATE` | DATE | Article creation date |
| `PUBLICATION_DATE` | DATE | Live date |
| `VERTICAL` | VARCHAR | Topic vertical |
| `WORD_COUNT` | NUMBER | Article word count |
| `PRIMARY_KEYWORDS` | VARCHAR | SEO keyword targets |
| `META_DESCRIPTION` | VARCHAR | SEO meta description |
| `TARGET_AUDIENCE` | VARCHAR | Persona / target audience label |
| `DRAFT_DOC` | VARCHAR | Additional draft link |
| `PEER_REVIEWER` | VARCHAR | Reviewer name |
| `UPDATE_FLAG` | VARCHAR | Whether article is an update |
| `TEST_CATEGORY` | VARCHAR | Test/experiment label |
| `REUTERS_PHOTO` | VARCHAR | Reuters photo used? |
| `REUTERS_LINK` | VARCHAR | Reuters link used? |
| `_ROW_NUM` | NUMBER | Row position in Sara's sheet (starts at 2) |
| `_LOADED_AT` | TIMESTAMP_NTZ | When ingested from sheet |
| `ARTICLE_DOMAIN` | VARCHAR | Domain extracted from PUBLISHED_URL (www./amp. stripped) — used for per-pub median lookup |

### Traffic KPIs (all cumulative lifetime totals as of model run)

| Column | Type | Source | Notes |
|--------|------|--------|-------|
| `STORY_ID` | VARCHAR | URL regex / DYN_STORY_META_DATA | NULL for unresolved articles |
| `TOTAL_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | All sources combined |
| `SEARCH_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | Search-driven |
| `SOCIAL_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | Social-driven |
| `DIRECT_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | Direct/typed |
| `APPLENEWS_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | O&O click-throughs from Apple News (NOT platform views) |
| `SMARTNEWS_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | O&O click-throughs from SmartNews |
| `NEWSBREAK_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | O&O click-throughs from Newsbreak |
| `SUBSCRIBER_PVS` | INTEGER | STORY_TRAFFIC_MAIN / LE | Subscriber page views |
| `AMP_PVS` | INTEGER | STORY_TRAFFIC_MAIN | AMP page views |
| `NEWSLETTER_PVS` | INTEGER | STORY_TRAFFIC_MAIN | Newsletter-sourced views |
| `YAHOO_PVS` | INTEGER | EVENTS_412949 (Amplitude) | Yahoo News platform views (page_view_count field) |
| `PUB_MEDIAN_PVS` | FLOAT | Computed | Rolling 6-month median for this publication (Oct 2025+, ≥10 articles, national only) |

### Performance vs. benchmark

| Column | Type | Notes |
|--------|------|-------|
| `ARTICLE_VS_CO_MEDIAN` | FLOAT | `(TOTAL_PVS - PUB_MEDIAN_PVS) / PUB_MEDIAN_PVS` — e.g. 0.15 = +15% above median |
| `IS_HIT` | INTEGER | 1 = at or above median, 0 = below, NULL = no benchmark available |

### Cluster aggregates (all articles in same cluster)

| Column | Type | Notes |
|--------|------|-------|
| `CLUSTER_ID` | VARCHAR | Cluster anchor (see Editorial section) |
| `CLUSTER_ARTICLE_COUNT` | INTEGER | Total articles in cluster |
| `CLUSTER_HITS` | INTEGER | Articles in cluster at or above median |
| `CLUSTER_TOTAL_PVS` | INTEGER | Sum of all TOTAL_PVS in cluster |
| `CLUSTER_SUM_OF_MEDIANS` | FLOAT | Sum of each article's PUB_MEDIAN_PVS in cluster |
| `CLUSTER_VS_CO_MEDIAN` | FLOAT | `(CLUSTER_TOTAL_PVS - CLUSTER_SUM_OF_MEDIANS) / CLUSTER_SUM_OF_MEDIANS` |
| `CLUSTER_HIT_RATE` | FLOAT | `CLUSTER_HITS / CLUSTER_ARTICLE_COUNT` |

### Cluster semantic similarity (from DYN_CONTENT_API_LATEST embeddings)

| Column | Type | Notes |
|--------|------|-------|
| `CLUSTER_AVG_SIM_DESC` | FLOAT | Average pairwise cosine similarity across description embeddings |
| `CLUSTER_MIN_SIM_DESC` | FLOAT | Minimum pairwise similarity (description) |
| `CLUSTER_MAX_SIM_DESC` | FLOAT | Maximum pairwise similarity (description) |
| `CLUSTER_AVG_SIM_FIRST400W` | FLOAT | Average pairwise cosine similarity across first-400-word embeddings |
| `CLUSTER_MIN_SIM_FIRST400W` | FLOAT | Minimum (first 400 words) |
| `CLUSTER_MAX_SIM_FIRST400W` | FLOAT | Maximum (first 400 words) |
| `CLUSTER_PAIR_COUNT` | INTEGER | Number of pairs used in similarity calculation |

### Content classification

| Column | Type | Source | Notes |
|--------|------|--------|-------|
| `PRIMARY_IAB_TOPIC` | VARCHAR | DYN_CONTENT_API_LATEST | IAB content category (e.g. "Health & Fitness") |
| `ARTICLE_ACCESS_TYPE` | VARCHAR | MCC_RAW.STORY_DATA.PUBLISHED_STORIES | Free / Metered / Sub-Only / Free (Automatic) / Sub-Only (Automatic) |

### Author aggregates (all articles by same author in tracker)

| Column | Type | Notes |
|--------|------|-------|
| `AUTHOR_ARTICLE_COUNT` | INTEGER | Total articles by this author in tracker |
| `AUTHOR_CLUSTER_DIVERSITY` | INTEGER | Distinct clusters this author contributed to |
| `AUTHOR_HIT_COUNT` | INTEGER | Articles at or above median by this author |
| `AUTHOR_HIT_RATE` | FLOAT | `AUTHOR_HIT_COUNT / AUTHOR_ARTICLE_COUNT` |
| `AUTHOR_AVG_PVS` | FLOAT | Average TOTAL_PVS across this author's articles |
| `AUTHOR_PV_STDDEV` | FLOAT | Standard deviation of PVs (consistency measure) |
| `AUTHOR_AVG_WEEKLY_OUTPUT` | FLOAT | Average articles per week of active participation |
| `AUTHOR_AVG_SIM_DESC` | FLOAT | Average description similarity across this author's articles |
| `AUTHOR_AVG_SIM_FIRST400W` | FLOAT | Average first-400-word similarity across this author's articles |

### Pipeline metadata

| Column | Type | Notes |
|--------|------|-------|
| `_MODELED_AT` | TIMESTAMP_NTZ | When this row was last produced by model_tracker.py |

---

## 8. TRACKER_WEEKLY Structure (71 columns)

TRACKER_WEEKLY = TRACKER_ENRICHED + 2 snapshot columns:

| Column | Type | Notes |
|--------|------|-------|
| `SNAPSHOT_DATE` | DATE | Most recent Monday as of pipeline run |
| `WEEKS_SINCE_PUBLISH` | INTEGER | `DATEDIFF('week', PUBLICATION_DATE, SNAPSHOT_DATE)` — for cohort/aging analysis |
| (all 69 TRACKER_ENRICHED columns) | — | Exact copy of TRACKER_ENRICHED state at snapshot time |

**Logical primary key:** `(ASSET_ID, SNAPSHOT_DATE)`

**Snapshot idempotency:** `snapshot_tracker.py` deletes any existing rows for the current Monday before inserting. Safe to re-run after a model fix.

---

## 9. Tables Quick Reference

| Table | Database.Schema | Rows (approx.) | Refresh | Purpose |
|-------|-----------------|----------------|---------|---------|
| `NATIONAL_CONTENT_TRACKER` | MCC_RAW.GROWTH_AND_STRATEGY | ~2,035 | Weekly pipeline (TRUNCATE+INSERT) | Sara's sheet in Snowflake |
| `TRACKER_ENRICHED` | MCC_PRESENTATION.CONTENT_SCALING_AGENT | ~1,886 | Weekly pipeline (CREATE OR REPLACE) | Fully enriched analytical table |
| `TRACKER_WEEKLY` | MCC_PRESENTATION.CONTENT_SCALING_AGENT | Grows ~1,886/week | Weekly pipeline (append snapshot) | Historical weekly snapshots |
| `STORY_TRAFFIC_MAIN` | MCC_PRESENTATION.TABLEAU_REPORTING | ~1B+ | Daily (platform-managed) | National O&O traffic by story+date |
| `STORY_TRAFFIC_MAIN_LE` | MCC_PRESENTATION.TABLEAU_REPORTING | Large | Daily (platform-managed) | L&E pub traffic by URL+date |
| `DYN_STORY_META_DATA` | MCC_PRESENTATION.TABLEAU_REPORTING | Large | Periodic (platform-managed) | Article metadata + URL↔STORY_ID bridge |
| `DYN_CONTENT_API_LATEST` | MCC_PRESENTATION.TABLEAU_REPORTING | Large | Periodic (platform-managed) | Live content API snapshot + embeddings |
| `PUBLISHED_STORIES` | MCC_RAW.STORY_DATA | Large | Periodic (platform-managed) | CMS story data including ACCESS_TYPE |
| `EVENTS_412949` | MCC_AMPLITUDE.AMPLITUDE | Large | Daily (platform-managed) | Yahoo News Amplitude events (yahoo_news_ingest) |
| `EVENTS_412950` | MCC_AMPLITUDE.AMPLITUDE | Large | Daily (platform-managed) | Paywall funnel events (not yet used) |
| `EVENTS_669032` | MCC_AMPLITUDE.AMPLITUDE | ~1.35B | Daily (platform-managed) | O&O Amplitude events (not yet used) |
| `AMP_ARTICLE_PAGEVIEWS` | MCC_PRESENTATION.TABLEAU_REPORTING | ~208M | Daily (platform-managed) | AMP traffic — already surfaced via STORY_TRAFFIC_MAIN.AMP_ARTICLE_PAGEVIEWS |

---

## 10. Known Data Sources — Not Currently Used

| Source | Location | Rows | Why not used | Path to use |
|--------|----------|------|--------------|-------------|
| GSC search data | Multiple GSC tables | ~3,966 (Discover only, 1 day) | Only Discover data available; web search not populated yet | Revisit when Chad enables web search data |
| STORYDATA paywall metrics | `MCC_PRESENTATION.TABLEAU_REPORTING.STORYDATA_BY_CONTENTTYPE_BY_PUB_DATE_WITHPWSTOPS` | 112M | Table only has story IDs up to ~312M; our tracker articles are 314M–315M | Will backfill retroactively as new data arrives |
| STORY_TOPIC classification | `MCC_PRESENTATION.TABLEAU_REPORTING.STORY_TOPIC` | Unknown | Only covers story IDs up to ~223M — doesn't reach current articles | Check for refresh; use IAB topic from DYN_CONTENT_API_LATEST instead |
| PLAINTEXT body | Various | Large | Available via DYN_CONTENT_API_LATEST | Add to model if LLM analysis workflow is built |
| Paywall funnel events | EVENTS_412950 | Large | Paywall/subscription focused; not traffic KPIs | Wire up if paywall conversion analysis is needed |

### Confirmed Dead Ends

| Source | Why it's a dead end |
|--------|---------------------|
| MSN article-level traffic | MSN pageviews are not trackable at the article level in our Snowflake instance. Platform-side only in Tarrow's spreadsheet — not equivalent to O&O PVs. |
| `MCC_CLEAN.AMPLITUDE.ARTICLE_ACCESS_TYPE` | STORY_ID values are 274-trillion-digit Amplitude-internal identifiers, NOT McClatchy CMS story IDs. Do not join to this table. |
| `MCC_PRESENTATION.TABLEAU_REPORTING.PUBLISHER_TRADEDESK_DATA` | Programmatic ad data — no story-level traffic. |
| `MCC_PRESENTATION.TABLEAU_REPORTING.SEO_EXTRACT_ROLLUP` | SEO keyword data; no traffic metrics. |
| Cortex semantic similarity | `SNOWFLAKE.CORTEX.EMBED_TEXT_768` returns SQL compilation error on the `mcclatchy_eval` account. Use DYN_CONTENT_API_LATEST embeddings directly. |

---

## 11. Pipeline — Weekly Workflow

**Authoritative operational reference: [PIPELINE.md](PIPELINE.md).** This section summarizes the Snowflake-relevant pieces; PIPELINE.md documents the full cross-repo flow including data-headlines.

### Automated — two chained GitHub Actions workflows

| When | Workflow | Scripts | Purpose |
|------|----------|---------|---------|
| Mon 9:00 AM CDT | ops-hub `.github/workflows/snowflake-tracker-sync.yml` | `ingest_tracker.py` → `model_tracker.py` → `enrich_tracker.py` | Push Sara's sheet to Snowflake, rebuild TRACKER_ENRICHED, write enrichment columns back to Sara's sheet |
| Mon 2:00 PM CDT | data-headlines `.github/workflows/weekly_ingest.yml` | `download_tarrow.py` → `snowflake_enrich.py` → `generate_site.py` → `update_snapshots.py` | Pull TRACKER_ENRICHED into JSON, regenerate Headlines site |

Zero manual steps. The 5-hour buffer between workflows lets `TRACKER_ENRICHED` finish rebuilding before data-headlines queries it.

### Manual — on-demand pipeline (`run_pipeline.sh`)

```bash
bash scripts/run_pipeline.sh              # Full pipeline including step 4 snapshot
bash scripts/run_pipeline.sh --skip-sheet  # Skip writing back to Sara's sheet
```

Used for ad-hoc runs and local testing. Not required — the automated workflow above runs the same scripts.

### Steps

| Step | Script | What it does | Run time |
|------|--------|-------------|----------|
| 1 | `ingest_tracker.py` | Reads Sara's Google Sheet → TRUNCATE + INSERT into `NATIONAL_CONTENT_TRACKER`. Safety: REQUIRED_SHEET_COLUMNS + MIN_SAFE_ROWS=500 before truncate | ~30–60s |
| 2 | `model_tracker.py` | Builds `TRACKER_ENRICHED` from all 8 sources via CTE SQL. Safety: aborts if result <500 rows. Author names normalized via CASE in base `tracker` CTE | ~30–45s |
| 3 | `enrich_tracker.py` | Reads TRACKER_ENRICHED → writes 14 enrichment cols back to Sara's sheet + rebuilds Trends tab | ~60–90s |
| 4 | `snapshot_tracker.py` (manual/optional) | Appends current-Monday snapshot to `TRACKER_WEEKLY` (DELETE+INSERT). Currently not in the automated workflow | ~15s |

### Failure behavior

- **Automated workflows:** GitHub Actions step failure surfaces in the run summary. Both workflows have `timeout-minutes` on every step. Re-run manually via "Run workflow" button. TRACKER_ENRICHED uses `CREATE OR REPLACE TABLE` which is atomic — a failed build leaves the prior good table intact.
- **Manual run_pipeline.sh:** Uses `set -euo pipefail` — any step failure stops the pipeline. No partial state is committed.

### Prerequisites

- GitHub Actions secrets (both repos): `SNOWFLAKE_RSA_KEY_B64` (base64 RSA key), `GOOGLE_SERVICE_ACCOUNT_JSON` (base64 service account)
- Local dev: `~/.credentials/growth_strategy_service_rsa_key.p8` + `~/.credentials/pierce-tools.json` (env var overrides supported)
- Python 3.11 with packages: `snowflake-connector-python`, `cryptography`, `gspread`, `google-auth`

---

## 12. SQL Patterns & Quirks

### POSIX regex (Snowflake ERE — NOT PCRE)

```sql
-- WRONG: \d is not a digit class in Snowflake POSIX ERE
REGEXP_SUBSTR(url, 'article(\\d{7,})', 1, 1, 'e', 1)

-- CORRECT: use [0-9]
REGEXP_SUBSTR(url, 'article([0-9]{7,})', 1, 1, 'e', 1)

-- Yahoo cms_id JSON extraction
REGEXP_SUBSTR(EVENT_PROPERTIES:cms_id::VARCHAR, '[0-9]+')::BIGINT
```

### Deduplication with QUALIFY

When joining tables that may have multiple rows per ASSET_ID (e.g., Sara's sheet has 2 rows for same article, and DYN_CONTENT_API_LATEST also has duplicates):

```sql
-- Deduplicate BEFORE joining to prevent row multiplication
SELECT t.ASSET_ID, d.EMBEDDING
FROM national_content_tracker t
JOIN DYN_CONTENT_API_LATEST d ON d.URL = t.PUBLISHED_URL
QUALIFY ROW_NUMBER() OVER (PARTITION BY t.ASSET_ID ORDER BY t._ROW_NUM) = 1
```

Without QUALIFY, 2 tracker rows × 2 content API rows = 4 rows for one article.

### Number type for STORY_ID joins

STORY_IDs in `MCC_RAW.STORY_DATA.PUBLISHED_STORIES` are stored as NUMBER, not VARCHAR. Use `TRY_TO_NUMBER()` when joining from VARCHAR:

```sql
LEFT JOIN article_access aa ON TRY_TO_NUMBER(b.story_id) = aa.STORY_ID
```

### URL normalization

```sql
-- Snowflake: normalize URLs for L&E joins
RTRIM(CANONICAL_URL, '/') = RTRIM(:url, '/')

-- Python (for enrich_tracker.py lookups)
url = url.strip().rstrip('/')
url = re.sub(r'^https?://', '', url)
```

### URL scheme inconsistency

URLs are stored inconsistently (`https://` vs `http://`). Always pass both:
```sql
WHERE RTRIM(CANONICAL_URL, '/') IN (%(https_url)s, %(http_url)s)
```

### Company median benchmark

```sql
-- Rolling 6-month median per publication (Oct 2025+, national only, ≥10 articles)
SELECT
    m.PUBLICATION,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY article_totals.total) AS median_pvs
FROM (
    SELECT t.STORY_ID, m.PUBLICATION, SUM(t.ALL_PAGEVIEWS) AS total
    FROM STORY_TRAFFIC_MAIN t
    JOIN DYN_STORY_META_DATA m ON t.STORY_ID = m.ID
    WHERE t.EVENT_DATE >= '2025-10-01'
    GROUP BY t.STORY_ID, m.PUBLICATION
) article_totals
GROUP BY m.PUBLICATION
HAVING COUNT(*) >= 10
```

### Yahoo traffic via Amplitude

```sql
-- Yahoo News platform views (not O&O click-throughs)
SELECT
    REGEXP_SUBSTR(EVENT_PROPERTIES:cms_id::VARCHAR, '[0-9]+')::BIGINT AS story_id,
    SUM(EVENT_PROPERTIES:page_view_count::INTEGER) AS yahoo_pvs
FROM MCC_AMPLITUDE.AMPLITUDE.EVENTS_412949
WHERE EVENT_TYPE = 'yahoo_news_ingest'
  AND EVENT_PROPERTIES:cms_id IS NOT NULL
GROUP BY 1
```

---

## 13. Important Distinctions

### Author name canonicalization

Sara's tracker has historically contained spelling variants for the same author (`Lauren J-G` vs `Lauren JG` vs `Lauren Jarvis-Gibson`; `Hanna WIckes` vs `Hanna Wickes`). Without normalization these fragment author-level aggregates — a single person's hit rate gets split across two or three rows.

**Normalization happens in four places and must be kept in sync:**

| Location | Applied to | Implementation |
|---|---|---|
| `ops-hub/scripts/model_tracker.py` | Snowflake base CTE — normalizes before all `GROUP BY AUTHOR` aggregates | `CASE TRIM(AUTHOR) WHEN 'Lauren J-G' THEN 'Lauren JG' …` |
| `ops-hub/scripts/enrich_tracker.py` | Trends-tab per-author performance table | `_AUTHOR_ALIASES` dict |
| `data-headlines/generate_site.py` | `tracker_raw["Author"]` after Excel load, before any groupby | `_AUTHOR_ALIASES` dict |
| `data-headlines/generate_grader.py` | Per-headline card author display | `_AUTHOR_ALIASES` dict |

**Canonical authors (2026-04-19):** Allison Palmer, Hanna Wickes, Lauren JG, Lauren Schuster, Ryan Brennan, Samantha Agate.

**Current aliases:**
- `Lauren J-G` → `Lauren JG`
- `Lauren Jarvis-Gibson` → `Lauren JG`
- `Hanna WIckes` → `Hanna Wickes`

If a new variant surfaces, add it to **all four** locations in the same PR. The upstream Snowflake CTE is the primary normalization — the downstream dicts defend against sheet-level typos that were introduced after the last ingest.

### National Content team portfolio scope

The pipeline is scoped to the National Content team's **13 publications**. Canonical list: `data/national-portfolio.js` in ops-hub.

Domains:
`usmagazine.com`, `womansworld.com`, `miamiherald.com`, `kansascity.com`, `charlotteobserver.com`, `star-telegram.com`, `sacbee.com`, `newsobserver.com`, `centredaily.com`, `coralspringsflnews.com`, `miramarflnews.com`, `pembrokepinesflnews.com`, `thestate.com`.

**Out of scope (filtered out):** `lifeandstylemag.com`, `modmomsclub.com` (per Sara Vallone 2026-04-13), plus `modmomsclub.local` / `wpenginepowered` staging URLs.

Any new SEMrush pull, Amplitude query, Marfeel filter, or new Snowflake aggregation that claims to be "team scope" must use this domain list.

### APPLENEWS_PVS ≠ Apple News platform views

`APPLENEWS_PAGEVIEWS` in Snowflake = click-throughs **back to O&O** from Apple News. This is NOT native Apple News views (reading within the Apple News app). Native platform views only exist in Tarrow's spreadsheet. Do not conflate — they measure different things.

Same applies to `SMARTNEWS_PVS` and `NEWSBREAK_PVS`.

### YAHOO_PVS = Yahoo News platform views

`YAHOO_PVS` from EVENTS_412949 ARE platform-side views — Yahoo sends Amplitude events with a `page_view_count` field per article ingest. This is the one syndication platform with true platform-side view counts in Snowflake.

### L&E vs. National benchmarks

L&E (Us Weekly, Women's World, Life & Style) have separate traffic tables and separate audience sizes. Never mix L&E PVs with national articles when computing benchmarks. `PUB_MEDIAN_PVS` is computed per-publication separately.

---

## 14. Transitional Notes

### Sara's Google Sheet → CMS replacement (Chad Bruton, 2026-04-18)

Sara's sheet goes away in a few weeks/months once CMS/CSA centralizes national content tracking. When that happens:

1. Identify the CMS-derived source table (Chad will provide)
2. Replace the `tracker` CTE in `model_tracker.py` — all joins, CTEs, and output columns remain unchanged
3. Update `ingest_tracker.py` or deprecate it if the CMS table feeds Snowflake directly

The model is intentionally decoupled from the sheet ingest so this swap is a single CTE change.

### Revenue data (Ryan Spalding, 2026-04-20 meeting)

Direct-sold revenue (Naviga) and programmatic (GAM) are in Snowflake. Architecture contact is Derek Knostman. Not yet integrated into TRACKER_ENRICHED — gate is the 2026-04-20 meeting with Ryan Spalding to confirm story-level join keys.

### Sigma access

Sigma setup is blocked on permissions provisioning. Chad Bruton is the contact. When resolved, `TRACKER_ENRICHED` and `TRACKER_WEEKLY` are the primary data sources for Sigma workbooks.

---

## 15. Revenue Data

Confirmed in Snowflake as of 2026-04-16 (Ryan Spalding's team):
- **Direct sold:** Naviga
- **Programmatic:** GAM
- **Sigma dashboard:** `STAR-Automation-3wA6q4da4CrVGCyhIMqk2E`
- **Architecture contact:** Derek Knostman (built it); Ryan Spalding (domain contact)
- Not yet integrated into any Pierce scripts — gate: Ryan Spalding meeting 2026-04-20.

---

## 16. How to Add a New Data Source

1. **Discovery:** Query the candidate table in `USER$PIERCE_WILLIAMS` scratch space or via interactive Snowflake session. Confirm join key, row counts, and coverage before touching any pipeline scripts.

2. **Check join key type:** Snowflake is strict about type equality in joins. If joining by STORY_ID, check whether the target table stores it as VARCHAR or NUMBER. Use `TRY_TO_NUMBER()` for VARCHAR→NUMBER cross-joins.

3. **Add a new CTE to model_tracker.py** following the existing pattern:
   ```sql
   new_source AS (
       SELECT story_id, some_column
       FROM MCC_RAW.SOME_SCHEMA.SOME_TABLE
       WHERE <filter conditions>
       -- Add QUALIFY if the source has duplicates per article
       QUALIFY ROW_NUMBER() OVER (PARTITION BY story_id ORDER BY ...) = 1
   ),
   ```

4. **Add LEFT JOIN in the `base` CTE** (not in final SELECT — keep business logic in CTEs):
   ```sql
   LEFT JOIN new_source ns ON <join key> = ns.story_id
   ```

5. **Add column to final SELECT** with a COALESCE/type cast as appropriate.

6. **Add column to `create_tracker_weekly.py`** DDL (for new snapshots to include it).
   - Note: existing TRACKER_WEEKLY rows won't have the new column — use `ALTER TABLE ... ADD COLUMN` if needed, or accept NULLs for old snapshots.

7. **Update `snapshot_tracker.py`** INSERT column list to include the new column.

8. **Run full pipeline** and verify row count matches TRACKER_ENRICHED before and after.

9. **Update this document** (Section 6 Data Source Map, Section 7 Column Reference, Section 9 Tables Quick Reference).

---

## 17. Known Limitations

| Limitation | Detail |
|------------|--------|
| Cortex not available | `SNOWFLAKE.CORTEX.EMBED_TEXT_768` returns SQL compilation error on this eval account |
| L&E excluded from national median | `STORY_TRAFFIC_MAIN_LE` is a separate table; never mix in benchmark calculations |
| URL scheme inconsistency | https vs http stored inconsistently — always pass both variants |
| Tarrow ≠ Snowflake for syndication | Tarrow has platform-side views (Apple News native, MSN); Snowflake has O&O click-throughs only. Both are valuable; they are not the same metric |
| Eval account constraints | Some enterprise features (Cortex, etc.) may not be enabled on the `mcclatchy_eval` account |
| Cluster structure only in sheet | Parent/child cluster relationships only exist in Sara's sheet → NATIONAL_CONTENT_TRACKER. This table is the only source of CLUSTER_ID in the data model. |
| STORYDATA coverage gap | `STORYDATA_BY_CONTENTTYPE_BY_PUB_DATE_WITHPWSTOPS` only covers story IDs up to ~312M; our current tracker is 314M–315M. Will backfill retroactively. |
| GSC limited to Discover | Google Search Console data currently has ~3,966 rows (Discover impressions only, 1 day). Web search not yet populated. |
| Yahoo cms_id not always present | Some yahoo_news_ingest events have null cms_id; these are excluded from YAHOO_PVS aggregation. |
