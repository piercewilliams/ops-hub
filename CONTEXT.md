# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-15 22:17 UTC — Automated sync. Human session earlier today: Snowflake/Sigma orientation (Rocky+Chad, 1:30pm CDT). All 5 personas live in CSA production. v0.88 deployed. MAIA 14-day test started.
**Status:** 19 active/tracked projects. Compass goals submitted (Jeremy approval pending Apr 30).

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- **Live at** `https://piercewilliams.github.io/ops-hub`
- **v0.88 in production (2026-04-15).** PGS-134 + PGS-96 + PGS-115 DONE. Docker bug patching (Oliver + Marcelo). v0.89 target: 6 items.
- **All 5 personas live as Team Target Audiences (2026-04-15):** Discover Browser + Science Enthusiast (Susannah); Curious Optimizer + Curious Explorer + Watercooler Insider (Pierce). PGS-133 ON HOLD.
- **Snowflake orientation complete (2026-04-15):** story_traffic_main (O&O PV by story/market/date) + dynamic_story_metadata (author/URL/SEO/keywords) in MCC presentation schema. Amplitude in Snowflake (events prod). GitHub→Snowflake direct (Chad setting up). eCPM → Ryan Spalding.
- **MAIA 14-day test started 2026-04-15** (~2026-04-29). Sara's teams log outputs; Pierce monitoring. Access + tracking sheet requested from Derek.
- **Critical tickets:** PGS-82 IN QA (PyTorch fix — Marcelo); PGS-104 IN PROGRESS (merge PR strategy; Victor resumes after PGS-111); PGS-111 CODE REVIEW (SEO metadata for Content Formats; blocks PGS-104 AC); PTECH-7730 TO DO (p-tagging — Joe Vitali ETA 2026-04-16, activates Amplitude adapter + Deedra unified Sigma dash).
- **EGS-127 ticket 12828 in dev** (1 of 4-ticket epic). Marcelo leading.
- **Rajiv on vacation.** Emil Penalo + Oliver Felix have prod merge authority. 2-PR process in effect.
- **Gary evaluation closed (2026-04-14):** Off QA gate (black-box, not deterministic). Author profile replication greenlit (dev ticket pending). IP/contract concern (Kathryn + Jason). Sara parameter session TBD.
- **SEMrush pull paused** (Chris flagged logic flaw 2026-04-15). Rocky/Julio credit rate per endpoint pending before any automation.
- **Q/Cue integration IN CODE REVIEW** (Daury, 31 files, 2026-04-13). WP 301 bug (PGS-170, Lauren Schuster) under investigation.
- **PGS-150 HOLD** (plagiarism — Copyscape recommended; RAG vs. open-web clarification pending).
- **Sigma CSA dash (Deedra):** Simple version almost done. Await delivery.
- **National portfolio canonical file:** `data/national-portfolio.js` — 13 brands, single source of truth for all API scoping.
- Sync: **Automated** 3×/day (Mon–Fri) via scheduled sync agent.

## Features Live

