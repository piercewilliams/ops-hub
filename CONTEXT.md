# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-10 — Morning sync. Julia Tortoriello meeting DONE (El Nuevo translation workflow scoped). COMPLETED_TASKS entry added. Potential P17 Spanish CSA Pipeline noted. data-headlines cluster section work committed.
**Status:** P9 complete. 15 active projects + P16 not-started. Primary gates: Vallone format guide, Andy template sign-off, LTV meeting (Chris scheduling), Rocky/Julio credit rate confirmation. Gary unblocked 2026-04-08. PGS-148 SEO keywords resolved 2026-04-08.

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 15 active projects across 5 dependency tiers + 1 hold (P13 closed) — P14 SEMrush added 2026-04-04, P15 Partner Content now in-progress (Lindy's going live, AI policy active), P16 LTV Model added 2026-04-06 (not-started)
- P9 (PRD) — V0.4 with Chris. He left "a lot of feedback" directly in the doc (2026-04-10), called it "really great stuff." Wants a discussion before Pierce implements. **Do not touch the doc until that conversation happens.**
- SEMrush + Amplitude access confirmed 2026-04-04. Marfeel status unclear.
- **CSA architectural refactor (Rajiv, 2026-04-06 weekend):** YAML style guide structure removed; style guides now in Markdown stored in PostgreSQL via PG vector plugin. Two-tier hierarchy: local/admin guides in PG vector; constitutional guides bundled with source code. CSA can now validate uploaded style guides. Fixes: LLM token exhaustion from conflicting content-length vs. source-quality rules.
- **New CSA features (2026-04-06):** "Thinking feature" — CSA displays its reasoning to users (aids debugging, rule tracking). Progress bar replaced spinning circle ("elevator mirror" analogy). One known hang bug remains (Rajiv investigating — possibly Claude overload or hung connection).
- **CSA performance improvement (2026-04-07):** Rajiv replaced thinking tokens for trivial tasks (char counting, text sizing) with code + targeted LLM call to shorten headlines when too brief. Result: 8.5 min → 1 min 18 sec on test runs, with equal or better content quality.
- **Rajiv on vacation (as of 2026-04-09):** Emil Penalo + Oliver Felix delegated production merge authority until Rajiv returns. Saner Keles getting them push-to-production access (from Emmanuel or Gabe Baraga). PR review backlog being prioritized before new dev tasks. Release notes to be organized by theme (national team, e-commerce, admin). Upstatement wrap-up handoff happening next week — all team added as optional attendees.
- **WordPress send-to WP LIVE (2026-04-09) — CRITICAL BUG FOUND (2026-04-10):** Send-to-WP feature is including the audience variant name + date in the headline, which then populates the URL slug. This requires manual rework by publishing team and could harm SEO. Kathryn Sheplavy flagged in standup; Daury Caba assigned to investigate and use SEO headline instead. Bug is active — P12 reliability affected until fixed.
- **Snowflake for Marcelo Freitas:** Marcelo needs trend agent table keys (not personal access). Kat Sheplavy escalating to Brad after standup.
- **Jonathan Gonzalvo QA scope expanding:** Now looking for content quality issues (not just tech/product bugs) — using Claude to evaluate generated variants against expectations. Susannah + Kat closely coordinating.
- **Confluence space:** Saner Keles creating a Confluence space for doc consolidation (Victor Suarez's request). Victor building the page. May need Amanda for admin access.
- **2-PR process (new, effective after this week):** All non-emergency code changes require 2 PRs. Rajiv established before leaving for vacation. Emergency hotfixes excepted.
- **Own voice feature:** Discussed in standup — Susannah interested, Rajiv open to it. Emil flagged privacy + plagiarism risk if generated voice is used elsewhere. No decision; Rajiv says implement thoughtfully or not at all.
- **Mobile app (Trend Hunter prototype):** Rodrigo demo'd search screen, profile screen (mocked data), feed with videos/predictions/images in 2026-04-10 standup. TestFlight internal testing coming soon — Kat coordinating access with Eric Goodwin; Rajiv creating Slack thread for iCloud emails. Figma mocks being sent to Rodrigo. Strong demo; real timeline emerging.
- **Release wave (2026-04-10 standup):** Saner + Oliver merging 9–10 tickets to staging today; targeting 14–15 items ready for production release Monday 2026-04-13. Oliver offering daily morning releases. Monitor closely — large surface area.
- **New board process (2026-04-10):** Developers must tag Kathryn Sheplavy or Susannah Locke when moving a ticket to Product Review column. This is new — required for change management before Monday release.
- **Ticket 146 (new):** Susannah Locke creating implementation ticket from Victor Suarez's spike suggestions, immediately after standup. Content unknown to Pierce yet.
- **Amazon API Epic (new):** Saner Keles creating Epic for Amazon API features (Guilherme's work). Patrick Al Khouri confirmed all 4 features achievable: sort by relevance, price, average review rating; filter reviews. Star data requires business case separately.
- **Synthesis merge improvement (2026-04-10):** Rajiv updated synthesis merge process to give full primary credit to the submitter of the merge request (open-source "merge then refine" pattern). Rajiv posting reinstall instructions for synthesis skills — may affect Pierce's Claude Code setup.
- **PGS-144 (screen jump fix):** Guilherme Gomes Caires fixed "weird screen jumps" when creating drafts using HTML object references for smooth scroll. Multi-browser testing requested.
- **PGS-148 (IN PROGRESS, unblocked 2026-04-08):** Oliver working on conditional rules (general set + national-team-specific set). SEO keywords gap resolved — **National team spec (Pierce's decision):** 1–5 keywords (not 3–5), single words OK (TEO requires multi-word phrases), all lowercase, comma-separated, include location names for local stories. Example: "travel, supplements, Jason Kelce, dca plane crash, reagan airport crash". Susannah confirmed Oliver is using Pierce's requirements. No further action needed.
- **PGS-141 (CODE REVIEW):** Patrick Al Khouri put H1 headline rules for National Team in PR.
- **PGS-135 (CODE REVIEW as of 2026-04-10):** Moved from Selected for Dev. H1 headline length enforcement (80–100 chars) for National Team now in PR.
- **PGS-134 (READY FOR PRODUCTION as of 2026-04-10):** "Everything to Know" + "FAQ / Service Journalism" formats passed code review. Ready to ship. When live: migrate Apple News + SmartNews best practices from persona → format section in csa-content-standards.
- **PGS-114 (DONE as of 2026-04-10):** AI disclaimer removal from Discovery Content Format confirmed live.
- **PGS-98 (PRODUCT REVIEW as of 2026-04-10):** "Additional Context and Editorial Notes" bug moved from In QA → Product Review.
- **PGS-96 (IN QA as of 2026-04-10):** Discover Browser saved target audience moved from Code Review → In QA.
- **PGS-87 (PRODUCT REVIEW as of 2026-04-10):** Target Audience label missing from Google Doc export moved from In QA → Product Review.
- **PGS-150 (PRODUCT REVIEW as of 2026-04-10):** Plagiarism detection spike complete — recommendation in product review.
- **PGS-93 (ON HOLD as of 2026-04-10):** "Create Research Draft" from URL import flow put on hold. Susannah ticketed from Ryan's request without consulting Sara's team. Pierce commented: "Sara says this needs to be reworked; please do not prioritize."
- **PGS-150 (IN PROGRESS as of 2026-04-08):** Plagiarism Detection spike — off-the-shelf APIs (Copyscape, CopyLeaks, Turnitin, iThenticate) + internal tooling. Surface at Audience Variants stage alongside PGS-82 diff score. PGS-150 = output vs. third-party web (distinct from PGS-82 = internal variant-to-variant). National team first. Pierce CC'd; eng produces recommendation.
- **AGENT-AUDIENCE routing — §1 status (2026-04-08):** §1.1 Voice & Tone → general-style (Susannah UI upload, done). §1.2 Headline Best Practices → headline (PGS-141, selected for dev). §1.2 SEO fields → seo (PGS-148, selected for dev). §1.3 Explicit Language → general-style (Susannah UI upload, done). §1.4 link count + anchor text → general-style (Susannah UI upload, done). §1.4 What to Link To → human-only (no action needed). §1.5–1.9 → human-only (no action needed). Susannah using Claude to fetch content by tag during uploads.
- **PGS-139 + PGS-140:** Pierce tagged on both. **PGS-140 now blocked on PGS-82 merge** — Marcelo confirmed in standup that PGS-140 is built on top of PGS-82 and can't be finished until PGS-82 merges to staging (happening today). PGS-139: CSA internally tests variants for duplicate content, auto-regenerates if fails, notifies user if still fails — UX for extended time is key concern (Efren Castillo; coordinate with TEO/Jim Robinson). PGS-140: analytics for pass/fail rates, failing variant IDs, reanalysis clicks, auto-regen events — Marcelo starting Amplitude implementation today (intelligence only, no UI needed). Feeds P2 Amplitude once live.
- **Standup 2026-04-08 — key findings:**
  - **PGS-40 → WON'T DO.** Tagging taxonomy work restructured into **EGS-127** (epic, 4 subtasks). Marcelo assigned to start. This is P6's live ticket now.
  - **EGS-127 (new/critical):** Track which content variants came from which canonical article. Susannah's #1 analytics priority — one editor (Sarah on her team) is manually tracking 700+ stories/month. Marcelo starting it. Distinct from PGS-140 (duplicate content analytics) and PGS-80 (user event tracking).
  - **PGS-148 → IN PROGRESS.** Oliver started work. Still blocked on SEO keywords (your gap — Pierce to resolve).
  - **PGS-147 → CODE REVIEW.** Daury completed intro length implementation: array-based org-specific instructions, per-team instructions, PR under review.
  - **PGS-141 → CODE REVIEW.** Patrick put national team headline guidelines in PR.
  - **PGS-134 → CODE REVIEW.** Emil wrapped up everything-to-know + FAQ, refactored into shared components (more DB-driven).
  - **PGS-150 → IN PROGRESS.**
  - **Kathryn "version limit" insight:** If user creates 7 variants from an 800-word source, duplicate content is inevitable — not a CSA failure but a source limitation. Future: flag users when they're requesting too many variants from limited source material. Analytics (EGS-127) first to understand patterns, then build the warning. Marcelo confirmed starting analytics first.
  - **CEO validation (Rajiv, 2026-04-08):** Tony Hunter + Berg told Rajiv this morning they see CSA as a competitive edge vs. AI companies due to content quality. Key reason: guiding principle baked into config = "high-quality content grounded in sources" overrides user-requested length constraints — mirrors Anthropic's "constitution" approach.
  - **Synthesis merge process:** 3 PM meeting today (Rajiv + Oliver + Emil) to improve. Oliver/Emil taking over merging rest of week. Rajiv going on vacation soon.
  - **PGS-125 (Guilherme):** Staging test confirmed — platform can't support >20 product drafts. May be solved by perf improvement (8 min → 1.5 min). Jonathan to retest. Moving to ticket 144.
  - **Trend Hunter B2C (Marcelo):** Revamped backend + frontend — now React + Vite. Working on trade agent, phase 4. Sent email to begin connecting/building.
  - **Susannah:** Reorganized code review column by priority (top to bottom). Asked about tagging/analytics — found EGS-127 in backlog.
- **PGS-80 DONE (2026-04-06):** Amplitude event tracking implemented. Remaining P2 blocker: p-tagging bug (CUE/WP format mismatch) — CSA eng fix.
- **PGS-82 (2026-04-07 CSA Weekly):** Waiting to enter staging. First version = inform only: run all variants through CSA, flag concerning similarity pairs, tell user to edit/deselect those pairs, then reanalyze. Second version (PGS-139, already ticketed) = CSA resolves internally first. Staging will use real Sara Vallone drafts + real workflows — no dummy content. Susannah has dedicated QA tester now. National team flag ready; no lag expected between staging and production.
  - **Approved strategic framing (2026-04-08, strong stakeholder approval):** The diff tool is a *quality signal for whether the variant system is working* — not just an SEO compliance guardrail. Google penalty is a downstream consequence; the upstream problem is that without a differentiation baseline, there's no way to know if persona/format targeting is producing genuinely distinct output or just surface-level rewrites. The analytics layer (PGS-140) turns scores into a feedback loop: which persona+format combos consistently fail, whether differentiation improves over time, where prompt/definition fixes are needed vs. where AI self-correction is sufficient. **Use this framing — not "Google compliance" — when discussing PGS-82/139/140 with stakeholders.**
  - **Chris Palo input (2026-04-08):** Chris flagged that the rollout doc looks too narrowly focused on Google/SEO. He specifically wants testing to cover semantic, tonal, and other differences — not just duplicate content as Google defines it. Key clarification for Chris: vector embeddings (the technology PGS-82 uses) *do* capture semantic and tonal similarity — they measure meaning-level closeness, not surface keyword repetition. The Google framing in the rollout doc is an undersell. The deeper question Chris is raising: are the thresholds and flagging criteria calibrated for audience-targeting quality (semantic/tonal) and not just SEO compliance? This should feed into the staging test design.
  - **Susannah's doc — current to-do state (2026-04-08):** Pre-staging: ✅ analytics ticket written (PGS-140); 🔴 schedule staging session with TEO + national team (Monday earliest); 🔴 QA test plan; 🔴 draft national team leadership comms re: workflow changes. Staging phase: run QA with real content, analyze with TEO, document mitigation strategies, prepare reporter comms if needed. Future eng: 🟢 backend self-correction ticket written (PGS-139); UX meeting for self-correction TBD.
- **CSA GitHub access: NOT NEEDED (2026-04-07).** Kathryn Sheplavy confirmed: Bitbucket mirrors GitHub; Bitbucket access is sufficient. Dropped action item.
- **Dev team expanded (2026-04-07):** 2 new engineers + 1 dedicated QA tester added to Susannah's team.
- **Cluster performance (2026-04-07 CSA Weekly):** National team at 1-in-3.3 stories-per-cluster ratio. Target was 1-in-4 — already exceeded. Chris showing examples: some clusters land on 2–3 markets (Netflix One Piece: Miami + Kansas City). Tracking still painful because tagging isn't live. Chris sharing sanitized data with Kathy + Eric.
- **US team listicle + external Claude workflow (flagged 2026-04-07):** Susannah flagged two issues: (1) US team using CSA for listicles (combining info — different work stream, Chris OK'd but directed to Brody for escalation path on author attribution). (2) A content creator using external Claude to extract facts from URLs, then using that as CSA outline — Sara Vallone assigned to investigate. AI Tool Responsibility doc being circulated (Chris + Sara + Pierce).
- **Reporter terminology (2026-04-07, stays internal):** Chris: do NOT call national team members "reporters." They are "content creators" or "contributors." Labor/union sensitivity — news division members are journalists; national team are not. Susannah acknowledged. Conversation stays internal.
- **AI Tool Responsibility page (csa-content-standards):** Finalized 2026-04-07 (v1.4.1) — DRAFT banner removed. Escalation contacts resolved: Step 2 = Sara Vallone + #prog-and-growth; supervisor conflict = Sara + Chris; recurring issues/stop-use = #nationalteam-csa-feedback. One open item: override documentation location (TBD, pending CSA team input). Passed to Sara Vallone 2026-04-08 for review.
- **CSA fact-checking ruleset v0.1:** Completed draft passed to Sara Vallone 2026-04-08 — awaiting her review + validation against 15 test articles. 4 open items for Rajiv/Susannah: United Robots scope, module access by role, verdict confidence scores, audit trail/storage.
- **§9 Claims Validation (csa-content-standards):** Spec complete (v1.4.2, 2026-04-08) — docs/claims-validation.md live. Five verdicts; content-type rules (health/legal/financial/real estate/travel/entertainment); source authority tiers; escalation table. Gary API integration details to follow Sara parameter session.
- **§10 Platform Formats (csa-content-standards):** Live (v1.6.0, 2026-04-08) — SmartNews §10.1 + Apple News §10.2 standalone pages. v1.6.1 consistency audit complete — all stale headline ranges corrected against validated data-headlines findings; data-validated labels throughout.
- **Julia Tortoriello meeting DONE (2026-04-10):** El Nuevo uses CMS-integrated Google Translate + GPT-3 ("ChTBD"); GPT-3 far better than Elbex for Spanish nuance. Custom models + temperature-adjusted prompts fix recurrent errors (e.g., exclusive "ae" term, capitalization, quotation punctuation). Separate standalone GPT ("dog translator") for Us Weekly en Español (chatgpt.com/g/g-0SsURCxh4) handles fluency edge cases + Spanish→English for Argentina/Costa Rica reporter stories. Dialect: US Hispanic = Colombian Spanish register; telling AI "US Hispanic, United States" is sufficient. Julia delivered CMS prompt (6 rules) + GPT link; offered to test CSA in Spanish. Chris + Rajiv considering dedicated Spanish CSA pipeline — this meeting establishes baseline. Full notes: `sessions/meeting-2026-04-10-julia-tortoriello.md`
- **Sigma CSA dash (Deedra, 2026-04-10):** Deedra's team building it. Simple version (site PV/SubPV performance only) almost done. Chris explicitly: get simple version done before scope creep — additional dimensions (variant type, cluster ID, diff score, CSA user) are a phase 2 scope conversation. Pierce waiting. No action until simple version ships and Pierce reviews it.
- **Potential P17 — Spanish CSA Pipeline:** Chris Palo + Rajiv considering dedicated Spanish pipeline. Julia Tortoriello meeting (2026-04-10) establishes baseline: current stack is GPT-3 + custom prompts + standalone "dog translator" GPT. Dialect = Colombian Spanish register for US Hispanic audience. Julia willing to test CSA in Spanish. No scope or timeline yet — watch for Chris/Rajiv direction.
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
| 1 | Platform Access & Training | 1 | In progress | All access confirmed except Sigma scope verification. Marfeel confirmed 2026-04-09. Gary API key received 2026-04-08. Pending: Chad Bruton walkthrough to confirm Sigma access is complete. |
| 2 | Dashboard Instrumentation | 4 | In progress | PTECH-7641 DONE. **WordPress send-to WP LIVE 2026-04-09** (UsW/WW/SOD/Bargain Hunter). PGS-140 → IN PROGRESS. Amanda Hamilton Amplitude meeting pending. p-tagging bug still blocks reliable Amplitude data. |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | 13 findings, 15 grader criteria, author playbooks, experiments, governor, Headline Grader (GitHub Actions, daily), weekly auto-ingest pipeline (Monday 8pm CDT; change-detection; longitudinal snapshots). 19/19 tests pass. **Fully operational** — Tarrow shared 2026 sheet 2026-04-09. |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 → Sarah Price consolidation first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Vallone format guide in hand (10 corrections needed). Andy review pending for 2 personas. |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7. Discover Persona test sheet exists in tracker (empty). |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | **PGS-40 → WON'T DO (2026-04-08).** Work restructured into EGS-127 (epic, 4 subtasks, Marcelo assigned) — tracks which variants came from which canonical article. 700+ stories/month tracked manually by one editor; this automates it. |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris. Testing tracker is manual evidence of demand. |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking anything. |
| 9 | PRD Revisions | 3 | **Complete** | V0.4 delivered 2026-04-06. Chris had not read it as of 2026-04-07 meeting (Pierce dropped link). Outstanding question for Chris: automation levels in middle categories — his call. |
| 10 | Gary Tools Integration | 2 | **In progress** | **UNBLOCKED 2026-04-08.** Gary sent full API docs to Chris: base URL, McClatchy API key (`uak_...`), all live endpoints. Key fact-checking endpoint: `POST /api/v1/research/data-validity`. First-test sequence ready to run. Sara Vallone parameter session still next week. |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | Working group not yet defined. **rq-send-to-wp ✅ DONE 2026-04-09.** Remaining prerequisites: EGS-127 (Cluster ID), rq-send-to-cue (in progress), PGS-80 analytics. |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | **Complete** | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | data-keywords repo created 2026-04-09. Blocked: Rocky/Julio per-endpoint rates + Stephanie/Sigma check. Credit: ~10 units/line live, ~50/line historical; 250K ≈ 50 full runs. DataForSEO as alternative. Full API docs in hand. |
| 15 | Partner Content / Inventory Optimization | 5 | **In progress** | Lindy's going live this week. AI policy for AI-sourced content now active. Reuters still blocked. **New sub-scope: fact-checking inbound partner content (Athlon Sports ~1M stories/year). Legal question: data vs. content (analyzable vs. contractually forbidden). Low priority.** |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff this week (Sara, Sarah Price, Pierce, Kathy). Statistical input from Pierce needed. |

## What's Next

**#1 — THIS WEEK:**
1. [ ] **CSA Weekly — Chris Palo, Sara Vallone, Susannah Locke** — Agenda prepped (2026-04-08). Key decision needed before meeting: draft a one-sentence proposal on how Sara's 2-tier verdict taxonomy maps onto Chris's 5-verdict set (verdict taxonomy is #1 agenda item and highest-leverage). Other items: PGS-82 staging schedule + **diff tool threshold calibration** (two signals needed: hard SEO floor vs. softer persona-targeting signal — who proposes initial threshold values, how validated with real content?), PGS-139 UX meeting status, AI Tool Responsibility 3 gaps (Slack channel/override doc/United Robots scope), format/persona decoupling, PRD automation levels, Gary API loop-in for Susannah.
2. [x] ~~**Julia Tortoriello meeting**~~ — DONE 2026-04-10. Notes + resources in `sessions/meeting-2026-04-10-julia-tortoriello.md`.
3. [ ] **Confirm SEMrush credit burn rate with Rocky/Julio** — Rocky Rhodes (SEMrush admin) reached out to rep Julio for endpoint-level rates. Live ~10 units/line, historical ~50 units/line; need exact per-endpoint numbers before building automation. Also confirm with Stephanie Zandecki whether keyword-to-article data already in Sigma.
4. [ ] **PRD discussion with Chris** — he has "a lot of feedback" in the doc; wants to talk before Pierce implements. Do not touch the PRD until this happens. Chris will initiate.
5. [ ] **Attend LTV model kickoff meeting** — Chris Palo scheduling this week with Sara Vallone, Sarah Price, Kathy, Pierce. No initiation action; wait for calendar invite.
4.5 [ ] **Attend Amplitude/Amanda Hamilton meeting** — Sarah Price adding Pierce; she manages Amplitude. Key question: Amplitude + Claude integration issues Sarah Price is hitting.

**#2 — NEXT WEEK:**
7. [ ] **Document Gary fact-checker desired functionality** — Pierce writing: hierarchy of escalation paths, desired behavior/responses for each scenario, internal logic. Susannah confirmed this is the right approach to set dev expectations upfront. Do this before running first-test sequence.
7.5 [ ] **Run first-test sequence against Gary API** — health → scrape → meta → content-structure → unanswered-questions → brands/mcclatchy/readiness → citations → poll. McClatchy key in hand. Gary's intended workflow: copy API doc into Claude, run markdown article through it.
8. [ ] **Gary Tools meeting with Sara Vallone** — walk 15 test articles, iterate on ruleset. Draft already in her hands.
8. [x] ~~**3-way SEMrush meeting**~~ — DONE 2026-04-08. Scope defined. API chain incoming from Sarah Price.
8. [ ] **Andy review on Apple News + SmartNews distribution templates** — Sara sent 2 emails, no response. Chris (2026-04-07): wait a few more days, then submit ticket; eng turnaround = few days. Do not block on Andy indefinitely.
**#3 — AFTER NEXT WEEK'S MEETINGS:**
8. [ ] **When format/persona decoupling lands: migrate Apple News + SmartNews best practices from persona → format section** — Sara already frames these as format; dev ticket in queue (15/18 in code review as of 2026-04-03). Do this review as soon as the decoupling ticket closes.
9. [ ] **Get final Vallone format guide + codify into csa-content-standards** — DO NOT FORGET. Confirm Vallone produces final version with T1 findings incorporated, then codify. 10 corrections to verify: remove WTK from SmartNews recs, add questions-hurt-both rule, add push notifications section, refine char targets (SN: 70–90 / Apple: 90–120).
10. [ ] **Build SEMrush keyword layer (P14)** — `data-keywords` repo created and seeded. Blocked: wait for Rocky/Julio credit rate confirmation + check Stephanie Zandecki's Sigma for existing data. Then evaluate DataForSEO vs SEMrush before building. Point-and-click interface for Sarah Price.
11. [ ] **Schedule Chad Bruton walkthrough** of growth_and_strategy_role Snowflake data. (Sarah Price also reaching out to Dedra 2026-04-06 to coordinate.)
12. [ ] **Finalize Science-Curious persona definitions** — Retiree + Casual Reader need canonical definitions before Susannah saves as shared custom personas.
13. [ ] **Extend AGENT-AUDIENCE routing annotations beyond §1** — §1 fully confirmed live (2026-04-08). Susannah is tagging; next: audit §2+ sections and add AGENT-AUDIENCE tags where applicable.
14. [ ] **Document sandbox base build** — Chris explicitly asked (2026-04-07). Document the toolkit, guardrails, and access info so Chris Palo and Sarah Price can create their own specialized builds (e.g., analytics, partner content). Repo is public; package it. This supersedes the earlier "20-step environment" framing — focus is on repeatability for non-Pierce users, not just setup documentation.
15. [ ] **Investigate Bitbucket shared repo provisioning** — can Pierce provision a shared repo space for the team? Chris implied this is needed for collaboration on analysis code. Check access level.
16. [ ] **T1 ecosystem taxonomy audit** — validate that cross-platform comparisons in current analysis respect ecosystem boundaries (app-based captured: Apple News, SmartNews, Newsbreak vs. web-based competitive: Yahoo, O&O). Flag any findings that commingle these groups; note in governor.
**Compass (HR — performance management):**
- [ ] **Draft goals with Jeremy Gockel** in Compass — due **April 26, 2026**
- [ ] **Goals must total 100%**, each aligned to a division org objective
- [ ] **Save finalized goals** to `compass-goals.md` in ops-hub (feeds weekly progress trigger)
- [ ] **Upload photo** to Compass profile
- [ ] Manager approval by **April 30, 2026**
- [ ] Mid-year check-in: **July 2026** (mandatory)
- [ ] Final evaluation: **January 2027**

**PGS-82/139/140 rollout — Susannah is driving, Pierce is tagged:**
- [ ] Await PGS-82 staging notification (Pierce/Sara/Kat invited; real Sara Vallone drafts). PGS-140 now IN PROGRESS — monitor Amplitude event names when ticket nears build.
- Rollout: staging (inform-only) → QA → production (national team flag) → PGS-139 (auto-resolve) → PGS-140 (analytics)

**Waiting on others (no action needed):**
- Rocky Rhodes (rrhodes@mcclatchy.com): credit burn rate per SEMrush endpoint — he's querying rep Julio; must have before writing any automation
- Stephanie Zandecki (szandecki@mcclatchy.com): confirm whether keyword-to-article data already exists in Sigma dashboard before Pierce builds it from scratch
- Sarah Price: cluster/Amplitude pulse data; Amplitude/Amanda Hamilton meeting invite for Pierce; headline grader feedback (reviewing); El Nuevo article count + translation % by author bylines; Chad Snowflake session (coordinating with Dedra)
- Chris Palo: PRD V0.4 review (automation levels = his open question); clustering stats → Eric Nelson + Kathy Veter; Rasheed re: Bitbucket + Cloudflare team environment; LTV meeting scheduling
- Sara Vallone: review AI Tool Responsibility page + CSA fact-checking ruleset v0.1 (passed 2026-04-08); Apple News/SmartNews templates (Andy 2 emails, no response — submit ticket if no reply); Alex Meta contact (El Nuevo); content creator using external Claude (investigating)
- Susannah Locke: pinning 5 personas (PGS-133); H1 enforcement fix (PGS-135); CUE/Q send-to estimate (after standup)
- Dev team: EGS-127 (variant origin tracking); PGS-133/134/135; p-tagging bug (Amplitude blocker); rq-send-to-cue (date TBD — Kat to announce); PGS-140 IN PROGRESS (Marcelo); Emil/Oliver clearing PR review backlog
- Sigma: confirm full scope of access within growth_and_strategy_role (Chad Bruton walkthrough needed)
- Kat Sheplavy: Snowflake trend agent table keys for Marcelo (escalating to Brad); CUE send-to date announcement TBD


## Strategic Frameworks (from Chris Palo huddle 2026-04-03)

**Syndication ecosystems:** App-based captured (Apple News, SmartNews, Newsbreak) — LTV=0, pure PV increment. Web-based competitive (Yahoo, O&O) — standard CTR/PV dynamics. Do NOT commingle in analytics.
**LTV=0 for syndication:** PV delta only — no subscriber conversion. Every syndication slot = incremental PVs on top of O&O.
**Cluster batting average:** 1-in-3.3 as of 2026-04-07 (target 1-in-4, before CSA: 1-in-5). Q2 metrics: 3× output; $85/asset cost; 500K PV goal; 5–8% long-term traffic lift.
**Headline vs. article:** Headline = click acquisition (syndication surface). Article = retention/subscriber conversion. Analytically distinct — do not conflate.
**Political data:** Justin's/Dedra's macro dashboards are separate from Pierce's CSA statistical testing layer.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
