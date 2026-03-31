# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-03-31 (T1 headlines wrap + projects.js sync + action item audit; automated sync 17:16 UTC)
**Status:** Dashboard live; P3 analysis complete and in handoff; PRD is the week's only real deliverable

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
| 1 | Platform Access & Training | 1 | In progress | Snowflake login pending IT; Gary API pending |
| 2 | Dashboard Instrumentation | 4 | In progress | Sigma/Marfeel creds; Amplitude blocked (p-tagging) |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | Pending Sarah Price review — analysis complete, handed off |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 shared with Sarah Price first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Awaiting Sara Vallone persona drafts |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7 |
| 6 | Content Cluster / Tagging Taxonomy | 3 | Blocked | Alignment meeting not scheduled |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris 2026-03-30 — CMS architecture will make it obsolete |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking PRD |
| 9 | PRD Revisions | 3 | **IN PROGRESS — #1 PRIORITY** | Draft due 2026-04-03 |
| 10 | Gary Tools Integration | 2 | Blocked | Gary API key not delivered |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | System Prompts / Mode 1 & Mode 2 | 2 | Not started | (unblocked) |

## What's Next

**#1 — THIS WEEK:**
1. [ ] **Draft PRD "control room" vision** — due 2026-04-03. Chris's explicit ask. Unblocked. Everything else waits.

**Waiting on others (no action needed):**
- IT: Snowflake login fix, Amplitude/Sigma/Marfeel provisioning
- Gary Kirwan: API key + endpoint docs
- Sara Vallone: persona drafts (6-7 new personas)
- Sarah Price: T1 Headlines review feedback
- Susannah: CSA staging notification (PGS-95 loading issues)

**Quick unblocked items (do when PRD needs a break — in this order):**
2. [ ] **Send CSA metrics to Chris** — he asked for macro-level monthly stats; data already in hand (3,465 batting avg, 138 CSA runs/week from Sigma). 15 minutes. Direct boss ask.
3. [ ] **Write target audience definitions for National team** — Oliver Felix is building PGS-97 *right now*; don't make eng wait on you. Test in CSA once written.
4. [ ] **Reply to Susannah** — confirm CSA Research Draft is the right entry point for cluster tagging; hold on building until alignment meeting. Quick email.
5. [ ] **Schedule P6 cluster alignment meeting** (Chris + Sara + Susannah) — calendar invite unblocks entire cluster chain.
6. [ ] Map United Robots alerts pipeline scope with Sara Vallone (can feed PRD revision; not needed for first draft)

**Deprioritized (Chris's guidance):**
- Sara Vallone tracker (P7) — CMS architecture will make it obsolete
- CSA codebase mapping in BitBucket (P8) — not urgent

## Pending Notifications

- **CSA staging test (PGS-95):** Susannah will notify when Google Discover Explainer Content Format is ready to test on https://staging.trendhunteragents.ai/csa — had loading issues 2026-03-30. Pierce + Sara Vallone to test and give feedback.

## Items Not Yet in Any Repo

- Digest Chris's cluster performance sheet (feeds P6 alignment meeting)
- Study content graph doc (feeds P6 + P9)
- Apple News monitoring cadence setup (rq-apple-news-monitoring — separate ops deliverable)
- Content diff tool (PGS-82): UX sprint underway. Marcelo (front-end) + Susannah/Efren (design). Pierce = stakeholder. Not yet a tracked ops-hub project.
- Headline tool + title options (rq-headline-tool, rq-title-options — clarify ownership with Chris)

## Session Log: 2026-03-31

- T1 Headlines (P3): Tarrow data fully wired (MSN full-year 2025 + SmartNews 2026 categories). Findings culled from 10 → 5, renumbered 1–5. Analysis complete; handed to Sarah Price for review.
- data/projects.js: Full sync across all 5 repos. Corrected Google Sheets API items (replaced by manual-metrics.js + seedMetrics() — no API key needed). Updated P3, P2, P6 cards. All nextActions in strict priority order. COMPLETED_TASKS updated.
- Action item audit against Chris's guidance: reordered tomorrow's list (CSA metrics to Chris moved to #2 — direct boss ask, data in hand; target audiences #3 — Oliver Felix waiting on PGS-97; Susannah reply added as #4; P6 meeting invite #5). Added missing data-cmstracker item: reply to Susannah re cluster entry point.
- Removed Julia Tortoriello as action item — she's a contact (oversees CSA Spanish translation), not a task. Corrected name spelling throughout.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~95*