- Tiered dependency map with SVG arrows
- Sidebar detail panels (status, blockers, next actions, systems, contacts, links)
- Progress pills (Up next / Recently done / Completed projects)
- Snapshot version bar (last 5 syncs, passkey-protected restore)
- CSA Dashboard tag chips (pain / requests / metrics) with popover detail
- Sync status pill — shows "Last synced X ago" (green <3d, yellow 3–7d, red >7d)
- Quality gate script at `scripts/check.sh`
- Snapshot version bars on csa-dashboard, csa-content-standards, data-headlines — weekly auto-snapshot (Mon 8am), passkey `8812`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker / State |
|---|---------|------|--------|---------------------|
| 1 | Platform Access & Training | 1 | In progress | All systems confirmed. **Pending:** GitHub→Snowflake (Chad), PTECH-7730 ETA (2026-04-16), Ryan Spalding eCPM. |
| 2 | Dashboard Instrumentation | 4 | In progress | v0.88 live. PGS-82 QA. PGS-104/111 in progress. PTECH-7730 blocks Amplitude adapter. |
| 3 | T1 Headlines Analysis | 4 | In progress | 13 findings, daily grader, weekly ingest operational. Author playbook upgrade blocked on Snowflake setup (Chad). |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | In progress | Format not formalized — coordinate Sarah Price (returns 2026-04-17). |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | All 5 personas live. PGS-104/111/135 in progress. Andy sign-off on Apple/SN templates still pending. |
| 5 | Personas & Formats Testing | 5 | In progress | Needs P4 stable + EGS-127. |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | EGS-127 ticket 12828 in dev (1 of 4). |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | EGS-127 + rq-send-to-cue + PGS-80 must land first. |
| 8 | Rajiv CSA Mapping | 2 | Not started | Low priority opportunistic. |
| 9 | ~~PRD Revisions~~ | — | Done | V0.5 delivered 2026-04-10, distributed at CSA Weekly 2026-04-14. |
| 10 | Gary Tools Integration | 2 | In progress | Off QA gate. Author profile replication greenlit. IP/contract concern. Sara parameter session TBD. |
| 11 | Recipes | 5 | Not started | Needs P4 + P2 + P6 + P14. |
| 12 | United Robots Inbound Pipeline | 4 | Hold | WP 301 bug (PGS-170). Q/Cue in code review. EGS-127 + PGS-80 must land. |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | Done | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | Prototype live. Pull paused (Chris logic flaw 2026-04-15). Rocky/Julio credit rate pending. |
| 15 | Partner Content / Inventory Optimization | 5 | In progress | Reuters RSS confirmed. AI vetting policy not drafted. Legal question unresolved. |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff (Sara, Sarah Price, Pierce, Kathy). |
| 17 | Spanish CSA Pipeline | 5 | Not started | Waiting on Chris/Rajiv direction. |
| 18 | Agentic Writing Helpers | 5 | In progress | Meeting Thu 2026-04-16 11am CDT (Sara + Hanna Wickes + Ryan Brennan + 4 more). |
| 19 | MAIA Trend Tool Validation | 4 | In progress | 14-day test 2026-04-15→~2026-04-29. Waiting on MAIA tab access + tracking sheet. |

## What's Next

**Open (today / this week):**
- [ ] Keyword data for Sara Vallone — Experiences vertical (4 topics: Landmarks, 5-day travel, Solo dining, Roadtrips). **Committed: tonight or tomorrow morning.**
- [ ] Attend Thu 2026-04-16 11am CDT — agentic writing group session → Pierce + Sara huddle after to prioritize pain points and pick pilot author
- [ ] Create CSA pipeline visuals for Britney (Chris ask 2026-04-14) → send to Chris
- [ ] Send Sara details of additional tasks + required meetings (Pierce action from CSA Weekly)
- [ ] Provide weekly release estimates/timeframes to management (weekly dates, not "soon")

**Waiting on others:**
- Joe Vitali: PTECH-7730 ETA — responds 2026-04-16
- Chad Bruton: GitHub→Snowflake connection setup
- Rocky/Julio: credit rate per SEMrush endpoint (required before automation)
- Sarah Price: returns 2026-04-17 (narrative dashboard format coordination)
- Derek: MAIA tab access + Sara tracking sheet
- Susannah/Oliver/Saner: release schedule with staging + production dates → Pierce
- Sara Vallone: Gary parameter session scheduling (agenda ready at gary-tools/data/session-agenda-vallone.docx)

**Compass:** 5 goals submitted 2026-04-13. Jeremy Gockel approval due **April 30, 2026**. Mid-year: July 2026.

## Strategic Frameworks

**Syndication:** App-based captured (AN, SN, Newsbreak) = LTV=0, pure PV increment. Web-based competitive (Yahoo, O&O) = standard CTR/PV dynamics.
**Cluster batting average:** 1-in-3.3 (target 1-in-4). Q2 metrics: 3× output; $85 CPA; 500K PV; 5–8% traffic lift.
**Recipe system:** Creator × Format × Topic × Market → Predictable Return. See `RECIPE.md`.
**Cluster:** Canonical article + analytically-determined variants. Cluster ID = Canonical ID.
**Inclination Engine:** Named concept — sole future input for automated signals and T1/T2 brief generation. Not yet built.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
