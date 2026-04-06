# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-06 (Content & Programming Weekly — P15 now active, P16 LTV Model added, headline grading tool committed, AI policy scope opened, Gary escalated to Chris)
**Status:** P9 complete. 15 active projects + P16 not-started. Primary gates: Gary (Chris escalating), Vallone format guide, 3-way SEMrush meeting, Andy persona review, LTV meeting (Chris scheduling).

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 15 active projects across 5 dependency tiers + 1 hold (P13 closed) — P14 SEMrush added 2026-04-04, P15 Partner Content now in-progress (Lindy's going live, AI policy active), P16 LTV Model added 2026-04-06 (not-started)
- P9 (PRD) complete — V0.4 delivered 2026-04-06; Sara Vallone + Sarah Price feedback incorporated; with Chris Palo for final review
- SEMrush + Amplitude access confirmed 2026-04-04. Marfeel status unclear.
- **CSA architectural refactor (Rajiv, 2026-04-06 weekend):** YAML style guide structure removed; style guides now in Markdown stored in PostgreSQL via PG vector plugin. Two-tier hierarchy: local/admin guides in PG vector; constitutional guides bundled with source code. CSA can now validate uploaded style guides. Fixes: LLM token exhaustion from conflicting content-length vs. source-quality rules.
- **New CSA features (2026-04-06):** "Thinking feature" — CSA displays its reasoning to users (aids debugging, rule tracking). Progress bar replaced spinning circle ("elevator mirror" analogy). One known hang bug remains (Rajiv investigating — possibly Claude overload or hung connection).
- **PGS-139 + PGS-140 (NEW, both Selected for Dev):** Pierce tagged on both. PGS-139: CSA internally tests variants for duplicate content, auto-regenerates if fails, notifies user if still fails — UX for extended time is key concern (Efren Castillo; coordinate with TEO/Jim Robinson). PGS-140: analytics for pass/fail rates, failing variant IDs, reanalysis clicks, auto-regen events — feeds P2 Amplitude once live.
- **PGS-82:** Susannah approved merge to staging 2026-04-06 (conditional: national team flag required in production; accessible for stakeholder testing in staging).
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

| # | Project | Tier | Status | Key Blocker / State |
|---|---------|------|--------|---------------------|
| 1 | Platform Access & Training | 1 | In progress | SEMrush + Amplitude confirmed. Marfeel unclear. Gary API key pending. |
| 2 | Dashboard Instrumentation | 4 | In progress | Google Sheets creds from Chad = first live adapter. Amplitude p-tagging bug (eng fix). PGS-140 analytics data will feed this once live. |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | 13 findings, experiments page, governor built. Sarah focus: headlines only. SEMrush layer next. |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 → Sarah Price consolidation first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Vallone format guide in hand (10 corrections needed). Andy review pending for 2 personas. |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7. Discover Persona test sheet exists in tracker (empty). |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | In dev team's hands. Swarming Test in tracker validates approach. |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris. Testing tracker is manual evidence of demand. |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking anything. |
| 9 | PRD Revisions | 3 | **Complete** | V0.4 delivered 2026-04-06. Sara Vallone + Sarah Price feedback incorporated. With Chris Palo for final review. |
| 10 | Gary Tools Integration | 2 | **Blocked** | Gary unresponsive. Chris Palo now personally following up (2026-04-06). Sara engaged — meeting next week. |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | **Complete** | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | API key + 3-way alignment meeting needed before building. Sarah Price scheduling meeting. |
| 15 | Partner Content / Inventory Optimization | 5 | **In progress** | Lindy's going live this week. AI policy for AI-sourced content now active (Pierce + Chris + Kathryn). Reuters still blocked. Inventory analysis still deferred. |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff this week (Sara, Sarah Price, Pierce, Kathy). Statistical input from Pierce needed. |

## What's Next

**#1 — THIS WEEK:**
1. [ ] **Julia Tortoriello meeting — Thursday 2026-04-10 at 2 PM EST** — El Nuevo translation process + selection criteria + CSA instrumentation scope. Prep notes: `sessions/meeting-2026-04-10-julia-tortoriello.md`
2. [ ] **Get SEMrush API key + 250K credits from Sarah Price** — she confirmed she'll forward it; follow up if not received.
2. [ ] **Co-lead tool responsibility document with Sara Vallone** (Chris assigned, 2026-04-06 C&P Weekly) — Sara has a doc started and will share draft EOW (by 2026-04-10). Pierce co-leads. Chris will also define AI policy for partner content vetting with Kathryn + Pierce.
3. [x] ~~**Ping on CSA intro length**~~ — Pierce escalated to Susannah 2026-04-06 (Slack); may be folded into existing PGS-135 headline ticket. Susannah to triage.
4. [ ] **Attend LTV model kickoff meeting** — Chris Palo scheduling this week with Sara Vallone, Sarah Price, Kathy, Pierce. No initiation action; wait for calendar invite.
5. [ ] **Draft Gary Tools ruleset** — before Sara Vallone meeting next week. Start from Sara's 2-tier taxonomy (Needs Clarification / Needs Correction); layer in source authority tiers + escalation logic. 15 test articles from Sara. (Chris is also personally following up with Gary.)

**#2 — NEXT WEEK:**
6. [ ] **Gary Tools meeting with Sara Vallone** — walk 15 test articles, iterate on ruleset draft. Arrive with draft in hand.
7. [ ] **3-way SEMrush meeting** (Pierce, Sarah Price, Sara Vallone) — Sarah Price scheduling. Align on: signals/trends to track, presentation format, weekly vs monthly cadence, what to toggle by. This scopes P14 build.
8. [ ] **Andy review on SmartNews Skimmer + Apple News Explorer personas** — required before Susannah can pin for National accounts.
9. [x] ~~**Investigate Julia Tortoriello's content translation strategy**~~ — **Meeting scheduled: Thursday 2026-04-10 2PM EST.** Julia Tortoriello confirmed. Context: El Novo translating many stories; team exploring dedicated Spanish CSA pipeline.
10. [ ] **Define headline grading rules** with Sara Vallone + Sarah Price — then build: (a) automated daily headline quality report using existing pipeline data, (b) hub page evaluating last 24-48hrs of headlines. Pierce committed to these builds at 2026-04-06 C&P Weekly. Tool to eventually integrate into CSA.

**#3 — AFTER NEXT WEEK'S MEETINGS:**
8. [ ] **When format/persona decoupling lands: migrate Apple News + SmartNews best practices from persona → format section** — Sara already frames these as format; dev ticket in queue (15/18 in code review as of 2026-04-03). Do this review as soon as the decoupling ticket closes.
9. [ ] **Get final Vallone format guide + codify into csa-content-standards** — DO NOT FORGET. Confirm Vallone produces final version with T1 findings incorporated, then codify. 10 corrections to verify: remove WTK from SmartNews recs, add questions-hurt-both rule, add push notifications section, refine char targets (SN: 70–90 / Apple: 90–120).
10. [ ] **Build SEMrush layer (P14)** — after 3-way meeting defines scope. Point-and-click interface for Sarah Price on top of API.
11. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data. (Sarah Price also reaching out to Dedra 2026-04-06 to coordinate.)
12. [ ] **Finalize Science-Curious persona definitions** — Retiree + Casual Reader need canonical definitions before Susannah saves as shared custom personas.
13. [ ] **Extend AGENT-AUDIENCE routing annotations** beyond §1 — pending Susannah confirming it works.
14. [ ] **Document 20-step analysis environment build process** — Chris explicitly asked for this. Write up the full environment setup (deps, ingest pipeline, generator, tests) so Chris can understand and replicate the sandbox. Will also serve as onboarding doc.
15. [ ] **Investigate Bitbucket shared repo provisioning** — can Pierce provision a shared repo space for the team? Chris implied this is needed for collaboration on analysis code. Check access level.
16. [ ] **T1 ecosystem taxonomy audit** — validate that cross-platform comparisons in current analysis respect ecosystem boundaries (app-based captured: Apple News, SmartNews, Newsbreak vs. web-based competitive: Yahoo, O&O). Flag any findings that commingle these groups; note in governor.
17. [x] ~~**Update PRD** with LTV=0 syndication framework, swarm testing vision as product req, syndication ecosystem taxonomy as analytical framework~~ — Done. V0.4 delivered to Chris Palo 2026-04-06.

**Compass (HR — performance management):**
- [ ] **Draft goals with Jeremy Gockel** in Compass — due **April 26, 2026**
- [ ] **Goals must total 100%**, each aligned to a division org objective
- [ ] **Save finalized goals** to `compass-goals.md` in ops-hub (feeds weekly progress trigger)
- [ ] **Upload photo** to Compass profile
- [ ] Manager approval by **April 30, 2026**
- [ ] Mid-year check-in: **July 2026** (mandatory)
- [ ] Final evaluation: **January 2027**

**PGS-82/139/140 rollout — Susannah is driving, Pierce is tagged:**
- [ ] **Attend staging test session (Monday+)** — Susannah scheduling with TEO + national team. Pierce tagged on PGS-139/140; likely involved in staging analysis. No action needed to initiate — wait for Susannah's calendar invite.
- [ ] **Monitor PGS-140 analytics spec** — duplicate content analytics will feed P2 dashboard once live; confirm Amplitude event names with dev team when ticket moves to build.
- Rollout sequence: Staging (Mon+) → TEO + national team QA → mitigation strategies → thoughtful production launch → analytics (PGS-140, "later this week") → self-correction (PGS-139, "this week/next")

**Waiting on others (no action needed):**
- Sarah Price: SEMrush API key + 250K credits; cluster performance data + Amplitude pulse data (to share with Pierce); 3-way SEMrush meeting scheduling
- Chris Palo: PRD V0.4 final review; Gary direct follow-up; LTV meeting scheduling; AI policy collaboration
- Susannah Locke: CSA GitHub repo access (username: piercewilliams; Susannah has OK to provision); intro length triage (queued 2026-04-06)
- Sara Vallone + Andy: Apple News + Smart News personas (Sara drafting; Andy reviews before handoff)
- Sara Vallone: tool responsibility doc draft (EOW 2026-04-10)
- Sara Vallone: Alex Meta contact (El Novo Spanish strategy)
- Susannah Locke: pinning 5 personas (PGS-133); H1 enforcement fix (PGS-135); AGENT-AUDIENCE confirmation; CSA intro length investigation (Pierce to escalate)
- Gary Kirwan: API key + endpoint docs — Chris Palo now personally following up
- Marfeel: access status unclear — verify
- Tarrow: ANP March drop (adding to Drive folder)
- Sarah Price: reaching out to Dedra 2026-04-06 to schedule Chad Snowflake meeting
- Dev team: variant linking + Cluster ID field (P6); PGS-133/134/135; p-tagging bug (Amplitude blocker)


## Gary Tools — Summary of What It Is

Gary Kirwan's tool runs factual accuracy / claims validation post-CSA, before editor's desk. Three reports run: Duggar legal, Women's World health, Charlotte Home Buyers Guide. Charlotte stress-test complete — tool caught stale FY2025 tax rate ($966.20 vs $985.40) that human editor missed. Chris directed Pierce + Sara Vallone to define editorial parameters. Sara proposed simplified 2-tier taxonomy: **"Needs Clarification"** (nuanced/mostly true, needs rewording) + **"Needs Correction"** (factually wrong, misleading, or needs verified source). Sara also values source quality flagging (subpar blog callout). 4 technical questions still unanswered by Gary. Sara sent 15 test articles; meeting next week. Pierce to draft ruleset before meeting. Details: gary-tools repo.

## Strategic Frameworks (from Chris Palo huddle 2026-04-03)

**Syndication ecosystem taxonomy:** Two distinct environments. App-based captured (Apple News, SmartNews, Newsbreak) — users stay in-app, LTV=0, no subscriber conversion, pure PV increment. Web-based competitive (Yahoo, O&O) — users land on site, discovery model, standard CTR/PV dynamics. Do NOT commingle in analytics — headline/format formulas that work in one will not generalize to the other.

**LTV = 0 for syndication:** Every syndication platform play is incremental PVs only — same articles also live on O&O. No subscriber conversion from syndication. The "value" of each syndication slot = PV delta. PRD must frame syndication strategy accordingly.

**Cluster batting average:** Stories above avg PVs on 2+ sites. Q1 goal: 1-in-4. Current: ~1-in-3 (before CSA: 1-in-5 with fewer articles; now 1-in-3 with 5× more). "Double and triple dipping" = same story lands on multiple sites, each contributing incremental PVs.

**Political data (two worlds):** Macro numbers (Justin's/Dedra's dashboards) are a separate world from Pierce's CSA statistical testing layer. Don't need to reconcile them. Pierce's work = isolated analysis environment for testing; Chris's cluster/political tracking = macro dashboard view.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~120*
