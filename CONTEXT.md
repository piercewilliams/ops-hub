# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-03 (PRD V0.3 sent to Chris; 5 personas to Susannah; content standards routing annotations added; sync switched to manual)
**Status:** P9 complete. Waiting on Chris/Sara PRD feedback. Active queue: Sarah Price meeting 2026-04-04, CSA metrics to Chris, Chad Bruton walkthrough, science persona definitions.

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 12 active projects across 5 dependency tiers + 1 hold (P13 closed)
- P9 (PRD) complete — P11 (Recipes) and other PRD-gated work now unblocked; primary gate remaining is **Access** (P1)
- Sync: **Manual** — update `data/projects.js` in a Claude Code session, commit, and push. Pill reads last commit time via GitHub public API (green <3d, yellow 3–7d, red >7d).

## Features Live

- Tiered dependency map with SVG arrows
- Sidebar detail panels (status, blockers, next actions, systems, contacts, links)
- Progress pills (Up next / Recently done / Completed projects)
- Snapshot version bar (last 5 syncs, passkey-protected restore)
- CSA Dashboard tag chips (pain / requests / metrics) with popover detail
- Sync status pill — shows "Last synced X ago" (green <3d, yellow 3–7d, red >7d)
- Mutual-close behavior: sidebar and progress panel can't both be open
- Quality gate script at `scripts/check.sh`
- Snapshot version bars on csa-dashboard, csa-content-standards, data-t1headlines — weekly auto-snapshot (Mon 8am), passkey `8812`, max 5 per site; trigger `trig_01Qze9PVrNErCEYa1fMXxF2U`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker |
|---|---------|------|--------|-------------|
| 1 | Platform Access & Training | 1 | In progress | Amplitude/Marfeel/SemRush still inaccessible despite IT claiming access; Gary API key pending |
| 2 | Dashboard Instrumentation | 4 | In progress | Credentials pending; manual-metrics.js population delayed (CSA about to auto-log stats) |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | **13 findings live, 5-tile playbook.** March data ingested 2026-04-02. Ongoing cadence. Site shared with Sarah Price (confirmed). |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 shared with Sarah Price first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Current personas finalized + submitted to product/dev team for all National accounts. Apple News + Smart News personas pending Sara Vallone + Andy review before handoff. |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7 |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | Ticketed and in dev team's hands. No Pierce action pending. |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris — CMS architecture will make it obsolete |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking PRD |
| 9 | PRD Revisions | 3 | **Complete** | V0.3 delivered to Chris 2026-04-03. Sara Vallone input still needed for writer/editor section. |
| 10 | Gary Tools Integration | 2 | **Blocked** | API key + endpoint docs not yet delivered by Gary Kirwan; Chris requirements defined |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | **Complete** | Resolved + closed 2026-04-03. Mode = workflow entry point. Removed from dependency map. |

## What's Next

**#1 — IMMEDIATE:**
1. [ ] **Meeting with Sarah Price 2026-04-04** — Apple headlines + TEO API through SEMrush + Sigma dashboard context.
2. [ ] **Send CSA metrics to Chris** — macro-level monthly stats (3,465 batting avg, 138 CSA runs/week). Direct boss ask.
3. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data.
4. [ ] **Finalize Science-Curious persona definitions** — Science-Curious Retiree + Science-Curious Casual Reader need canonical definitions before Susannah can save them as shared custom personas.
5. [ ] **Extend AGENT-AUDIENCE routing annotations** beyond §1 to full content standards guidance (pending Susannah confirming the tagging approach works).
6. [ ] **Gary Tools parameter session with Sara Vallone** — Approach aligned 2026-04-03: walk reports together, Sara flags what she'd escalate vs. not, Pierce drafts ruleset for iteration. Gated on Gary answering the 4 questions first.

**Compass (HR — performance management):**
- [ ] **Draft goals with Jeremy Gockel** in Compass — due **April 26, 2026**
- [ ] **Goals must total 100%**, each aligned to a division org objective (shown in Compass workflow)
- [ ] **Save finalized goals** to `compass-goals.md` in ops-hub (feeds weekly progress trigger)
- [ ] **Upload photo** to Compass profile
- [ ] Manager approval must be complete by **April 30, 2026** (goals reach "Track Goals" status)
- [ ] Mid-year check-in: **July 2026** (mandatory)
- [ ] Final evaluation: **January 2027** (self-rate each goal 1–5; goals = 50% of rating)

**Waiting on others (no action needed):**
- Chris + Sara Vallone: PRD V0.3 feedback
- Sara Vallone + Andy: Apple News + Smart News personas (Sara drafting; Andy reviews before handoff to dev)
- Susannah Locke: pinning all 5 personas for National accounts (PGS-133); H1 enforcement fix (PGS-135); confirmation that AGENT-AUDIENCE tagging approach works
- Gary Kirwan: API key + endpoint docs (P10) — second ask sent 2026-04-03
- IT / SEMrush: SEMrush access (Pierce escalated directly to SEMrush team 2026-04-03); Amplitude/Marfeel still inaccessible
- Tarrow: ANP March drop (adding to Drive folder)
- Dev team: variant linking + Cluster ID field (P6), PGS-133/134/135 (all selected for dev)


## Gary Tools — Summary of What It Is

Gary Kirwan's tool runs factual accuracy / claims validation post-CSA, before editor's desk. Three reports run: Duggar legal, Women's World health, Charlotte Home Buyers Guide. Charlotte stress-test complete — tool caught stale FY2025 tax rate ($966.20 vs $985.40) that human editor missed. Chris directed Pierce + Sara Vallone to define editorial parameters (TRUE/FALSE/MISLEADING/INSUFFICIENT_EVIDENCE/OVERGENERALIZED). Acceptance tracking = system quality signal. Pierce sent 4 questions to Gary (confidence scoring, severity calibration, article-level vs claim-level output, reproducibility). Sara Vallone looped in via Slack for parameter definition — awaiting reply. Details: gary-tools repo.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~85*
