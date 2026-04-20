# National Content Pipeline — End-to-End Reference

The canonical, definitive document for the weekly data pipeline that powers Sara Vallone's content tracker enrichment *and* the Headlines Analysis site. Everything you need to diagnose, extend, or hand off this system lives here.

**Companion documents:**
- `SNOWFLAKE.md` — connection details, credentials, account, every table we read/write, column-level reference of `TRACKER_ENRICHED`.
- `REFERENCE.md` — team contacts, repos, non-pipeline systems.

---

## 1. One-Page Summary

The pipeline runs in two chained GitHub Actions workflows every Monday. Zero manual steps.

```
┌──────────────────────────────────────────────────────────────────┐
│ Monday 9:00 AM CDT — ops-hub .github/workflows/snowflake-tracker-sync.yml │
│                                                                  │
│  Sara's Google Sheet                                             │
│   │ (1) ingest_tracker.py                                        │
│   ▼                                                              │
│  MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER            │
│   │ (2) model_tracker.py                                         │
│   ▼                                                              │
│  MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED         │
│   │ (3) enrich_tracker.py                                        │
│   ▼                                                              │
│  Sara's Google Sheet (cols AA–AN populated with enrichment)      │
└──────────────────────────────────────────────────────────────────┘
                     │ (5 hours buffer)
                     ▼
┌──────────────────────────────────────────────────────────────────┐
│ Monday 2:00 PM CDT — data-headlines .github/workflows/weekly_ingest.yml │
│                                                                  │
│  (4) download_tarrow.py       → Top Stories 2026 Syndication.xlsx│
│  (5) snowflake_enrich.py      → data/snowflake_enrichment.json   │
│  (6) generate_site.py         → docs/index.html + sub-pages      │
│  (7) update_snapshots.py      → data/weekly_snapshots.json       │
│   │                                                              │
│   ▼                                                              │
│  git commit + push  →  GitHub Pages auto-deploy                  │
│  https://piercewilliams.github.io/data-headlines/                │
└──────────────────────────────────────────────────────────────────┘
```

**Two authorities, one pipeline.** Sara's sheet is the canonical article universe. Snowflake enriches it with traffic, cluster, and semantic stats. Tarrow (Chris Tarrow's Apple News sheet) adds platform-native Apple News metrics (featuring flag, engagement, SN channels) to the headlines site only — Tarrow data does **not** flow back to Sara's sheet.

**Cadence.** Runs weekly. The 5-hour gap between workflows is intentional — it lets Snowflake's `TRACKER_ENRICHED` rebuild finish before data-headlines pulls from it. Freshness is not strictly enforced, but `snowflake_enrich.py` aborts if `TRACKER_ENRICHED` has fewer than 500 rows (the Monday morning sync is the gate).

---

## 2. Stage-by-Stage

### Stage 1 — `ingest_tracker.py` (ops-hub)

**Purpose:** push Sara's Google Sheet into Snowflake so downstream SQL can join against it.

**Source:** `https://docs.google.com/spreadsheets/d/14_0eK46g3IEj7L_yp9FIdWwvnuYI5f-vAuP7DDhSPg8/` (sheet1, "Data" tab). Auth via Google service account `pierce-tools.json` (stored as base64 in `GOOGLE_SERVICE_ACCOUNT_JSON` GitHub secret).

**Target:** `MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER`. Auth via RSA key-pair (`GROWTH_AND_STRATEGY_SERVICE_USER`, key stored as base64 in `SNOWFLAKE_RSA_KEY_B64` GitHub secret).

**Behavior:** `CREATE TABLE IF NOT EXISTS` → `TRUNCATE` → batch `INSERT` in groups of 500. Full replace on every run.

**Safety gates:**
- `REQUIRED_SHEET_COLUMNS = {Asset_ID, Author, Published URL/Link, Headline, Content_Type}` — aborts before truncating if any required header is missing.
- `MIN_SAFE_ROWS = 500` — aborts before truncating if non-empty row count is below this floor. Sara's tracker normally has ~1,900 rows; below 500 almost always means a partial sheet read.
- Post-insert row-count verification — raises if Snowflake's count doesn't match what we tried to insert.

**Column map:** 26 sheet headers → Snowflake columns. See `ingest_tracker.py:COLUMN_MAP`.

**Runtime:** 30–60 seconds.

