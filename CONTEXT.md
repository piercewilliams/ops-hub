# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-02 (PRD delivered; personas submitted to dev team; Discover Browser + cluster tagging ticketed)
**Status:** Most immediate actions cleared. Waiting on Chris/Sara feedback on PRD. Active queue: CSA metrics to Chris, science persona definitions, Chad Bruton + P6 check-ins.

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 12 active projects across 5 dependency tiers + 1 hold (P13 closed)
- Everything gates on two chains: **Access** (P1) and **PRD** (P9)
- Sync: GitHub Actions (`.github/workflows/sync.yml`), 8am/12pm/5pm CDT Mon–Fri + manual dispatch. Uses GITHUB_TOKEN (no expiry). Requires `ANTHROPIC_API_KEY` secret — add at github.com/piercewilliams/ops-hub/settings/secrets/actions.

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
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Current personas finalized + submitted to product/dev team for all National accounts. Apple News + Smart News personas pending Sara Vallone + Andy review before handoff. |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7 |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | Ticketed and in dev team's hands. No Pierce action pending. |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris — CMS architecture will make it obsolete |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking PRD |
| 9 | PRD Revisions | 3 | **Complete** | Delivered to Chris 2026-04-02 |
| 10 | Gary Tools Integration | 2 | **Blocked** | API key + endpoint docs not yet delivered by Gary Kirwan; Chris requirements defined |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | **Complete** | Resolved + closed 2026-04-03. Mode = workflow entry point. Removed from dependency map. |

## What's Next

**#1 — IMMEDIATE:**
1. [ ] **Send CSA metrics to Chris** — macro-level monthly stats (3,465 batting avg, 138 CSA runs/week). Direct boss ask.
2. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data.
3. [ ] **Schedule P6 dev check-in** — monitor variant linking progress with Susannah.

**Compass (HR — performance management):**
- [ ] **Draft goals with Jeremy Gockel** in Compass — due **April 26, 2026**
- [ ] **Goals must total 100%**, each aligned to a division org objective (shown in Compass workflow)
- [ ] **Save finalized goals** to `compass-goals.md` in ops-hub (feeds weekly progress trigger)
- [ ] **Upload photo** to Compass profile
- [ ] Manager approval must be complete by **April 30, 2026** (goals reach "Track Goals" status)
- [ ] Mid-year check-in: **July 2026** (mandatory)
- [ ] Final evaluation: **January 2027** (self-rate each goal 1–5; goals = 50% of rating)

**Waiting on others (no action needed):**
- Chris + Sara Vallone: PRD feedback
- Sara Vallone + Andy: Apple News + Smart News personas (Sara drafting; Andy reviews before handoff to dev)
- Gary Kirwan: API key + endpoint docs (P10)
- IT: Amplitude/Sigma/Marfeel provisioning (still inaccessible despite IT's claim)
- Tarrow: ANP March drop (adding to Drive folder)
- Dev team: variant linking + Cluster ID field (P6), Discover Browser persona inclusion (PGS-96)


## Gary Tools — Summary of What It Is

Gary Kirwan is providing an external claims validation tool that plugs into the CSA's quality layer (Module 1: Citation and fact validation). When it flags an issue, editor can correct or override. Overrides tracked by article, author, content type; report goes to Sara Vallone + Pierce + Chris (shrinks to Sara once confident). Pierce owns source trustworthiness list. Integration blocked on Gary's API key + endpoint docs.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~107*
