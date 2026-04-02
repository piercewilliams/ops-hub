# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-02 (PRD V0.3 morning review complete; dash normalization, Module 7 added; exported to Google Docs; 5 personas normalized)
**Status:** Dashboard live; PRD V0.3 edits complete — Google Doc is now authoritative (out of sync with PRD-pipeline.md); due Chris 2026-04-03; personas normalized and ready for codification review

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
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | 5 personas live in csa-content-standards + forwarded to Susannah to pin; Apple News + Smart News personas pending Andy review |
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
1. [ ] **Deliver PRD to Chris** — Google Doc is the live version (PRD-pipeline.md is out of sync; do not re-export from markdown). Due 2026-04-03.

**Waiting on others (no action needed):**
- Gary Kirwan: API key + endpoint docs (P10)
- Sara Vallone: Apple News + Smart News personas (drafting; Andy to review before sending)
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

## PRD V0.3 — Session Notes (2026-04-02)

**Previous session (last night):** Full PRD revision — structure, Gary Tools placement, Operations Layer 8 panels, Content Graph, terminology, Cue fixes. See sessions/ for full log.

**This session (morning):**
- **Dash normalization** — rhetorical em-dashes converted to `——` (double) throughout to distinguish from compound-adjective hyphens (`editorial-intensive`, `Publish-to-Cue`, etc.). Section-title separators (`T1—United Robots`) kept as single `—`.
- **Module 7 added** — Variant Differentiation added to Quality Enrichment & Verification: internal hard gate, never surfaced to editor, re-generates within session parameters (brief + Step 1 configs) until threshold met.
- **Google Doc export** — converted via Pandoc to .docx; uploaded to Google Drive; TOC working. Google Doc is now the live version. PRD-pipeline.md is out of sync and should not be re-exported from markdown.

## Personas — Session Notes (2026-04-02)

5 personas codified in csa-content-standards (v1.3.6) and forwarded to Susannah to pin for all National CSA accounts:
- §4.1 The Discover Browser (Google Discover)
- §4.2 The Curious Optimizer (Trend Hunter / B2C)
- §4.3 The Wonder-Driven Science Enthusiast (Science / Discovery Features)
- §4.4 The Curious Explorer (Discovery / Science / Nature) — new from Sara Vallone
- §4.5 The Watercooler Insider (Entertainment / Trending) — new from Sara Vallone

Sara Vallone confirmed (Slack 10:32 AM) bundling her 2 new personas with existing 3 for Susannah to pin. She is also drafting Apple News + Smart News specific personas — Andy to review before use.

## Gary Tools — Summary of What It Is

Gary Kirwan is providing an external claims validation tool that plugs into the CSA's quality layer (Module 1: Citation and fact validation). When it flags an issue, editor can correct or override. Overrides tracked by article, author, content type; report goes to Sara Vallone + Pierce + Chris (shrinks to Sara once confident). Pierce owns source trustworthiness list. Integration blocked on Gary's API key + endpoint docs.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~140*
