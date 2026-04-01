# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-01 (standup + Gary email thread + alignment meeting outcomes; full context sync)
**Status:** Dashboard live; PRD in progress (due 2026-04-03); P6 strategy settled; P10 Gary now active evaluation; T1 analysis complete (8 findings); 3 personas passed to Sara

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
| 9 | PRD Revisions | 3 | **IN PROGRESS — #1 PRIORITY** | Draft due 2026-04-03 |
| 10 | Gary Tools Integration | 2 | **In progress** | Chris blessed integration; operational requirements defined; API key pending from Gary |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | System Prompts / Mode 1 & Mode 2 | 2 | Not started | Susannah clarifying Mode 1/2 mapping with Rajiv |

## What's Next

**#1 — THIS WEEK:**
1. [ ] **Finish PRD** — due 2026-04-03 to Chris. V0.3 in progress. Get Sara Vallone's feedback on CSA Vision section.
2. [x] ~~**Share T1 site with Sarah Price**~~ — done. Sarah confirmed she has the link (Slack, 2026-04-01 11:59 AM).
3. [ ] **Await Sara Vallone's refined personas** — then codify into CSA + update csa-content-standards.

**Waiting on others (no action needed):**
- Gary Kirwan: API key + endpoint docs
- Sara Vallone: refined/final persona set (received 3 consolidated from Pierce)
- IT: Amplitude/Sigma/Marfeel provisioning (still inaccessible despite IT's claim)
- Susannah: notify when Oliver completes human review of PGS-97 persona scrape results
- Tarrow: ANP March drop (adding to Drive folder)
- Dev team: variant linking + Cluster ID field implementation (P6 dev work)

**Quick unblocked items (do when PRD needs a break):**
1. [ ] **Send CSA metrics to Chris** — macro-level monthly stats (3,465 batting avg, 138 CSA runs/week). Direct boss ask.
2. [ ] **Write target audience definitions for National team** — PGS-97 is marked RESOLVED/FULFILLED. Engineering infra is built. Pierce just needs to write the definitions and get them in. Do not wait for Susannah's notification.
3. [ ] **Check The Discover Browser persona (PGS-96)** — may need structural editing before Susannah can use it as a Target Audience. Verify CSA Content Standards version is in proper shape.
4. [ ] **Reply to Susannah** — confirm CSA Research Draft as cluster tagging entry point.
5. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data.
6. [ ] **Schedule P6 dev check-in** — monitor variant linking progress with Susannah.

**Deprioritized (Chris's guidance):**
- Sara Vallone tracker (P7) — on hold, but has concrete re-entry conditions: Cluster ID in CUE+WP, Send-to-CUE, Send-to-WP, and PGS-80 analytics. When those land the tracker builds itself. Bring revised scope to Chris at that point.
- CSA codebase mapping in BitBucket (P8) — not urgent
- Populate manual-metrics.js — delaying; CSA about to start logging stats automatically

## CSA Dev Team — 2026-04-01 Standup Key Notes

- **PGS-115 NEW BUG:** Google Discover Explainer format visible to ALL users (not national team only) — Daury Caba fixing; IN PROGRESS
- **PGS-95:** Now IN QA (scoping fix via PGS-115 underway)
- **PGS-82 scoring system:** SHIPPED by Marcelo. PR submitted. Deactivated by default for everyone; requires DB update to activate. Scoped to national team.
- **Amplitude:** Code deployed; key was missing from staging/prod. Victor had it in PR description; Rajiv retrieving. Susannah wrote ticket for performance team to create Amplitude elements. Very close.
- **Editorial fact-check bypass:** Implemented immediately — editor-submitted content no longer checked for hallucinations (real example: system flagged "free cupcakes" as hallucination). Future: optional toggle for power users.
- **Emil Penalo:** Fixed national team migration issue (now shows on staging/prod). Started style rework refactor (feature flag, admin toggle, design tokens). Large rebase — careful QA needed. No ticket yet (Saner creating).
- **Victor Suarez:** Fixed editorial direction bug (AI was refusing user-supplied claims, inserting note to editor block instead). Refactored 33 prompt templates → 1 shared snippet. PR submitted.
- **Oliver Felix:** Finished persona report for Susannah. Pairing with Rajiv on next synthesis merge session to learn process.
- **Q2 starting:** Rajiv compiling Q1 accomplishments; moving to per-quarter project files (Q2, Q3, Q4).
- **Roadmap (noted):** Power user feature to upload custom markdown/YAML skills to CSA workflow — Rajiv confirmed as future roadmap item.

## Gary Tools — Chris's Operational Requirements (2026-04-01)

From email thread: Gary shared claims validation reports; Chris responded with integration direction:
- Editor can **correct** flagged issues OR **override** (override = rare)
- Track: error rates by article, author, content type; corrections; overrides
- Override report → Sara Vallone + Pierce + Chris (shrinks to Vallone once confident)
- Source trustworthiness: define sources, manage/remove untrustworthy sources over time
- Pierce tested on Home Buyers Guide (Mecklenburg County tax — complex fiscal year nuances)

## Pending Notifications

- **PGS-97 persona results:** Susannah will notify when Oliver Felix completes human review
- **ANP March data:** Tarrow adding to Drive folder (said 2026-04-01); drop into anp_data/ when arrives

## Items Not Yet in Any Repo

- Digest Chris's cluster performance sheet (P6 monitoring)
- Apple News monitoring cadence setup (rq-apple-news-monitoring — separate ops deliverable)
- Content diff tool (PGS-82): PR in code review; Pierce = stakeholder. Sarah Price to test full flow.
- Headline tool + title options (rq-headline-tool, rq-title-options — clarify ownership with Chris)

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~115*