**Log location:** GitHub Actions → ops-hub → "Snowflake Tracker Sync" → step "Ingest tracker sheet → Snowflake".

### Stage 2 — `model_tracker.py` (ops-hub)

**Purpose:** assemble the analytical surface (`TRACKER_ENRICHED`) by joining tracker metadata against eight Snowflake sources.

**Source tables** (all read-only):

| Table | Database.Schema | Contribution |
|---|---|---|
| `NATIONAL_CONTENT_TRACKER` | `MCC_RAW.GROWTH_AND_STRATEGY` | Editorial metadata (from Stage 1) |
| `STORY_TRAFFIC_MAIN` | `MCC_PRESENTATION.TABLEAU_REPORTING` | National O&O traffic by STORY_ID |
| `STORY_TRAFFIC_MAIN_LE` | `MCC_PRESENTATION.TABLEAU_REPORTING` | L&E traffic by CANONICAL_URL |
| `DYN_STORY_META_DATA` | `MCC_PRESENTATION.TABLEAU_REPORTING` | URL ↔ STORY_ID bridge |
| `DYN_CONTENT_API_LATEST` | `MCC_PRESENTATION.TABLEAU_REPORTING` | IAB topic + embeddings for similarity |
| `EVENTS_412949` | `MCC_AMPLITUDE.AMPLITUDE` | Yahoo News platform views |
| `PUBLISHED_STORIES` | `MCC_RAW.STORY_DATA` | Article access type (Free / Metered / Sub-Only) |
| Self-joins | — | Cluster and author aggregates |

**Target:** `MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED` — `CREATE OR REPLACE TABLE` (atomic per Snowflake docs; prior table remains intact if the build query fails).

**Key design decisions:**

1. **Author normalization in the base CTE.** The `tracker` CTE applies a `CASE` statement that maps known variants to canonical names (`Lauren J-G` → `Lauren JG`, `Lauren Jarvis-Gibson` → `Lauren JG`, `Hanna WIckes` → `Hanna Wickes`). Without this, per-author aggregates (`author_article_count`, `author_hit_rate`, `author_avg_pvs`) fragment across spellings. This **must** stay in sync with `_AUTHOR_ALIASES` in `enrich_tracker.py` and `generate_site.py`.

2. **Story ID resolution — three passes.** First wins:
   - Regex extract from URL (`article([0-9]{7,})`) — catches ~90% of national articles.
   - URL join against `DYN_STORY_META_DATA` — fills the gap.
   - `CANONICAL_URL` match in `STORY_TRAFFIC_MAIN_LE` — covers L&E publications.

3. **Benchmark window.** `BENCHMARK_START_DATE = "2025-10-01"` in both `model_tracker.py` and `enrich_tracker.py`. Rolling ~12-month cutoff — bump each October. Older traffic skews medians low and inflates hit rate.

4. **Cluster anchoring.** `COALESCE(NULLIF(TRIM(PARENT_ID), ''), ASSET_ID) AS cluster_id` — child rows resolve to their parent's `ASSET_ID`; parents use their own ID. This becomes the join key for all cluster aggregates.

5. **Out-of-scope domain filter.** Mod Moms Club `modmomsclub.local` and `wpenginepowered` URLs are excluded from the base CTE — these are staging/preview URLs.

**Safety gates:**
- Post-build row count — raises if `< 500` (suspiciously low; indicates a silent partial build).
- The entire build is wrapped in `try/finally` so the connection is always closed.

**Output shape:** ~1,900 rows, 70 columns. See `SNOWFLAKE.md` Section 7 for column-by-column reference.

**Runtime:** 30–45 seconds.

### Stage 3 — `enrich_tracker.py` (ops-hub)

**Purpose:** write enrichment columns back to Sara's Google Sheet so she and her team can use Snowflake traffic data directly in the tracker.

**Source:** `TRACKER_ENRICHED` + live Snowflake traffic queries (`STORY_TRAFFIC_MAIN` + `STORY_TRAFFIC_MAIN_LE` + `DYN_STORY_META_DATA`).

**Target:** Sara's Google Sheet "Data" tab, columns AA–AN (14 enrichment columns). A separate "Trends" tab is also rebuilt.

**Columns written** (14 total, in order):

