# Pierce Williams — Accomplishments & Wins Register

Tracked in git and pushed to GitHub for preservation. Updated automatically by Claude whenever significant work completes — no prompting needed. This is enforced in CLAUDE.md and the sync-repos skill.

Organized by ops-hub tier, reverse-chronological within each.

---

## Tier 1 — Foundation

**2026-04-08 — Claude Code permission system deployed across all repos**
Implemented full permission layer: `~/.claude/settings.json` (global, 80+ curated operations, Rajiv Pant's template), `.claude/settings.json` (project scope, all 6 repos), `~/.claude/project-settings-template.json` as canonical template, `_claude_auto_setup` chpwd hook in `~/.zshrc` to auto-install project settings on every new repo. Eliminates permission interruptions for all read/reversible operations across CLI, desktop app, and IDE extensions.

**2026-04-07 — /sync-repos cross-repo sync skill created**
Built `~/.claude/skills/sync-repos.md` skill and added enforcement instruction to `CLAUDE.md`. Ensures all deliverables, blockers, decisions, and CSA dashboard state stay synchronized across all 5 repos at end of every multi-repo session — without prompting.

**2026-03-28 — Tiered Context Architecture deployed across all repos**
Implemented CONTEXT.md / REFERENCE.md / sessions/ structure across all 5 repos (csa-dashboard, csa-content-standards, data-headlines, data-cmstracker, gary-tools) and ops-hub. Enables long-running AI-assisted project continuity without context window bloat.

**2026-03-28 — ops-hub live status dashboard**
Built ops-hub project registry with live sync health pill on dashboard (green/yellow/red). Full troubleshooting documentation.

**2026-03-26 — Snowflake/Sigma architecture pivot**
Identified that CUE and Amplitude data already exist in Snowflake (confirmed by Chad Bruton). Pivoted recommended CMS tracker architecture from custom webhook to Snowflake→Sheet — significantly lower complexity.

**2026-03-28 — Access & onboarding completed**
CUE CMS, WordPress (full access 2026-03-28), McClatchy GitHub, Sigma basic, Amplitude (2026-04-04), SEMrush (2026-04-04), Marfeel (2026-04-09), Gary API key + endpoint docs (2026-04-08).

---

## Tier 2 — Understanding

**2026-04-11 — Amplitude platform session with Amanda Hamilton fully documented**
Verbatim Gemini transcript (00:00:00–00:28:48) and full Gemini summary captured. Key outcomes identified and filed: El Nuevo author attribution bug (Amanda filed technical request with analytics team — Samantha Agate's content shows "US Weekly" as source, blocking El Nuevo dashboard); Claude budget exhaustion confirmed as team-wide issue (~3/5 members out); Claude + Amplitude connector instructions confirmed (Claude Settings → Connectors → Amplitude); Amplitude native AI recommended as free first step for dashboard building. Travis Farrar identified as infrastructure contact for budget requests. Saved to `sessions/meeting-2026-04-09-amanda-hamilton-amplitude.md`.

**2026-04-11 — El Nuevo Spanish translation workflow fully documented**
Verbatim Gemini transcript (25 min, 00:00:00–00:25:02) captured and saved. Verbatim resources received and stored: CMS prompt (6 editorial rules), standalone GPT config (name, bilingual description, full instructions, 4 conversation starters, link: chatgpt.com/g/g-0SsURCxh4). Meeting date corrected to April 9. Julia confirmed willingness to test CSA in Spanish and help with any platforms/models. Establishes complete, queryable baseline for P17 Spanish CSA Pipeline scoping whenever Chris + Rajiv are ready to move.

**2026-04-10 — El Nuevo Spanish translation workflow scoped**
Initial discovery meeting with Julia Tortoriello. Documented current stack (CMS-integrated GPT-3 + Google Translate + standalone "dog translator" GPT), error correction approach (custom models + temperature-adjusted prompts), dialect spec (Colombian Spanish register; "US Hispanic, United States" sufficient). CSA integration readiness confirmed. Establishes baseline for potential P17 Spanish CSA Pipeline (Chris Palo + Rajiv considering).

**2026-04-08 — Gary Tools integration unblocked**
Full Gary Kirwan API docs and McClatchy key received (base URL + `POST /api/v1/research/data-validity`). CSA Fact-Checking Ruleset v0.1 drafted and passed to Sara Vallone: 5-verdict taxonomy mapped to Sara's 2-tier action system, source authority tiers, content-type-specific rules (health/legal/financial/real estate/travel/entertainment), escalation logic. 15 test articles in Sara's hands for parameter walk.

**2026-04-08 — §9 Claims Validation spec complete**
`docs/claims-validation.md` live in csa-content-standards (v1.4.2). Five verdicts; editorial action taxonomy; source authority tiers; content-type-specific rules; escalation table. Feeds Gary API integration once Sara Vallone parameter session runs.

**2026-03-26 — CSA architecture documentation**
Documented Mode 1 (Publication Ready) vs. Mode 2 (Intermediate/Expanded) behavior. Mode determined by workflow entry point (URL import = Mode 1; Research Draft = Mode 2). Clarified Step 5 halt is deliberate, not a bug.

**2026-03-26 — Gary Tools integration assessment**
Evaluated Gary Kirwan's toolkit against internal alternatives. Determined Gary's toolkit is further along than any internal tool. Designed recommended first-test sequence.

---

## Tier 3 — Strategy & Schema

**2026-04-10 — PRD V0.5 complete**
Full revision pass implementing all Chris Palo architecture input: Inclination Engine named and defined as T1/T2 auto-brief component; CSA reframed as pipeline container; purpose-driven pipeline framing with per-pipeline OKRs added as Universal Principle; author profiles elevated to full principle with compounding-value argument; Gary tools reframed as cross-pipeline nodes; two new pipelines under investigation (infographics, licensed partner content) added; CPA language loosened to directional frameworks; monetization reframed as avenue with per-channel value calculation; TBTV added as named future channel; data loop opened up. T3 sub-pipes (~10 by content vertical) added. Document ready for Google Docs.

**2026-04-10 — PRD discussion with Chris Palo complete**
46-minute architecture session. Chris confirmed: CSA = purpose-driven pipeline container (not magic tool); Inclination Engine = named concept for automated brief generation; two new pipelines under investigation (infographics, licensed partner content); Gary tools reframed as cross-pipeline "nodes." Major corrections to PRD framing: loosen CPA/cost language, reframe monetization as avenue not focus, open up data loop. Revision items now queued. Establishes shared language for PRD V0.5.

**2026-04-08 — PGS-82/139/140 strategic framing approved by stakeholders**
Reframed the differentiation score from "Google SEO compliance guardrail" to "quality signal for whether the variant system is working." Chris Palo + Susannah Locke approved. Key insight: if variants aren't differentiated, personas/formats aren't doing their job — Google penalty is a downstream consequence, not the core problem. Analytics layer (PGS-140) turns scores into a feedback loop on prompt/definition quality over time. This framing is now the canonical way to discuss PGS-82/139/140 with stakeholders.

**2026-04-08 — CEO validation (Tony Hunter + Berg)**
Rajiv Pant reported that Tony Hunter and Berg told him they see CSA as a competitive edge vs. AI companies due to content quality. Key reason: guiding principle baked into config = "high-quality content grounded in sources" overrides user-requested length constraints — mirrors Anthropic's "constitution" approach. Pierce's documentation of this principle in the PRD contributed to its articulation.

**2026-04-06 — PRD V0.4: McClatchy Content Pipeline End-to-End Vision**
Completed full revision incorporating Sara Vallone + Sarah Price feedback. Added: syndication ecosystem taxonomy (app-based captured vs. web-based competitive as hard analytical boundary), LTV=0 framework, swarm testing as formal Phase 2/3 requirement, standalone testing module as distinct system, evergreen backlinking as named use case. V0.4 delivered to Chris Palo for final review.

**2026-04-03 — Sara Vallone format guide evidence report**
Produced 10-finding evidence report against Sara's SmartNews/Apple News format guide. Key corrections: WTK contradicted on SmartNews (p=0.046 → hardened to p=3.0e-6, Bonferroni-survives); questions worst formula on both platforms; character ranges refined (SN: 70–90, AN: 90–120); push notifications section missing entirely. All corrections now codified in csa-content-standards.

**2026-03-26 — Cluster tagging schema design**
Clarified full cluster data model (Canonical ID = Cluster ID; articles are siblings, not parent/child). Confirmed by Chris Palo, Sara Vallone, Susannah Locke (2026-04-01). Prevented premature build before stakeholder agreement.

---

## Tier 4 — Build

**2026-04-10 — data-headlines cluster/variant production section**
Added `_cluster_production_section()` to `generate_site.py`: 422 clusters tracked, 94% with ≥2 articles, per-author breakdown, distribution table, cluster_id propagated through full pipeline. Three new column tooltips. 19/19 smoke tests pass.

**2026-04-09 — Weekly auto-ingest pipeline operational**
`download_tarrow.py` + `.github/workflows/weekly_ingest.yml` (Monday 8pm CDT): downloads live 2026 Google Sheet via Drive API, runs change-detection, commits xlsx + docs/ + data/, writes `data/build_summary.json` (8 tracked metrics) + `data/weekly_snapshots.json` (longitudinal store). Tarrow shared 2026 sheet with service account 2026-04-09 — fully operational.

**2026-04-09 — data-keywords repo seeded**
`piercewilliams/data-keywords` created for P14 SEMrush / Keyword Signal Layer. Full context architecture: CONTEXT.md (blockers, prioritized tasks, scope decisions), REFERENCE.md (team/contacts, credit model, DataForSEO alternative, 3 confirmed use cases, related Jira tickets).

**2026-04-09 — Cross-repo headline standards audit**
13 conflicts found between csa-content-standards, data-headlines grader, and empirical analysis. All non-Sara-approval items resolved: grader char count corrected (70–120 was wrong — 70–90 SN / 90–120 AN); WTK hardened to objective rule (p=3.0e-6, Bonferroni-survives); question headline detection added to grader; featured placement exception removed (0% featuring rate = no data support); push notifications section added to csa-content-standards; acronym list expanded ~30→~55 entries; `api/reference.json` machine-readable formula constraints added.

**2026-04-09 — Grader platform-aware scoring**
`generate_grader.py`: reads `Syndication platform` (Tracker col H) per article; `_parse_platform()` added; char count scored against platform target (AN: 90–120, SN: 70–90); number-lead note platform-aware; platform badge on each headline card.

**2026-04-08 — csa-content-standards v1.6.2: SEO Keywords**
SEO Keywords guidance added site-wide. National team refinement: single words OK, 1–5 keywords, all lowercase, location names for local. Resolved PGS-148 gap that was blocking Oliver Felix. All 10 §3 format sections updated.

**2026-04-08 — csa-content-standards v1.6.0–1.6.1: Platform Formats §10**
SmartNews §10.1 + Apple News §10.2 standalone pages built (v1.6.0). Full consistency audit (v1.6.1): all headline range discrepancies corrected against data-validated findings. Data-validated labels throughout. `api/reference.json` + `master-reference.md` updated.

**2026-04-08 — PTECH-7641 data layer DONE**
CSA analytics engineer (different team from Maktachi) set up foundational data layer: `csa_canonical_article_id`, `csa_variant_type`, `csa_variant_id` pushed to `window.dataLayer` for every CSA article. Scoped to L&E sites; includes WordPress + CUE. Feeds Amplitude analytics layer.

**2026-04-08 — AGENT-AUDIENCE §1 routing confirmed live**
All §1 sections confirmed routed: Voice & Tone, Explicit Language, link count/anchor text → general-style (Susannah uploaded); Headlines → headline (PGS-141); SEO fields → seo (PGS-148); §1.4 What to Link / §1.5–1.9 → human-only. Full §1 coverage complete.

**2026-04-08 — AI Tool Responsibility page finalized (v1.4.1)**
DRAFT banner removed. All escalation contacts resolved: Step 2 = Sara Vallone + #prog-and-growth; supervisor conflict = Sara + Chris; recurring issues/stop-use = #nationalteam-csa-feedback. Partner/Feed Content verbatim rule added. Passed to Sara Vallone for review.

**2026-04-07 — csa-content-standards v1.4.1: AI Tool Responsibility page**
Full page created (docs/tool-responsibility.md): named escalation chain, supervisor conflict path, stop-use trigger, plagiarism/attribution check, partner content vetting policy, override documentation requirement.

**2026-04-06 — Headline Grader built and delivered**
`generate_grader.py` with 15 criteria (rule-based + Groq LLM), GitHub Actions daily run (10am CDT), 30-day rolling history, Run Now button (passcode-gated, PAT in localStorage, calls GitHub Actions dispatch API). Delivered to Sara Vallone + Sarah Price.

**2026-04-03 — AGENT-AUDIENCE routing system**
Content standards routing annotations added to §1 of General Guidelines: tags (general-style, headline, seo, human-only) enabling agent-specific routing in CSA pipeline. Sara Vallone aligned; general style doc uploaded as CSA admin input.

**2026-04-03 — 5 National team personas codified**
Discover Browser, Curious Optimizer, Wonder-Driven Science Enthusiast, Curious Explorer, Watercooler Insider — codified in csa-content-standards (v1.3.6) and sent to Susannah Locke to pin for all National CSA accounts.

**2026-04-02 — T1 headline findings expanded to 13**
New findings: MSN Formula Divergence, Formula × Topic Interaction, SmartNews Cross-Platform Formula Trap, Notification Outcome Language, Notification Send-Time. March Tarrow data ingested. Playbook expanded to 5 tiles. Author playbooks page delivered.

**2026-04-01 — PGS-82 similarity scoring shipped**
Differentiation score system shipped by Marcelo/Susannah (PyTorch backend). Staging QA to use real Sara Vallone drafts — no dummy content.

**2026-03-28 — ops-hub dashboard**
Built and deployed a full visual project registry and dependency map for the CSA ecosystem. 15+ projects across 5 dependency tiers, SVG dependency arrows, clickable detail sidebars, snapshot version bar, CSA tag chips with popovers, sync status pill. GitHub Pages hosted. No framework, no build step.

**2026-03-28 — csa-dashboard v3.28.26**
Fully functional CSA pipeline health monitoring and operations tool. Tracks 31 metrics, 9 pain point groups, open request register with lifecycle management.

**2026-03-28 — data-headlines site (Phase 2)**
Interactive headline performance analysis site with dark/light mode, PNG/PDF export, sortable columns, 70+ column tooltips, author playbooks, and monthly-cadence update pipeline.

---

## Tier 5 — Optimize & Extend

**2026-04-09 — Adapter pattern designed for data-headlines**
Governor split architecture planned: `GOVERNOR_CORE.md` (universal rigor floor) + `GOVERNOR_SARAH.md` (Sarah Price-specific relevance filters) + `ADAPTER_TEMPLATE.md` (6-section starter file for any team member). Enables Chris Palo, Sarah Price, and others to create specialized analysis builds without touching the rigor layer.

**2026-03-24 — csa-content-standards site (multiple updates)**
Character count updates, Exclusive/(Excl) policy resolved, Us Weekly outlet block added with full CMS field mapping.

---

## Performance Metrics

Quantitative signals attributed to Pierce's projects, analysis, or contributions.

| Date | Metric | Value | Project / Source |
|------|--------|-------|-----------------|
| 2026-04-07 | Cluster batting average (stories-per-cluster) | 1-in-3.3 (target was 1-in-4; pre-CSA was 1-in-5) | P6 Cluster/Taxonomy · Chris Palo |
| 2026-04-07 | CSA processing time improvement (Rajiv perf fix) | 8.5 min → 1 min 18 sec on test runs | CSA dev team (Rajiv) |
| 2026-04-09 | Weekly auto-ingest: smoke tests passing | 19/19 | P3 T1 Headlines |
| 2026-04-08 | WTK headline penalty (SmartNews) | p=3.0e-6, n=213, Bonferroni-survives | P3 T1 Headlines / P4 Governance |
| 2026-04-08 | Question headline penalty (Apple News) | r=−0.265 | P3 T1 Headlines |
| 2026-04-08 | Question headline penalty (push notifications) | −38% CTR | P3 T1 Headlines |
| 2026-03-28 | "What to know" headline Featured rate on Apple News | 62% | P3 T1 Headlines analysis |
| 2026-03-28 | Possessive named-entity headline CTR lift | 1.94× | P3 T1 Headlines analysis |
| 2026-03-28 | Exclusive headline CTR lift | 2.49× | P3 T1 Headlines analysis |
| 2026-03-28 | Sports topic multiplier on Apple News | 2.13× views vs avg | P3 T1 Headlines analysis |
| 2026-03-28 | csa-dashboard metrics tracked | 31 | P2 Dashboard build |
| 2026-03-28 | csa-dashboard diagnostic checks | 18 cross-file checks | P2 Dashboard build |
| 2026-03-28 | ops-hub projects tracked across tiers | 15+ active | ops-hub build |

---

## Pending Recognition (things to follow up on)

- Share T1 findings + formula trap → SmartNews/Apple News distribution team (Chris cluster perf sheet)
- Share WTK Bonferroni result → Sara Vallone (format guide correction confirmation)
- Share cluster batting average (1-in-3.3) → Eric Nelson + Kathy Veter (Chris already sending sanitized data)

---

**2026-04-10 — PRD V0.4 validated by Chris Palo**
Chris reviewed PRD V0.4 and left "a lot of feedback" directly in the doc, calling it "really great stuff." He got sidetracked wrapping up the whole document — indicating he engaged deeply enough to work on the structure, not just comment. Wants a discussion before Pierce implements. Strong signal the PRD landed well at the decision-maker level.

**2026-04-11 — PGS-98 and PGS-87 resolved (tracked and captured)**
Two significant CSA bugs closed: (1) PGS-98 — Additional Context and Editorial Notes fields now influence generated output; this is the primary mechanism for editorial direction injection into the pipeline. (2) PGS-87 — Target Audience label now included in platform variant Google Doc exports; eliminates the manual re-labeling burden for every syndicated variant. Both tracked in csa-dashboard request register.

**2026-04-11 — PTECH-7730 identified and documented**
p-tagging fix now formally ticketed (Platform Technology [PT] Delta, TO DO). When this lands: Amplitude adapter activates and Deedra can build unified Sigma dashboard of all CSA content (L&E + CUE). The single most important upstream unlocker for the dashboard instrumentation layer.

**2026-04-10 — WordPress send-to-WP bug catch**
Kathryn Sheplavy flagged in standup that the send-to-WP feature (live as of yesterday) is sending the audience variant name + date as the headline, which populates the URL slug — potential SEO damage and manual publishing rework. Pierce has this captured and gated P12 progress on the fix. Daury Caba assigned.

**2026-04-10 — PGS-93 hold: stakeholder alignment on "Create Research Draft" scope**
Ryan had requested a "Create Research Draft" option from the URL import flow; Susannah ticketed it without checking with Sara's team. Pierce intervened immediately on the Jira ticket: "Sara says this needs to be reworked; please do not prioritize." Ticket moved to ON HOLD. Prevents a dev cycle building something Sara's team doesn't own or endorse.

*Last updated: 2026-04-11*
*Maintained by Claude. Updated proactively as work completes.*
