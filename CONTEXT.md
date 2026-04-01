# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-03-31 (T1 analysis, PRD v0.3, status audit; CSA Weekly Update + Jira EOD)
**Status:** Dashboard live; PRD-pipeline.md v0.3 ready for Chris review (due 2026-04-03); T1 site reworked, Tarrow backlog wired; PGS-95 live; canonical ID = cluster ID confirmed

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 13 active projects across 5 dependency tiers + 1 hold
- Everything gates on two chains: **Access** (P1) and **Cluster taxonomy** (P6)
- Sync: 3x daily Mon–Fri (8am/12pm/5pm Dallas CDT), automated via scheduled trigger

## Features Live

- Tiered dependency map with SVG arrows
- Sidebar detail panels (status, blockers, next actions, systems, contacts, links)
- Progress pills (Up next / Recently done / Completed projects)
- Snapshot version bar (last 5 syncs, passkey-protected restore)
- CSA Dashboard tag chips (pain / requests / metrics) with popover detail
- Sync status pill with stale thresholds (warn: 5.5h, crit: 16h)
- Mutual-close behavior: sidebar and progress panel can't both be open
- Quality gate script at `scripts/check.sh`
- Snapshot version bars on csa-dashboard, csa-content-standards, data-t1headlines — weekly auto-snapshot (Mon 8am), passkey `8812`, max 5 per site; trigger `trig_01Qze9PVrNErCEYa1fMXxF2U`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker |
|---|---------|------|--------|-------------|
| 1 | Platform Access & Training | 1 | In progress | Snowflake login resolved — Chad walkthrough pending; Gary API pending |
| 2 | Dashboard Instrumentation | 4 | In progress | CSA uptime/production stats defined — data in hand, populate manual-metrics.js next |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | Site reworked per Sarah Price feedback; Tarrow backlog wired; weekly Monday drops established; running new analysis |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 shared with Sarah Price first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Sara Vallone delivering 1-2 personas by 2026-04-01; format/persona layering tooling requested (Susannah logged) |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7 |
| 6 | Content Cluster / Tagging Taxonomy | 3 | Blocked | Alignment meeting still not scheduled; canonical ID = cluster ID confirmed; variant linking dev request logged |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris 2026-03-30 — CMS architecture will make it obsolete |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking PRD |
| 9 | PRD Revisions | 3 | **IN PROGRESS — #1 PRIORITY** | Draft due 2026-04-03 |
| 10 | Gary Tools Integration | 2 | Blocked | Gary API key not delivered; group committed to formal evaluation |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | System Prompts / Mode 1 & Mode 2 | 2 | Not started | Mode 1/2 mapping not Pierce's team's issue — Susannah clarifying with Rajiv |

## What's Next

**#1 — THIS WEEK:**
1. [x] **Draft PRD "control room" vision** — PRD-pipeline.md v0.3 complete. Due 2026-04-03.
2. [x] **Block calendar time for PRD** — done.
3. [ ] **Get Sara Vallone's feedback on CSA Vision section** — placeholder pending her input.
4. [ ] **Run T1 analysis** — site reworked, Tarrow backlog wired; run generate_site.py and review output.

**Waiting on others (no action needed):**
- IT: Amplitude/Sigma/Marfeel provisioning (Snowflake login resolved)
- Gary Kirwan: API key + endpoint docs
- Sara Vallone: persona drafts (6-7 new personas)
- Susannah: notify when Oliver completes human review of PGS-97 persona scrape results
- Tarrow: weekly Monday data drops (cadence established)

**Quick unblocked items (do when PRD needs a break — in this order):**
1. [ ] **Populate CSA uptime/production stats** into manual-metrics.js — data in hand. 15 min.
2. [ ] **Send CSA metrics to Chris** — macro-level monthly stats (3,465 batting avg, 138 CSA runs/week). Direct boss ask.
3. [ ] **Write target audience definitions for National team** — Oliver Felix building PGS-97 now; don't make eng wait.
4. [ ] **Reply to Susannah** — confirm CSA Research Draft as cluster tagging entry point; hold on building.
5. [ ] **Schedule P6 cluster alignment meeting** (Chris + Sara + Susannah) — unblocks entire cluster chain.
6. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data.

**Deprioritized (Chris's guidance):**
- Sara Vallone tracker (P7) — CMS architecture will make it obsolete
- CSA codebase mapping in BitBucket (P8) — not urgent

## Pending Notifications

- **PGS-97 persona results:** Susannah will notify when Oliver Felix completes human review of scraped persona data (unexpected Jira export without review). Sara Vallone committed to 1-2 personas for testing by 2026-04-01.

## Items Not Yet in Any Repo

- Digest Chris's cluster performance sheet (feeds P6 alignment meeting)
- Study content graph doc (feeds P6 + P9)
- Apple News monitoring cadence setup (rq-apple-news-monitoring — separate ops deliverable)
- Content diff tool (PGS-82): UX sprint underway. Marcelo (front-end) + Susannah/Efren (design). Pierce = stakeholder. Not yet a tracked ops-hub project.
- Headline tool + title options (rq-headline-tool, rq-title-options — clarify ownership with Chris)

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~80*