| Sheet Col | Header | Source | Notes |
|---|---|---|---|
| AA | `story_id` | `DYN_STORY_META_DATA.ID` | Resolved via 3-strategy lookup |
| AB | `total_pvs` | `STORY_TRAFFIC_MAIN(_LE)` | All-source lifetime PVs |
| AC | `search_pvs` | same | Search-driven |
| AD | `social_pvs` | same | Social-driven |
| AE | `direct_pvs` | same | Direct/typed |
| AF | `applenews_pvs` | same | O&O click-throughs from Apple News |
| AG | `smartnews_pvs` | same | O&O click-throughs from SmartNews |
| AH | `newsbreak_pvs` | same | O&O click-throughs from Newsbreak |
| AI | `subscriber_pvs` | same | Subscriber page views |
| AJ | `cluster_id` | Computed from tracker `Content_Type` / parent-ref | Blank for child rows |
| AK | `cluster_total_pvs` | Sum across cluster | Blank for child rows |
| AL | `cluster_vs_co.median` | `(cluster_pvs − Σ pub_medians) / Σ pub_medians` | e.g. `+12%`; Chris Palo method. Blank for child rows. |
| AM | `article_vs_co.median` | `(article_pvs − pub_median) / pub_median` | e.g. `−38%` |
| AN | `cluster_avg_sim_desc` | `TRACKER_ENRICHED.CLUSTER_AVG_SIM_DESC` | **Parent row only** — child rows get `""` (see `PARENT_ONLY_EXTRAS`) |

**Three-strategy URL-to-story-ID lookup** (same as `model_tracker.py`):
1. Regex extract `article([0-9]{7,})` from URL — fast, covers ~90% of national articles.
2. URL → `DYN_STORY_META_DATA` lookup — fills the gap (both `http://` and `https://` variants passed).
3. `CANONICAL_URL` match in `STORY_TRAFFIC_MAIN_LE` — covers L&E publications (Us Weekly, Woman's World).

**Batting average.** At the bottom of the data block, a summary row is written with the cluster-level hit rate ("1-in-N" format). Chris Palo's target: 1-in-4. Current: roughly 1-in-3.3.

**Parent-only columns.** `PARENT_ONLY_EXTRAS = {"cluster_avg_sim_desc"}` — this set lists columns that should only appear on the cluster parent row, blank on child rows. Enforced via:
```python
if not cs.get("cluster_id"):   # truthy only for parent rows
    for col in PARENT_ONLY_EXTRAS:
        row_extras[col] = ""
```

**Trends tab.** A separate worksheet within Sara's tracker, rewritten every run. Includes per-author performance table using the same `_AUTHOR_ALIASES` normalization applied in `generate_site.py`.

**Safety.** Google Sheets writes are sequential and not atomic across all operations — if Google API goes down mid-run, the sheet could be left in a partial state. This is a known risk documented in the script.

**Runtime:** 60–90 seconds.

### Stage 4 — `download_tarrow.py` (data-headlines)

**Purpose:** download Chris Tarrow's weekly Apple News syndication Google Sheet as XLSX. This is the only source of platform-native Apple News metrics (featuring flag, active-time engagement, SmartNews channel distributions, MSN views, push notification CTR) — Snowflake has none of this.

**Source:** Google Sheet `1Va8hnBtaX8fEFU8FVPpFcAN82o5RDF9fJBaJvRzrN7s` ("Top Stories 2026 Syndication"), exported as XLSX via Drive API.

**Target:** `Top Stories 2026 Syndication.xlsx` (git-committed by the workflow).

**Tarrow vs. Sara's tracker.** Tarrow lists the top-performing articles across all McClatchy Apple News brands. Sara's tracker is our team's own production inventory. The intersection is small (~14 articles out of ~1,900 Sara's-tracker articles) because Tarrow's universe is Apple News top-performers across all brands, not our team's output. This is a genuine scope mismatch, not a pipeline bug.

**Fail behavior.** Workflow step uses `continue-on-error: true` — if Google Drive is down, the site still builds using Snowflake only (no engagement metrics, no SN channel data). A warning is logged but the pipeline doesn't fail.

**Runtime:** 5–15 seconds.

### Stage 5 — `snowflake_enrich.py` (data-headlines)

**Purpose:** pull `TRACKER_ENRICHED` into a JSON blob consumable by `generate_site.py` (which has no direct Snowflake dependency at runtime).

