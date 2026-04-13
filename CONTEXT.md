# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-13 — Compass 2026 goals submitted (5 goals, 100% weight, Jeremy Gockel approval pending). compass-goals.md written with full SMART statements, org alignments, milestones. Completed projects pill fixed (P9/P13 restored with status: done; diagram.js filters done projects from map). Sara Vallone removed from waiting list (feedback received). Amplitude connector confirmed done. Compass goal-alignment rule enforced in memory — all future priorities must trace to G1–G5.
**Status:** 15 active projects + P16 not-started. PRD V0.5 done. Compass goals submitted 2026-04-13 (Jeremy approval pending by Apr 30). Primary gates: Vallone format guide, Andy template sign-off, LTV meeting (Chris scheduling), Rocky keyword reports, Gary tool roster (awaiting response).

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 15 active projects across 5 dependency tiers + 1 hold (P13 closed) — P14 SEMrush added 2026-04-04, P15 Partner Content now in-progress (Lindy's going live, AI policy active), P16 LTV Model added 2026-04-06 (not-started)
- **P9 (PRD) — CLOSED.** V0.5 complete and delivered 2026-04-10. Removed from dependency map. P15, P16, P11 dependencies satisfied.
- **Inclination Engine** — named and defined in PRD V0.5. Sole future input for automated signals and T1/T2 brief generation. In Signal & Brief Creation, CSA section, Strategic Pipeline Elements, and Open Questions.
- **Gary tool roster email sent (2026-04-10).** Email to Gary Kirwan, CC Chris Palo — asking for full suite description beyond Content Audit API. Framed as cross-pipeline node evaluation. Awaiting Gary's response.
- **New pipelines under investigation (Chris 2026-04-10):** (1) Infographics pipeline — trend research → branded infographic (e.g. HSA rates → Trend Hunter graphic); (2) Licensed partner content pipeline — licensed influencer video/transcript → CSA → multiple articles + tangential content → Trend Hunter + Pier1 sites.
- **Gary tools = "nodes"** — cross-pipeline tools (Gary SEO, fact-checking) that every pipeline touches. Need to specify which tools impact each pipeline. Action: contact Gary for full tool roster, copy Chris.
- **Editorial responsibility reiterated (Chris, 2026-04-10):** Chris met with editorial team — they own the content the tool produces regardless of system output. Team should tag Slack issues as "bug" (unexpected behavior) or "feature request" (new idea) to help Susanna prioritize.
- **Deedra comparison dashboard gap:** Current dashboard aggregates data but doesn't allow team vs. whole-org comparison. Chris needs this. Sarah Price following up with Deedra.
- **Distribution framing (Chris, 2026-04-10):** Channels = O&O, Trend Hunter app, Syndication, TBTV (future). Syndication is an avenue not the focus. Value calculation differs per pipeline (RPM vs RPS vs deal economics). PRD was over-indexed on syndication monetization.
- **$85 CPA → 6,156 PV breakeven** — ECPM data Chris shared. Reference data point; do NOT specify in PRD (too prescriptive). Stored in REFERENCE.md.
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
- **PGS-98 (DONE as of 2026-04-11):** "Additional Context and Editorial Notes" bug resolved — user-provided context now influences generated output.
- **PGS-96 (IN QA as of 2026-04-10):** Discover Browser saved target audience moved from Code Review → In QA.
- **PGS-87 (DONE as of 2026-04-11):** Target Audience label now included in Google Doc exports for platform variants. Data-passing bug between Target Audience step and Platform Distribution export step fixed.
- **PTECH-7730 (TO DO, new):** "Update category tag derived property" — Platform Technology team [PT] Delta, unassigned. Amplitude work to make L&E CSA property = CUE CSA property. "From CSA" checkbox in WordPress. When done: enables Amplitude adapter AND Deedra's unified Sigma dashboard of all CSA content. Parent: PTECH-7005. Reporter: Julia Kim. Susannah CC'd Pierce.
- **PGS-150 spike COMPLETE:** Victor Suarez recommends Copyscape Premium API (~$72/month, pay-as-you-go). Originality.ai as fallback. Internal tooling: not feasible. Susannah asking Pierce: "any strong preferences on tools from your team?" Pierce to review Google Doc and respond.
- **PGS-150 (PRODUCT REVIEW as of 2026-04-10):** Plagiarism detection spike complete — recommendation in product review.
- **PGS-93 (ON HOLD as of 2026-04-10):** "Create Research Draft" from URL import flow put on hold. Susannah ticketed from Ryan's request without consulting Sara's team. Pierce commented: "Sara says this needs to be reworked; please do not prioritize."
- **PGS-150 (IN PROGRESS as of 2026-04-08):** Plagiarism Detection spike — off-the-shelf APIs (Copyscape, CopyLeaks, Turnitin, iThenticate) + internal tooling. Surface at Audience Variants stage alongside PGS-82 diff score. PGS-150 = output vs. third-party web (distinct from PGS-82 = internal variant-to-variant). National team first. Pierce CC'd; eng produces recommendation.
- **AGENT-AUDIENCE routing — §1 status (2026-04-08):** §1.1 Voice & Tone → general-style (Susannah UI upload, done). §1.2 Headline Best Practices → headline (PGS-141, selected for dev). §1.2 SEO fields → seo (PGS-148, selected for dev). §1.3 Explicit Language → general-style (Susannah UI upload, done). §1.4 link count + anchor text → general-style (Susannah UI upload, done). §1.4 What to Link To → human-only (no action needed). §1.5–1.9 → human-only (no action needed). Susannah using Claude to fetch content by tag during uploads.
- **PGS-139 + PGS-140:** Pierce tagged on both. **PGS-140 now blocked on PGS-82 merge** — Marcelo confirmed in standup that PGS-140 is built on top of PGS-82 and can't be finished until PGS-82 merges to staging (happening today). PGS-139: CSA internally tests variants for duplicate content, auto-regenerates if fails, notifies user if still fails — UX for extended time is key concern (Efren Castillo; coordinate with TEO/Jim Robinson). PGS-140: analytics for pass/fail rates, failing variant IDs, reanalysis clicks, auto-regen events — Marcelo starting Amplitude implementation today (intelligence only, no UI needed). Feeds P2 Amplitude once live.
- **Standup 2026-04-08 key findings (archived):** EGS-127 created (Marcelo — variant origin tracking, replaces PGS-40); CEO validation (Tony Hunter + Berg told Rajiv CSA is a competitive edge vs. AI cos); Kathryn version-limit insight (too many variants from short source = CSA failure signal → EGS-127 analytics first). Full details in sessions/2026-04.md.
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
- **Amanda Hamilton Amplitude session DONE (2026-04-09, 9:55 PDT):** El Nuevo author attribution bug filed (Samantha Agate content source = "US Weekly" not her name; Amanda submitted technical request). Claude budget exhaustion is team-wide — Sarah Price and ~3/5 members out of ~$100/month; Chris must contact Travis Farrar (infrastructure) to request more. Pierce needs to connect Amplitude: Claude Settings → Connectors → Amplitude (pre-listed, approved; Sarah already connected). Usage tips: reference chart with filters applied for context; build a context file over time; use Amplitude native AI (no cost) for dashboards, Claude for co-work tasks. Dedra Lawhead oversees news analytics — start with her dashboards. Amanda meets Amplitude monthly; Sarah accepted Slack channel invite. Full notes: `sessions/meeting-2026-04-09-amanda-hamilton-amplitude.md`
- **Julia Tortoriello meeting DONE (2026-04-09, 12:59 CDT):** El Nuevo uses CMS-integrated Google Translate + GPT-3; GPT-3 far better than Elbex for Spanish nuance. CMS prompt (6 verbatim rules) + standalone "dog translator" GPT (chatgpt.com/g/g-0SsURCxh4) both received. Standalone GPT = bilingual auto-detect, preserves tone, SEO-aware, doesn't translate proper names — Julia says it's even better than the CMS integration. Dialect: US Hispanic = Colombian Spanish register; "US Hispanic, United States" is sufficient prompt context. Julia confirmed in follow-up: willing to test CSA in Spanish, try any platforms/models. Chris + Rajiv considering dedicated Spanish CSA pipeline. Full notes + verbatim resources: `sessions/meeting-2026-04-09-julia-tortoriello.md`
- **Sigma CSA dash (Deedra, 2026-04-10):** Deedra's team building it. Simple version (site PV/SubPV performance only) almost done. Chris explicitly: get simple version done before scope creep — additional dimensions (variant type, cluster ID, diff score, CSA user) are a phase 2 scope conversation. Pierce waiting. No action until simple version ships and Pierce reviews it.
- **Potential P17 — Spanish CSA Pipeline:** Chris Palo + Rajiv considering dedicated Spanish pipeline. Julia Tortoriello meeting (2026-04-10) establishes baseline: current stack is GPT-3 + custom prompts + standalone "dog translator" GPT. Dialect = Colombian Spanish register for US Hispanic audience. Julia willing to test CSA in Spanish. No scope or timeline yet — watch for Chris/Rajiv direction.
- **National portfolio canonical file:** `data/national-portfolio.js` — 13 brands, domains, authors, verticals, syndication platforms. Live URL: `https://piercewilliams.github.io/ops-hub/data/national-portfolio.js`. Single source of truth for all API scoping (SEMrush, Amplitude, Marfeel, Gary, etc.). Source: Sara Vallone tracker 2026-04-13. Excludes Life & Style + Mod Moms Club.
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
| 1 | Platform Access & Training | 1 | In progress | All access confirmed except Sigma scope verification. Marfeel confirmed 2026-04-09. Gary API key received 2026-04-08. **Claude connectors connected 2026-04-11** (Amplitude, Google Drive, Gmail, GitHub, Atlassian, Google Calendar, Slack). Pending: Chad Bruton walkthrough to confirm Sigma access is complete. |
| 2 | Dashboard Instrumentation | 4 | In progress | PTECH-7641 DONE. **WordPress send-to WP LIVE 2026-04-09** (UsW/WW/SOD/Bargain Hunter). PGS-140 → IN PROGRESS. **PTECH-7730 (TO DO, Platform Technology [PT] Delta, unassigned)** = the p-tagging fix — when done enables Amplitude adapter + unified Sigma dashboard. **Amplitude session DONE 2026-04-09** — El Nuevo author bug filed; **Amplitude connector connected 2026-04-11.** Also connected: Google Drive, Gmail, GitHub, Atlassian/Jira/Compass, Google Calendar, Slack. Chris → Travis Farrar for team Claude budget. |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | 13 findings, 15 grader criteria, author playbooks, experiments, governor, Headline Grader (GitHub Actions, daily), weekly auto-ingest pipeline (Monday 8pm CDT; change-detection; longitudinal snapshots). 19/19 tests pass. **Fully operational** — Tarrow shared 2026 sheet 2026-04-09. |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 → Sarah Price consolidation first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | **PGS-134 READY FOR PRODUCTION**. **PGS-98 DONE** (2026-04-11) — Additional Context/Editorial Notes now influence output. **PGS-87 DONE** (2026-04-11) — Target Audience label in platform variant exports fixed. **PGS-150 spike complete** — Copyscape Premium API recommended; Susannah asking Pierce for team input. PGS-93 BACKLOG. |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7. Discover Persona test sheet exists in tracker (empty). |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | **PGS-40 → WON'T DO (2026-04-08).** Work restructured into EGS-127 (epic, 4 subtasks, Marcelo assigned) — tracks which variants came from which canonical article. 700+ stories/month tracked manually by one editor; this automates it. |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | Deprioritized by Chris. Testing tracker is manual evidence of demand. |
| 8 | Rajiv CSA Mapping | 2 | In progress | Low priority; not blocking anything. |
| 9 | ~~PRD Revisions~~ | — | **Complete** | V0.5 complete 2026-04-10 evening. All 10 Chris Palo items + T3 sub-pipes implemented. Pasted into Google Docs. |
| 10 | Gary Tools Integration | 2 | **In progress** | **UNBLOCKED 2026-04-08.** Gary sent full API docs to Chris: base URL, McClatchy API key (`uak_...`), all live endpoints. Key fact-checking endpoint: `POST /api/v1/research/data-validity`. First-test sequence ready to run. Sara Vallone parameter session still next week. |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | United Robots Inbound Pipeline | 4 | In progress | **CRITICAL BUG (2026-04-10):** Send-to-WP headline includes variant name + date → corrupts URL slug. Daury Caba investigating. rq-send-to-wp ✅ DONE 2026-04-09 but unreliable until bug fixed. |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | **Complete** | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | **Prototype complete** — 14 briefs, 4 verticals, priority sort (volume × CPC), Skip verdict, TECHNICAL.md + EXECUTIVE-BRIEF.md. Live: https://piercewilliams.github.io/data-keywords/. Repo: `data-keywords` (piercewilliams/data-keywords). **Sara Vallone asked for hot take 2026-04-13** — Slacked link; awaiting her read before Chris 1:1 Tue 4/14 12:30pm CDT. After: pull next verticals per Chris feedback (Sara V priorities: sleep/recovery, HSAs). Rocky reports still needed for position data. No CLAUDE.md in repo yet. |
| 15 | Partner Content / Inventory Optimization | 5 | **In progress** | Lindy's going live this week. AI policy for AI-sourced content now active. Reuters still blocked. **New sub-scope: fact-checking inbound partner content (Athlon Sports ~1M stories/year). Legal question: data vs. content (analyzable vs. contractually forbidden). Low priority.** |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff this week (Sara, Sarah Price, Pierce, Kathy). Statistical input from Pierce needed. |

## What's Next

**#1 — THIS WEEK:**
0. [x] ~~**Respond to Susannah Locke on PGS-150 plagiarism detection tool**~~ — DONE 2026-04-11. Endorsed Copyscape as primary; flagged 10%/25% thresholds need editorial calibration against real drafts; noted Originality.ai as potential complement if paraphrase detection gaps emerge. Looped in Chris Palo + Sara Vallone via email — awaiting their input before Tuesday CSA Weekly. Spike doc: https://mcclatchy.atlassian.net/wiki/spaces/CU2DAK/pages/1861648385/Spike+Plagiarism+Detection+Options+for+CSA-Generated+Content
   - **Chris Palo response (2026-04-13 7:50am):** Five points: (1) Escalate Jira access for Chris (and Sara?). (2) Placement challenge: check should happen BEFORE variants are created (at source/research input stage) — if CSA is a proper RAG model it shouldn't pull outside content; end-check matters only for pipelines open to the wider web. (3) Gary's tool — Chris flagged Gary may have already built plagiarism detection; McClatchy owns that code; investigate before recommending a 3rd party. (4) Copyscape usage tracking — how do we monitor usage, report issues? (5) CPA impact — need cost estimates from the team as services are built out. **Key open question before CSA Weekly: has Gary's tool been investigated for plagiarism detection?**
   - **Jira response sent to Susannah (2026-04-13):** Covered all five Chris points — Gary tool investigation as gate on Copyscape recommendation, placement question (source input vs. output stage, RAG-closed vs. open-web distinction), Jira access escalation request, CPA tracking flag.
1. [ ] **CSA Weekly — Tue 4/14 3pm CDT** (Pierce<>Chris 1:1 same day at 12:30pm CDT). Agenda prepped. Key items: diff tool threshold calibration (PGS-150 Copyscape decision), PGS-82 staging schedule, AI Tool Responsibility gaps, format/persona decoupling, Gary API loop-in for Susannah.
2. [x] ~~**Julia Tortoriello meeting**~~ — DONE 2026-04-09. CMS prompt + standalone GPT config received verbatim. Julia willing to test CSA in Spanish.
3. [x] ~~**PRD discussion with Chris**~~ — DONE 2026-04-10. Revision items queued — see P9.
4. [x] ~~**PRD revision pass**~~ — DONE 2026-04-10 evening. V0.5 complete and delivered.
5. [x] ~~**Contact Gary Kirwan for full tool roster**~~ — DONE 2026-04-10. Email sent, CC Chris Palo. Awaiting Gary's response.
6. [ ] **Contact Rocky Rhodes re: existing keyword reports** — he has reports for T1 sites and US Weekly. Get them; use to define data-keywords repo scope and eventual analysis site.
7. [ ] **Schedule Chad Bruton Snowflake walkthrough** — confirm access scope + OAuth2 creds.
8. [ ] **Attend LTV model kickoff meeting** — Chris Palo scheduling this week with Sara Vallone, Sarah Price, Kathy, Pierce. No initiation action; wait for calendar invite.
9. [x] ~~**Attend Amplitude/Amanda Hamilton meeting**~~ — DONE 2026-04-09. El Nuevo author bug filed. Claude budget → Chris/Travis Farrar. Notes: `sessions/meeting-2026-04-09-amanda-hamilton-amplitude.md`
10. [x] ~~**Connect Amplitude connector**~~ — DONE 2026-04-11. Also connected: Google Drive, Gmail, GitHub, Atlassian/Jira/Compass, Google Calendar, Slack.

**#2 — NEXT WEEK:**
7. [ ] **Document Gary fact-checker desired functionality** — Pierce writing: hierarchy of escalation paths, desired behavior/responses for each scenario, internal logic. Susannah confirmed this is the right approach to set dev expectations upfront. Do this before running first-test sequence.
7.5 [ ] **Run first-test sequence against Gary API** — health → scrape → meta → content-structure → unanswered-questions → brands/mcclatchy/readiness → citations → poll. McClatchy key in hand. Gary's intended workflow: copy API doc into Claude, run markdown article through it.
8. [ ] **Gary Tools meeting with Sara Vallone** — walk 15 test articles, iterate on ruleset. Draft already in her hands.
8. [x] ~~**3-way SEMrush meeting**~~ — DONE 2026-04-08. Scope defined. API chain incoming from Sarah Price.
8. [ ] **Andy review on Apple News + SmartNews distribution templates** — Sara sent 2 emails, no response. Chris (2026-04-07): wait a few more days, then submit ticket; eng turnaround = few days. Do not block on Andy indefinitely.
**#3 — AFTER NEXT WEEK'S MEETINGS:**
8. [ ] **When format/persona decoupling lands: migrate Apple News + SmartNews best practices from persona → format section** — Sara already frames these as format; dev ticket in queue (15/18 in code review as of 2026-04-03). Do this review as soon as the decoupling ticket closes.
9. [ ] **Get final Vallone format guide + codify into csa-content-standards** — DO NOT FORGET. Confirm Vallone produces final version with T1 findings incorporated, then codify. 10 corrections to verify: remove WTK from SmartNews recs, add questions-hurt-both rule, add push notifications section, refine char targets (SN: 70–90 / Apple: 90–120).
10. [x] ~~**Build SEMrush keyword layer (P14)**~~ — DONE. Prototype complete: 14 briefs, 4 verticals, impact-score sort, Skip verdict, TECHNICAL.md + EXECUTIVE-BRIEF.md. **Next: present to Chris at 1:1 Tue 4/14 12:30pm CDT.**
12. [ ] **Finalize Science-Curious persona definitions** — Retiree + Casual Reader need canonical definitions before Susannah saves as shared custom personas.
13. [ ] **Extend AGENT-AUDIENCE routing annotations beyond §1** — §1 fully confirmed live (2026-04-08). Susannah is tagging; next: audit §2+ sections and add AGENT-AUDIENCE tags where applicable.
14. [ ] **Document sandbox base build** — Chris explicitly asked (2026-04-07). Document the toolkit, guardrails, and access info so Chris Palo and Sarah Price can create their own specialized builds (e.g., analytics, partner content). Repo is public; package it. This supersedes the earlier "20-step environment" framing — focus is on repeatability for non-Pierce users, not just setup documentation.
15. [ ] **Investigate Bitbucket shared repo provisioning** — can Pierce provision a shared repo space for the team? Chris implied this is needed for collaboration on analysis code. Check access level.
16. [ ] **T1 ecosystem taxonomy audit** — validate that cross-platform comparisons in current analysis respect ecosystem boundaries (app-based captured: Apple News, SmartNews, Newsbreak vs. web-based competitive: Yahoo, O&O). Flag any findings that commingle these groups; note in governor.
**Compass (HR — performance management):**
- [x] ~~**Draft and submit goals**~~ — DONE 2026-04-13. 5 goals submitted in Compass. compass-goals.md written and committed.
- [x] ~~**Upload photo** to Compass profile~~ — DONE 2026-04-13
- [ ] **Jeremy Gockel approval** — must reach "Track Goals" status by **April 30, 2026**
- [ ] Mid-year check-in: **July 2026** (mandatory)
- [ ] Final evaluation: **January 2027**
- [ ] **Every Friday:** request Compass progress notes from Claude (per-goal, based on WINS.md + session work)

**PGS-82/139/140 rollout — Susannah is driving, Pierce is tagged:**
- [ ] Await PGS-82 staging notification (Pierce/Sara/Kat invited; real Sara Vallone drafts). PGS-140 now IN PROGRESS — monitor Amplitude event names when ticket nears build.
- Rollout: staging (inform-only) → QA → production (national team flag) → PGS-139 (auto-resolve) → PGS-140 (analytics)

**Waiting on others (no action needed):**
- Sara Vallone: hot take on SEMrush keyword output — Slacked link to data-keywords site 2026-04-13 9:16am; asking whether output is on/off target before Chris 1:1 Tue 4/14 12:30pm
- Rocky Rhodes (rrhodes@mcclatchy.com): credit burn rate per SEMrush endpoint — querying Julio; no reply as of 2026-04-11 (confirmed via Gmail); must have before writing any automation
- Stephanie Zandecki (szandecki@mcclatchy.com): confirm whether keyword-to-article data already exists in Sigma dashboard before Pierce builds it from scratch — message drafted 2026-04-13, not yet sent
- Sarah Price: cluster/Amplitude pulse data; headline grader feedback (reviewing); El Nuevo article count + translation % by author bylines; Chad Snowflake session (coordinating with Dedra); follow up with Deedra on team vs. org comparison dashboard
- Chris Palo: LTV meeting scheduling (not yet on calendar as of 2026-04-11); clustering stats → Eric Nelson + Kathy Veter; Rasheed re: Bitbucket + Cloudflare team environment
- Gary Kirwan: full tool roster response — email sent 2026-04-10, no reply as of 2026-04-11; follow-up sent 2026-04-13 specifically asking about plagiarism/originality detection capability (time-sensitive ahead of CSA Weekly 4/14)
- Rocky Rhodes: existing keyword reports for T1 sites + US Weekly (Pierce to request)
- Sarah Price: follow up with Deedra for team vs. org comparison dashboard
- Susannah Locke: pinning 5 personas (PGS-133); H1 enforcement fix (PGS-135); CUE/Q send-to estimate (after standup)
- Dev team: EGS-127 (variant origin tracking); PGS-133/134/135; p-tagging bug (Amplitude blocker); rq-send-to-cue (date TBD — Kat to announce); PGS-140 IN PROGRESS (Marcelo); Emil/Oliver clearing PR review backlog
- Sigma: confirm full scope of access within growth_and_strategy_role (Chad Bruton walkthrough needed)
- Kat Sheplavy: Snowflake trend agent table keys for Marcelo (escalating to Brad); CUE send-to date announcement TBD


## Strategic Frameworks (from Chris Palo)

**Syndication ecosystems:** App-based captured (Apple News, SmartNews, Newsbreak) — LTV=0, pure PV increment. Web-based competitive (Yahoo, O&O) — standard CTR/PV dynamics. Do NOT commingle in analytics.
**LTV=0 for syndication:** PV delta only — no subscriber conversion. Every syndication slot = incremental PVs on top of O&O.
**Cluster batting average:** 1-in-3.3 as of 2026-04-07 (target 1-in-4, before CSA: 1-in-5). Q2 metrics: 3× output; $85/asset cost; 500K PV goal; 5–8% long-term traffic lift.
**Headline vs. article:** Headline = click acquisition (syndication surface). Article = retention/subscriber conversion. Analytically distinct — do not conflate.
**Political data:** Justin's/Dedra's macro dashboards are separate from Pierce's CSA statistical testing layer.
**Purpose-driven pipelines (2026-04-10):** Every pipeline has an explicit purpose — engagement, revenue, acquisition, or other. Purpose may vary at the asset level within a pipeline (e.g. core TH asset = drive app clickthroughs; bottom-tier variants = acquire new readers). CPA is a cost-center signal, not the goal. OKRs differ per pipeline.
**Distribution channels (2026-04-10):** O&O, Trend Hunter app, Syndication, TBTV (future). Each has a different value calculation. Syndication = avenue, not focus.
**Inclination Engine (2026-04-10):** Named concept — sole future input for automated signals and trend unit brief generation. Feeds T1/T2 pipelines without human initiation. Not yet built. Needs PRD section.
**CPA breakeven reference (2026-04-10):** ~$85 asset cost → 6,156 PVs to cover cost (ECPM data from Chris). Reference only — do not specify in PRD.
**Recipe system (2026-04-12):** Creator × Format × Topic × Market → Predictable Return. Before committing pipeline capacity, configure the four dimensions. data-keywords = Topic layer (keyword signal; is the opportunity there?). CSA = Format layer. Inclination Engine = Creator layer (future). Snowflake/Sigma = Market layer (eCPM by site). Full canonical reference: `RECIPE.md` in ops-hub.
**Cluster (precise definition, 2026-04-12):** Canonical article + analytically-determined variants. Predictive output of the analytics signal. NOT synonymous with topic, vertical, or keyword group. Cluster ID = Canonical ID.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
