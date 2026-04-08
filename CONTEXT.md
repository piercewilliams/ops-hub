# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-07 EOD sync — processed PGS-148 (Oliver Felix SEO Keywords gap flagged; TEO spec captured; adopt-vs-rewrite decision needed before eng builds) + PGS-150 (new plagiarism detection spike; off-the-shelf API investigation; surfaces at Audience Variants alongside PGS-82; Emily Bohnet B2B feedback). Processed CSA Weekly 2026-04-07 transcript: PGS-82 staging clarified (waiting to enter; inform-only first version; real Sara drafts; QA tester), WordPress imminent, Q estimate Apr 8, taxonomy restructured as epic (~7 tickets, siblings in scope), GitHub access dropped (Bitbucket sufficient), dev team +2 eng +1 QA, cluster 1:3.3 (exceeds 1:4 target), US team listicle + external Claude URL workflow flagged (Sara investigating), reporter terminology (content creators/contributors not reporters), Gary: Pierce documenting escalation hierarchy first, Andy: 2 emails no response (wait then ticket), AB testing templates logged as future request.
**Status:** P9 complete. 15 active projects + P16 not-started. Primary gates: PGS-148 SEO Keywords decision (Pierce), Vallone format guide, 3-way SEMrush meeting, Andy template sign-off, LTV meeting (Chris scheduling). Gary unblocked 2026-04-08.

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
- **CSA performance improvement (2026-04-07):** Rajiv replaced thinking tokens for trivial tasks (char counting, text sizing) with code + targeted LLM call to shorten headlines when too brief. Result: 8.5 min → 1 min 18 sec on test runs, with equal or better content quality.
- **2-PR process (new, effective after this week):** All non-emergency code changes require 2 PRs. Rajiv establishing before handing off product more broadly to team. Emergency hotfixes excepted.
- **Own voice feature:** Discussed in standup — Susannah interested, Rajiv open to it. Emil flagged privacy + plagiarism risk if generated voice is used elsewhere. No decision; Rajiv says implement thoughtfully or not at all.
- **Mobile app:** Rodrigo started feature development (Saner Keles coordinating). Demo potential; no timeline yet.
- **PGS-148 (Selected for Dev, High):** Implement SEO Field Rules for National Team Agent Prompt — seo title (50–70 chars), meta description (100–155 chars), focus keyphrase rules from seo-rules.md. National team only; overrides PGS-102. Pierce tagged. Eng must review alongside PGS-104. **GAP (Oliver Felix, 2026-04-07):** seo-rules.md is missing SEO Keywords section. Oliver provided current TEO spec: 3–5 multi-word phrases, all lowercase, comma-separated, include location for local stories (e.g. "dca plane crash, reagan airport crash, washington plane crash, potomac river crash"). Pierce must confirm: adopt TEO spec as-is or write National-specific version — resolve before eng builds.
- **PGS-141 (Selected for Dev):** Implement H1 headline rules for National Team agent prompt.
- **PGS-150 (New — Spike):** Plagiarism Detection for CSA-Generated Content. Investigate off-the-shelf APIs (Copyscape, CopyLeaks, Turnitin, iThenticate) + internal tooling options. Surface check at Audience Variants stage alongside PGS-82 diff score. Distinct from PGS-82 (internal CSA-to-CSA variant similarity): PGS-150 = output vs. third-party web content. National team first. Emily Bohnet surfaced in B2B feedback doc. Pierce CC'd; eng will produce recommendation.
- **AGENT-AUDIENCE routing — §1 status (2026-04-08):** §1.1 Voice & Tone → general-style (Susannah UI upload, done). §1.2 Headline Best Practices → headline (PGS-141, selected for dev). §1.2 SEO fields → seo (PGS-148, selected for dev). §1.3 Explicit Language → general-style (Susannah UI upload, done). §1.4 link count + anchor text → general-style (Susannah UI upload, done). §1.4 What to Link To → human-only (no action needed). §1.5–1.9 → human-only (no action needed). Susannah using Claude to fetch content by tag during uploads.
- **PGS-139 + PGS-140 (both Selected for Dev):** Pierce tagged on both. PGS-139: CSA internally tests variants for duplicate content, auto-regenerates if fails, notifies user if still fails — UX for extended time is key concern (Efren Castillo; coordinate with TEO/Jim Robinson). PGS-140: analytics for pass/fail rates, failing variant IDs, reanalysis clicks, auto-regen events — Marcelo starting Amplitude implementation today (intelligence only, no UI needed). Feeds P2 Amplitude once live.
- **PGS-80 DONE (2026-04-06):** Amplitude event tracking implemented. Remaining P2 blocker: p-tagging bug (CUE/WP format mismatch) — CSA eng fix.
- **PGS-82 (2026-04-07 CSA Weekly):** Waiting to enter staging. First version = inform only: run all variants through CSA, flag concerning similarity pairs, tell user to edit/deselect those pairs, then reanalyze. Second version (PGS-139, already ticketed) = CSA resolves internally first. Staging will use real Sara Vallone drafts + real workflows — no dummy content. Susannah has dedicated QA tester now. National team flag ready; no lag expected between staging and production.
- **CSA GitHub access: NOT NEEDED (2026-04-07).** Kathryn Sheplavy confirmed: Bitbucket mirrors GitHub; Bitbucket access is sufficient. Dropped action item.
- **Dev team expanded (2026-04-07):** 2 new engineers + 1 dedicated QA tester added to Susannah's team.
- **Cluster performance (2026-04-07 CSA Weekly):** National team at 1-in-3.3 stories-per-cluster ratio. Target was 1-in-4 — already exceeded. Chris showing examples: some clusters land on 2–3 markets (Netflix One Piece: Miami + Kansas City). Tracking still painful because tagging isn't live. Chris sharing sanitized data with Kathy + Eric.
- **US team listicle + external Claude workflow (flagged 2026-04-07):** Susannah flagged two issues: (1) US team using CSA for listicles (combining info — different work stream, Chris OK'd but directed to Brody for escalation path on author attribution). (2) A content creator using external Claude to extract facts from URLs, then using that as CSA outline — Sara Vallone assigned to investigate. AI Tool Responsibility doc being circulated (Chris + Sara + Pierce).
- **Reporter terminology (2026-04-07, stays internal):** Chris: do NOT call national team members "reporters." They are "content creators" or "contributors." Labor/union sensitivity — news division members are journalists; national team are not. Susannah acknowledged. Conversation stays internal.
- **AI Tool Responsibility page (csa-content-standards):** Live as of 2026-04-07 with DRAFT banner. Completed draft passed to Sara Vallone 2026-04-08 — awaiting her review. Six [TBD] gaps still need Chris + Sara to fill before final: Step 2/3 contacts, supervisor conflict contact, Slack channel, override doc location, United Robots scope, phrasing-reproduction threshold.
- **CSA fact-checking ruleset v0.1:** Completed draft passed to Sara Vallone 2026-04-08 — awaiting her review + validation against 15 test articles. 4 open items for Rajiv/Susannah: United Robots scope, module access by role, verdict confidence scores, audit trail/storage.
- **Julia Tortoriello meeting:** Thursday 2026-04-10 2PM EST — El Nuevo Spanish translation process. Prep: `sessions/meeting-2026-04-10-julia-tortoriello.md`
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
- Snapshot version bars on csa-dashboard, csa-content-standards, data-headlines — weekly auto-snapshot (Mon 8am), passkey `8812`, max 5 per site; trigger `trig_014MR5mJJxFsVYLdVdDU4u1d`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker / State |
|---|---------|------|--------|---------------------|
| 1 | Platform Access & Training | 1 | In progress | SEMrush + Amplitude confirmed. Marfeel unclear. Gary API key received 2026-04-08. |
| 2 | Dashboard Instrumentation | 4 | In progress | Google Sheets creds from Chad = first live adapter. Amplitude p-tagging bug (eng fix). PGS-140 analytics data will feed this once live. |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | 13 findings, experiments page, governor, Headline Grader built + delivered (2026-04-06). **Grader stalled — M-Lache org blocks OAuth/API keys; sandbox doc needed first.** SEMrush layer next. |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 → Sarah Price consolidation first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Vallone format guide in hand (10 corrections needed). Andy review pending for 2 personas. |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7. Discover Persona test sheet exists in tracker (empty). |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | PGS-40 now in progress. Tagging model scope: content formats, personas, output variants, distribution platforms. Swarming Test in tracker validates approach. |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris. Testing tracker is manual evidence of demand. |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking anything. |
| 9 | PRD Revisions | 3 | **Complete** | V0.4 delivered 2026-04-06. Chris had not read it as of 2026-04-07 meeting (Pierce dropped link). Outstanding question for Chris: automation levels in middle categories — his call. |
| 10 | Gary Tools Integration | 2 | **In progress** | **UNBLOCKED 2026-04-08.** Gary sent full API docs to Chris: base URL, McClatchy API key (`uak_...`), all live endpoints. Key fact-checking endpoint: `POST /api/v1/research/data-validity`. First-test sequence ready to run. Sara Vallone parameter session still next week. |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | **Complete** | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | API key + 3-way alignment meeting needed before building. Sarah Price scheduling meeting. |
| 15 | Partner Content / Inventory Optimization | 5 | **In progress** | Lindy's going live this week. AI policy for AI-sourced content now active. Reuters still blocked. **New sub-scope: fact-checking inbound partner content (Athlon Sports ~1M stories/year). Legal question: data vs. content (analyzable vs. contractually forbidden). Low priority.** |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff this week (Sara, Sarah Price, Pierce, Kathy). Statistical input from Pierce needed. |

## What's Next

**#1 — THIS WEEK:**
1. [ ] **CSA Weekly — Chris Palo, Sara Vallone, Susannah Locke** — Agenda prepped (2026-04-08). Key decision needed before meeting: draft a one-sentence proposal on how Sara's 2-tier verdict taxonomy maps onto Chris's 5-verdict set (verdict taxonomy is #1 agenda item and highest-leverage). Other items: PGS-82 staging schedule, PGS-139 UX meeting status, AI Tool Responsibility 3 gaps (Slack channel/override doc/United Robots scope), format/persona decoupling, PRD automation levels, Gary API loop-in for Susannah.
1.5 [ ] **PGS-148 SEO Keywords gap — resolve before eng builds** — Oliver Felix flagged (2026-04-07): seo-rules.md is missing SEO Keywords. TEO spec in hand (3–5 multi-word phrases, lowercase, comma-separated, location-inclusive for local stories). Decision: adopt TEO spec as-is for National team, or write National-specific version? Communicate decision on the ticket or directly to Oliver/Susannah so eng can incorporate before build starts.
2. [ ] **Julia Tortoriello meeting — Thursday 2026-04-10 at 2 PM EST** — El Nuevo translation process + selection criteria + CSA instrumentation scope. Prep notes: `sessions/meeting-2026-04-10-julia-tortoriello.md`
3. [ ] **Get SEMrush API key + 250K credits from Sarah Price** — she confirmed she'll forward it; follow up if not received.
3. [x] ~~**Review Sara Vallone's AI usage guidance draft**~~ — Received. Pierce drafted expanded escalation language: named escalation chain, supervisor conflict path, stop-use trigger, plagiarism/attribution check, partner content vetting, override documentation.
   - [x] ~~**Draft AI Tool Responsibility page + fact-checking ruleset**~~ — Both completed drafts passed to Sara Vallone 2026-04-08. Waiting on her review.
   - [ ] **3 remaining gaps in AI Tool Responsibility page** — Sara answered 3 of 6 (2026-04-08): escalation chain = Sara + Slack channel; supervisor conflict = Sara + Chris; phrasing threshold defined. Still open: (1) which Slack channel for Step 2, (2) override doc location + EOD report buildability (Rajiv/Susannah), (3) United Robots scope (Chris). Doc cannot be finalized until these are answered.
4. [x] ~~**Ping on CSA intro length**~~ — PGS-147 now **in progress**. National team only; ~80–100 words before first H2 (currently ~50). Applies to all National content formats via feature flag.
5. [ ] **Attend LTV model kickoff meeting** — Chris Palo scheduling this week with Sara Vallone, Sarah Price, Kathy, Pierce. No initiation action; wait for calendar invite.
6. [x] ~~**Draft Gary Tools escalation ruleset**~~ — CSA fact-checking module ruleset v0.1 complete (2026-04-07). Passed to Sara Vallone 2026-04-08. Bring to test article session next week once she's reviewed.

**#2 — NEXT WEEK:**
7. [ ] **Document Gary fact-checker desired functionality** — Pierce writing: hierarchy of escalation paths, desired behavior/responses for each scenario, internal logic. Susannah confirmed this is the right approach to set dev expectations upfront. Do this before running first-test sequence.
7.5 [ ] **Run first-test sequence against Gary API** — health → scrape → meta → content-structure → unanswered-questions → brands/mcclatchy/readiness → citations → poll. McClatchy key in hand. Gary's intended workflow: copy API doc into Claude, run markdown article through it.
8. [ ] **Gary Tools meeting with Sara Vallone** — walk 15 test articles, iterate on ruleset. Draft already in her hands.
8. [ ] **3-way SEMrush meeting** (Pierce, Sarah Price, Sara Vallone) — Sarah Price scheduling. Align on: signals/trends to track, presentation format, weekly vs monthly cadence, what to toggle by. This scopes P14 build.
8. [ ] **Andy review on Apple News + SmartNews distribution templates** — Sara sent 2 emails, no response. Chris (2026-04-07): wait a few more days, then submit ticket; eng turnaround = few days. Do not block on Andy indefinitely.
9. [x] ~~**Investigate Julia Tortoriello's content translation strategy**~~ — **Meeting scheduled: Thursday 2026-04-10 2PM EST.** Julia Tortoriello confirmed. Context: El Novo translating many stories; team exploring dedicated Spanish CSA pipeline.
10. [x] ~~**Build Headline Grader**~~ — Built and delivered 2026-04-06. Requirements gathered at C&P Weekly, refined by Pierce; 14-criteria daily grader live at data-headlines (docs/grader/index.html), link delivered to Sara Vallone + Sarah Price. Remaining: criteria refinement as they review; individual performance tracking (per-author breakdown) to add.

**#3 — AFTER NEXT WEEK'S MEETINGS:**
8. [ ] **When format/persona decoupling lands: migrate Apple News + SmartNews best practices from persona → format section** — Sara already frames these as format; dev ticket in queue (15/18 in code review as of 2026-04-03). Do this review as soon as the decoupling ticket closes.
9. [ ] **Get final Vallone format guide + codify into csa-content-standards** — DO NOT FORGET. Confirm Vallone produces final version with T1 findings incorporated, then codify. 10 corrections to verify: remove WTK from SmartNews recs, add questions-hurt-both rule, add push notifications section, refine char targets (SN: 70–90 / Apple: 90–120).
10. [ ] **Build SEMrush layer (P14)** — after 3-way meeting defines scope. Point-and-click interface for Sarah Price on top of API.
11. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data. (Sarah Price also reaching out to Dedra 2026-04-06 to coordinate.)
12. [ ] **Finalize Science-Curious persona definitions** — Retiree + Casual Reader need canonical definitions before Susannah saves as shared custom personas.
13. [ ] **Extend AGENT-AUDIENCE routing annotations beyond §1** — §1 fully confirmed live (2026-04-08). Susannah is tagging; next: audit §2+ sections and add AGENT-AUDIENCE tags where applicable.
14. [ ] **Document sandbox base build** — Chris explicitly asked (2026-04-07). Document the toolkit, guardrails, and access info so Chris Palo and Sarah Price can create their own specialized builds (e.g., analytics, partner content). Repo is public; package it. This supersedes the earlier "20-step environment" framing — focus is on repeatability for non-Pierce users, not just setup documentation.
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
- [ ] **Await Susannah's notification when PGS-82 enters staging** — Pierce + Sara Vallone + Kathryn Sheplavy all invited. Real Sara Vallone drafts will be used. No action needed to initiate.
- [ ] **Monitor PGS-140 analytics spec** — duplicate content analytics will feed P2 dashboard once live; confirm Amplitude event names with dev team when ticket moves to build.
- Rollout: PGS-82 enters staging (inform-only version) → Pierce/Sara/Kat QA with real content → mitigation strategies → production (national team flag) → PGS-139 (auto-resolve) → PGS-140 (analytics)

**Waiting on others (no action needed):**
- Sarah Price: SEMrush API key + 250K credits; cluster performance data + Amplitude pulse data (to share with Pierce); 3-way SEMrush meeting scheduling; El Nuevo article count + translation % filtered by author bylines (from C&P Weekly 2026-04-06)
- Chris Palo: PRD V0.4 review (not yet read as of 2026-04-07; automation levels = his open question); clustering stats repackage → Eric Nelson + Kathy Veter; told Jason about Gary's reluctance; pinging Rasheed re: Bitbucket + Cloudflare team environment; LTV meeting scheduling
- Sara Vallone + Andy: Apple News + Smart News distribution templates mostly done (Sara). Andy sent 2 emails, no response. Chris: wait a few more days, then submit ticket — changes go through eng (few days turnaround).
- Sara Vallone: review of AI Tool Responsibility page + CSA fact-checking ruleset v0.1 (both passed 2026-04-08)
- Sara Vallone: PGS-148 SEO Keywords spec — Pierce sending question 2026-04-08 morning (TEO spec in hand; does she want that or something National-specific?)
- Sara Vallone: Alex Meta contact (El Novo Spanish strategy)
- Susannah Locke: pinning 5 personas (PGS-133); H1 enforcement fix (PGS-135); CSA intro length investigation (Pierce to escalate)
- Gary Kirwan: **UNBLOCKED.** Sent full API docs to Chris (2026-04-08). First-test sequence ready to run. No further action needed from Gary to begin testing.
- Marfeel: access status unclear — verify
- Tarrow: ANP March drop (adding to Drive folder)
- Sarah Price: reaching out to Dedra 2026-04-06 to schedule Chad Snowflake meeting
- Dev team: variant linking + Cluster ID field (P6 — restructured as epic with ~7 new tickets, siblings still in scope, goes live when CMS connections established); PGS-133/134/135; p-tagging bug (Amplitude blocker); WordPress send-to "any day now" (Susannah's side done, other team's estimate expected Apr 8); Q/Cue estimate expected Apr 8
- Sara Vallone: investigating content creator using external Claude to process URLs as CSA outline


## Gary Tools — Summary of What It Is

Gary Kirwan's tool runs factual accuracy / claims validation post-CSA, before editor's desk. **UNBLOCKED 2026-04-08 — Gary sent full API documentation to Chris.** Base URL: `https://unified-seo-gateway.kirwan-digital-marketing-ltd.workers.dev`. McClatchy API key in hand (rotatable). Key endpoint: `POST /api/v1/research/data-validity` (main claims validator). First-test sequence: health → scrape → meta → content-structure → unanswered-questions → brands/readiness → citations → poll. Three reports run: Duggar legal, Women's World health, Charlotte Home Buyers Guide. Charlotte caught stale FY2025 tax rate that human editor missed. Chris directed Pierce + Sara Vallone to define editorial parameters. Sara proposed 2-tier taxonomy: **"Needs Clarification"** + **"Needs Correction"**. Sara also values source quality flagging. 4 technical questions still unanswered. Sara has 15 test articles; parameter session next week. Details: gary-tools repo.

## Strategic Frameworks (from Chris Palo huddle 2026-04-03)

**Syndication ecosystem taxonomy:** Two distinct environments. App-based captured (Apple News, SmartNews, Newsbreak) — users stay in-app, LTV=0, no subscriber conversion, pure PV increment. Web-based competitive (Yahoo, O&O) — users land on site, discovery model, standard CTR/PV dynamics. Do NOT commingle in analytics — headline/format formulas that work in one will not generalize to the other.

**LTV = 0 for syndication:** Every syndication platform play is incremental PVs only — same articles also live on O&O. No subscriber conversion from syndication. The "value" of each syndication slot = PV delta. PRD must frame syndication strategy accordingly.

**Cluster batting average:** Stories above avg PVs on 2+ sites. Q1 goal: 1-in-4. **Current: 1-in-3.3 as of 2026-04-07 — already exceeding target** (before CSA: 1-in-5). Chris sharing sanitized data with Kathy + Eric. "Double and triple dipping" = same story lands on multiple sites, each contributing incremental PVs. Chris proposed future: daily AB testing of templates (content creators unaware of test group) — logged as future feature request.

**Political data (two worlds):** Macro numbers (Justin's/Dedra's dashboards) are a separate world from Pierce's CSA statistical testing layer. Don't need to reconcile them. Pierce's work = isolated analysis environment for testing; Chris's cluster/political tracking = macro dashboard view.

**Q2 metrics (from C&P Weekly 2026-04-06):** 3× output target; $85/asset cost benchmark; 500K PV "big hairy goal"; 5–8% long-term traffic lift goal; current batting average 1-in-3 (before CSA: 1-in-5). Confirmed in session.

**Headline vs. article distinction:** Headline is the acquisition tool (drives click from syndication surface). Article content is the retention/value creation layer. These are analytically distinct — headline formula findings apply to click acquisition; content quality findings apply to return visits and subscriber conversion. Do not conflate in analysis or stakeholder comms.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~120*