**Source:** `MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED` (read via same RSA key-pair auth as ops-hub). Query pulls all ~70 columns; ~1,900 rows total.

**Target:** `data/snowflake_enrichment.json`. Structure:
```json
{
  "generated": "2026-04-19T19:00:00Z",
  "row_count": 1907,
  "articles": {
    "<url_norm>": {
      "headline": "...", "author": "...", "publication_date": "...",
      "total_pvs": 12345, "cluster_avg_sim_desc": 0.78,
      "published_url": "...", "article_access_type": "Free", ...
    }
  },
  "authors": { "<author_name>": { "article_count": 42, ... } }
}
```

**Key field:** `url_norm` — the RTRIM'd, www-normalized URL used across the pipeline for joins.

**Freshness gate.** Raises `SystemExit` if row count < 500 — this is the primary guard against building the site off a broken Monday-morning sync. Message directs operator to check the ops-hub workflow run before re-running.

**Runtime:** 10–20 seconds.

### Stage 6 — `generate_site.py` (data-headlines)

**Purpose:** assemble the Headlines Analysis HTML site from (a) Snowflake-derived article data, (b) Tarrow's XLSX platform metrics, and (c) Sara's tracker (loaded directly from `Tracker Template.xlsx` for author/vertical lookups).

**Key joins:**
- `_build_sf_an_2026(sf_articles)` — builds the Apple News 2026 base DataFrame from Snowflake. Every article gets `Featured by Apple = "No"` as placeholder (gets overwritten by Tarrow join if present).
- `_enrich_an_with_tarrow(base, tarrow)` — URL-first join (Publisher Article ID vs `_pub_url`), headline fallback. Drops `"Featured by Apple"` from base *before* merge to avoid pandas `_x/_y` suffix collision, then restores from Tarrow or `"No"`. Enrichment columns are cast to `float64` after merge so scipy statistical functions don't choke on object-dtype NaN.
- `_HAS_AN_ENGAGEMENT` — gate on `AT_COL.notna().sum() >= 30` *and* the AT_COL + Total Views intersection also >= 30. Below threshold, engagement analysis is skipped entirely.
- `_AUTHOR_ALIASES` — normalization applied to `tracker_raw["Author"]` after the Excel load, before any groupby. Lauren J-G → Lauren JG, Hanna WIckes → Hanna Wickes. Since `model_tracker.py` also normalizes at the Snowflake side, names are consistent across all data paths.

**Pages generated:**
- `docs/index.html` — main findings page (13 tiles)
- `docs/playbook/index.html` — editorial playbooks (confidence-sorted)
- `docs/author-playbooks/index.html` — per-author performance profiles
- `docs/experiments/index.html` — directional findings (auto-regenerated each run)
- `docs/grader/index.html` — headline grader (daily run, separate workflow)

**Date display.** `REPORT_DATE = datetime.now().strftime("%B %-d, %Y")` — e.g. "April 19, 2026". All page headers and footers use this; archive labels stay at monthly granularity (`%B %Y`) because archives are per-month.

**Scope.** The site is for the National Content team portfolio. All "T1" references have been removed — the site no longer claims to be scoped exclusively to that tier.

**Runtime:** 60–120 seconds.

### Stage 7 — `update_snapshots.py` (data-headlines)

**Purpose:** append a snapshot of `build_summary.json` into `weekly_snapshots.json` for longitudinal tracking.

**Output surfaced at:** `docs/index.html` bottom and `docs/experiments/index.html`.

**Runtime:** 1–2 seconds.

---

## 3. Credentials & Secrets

All credentials are injected as GitHub Actions secrets, validated for emptiness at each workflow step, and decoded to `/tmp/` files just before use.

| Secret | Used by | Purpose |
|---|---|---|
| `SNOWFLAKE_RSA_KEY_B64` | ops-hub + data-headlines | Base64 of `growth_strategy_service_rsa_key.p8`. Same key in both repos. |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | ops-hub + data-headlines | Base64 of `pierce-tools.json` service account. Same account in both repos. |

**Rotation.** If the RSA key is rotated, update the `SNOWFLAKE_RSA_KEY_B64` secret in *both* ops-hub and data-headlines repos. Same for the service account JSON.

