# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-02 (PRD V0.3 full revision; ready for Pierce morning review)
**Status:** Dashboard live; PRD V0.3 complete pending Pierce's bracket review; P6 strategy settled; P10 Gary blocked on API key; T1 analysis complete (8 findings); 3 personas passed to Sara

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 13 active projects across 5 dependency tiers + 1 hold
- Everything gates on two chains: **Access** (P1) and **PRD** (P9)
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
| 1 | Platform Access & Training | 1 | In progress | Amplitude/Marfeel/SemRush still inaccessible despite IT claiming access; Gary API key pending |
| 2 | Dashboard Instrumentation | 4 | In progress | Credentials pending; manual-metrics.js population delayed (CSA about to auto-log stats) |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | **8 findings complete.** Ongoing cadence (monthly Tarrow + weekly ANP). Share site with Sarah Price. |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 shared with Sarah Price first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | 3 personas passed to Sara Vallone to refine; awaiting final set for CSA codification |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7 |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | Strategy settled 2026-04-01; variant linking + schema now in dev team's hands |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris — CMS architecture will make it obsolete |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking PRD |
| 9 | PRD Revisions | 3 | **READY FOR REVIEW** | Pierce reviews morning of 2026-04-03; bracket comments → final corrections → deliver to Chris |
| 10 | Gary Tools Integration | 2 | **Blocked** | API key + endpoint docs not yet delivered by Gary Kirwan; Chris requirements defined |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | System Prompts / Mode 1 & Mode 2 | 2 | Not started | Susannah clarifying Mode 1/2 mapping with Rajiv |

## What's Next

**#1 — THIS WEEK:**
1. [ ] **Morning review of PRD** — Pierce reads PRD-pipeline.md, adds bracket comments [like this], passes back for corrections. Then deliver to Chris by 2026-04-03.
2. [ ] **Await Sara Vallone's refined personas** — then codify into CSA + update csa-content-standards.

**Waiting on others (no action needed):**
- Gary Kirwan: API key + endpoint docs (P10)
- Sara Vallone: refined/final persona set (received 3 consolidated from Pierce)
- IT: Amplitude/Sigma/Marfeel provisioning (still inaccessible despite IT's claim)
- Susannah: notify when Oliver completes human review of PGS-97 persona scrape results
- Tarrow: ANP March drop (adding to Drive folder)
- Dev team: variant linking + Cluster ID field implementation (P6 dev work)

**Quick unblocked items (do when PRD is delivered):**
1. [ ] **Send CSA metrics to Chris** — macro-level monthly stats (3,465 batting avg, 138 CSA runs/week). Direct boss ask.
2. [ ] **Write target audience definitions for National team** — PGS-97 is marked RESOLVED/FULFILLED. Engineering infra is built. Pierce just needs to write the definitions and get them in.
3. [ ] **Check The Discover Browser persona (PGS-96)** — may need structural editing before Susannah can use it as a Target Audience.
4. [ ] **Reply to Susannah** — confirm CSA Research Draft as cluster tagging entry point.
5. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data.
6. [ ] **Schedule P6 dev check-in** — monitor variant linking progress with Susannah.

## PRD V0.3 — What Was Done This Session (2026-04-02)

Full revision of `PRD-pipeline.md`. Key changes made:

- **"Cue" fix** — replaced all erroneous "Queue" CMS references with "Cue" across all repos
- **Structure** — stripped phases/roadmap; rebuilt as pure spec: Overview → Ideal End State → Four Pipelines → CSA Vision → System Requirements → Operations Layer → Open Questions
- **System Requirements** — 8 capability areas: Request Intake & Triage (new), Signal & Brief Creation, Content Generation, Quality Enrichment & Verification, Editorial Review & Approval, CMS Delivery & Channel Distribution, Performance Tracking, Content Graph
- **Gary Tools** — properly placed in Quality Enrichment & Verification with Pierce's role spelled out (owns source trustworthiness list, receives override reports, requirements owner)
- **Operations Layer** — 8 panels: Pipeline State View, Gate Status, Distribution View, CPA Tracker, Topic Coverage Map, Author Profile Performance, Strategic Pipeline Elements, Signal Feed
- **Content Graph** — restored as full section; correctly scoped as deferred but position stated
- **Terminology** — "cluster" = sibling variant group; "subject category" = topic taxonomy; consistent throughout
- **Style** — no spaced em dashes, no AI tells, no contractions where not appropriate, Publish-to-Cue hyphenated consistently
- **Alignment** — cross-checked against PRD scoping meeting transcript (2026-03-31) and V2/V3 prior PRD documents

**Next step:** Pierce reviews in the morning, passes bracket comments, corrections made, delivered to Chris.

## Gary Tools — Summary of What It Is

Gary Kirwan is providing an external claims validation tool that plugs into the CSA's quality layer (Module 1: Citation and fact validation). When it flags an issue, editor can correct or override. Overrides tracked by article, author, content type; report goes to Sara Vallone + Pierce + Chris (shrinks to Sara once confident). Pierce owns source trustworthiness list. Integration blocked on Gary's API key + endpoint docs.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~140*
