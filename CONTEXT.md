# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-06 (PRD V0.4 completed — Sara Vallone + Sarah Price feedback incorporated; delivered to Chris Palo for final review. Rajiv Pant synthesis skills library updated: 3 new skills installed — synthesis-implementation-integrity, synthesis-skills-manager, synthesis-slack-sync.)
**Status:** P9 complete. 14 active projects (+ P15 not-started). Primary gates: Gary (unresponsive), Vallone format guide final version, 3-way SEMrush meeting, Andy persona review.

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 14 active projects across 5 dependency tiers + 1 hold (P13 closed) — P14 SEMrush added 2026-04-04, P15 Partner Content added 2026-04-04 (not-started)
- P9 (PRD) complete — V0.4 delivered 2026-04-06; Sara Vallone + Sarah Price feedback incorporated; with Chris Palo for final review
- SEMrush + Amplitude access confirmed 2026-04-04. Marfeel status unclear.
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
| 2 | Dashboard Instrumentation | 4 | In progress | Google Sheets creds from Chad = first live adapter. Amplitude blocked by p-tagging bug (eng). |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | 13 findings, experiments page, governor built. Sarah focus: headlines only. SEMrush layer next. |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 → Sarah Price consolidation first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Vallone format guide in hand (10 corrections needed). Andy review pending for 2 personas. |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7. Discover Persona test sheet exists in tracker (empty). |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | In dev team's hands. Swarming Test in tracker validates approach. |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris. Testing tracker is manual evidence of demand. |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking anything. |
| 9 | PRD Revisions | 3 | **Complete** | V0.4 delivered 2026-04-06. Sara Vallone + Sarah Price feedback incorporated. With Chris Palo for final review. |
| 10 | Gary Tools Integration | 2 | **Blocked** | Gary unresponsive. Sara engaged — 2-tier taxonomy proposed, 15 articles sent. Meeting next week. |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | **Complete** | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | API key + 3-way alignment meeting needed before building. Sarah Price scheduling meeting. |
| 15 | Partner Content / Inventory Optimization | 5 | Not started | Chris raised it — "not yet." Kathy-gated. Reuters eval pending. ~10% traffic lift potential (one-time). |

## What's Next

**#1 — THIS WEEK:**
1. [ ] **Get SEMrush API key + 250K credits from Sarah Price** — she confirmed she'll forward it. Follow up if not received after today's meeting.
2. [ ] **Meeting with Sarah Price 2026-04-04** — Apple headlines + SEMrush context + governor tile feedback (tiles 1–13: useful/not, which parts matter within useful tiles).
3. [ ] **Draft Gary Tools ruleset** — before Sara Vallone meeting next week. Start from Sara's 2-tier taxonomy (Needs Clarification / Needs Correction); layer in source authority tiers + escalation logic. 15 test articles from Sara to structure around.

**#2 — NEXT WEEK:**
4. [ ] **Gary Tools meeting with Sara Vallone** — walk 15 test articles, iterate on ruleset draft. Arrive with draft in hand.
5. [ ] **3-way SEMrush meeting** (Pierce, Sarah Price, Sara Vallone) — Sarah Price scheduling. Align on: signals/trends to track, presentation format, weekly vs monthly cadence, what to toggle by. This scopes P14 build.
6. [ ] **Andy review on SmartNews Skimmer + Apple News Explorer personas** — required before Susannah can pin for National accounts.

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

**Waiting on others (no action needed):**
- Sarah Price: SEMrush API key + 250K credits; governor tile feedback (starting next week); 3-way SEMrush meeting scheduling
- Chris Palo: PRD V0.4 final review and feedback
- Sara Vallone + Andy: Apple News + Smart News personas (Sara drafting; Andy reviews before handoff)
- Susannah Locke: pinning 5 personas (PGS-133); H1 enforcement fix (PGS-135); AGENT-AUDIENCE confirmation
- Gary Kirwan: API key + endpoint docs + 4 open questions — unresponsive; second ask 2026-04-03; Sara also seeking access
- Marfeel: access status unclear — verify
- Tarrow: ANP March drop (adding to Drive folder)
- Sarah Price: reaching out to Dedra 2026-04-06 to schedule Chad Snowflake meeting
- Dev team: variant linking + Cluster ID field (P6); PGS-133/134/135; PGS-80 analytics (once live + Amplitude adapter active, CSA usage metrics become available to send to Chris — not a Pierce action until then)


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