**Local development.** Scripts read `SNOWFLAKE_PRIVATE_KEY_PATH` and `GOOGLE_SERVICE_ACCOUNT_FILE` env vars, defaulting to `~/.credentials/growth_strategy_service_rsa_key.p8` and `~/.credentials/pierce-tools.json` respectively.

---

## 4. Failure Modes & Recovery

### Monday 9am CDT sync fails

**Symptom:** GitHub Actions shows failed "Snowflake Tracker Sync" run.

**Impact:** Sara's tracker doesn't get enriched, `TRACKER_ENRICHED` is stale, data-headlines 2pm run will either use stale data or abort at the 500-row floor gate.

**Recovery:**
1. Read the failed step's log.
2. Fix the root cause (rare failure modes: expired service account, Snowflake warehouse suspended, Google Sheets schema change).
3. Re-run via Actions → "Snowflake Tracker Sync" → "Run workflow".
4. If the 2pm data-headlines run has already fired and failed on the 500-row gate, re-run that workflow too once the 9am sync is green.

### 9am sync succeeds but 2pm site build fails

**Symptom:** GitHub Actions shows failed "Weekly Site Refresh" run in data-headlines.

**Impact:** Live site is stale (still showing last successful run's data).

**Recovery:**
1. Common causes: Tarrow XLSX schema change (new column added / renamed), scipy crash on edge case engagement data, pandas version mismatch.
2. For Tarrow schema changes: update column references in `generate_site.py` and push.
3. For data-edge-case crashes: the pipeline's pearsonr/qcut guards should prevent this — if one surfaces, add a similar guard.
4. Re-run via Actions → "Weekly Site Refresh" → "Run workflow".

### Sheet column missing from Sara's tracker

**Symptom:** `ingest_tracker.py` raises `RuntimeError: Required columns missing from tracker sheet`.

**Impact:** Snowflake tables are **not** truncated — prior week's data is safe. Everything downstream continues to work on stale data until the sheet is fixed.

**Recovery:** Fix the sheet header (Sara may have renamed a column), re-run workflow.

### Tarrow XLSX unavailable

**Symptom:** "Download Tarrow" step shows red but workflow continues (`continue-on-error: true`).

**Impact:** Site builds from Snowflake only. Engagement analysis, SN channel distribution, MSN, push notifications all drop out. Main findings (tiles) still render based on Snowflake O&O data.

**Recovery:** Optional — re-run workflow later when Tarrow sheet is published. No immediate action required.

### Author name variant appears that `_AUTHOR_ALIASES` doesn't handle

**Symptom:** A single author appears as two tiles on the site, or per-author aggregates look fragmented.

**Impact:** Wrong numbers in author-level analysis.

**Recovery:** Add the alias in **all three** places — they must stay in sync:
1. `ops-hub/scripts/model_tracker.py` — `CASE TRIM(AUTHOR) WHEN ... THEN 'Canonical'` in the `tracker` CTE.
2. `ops-hub/scripts/enrich_tracker.py` — `_AUTHOR_ALIASES` dict at the top of the Trends tab section.
3. `data-headlines/generate_site.py` — `_AUTHOR_ALIASES` dict applied to `tracker_raw["Author"]`.
4. `data-headlines/generate_grader.py` — `_AUTHOR_ALIASES` dict in `_headline_card`.

Then trigger both workflows to regenerate everything.

---

## 5. Adding a New Data Source to `TRACKER_ENRICHED`

See `SNOWFLAKE.md` Section 16 for the full walkthrough. Summary:
1. Query the candidate table in `USER$PIERCE_WILLIAMS` scratch to confirm join key + row count.
2. Add a new CTE in `model_tracker.py` with `QUALIFY` if duplicates per article.
3. Add a `LEFT JOIN` in the `base` CTE.
4. Add the column to the final SELECT.
5. Update `SNOWFLAKE.md` Section 7 with the new column.

---

## 6. Scope — National Content Team Portfolio

The pipeline is scoped to the National Content team's 13 publications. Authoritative list: `data/national-portfolio.js` in ops-hub.

| Brand | Domain | Asset Prefix | Verticals |
|---|---|---|---|
| Us Weekly | usmagazine.com | UW | Discover, Mind/Body |
| Woman's World | womansworld.com | WW | Discover, Everyday Life, Experiences, Mind/Body |
| Miami Herald | miamiherald.com | MH | Discover, Everyday Life, Experiences, Mind/Body |
| Kansas City Star | kansascity.com | KA | Discover, Everyday Life, Experiences, Mind/Body |
| Charlotte Observer | charlotteobserver.com | CH | Discover, Everyday Life, Experiences, Mind/Body |
| Fort Worth Star-Telegram | star-telegram.com | FO | Discover, Everyday Life, Experiences, Mind/Body |
| Sacramento Bee | sacbee.com | SA | Discover, Everyday Life, Experiences, Mind/Body |
| Raleigh News & Observer | newsobserver.com | RA | Discover, Experiences, Mind/Body |
| Centre Daily Times | centredaily.com | CE | Discover |
| Coral Springs (FL) | coralspringsflnews.com | — | Everyday Life, Experiences, Mind/Body (variant destination) |
| Miramar (FL) | miramarflnews.com | — | Everyday Life, Mind/Body (variant destination) |
| Pembroke Pines (FL) | pembrokepinesflnews.com | — | Experiences, Mind/Body (variant destination) |
| The State (Columbia, SC) | thestate.com | — | Discover |

**Excluded:** Life & Style (`lifeandstylemag.com`), Mod Moms Club (`modmomsclub.com`) — per Sara Vallone 2026-04-13.

**Canonical authors** (current active contributors):
Allison Palmer, Hanna Wickes, Lauren JG, Lauren Schuster, Ryan Brennan, Samantha Agate.

**Name variants normalized by `_AUTHOR_ALIASES`:**
- `Lauren J-G` → `Lauren JG`
- `Lauren Jarvis-Gibson` → `Lauren JG`
- `Hanna WIckes` → `Hanna Wickes`

---

## 7. What the Pipeline Does NOT Do (Intentional)

- **Tarrow data is not written back to Sara's sheet.** Tarrow's platform-native Apple News metrics live only in the headlines site. If we ever want them in Sara's sheet, a Tarrow-join step needs to be added to `enrich_tracker.py`.
- **No real-time sync.** Everything runs weekly on Monday. If the sheet changes midweek, changes are picked up on the next Monday run.
- **No audit trail of individual sheet edits.** `TRACKER_WEEKLY` (append-only snapshot history) captures post-ingest state, not who edited what.
- **MSN article-level traffic is not in Snowflake.** MSN PVs are platform-side only in Tarrow's XLSX — do not conflate with Snowflake O&O click-throughs.
- **Revenue data is not integrated.** Naviga (direct) and GAM (programmatic) exist in Snowflake but are not yet in `TRACKER_ENRICHED`. Gate: Ryan Spalding's confirmation of story-level join keys.

---

## 8. Known Tech Debt

- **Google Sheets writes in `enrich_tracker.py` are not atomic.** If the Google API goes down mid-write, Sara's sheet could be left in a partial state (headers updated, data not yet written). Recovery is to re-run the workflow. Fix would require a full `batch_update()` refactor of the write path.
- **Benchmark window (`BENCHMARK_START_DATE = "2025-10-01"`) must be bumped each October** to stay at ~12 months. A dynamic calculation would remove this maintenance burden but adds a failure mode if Snowflake's date math differs across timezones.
- **No retry logic on transient Snowflake failures.** A network blip during `model_tracker.py` causes a workflow failure; manual re-run needed.
- **Author alias list is duplicated in 4 files.** Single source of truth (e.g., JSON in `ops-hub/data/`) would simplify adding new aliases.
- **Print statements instead of `logging` module.** Makes log filtering harder but doesn't affect correctness.

---

## 9. Ownership

| System | Owner |
|---|---|
| Sara's Google Sheet | Sara Vallone (editorial) |
| Snowflake account + access | Chad Bruton (data engineering), Pierce Williams (pipeline) |
| ops-hub repo + GitHub Action | Pierce Williams |
| data-headlines repo + GitHub Action | Pierce Williams |
| Tarrow XLSX source sheet | Chris Tarrow |
| GitHub Pages domain | Pierce Williams |

**Contacts for outages:**
- Snowflake outage → Chad Bruton.
- Google Sheets schema change → Sara Vallone.
- GitHub Actions quota → Pierce Williams.

---

*Last updated: 2026-04-19. This document is the single source of truth for the National Content pipeline. Keep it current — if you change any stage, update this file in the same PR.*
