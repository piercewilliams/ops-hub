# Pierce Williams — Accomplishments & Wins Register

Tracked in git and pushed to GitHub for preservation. Updated automatically by Claude whenever significant work completes — no prompting needed. This is enforced in CLAUDE.md and the sync-repos skill.

Organized by ops-hub tier, reverse-chronological within each.

---

## Tier 1 — Foundation

**2026-04-16 — PGS-170 DONE — WordPress URL slug bug shipped to production**
The send-to-WordPress headline URL slug bug (variant name + date appended to slug → SEO-harmful 301 redirects) was diagnosed, fixed by Daury Caba, and shipped to production. Reported by Lauren Schuster. Removes the last reliability blocker on Send-to-WP for the United Robots inbound pipeline, which has been on hold in part because of this.

**2026-04-16 — PGS-67 reached Code Review same day as PGS-17 unblock**
PGS-17 (Send-to-Cue) hold was removed during the morning standup; by end of day, Daury Caba had PGS-67 (CSA ID forwarding to Cue — Snowflake + feedback loop fields) also in Code Review. 27+ days on hold → unblocked → Code Review in one day. Two of the most critical Feedback Loop epic dependencies advancing in parallel.

**2026-04-16 — PGS-82 reached Code Review — variant similarity scoring unblocked**
Marcelo Freitas fixed all five confirmed blockers (bugs 1, 2, 4 + flags 1, 2) on the variant similarity scoring ticket by EOD. Bug 3 deferred (not a blocker per Susannah). PGS-82 moved to Code Review at 12:03pm. Binary scoring design confirmed (okay/high-risk only). Once this clears UI approval, the differentiation scoring layer goes to production. Simultaneously: PGS-67 (CSA ID → Cue forwarding) moved to In Progress by Daury Caba — the feedback loop dependency unblocked by PGS-17's hold removal earlier today.

**2026-04-18 — tarrow_backfill.py: Syndication platform auto-fill from Tarrow data**
`tarrow_backfill.py` built and wired into the Tuesday CI pipeline. Reads Apple News (`Publisher Article ID`) and SmartNews (`url`) columns from Tarrow's XLSX, matches against Sara's tracker `Published URL/Link`, and fills empty `Syndication platform` cells — never overwrites existing values. First run filled 13 rows. Handles AN-only, SN-only, and dual-platform ("Apple News, Smart News") correctly. Exports updated tracker as `Tracker Template.xlsx` for `generate_site.py`. Writes `data/tarrow_backfill_report.json` each run. Fully idempotent. Position in Tuesday pipeline: `download_tarrow.py` → **`tarrow_backfill.py`** → `snowflake_enrich.py` → `generate_site.py` → `update_snapshots.py`.

**2026-04-18 — Snowflake pipeline live, tested, automated, and communicated to team**
Full end-to-end pipeline shipped and verified: `ingest_tracker.py` (Google Sheet → `NATIONAL_CONTENT_TRACKER`) + `model_tracker.py` (CTAS → `TRACKER_ENRICHED`) run clean in GitHub Actions in 22 seconds total. GitHub Actions workflow (`snowflake-tracker-sync.yml`) scheduled Monday 9am CDT — both repo secrets set, manual trigger confirmed working. Gist written (private) covering what was built, every column in TRACKER_ENRICHED, what it unlocks for Sarah Price in Sigma, role-by-role workflow going forward, and Chad's long-term vision. Pierce shared the gist with the team via Slack: "Some wins this morning in lieu of waiting for a cluster tag in Snowflake, unlocking lots of analytics in Sigma for Sarah and getting Sara one step closer to ridding us of tracker sheet terror."

**2026-04-18 — Snowflake data model built: NATIONAL_CONTENT_TRACKER + TRACKER_ENRICHED**
Two headless Python scripts built and deployed. `ingest_tracker.py` loads Sara Vallone's Google Sheet (2035 rows, 26 metadata columns) into `MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER` via RSA key-pair auth — full replace on every run, no browser popup. `model_tracker.py` builds `MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED` via CTAS: joins the raw ingest to `STORY_TRAFFIC_MAIN`, `STORY_TRAFFIC_MAIN_LE`, and `DYN_STORY_META_DATA`; adds typed editorial metadata, all traffic KPIs, company median benchmark (`pub_median_pvs`), `article_vs_co_median` (float), `is_hit` flag, and cluster aggregates (`cluster_total_pvs`, `cluster_hits`, `cluster_hit_rate`, `cluster_vs_co_median`). `cluster_id` column unifies parent/child rows for group-by without a self-join. Chad Bruton reviewing this afternoon before Sigma hookup. Chad confirmed long-term: Google Sheet goes away once CMS/CSA centralizes tracking — the model is designed to swap sources. `SNOWFLAKE.md` created as canonical Snowflake reference across all four repos.

**2026-04-18 — enrich_tracker.py: cell coloring, weekly Trends tab, chart auto-regeneration**
Three improvements shipped to `enrich_tracker.py`: (1) `article_vs_co.median` and `cluster_vs_co.median` cells now color green/red on every run via a single `batchUpdate` call — no manual formatting. (2) Trends tab added: groups hits/misses by Week Of, filters weeks with <5 benchmarked articles, writes hit rates as floats, and auto-regenerates a line chart (Article Hit Rate + Cluster Hit Rate + dashed 25% target reference) on every run. (3) `newsletter_pvs` permanently removed from output columns at Sara Vallone's request. Snowflake Cortex (`EMBED_TEXT_768`) confirmed unavailable on the eval account — semantic similarity shelved. Chad Bruton responded on key-pair auth; use case justified (sheet is editorial source of truth for cluster structure, not just a reporting layer — cluster parent/child relationships don't exist in Snowflake). Sara Vallone and Sarah Price both confirmed happy with the tool.

**2026-04-17 — Snowflake tracker enrichment productionized + teammate services delivered**
`enrich_tracker.py` finalized as production-quality, fully commented Python script (dead code removed, imports hoisted, logic decomposed into single-responsibility functions). Sent Slack to Sara Vallone + Sarah Price explaining the tool, its current status, and next steps — first time either teammate has a clear picture of what's available to them. For Sara: every article and cluster in her tracker now shows actual PVs by traffic channel plus % vs company median in Chris's exact format, refreshed each Monday. For Sarah Price: the batting average data in the tracker directly feeds the content performance analysis she presents in her weekly executive update to Britney — objective benchmarks now available without any manual Snowflake work. Auth automation request sent to Chad Bruton (Snowflake key-pair) — fully headless weekly Monday run is the target state.

**2026-04-16 — /sarah-weekly-update skill built and delivered**
Built a Claude Code skill that automates Sarah Price's National Team Weekly Update .docx — she uploads her Gemini notes and analytics report, invokes `/sarah-weekly-update`, and a fully formatted Word doc appears in her Downloads folder. Tested against 4 real files. Windows PC install instructions sent via Slack (Claude Code + Python + pip install python-docx + skill folder setup). Phase 2 (Google Drive watch + auto-populate) planned. This is the first concrete deliverable on the G4 sandbox toolkit commitment Chris Palo asked for. Combined with enrich_tracker.py (2026-04-16/17), Sarah now has both ends of her reporting workflow assisted: raw data enriched automatically in the tracker → weekly update doc assembled automatically from that data.

**2026-04-16 — P18 agentic writing wishlist session complete**
Hosted the agentic writing helpers kickoff with Sara Vallone's team (11am CDT). Documented 11 pain points. Top priorities confirmed: style guide enforcement as a quick win (Samantha Agate; no Claude access required), variant differentiation (Ryan Brennan), and Cue upload/H2 automation as Allison Palmer's biggest time drain. Hard constraint documented: most writers lack Claude access — all tools must work without it. Style Checker identified as first build target. Notes live in write-assist/sessions/2026-04-16-wishlist-session.md.

**2026-04-16 — PGS-17 Send-to-Cue hold removed — now in Code Review**
After 27+ days on hold, the Send-to-Cue ticket moved to Code Review during the 2026-04-16 standup. Daury Caba's PR contains core Send-to-Cue functionality (without Snowflake fields); PGS-67 is the follow-on for Snowflake + feedback loop integration. This removes the single most visible operational gap between what the CSA promises and what it currently delivers — every National team publish cycle has been manual copy-paste into Cue.

**2026-04-16 — Headline quality standards defined and eval tool delivered**
Collaborated with Sara Vallone and Sarah Price to define headline quality criteria for the National content pipeline. Built and delivered an eval tool both have reviewed and signed off on. Closes the Headline Grader criteria refinement commitment from C&P Weekly.

**2026-04-15 — All 5 National Team personas live as Team Target Audiences in CSA**
Susannah Locke granted Pierce CSA Admin role. Susannah entered The Discover Browser + The Wonder-Driven Science Enthusiast; Pierce entered The Curious Optimizer, The Curious Explorer, and The Watercooler Insider. All 5 now available as shared team audiences across all National team accounts in production. Admin-only, environment-isolated feature — replaces PGS-133 (code-change ticket ON HOLD). First time the full persona set is accessible to every National team CSA user without individual setup.

**2026-04-14 — Cross-repo code quality audit: 5 bug fixes, 3 READMEs written, CLAUDE.md created**
Comprehensive code quality pass across all 5 repos. data-headlines: 5 targeted hardening fixes — guarded json.loads() crash on malformed service account env var, protected lift:.2f format against None, narrowed two silent except clauses to typed exceptions with stderr warnings, surfaced silent opportunity-map errors, fixed pyproject.toml target-version py312→py311 (mismatch was hiding 3.11 CI failures from ruff). csa-dashboard: CLAUDE.md created from scratch (architecture, invariants, quality commands, context budget); README quality gate section added. gary-tools and write-assist: fully written READMEs from one-line stubs. ops-hub: removed dead errEl2 variable in attemptRestore(). All 6 repos committed and pushed; ops-hub 28 checks pass; data-headlines 21 tests pass under Python 3.11.

**2026-04-14 — Pierce<>Chris 1:1 fully incorporated across all repos; meeting framework scaffolded**
Full 1:1 outcomes (2026-04-14 12:30pm CDT) worked through item by item and incorporated into ops-hub, data-keywords, and write-assist. P14 keyword tool direction aligned to per-publication analysis model with authority-progression logic, keep/decline field, and performance feedback loop. P15 partner content reframed around 2-lane MRSS optimization with Reuters sub-scope (IPA-only, sensitive). P18 agentic writing helpers scoped: skills+orchestrator model, Sara/Ryan first, Susannah/Kat gated by labor law + CSA backend unknown constraints. Five meeting prep files created in ops-hub/meetings/ (Snowflake navigation, keyword thresholds, Ryan weekly check-in, Sarah Price weekly report, Sara agentic intro). CONTEXT.md reorganized to surface all scheduling actions as top priority. Write-assist repo seeded with complete philosophy/context from 1:1. Memory governance layer added for Claude cost constraints.

**2026-04-13 — Compass 2026 performance goals submitted**
5 goals drafted and submitted in Compass against Chris Palo's Content & Programming 2026 team goals framework. Goals: (1) Product Liaison & Pipeline Request Management 25%; (2) Editorial Standards & Voice Guidelines 25%; (3) Quality Framework & Testing Protocols 20%; (4) Pipeline Documentation & Operational Knowledge 20%; (5) Professional Development: Technical & Editorial Fluency 10%. All aligned to McClatchy Marketing organizational objectives. SMART statements, measures, and quarterly milestones written. compass-goals.md committed to ops-hub as source of truth for weekly Friday progress note generation. Jeremy Gockel approval pending by April 30.

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

**2026-04-17 — CSA pipeline architecture visualization site built**
GitHub Pages site in `csa-prd` repo: 3-view toggle showing Current State / PRD Ideal / Delta. Current State SVG maps all 8 pipeline steps with a cascade coupling warning band that explicitly names the structural failure mode — every upstream change breaks all 26 downstream platform formatters, generating triage cascades per feature. PRD Ideal shows the 5-tier swimlane (T1 Fully Automated commodity content, T2 App-Platform Direct bypassing CMS, T3 API-Canonical 1→45+ derivatives, T4 National Flagship editorial, T5 Freshness+Updates) with shared Signal Layer / Quality Gates / Performance Tracking cross-cutting all tiers. NOT BUILT badges mark unbuilt components. Visual language and interaction pattern match csa-dashboard.

**2026-04-17 — CSA pipeline diagnostic document completed**
`data-keywords/reports/csa_pipeline_diagnostic_2026-04-17.docx`: 8-part architectural analysis using Sully AI context engineering as the primary audit lens. Documents why the current CSA is structurally a poor fit (sequential coupling, no interface contracts, hope-based enforcement), maps three specific open tickets (PGS-98/104/82) to root architectural causes, and produces a 5-principle × current-failure × PRD-required-change mapping table. Establishes the framing that will drive the engineering roadmap conversation with Chris: decomposed, focused agents with hard gates replace sequential monolithic Opus calls.

**2026-04-14 — SN channel × formula analysis: new finding confirming channel-specific formula penalties**
Analyzed 2025 SmartNews full-year data (38,251 rows) by channel × formula. Question format significantly underperforms in Top, Entertainment, and Lifestyle channels (p<0.0001, p=0.012, p=0.027). WTK underperforms in Top channel (p=0.008). Number lead carries a U.S.-channel-specific penalty (Δ=−0.245, p<0.0001, n=83). Callout added to data-headlines formula trap panel. Longitudinal weekly snapshot data also surfaced on the main page — trend table auto-renders after 2 more weekly ingest runs, establishing baseline for ongoing headline performance tracking.

**2026-04-14 — 25+ open CSA Jira tickets distilled → executive briefing for Chris Palo**
Full active Jira backlog synthesized into a concise briefing covering national team dev priorities, pipeline blockers, and in-progress/code-review queue state. Delivered to Chris as actionable exec summary.

**2026-04-14 — PRD distributed at CSA Weekly; Gary evaluation aligned; keyword milestone**
Three outcomes at CSA Weekly 2026-04-14: (1) PRD V0.5 distributed as foundational context document for all future feature requests — Chris framed architecture as vertical pipes + horizontal cross-cutting elements; visualizations requested for eng team. (2) Gary evaluation aligned across team: black-box methodology confirmed, off QA gate roadmap, IP/contract concern flagged, author profile replication greenlit for in-house dev. (3) Keyword field mandatory decision — Chris overruled Sara's preference to wait; primary + secondary keyword field shipping this week as mandatory. Keyword color overlay (4-color headline breakdown) greenlit; separate dev ticket needed.

**2026-04-14 — PGS-96 shipped to Ready for Production**
"Add Discover Browser as saved target audience for National team" passed all QA (Susannah Locke approved): variant creation, admin create/save, session persistence, National team visibility, cross-org isolation all verified. First of the national team batch to reach production-ready status.

**2026-04-13 — Gary API 15-article batch test complete — parameter session ready**
15 Sara Vallone articles processed through Gary's `data-validity` API, 0 errors, ~107 claims evaluated. All 15 articles: MOSTLY_TRUE at article level. 21 claims flagged at claim level (FALSE: 1, MISLEADING: 8, MIXED: 9, INSUFFICIENT_EVIDENCE: 3). Specific verifiable errors caught: Alcatraz/America the Beautiful pass (FALSE per NPS); Statue of Liberty height-not-age error in 3 articles (same syndicated piece, MISLEADING); 2022 fungi study presented as new research (MISLEADING). Full claim-level DOCX report + session agenda generated. Slack sent to Chris Palo + Sara Vallone with reports and link to claims-validation spec. Parameter session now the gate before any CSA dev integration work begins. Cost: ~$5.50 total.

**2026-04-13 — Gary Kirwan API meeting — fact-checking architecture confirmed**
Live Gary Kirwan meeting completed. Key confirmed findings: (1) Gary has NO built-in plagiarism detection — Copyscape decision stands; (2) confidence scoring is claim-level, not article-level — each individual claim gets its own confidence score (0–1); (3) Gary uses a deterministic mechanism, scraping actual source markdown for hard proof rather than pattern-matching; (4) Gary confirmed ability to share code and possibly provide a McClatchy-scoped endpoint (pending). Verdict taxonomy differs from Sara's 2-tier spec: Gary returns MOSTLY_TRUE and MIXED in addition to TRUE/FALSE/MISLEADING — vocabulary alignment needed before Sara meeting. First article tested: mouth breathing / blood pressure (MOSTLY_TRUE, 0.78 confidence, 9 claims evaluated, $0.38/article). Batch test of Sara Vallone's 15 articles now running.

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

**2026-04-13 — Two-layer keyword intelligence framing established**
Chris Palo directive and Rocky's existing work formally framed as two distinct, sequential layers. Layer 1: Rocky's domain-level SEMrush competitor gap analysis — raw keyword candidates, competitor-driven, reactive (already done for Us Weekly). Layer 2: data-keywords prototype — editorial decision layer adding Go Hard / Test Small / Skip verdicts, volume × CPC impact scoring, and context a journalist needs to act. Integration workflow: Rocky gap → candidates → data-keywords verdicts → cluster decisions → Recipe system. Framing added to data-keywords REFERENCE.md and CONTEXT.md. Sara Vallone confirmed next four topic areas for Rocky's pull queue: financial services (Chris priority), food+celeb, sleep, creature features. Us Weekly gap analysis flagged for re-run (original was full domain sweep, not topic-filtered — CPC missing).

**2026-04-12 — Recipe system documented (RECIPE.md)**
Canonical cross-repo reference for Chris Palo's Recipe system: Creator × Format × Topic × Market → Predictable Return. Documents four dimensions, return type by pipeline purpose, cluster precise definition (canonical article + analytically-determined variants — NOT a synonym for topic), data repo by dimension, vertical signal profiles by monetization model (entertainment = traffic play, financial services = revenue per visitor, food = display at scale), current vs. future state. Pointers in REFERENCE.md. This is the architecture frame for all data intelligence work going forward.

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

**2026-04-18 — Snowflake native semantic similarity scores: per-article, per-cluster, per-author**
Snowflake stores full CSA article text in a `plain text` table. Native embedding model computes cosine similarity (truncates to 400 words — sufficient as an issue indicator). Three outputs built: (1) per-article and per-cluster similarity scores written to Sara's tracker; (2) secondary per-author scorecard table in Snowflake. Serves as a leading indicator of variant differentiation problems — flagging clusters where the CSA is producing insufficiently differentiated content — ahead of the CSA eng team's upcoming diff detection capability. Chris Palo had flagged overly similar headlines as a recurring quality issue seen directly in Voluone.

**2026-04-15 — ops-hub dashboard quality infrastructure overhaul**
PINNED_ACTIONS export added to projects.js — global priority override for Up next panel; pinned items always render first with ▲ marker and blue border, bypassing tier/status sort. check.sh extended with [Data quality] section: PINNED_ACTIONS count ≤3, done project completedDate + resolvedBlockers, active description ≤400 chars, no ticket numbers in descriptions (node-eval for accurate parsing). Git pre-commit hook installed — check.sh runs automatically on every commit with no manual step. CLAUDE.md: three new behavioral enforcement sections (Project Card Description Rules, PINNED_ACTIONS discipline, Completed Project Card Rules). P20 and P21 project cards added. 10 active project descriptions trimmed to ≤400 chars; ticket numbers cleared from 3 descriptions.

**2026-04-15 — SEMrush Experiences keyword pull + xlsx/docx deliverables for Sara Vallone**
First live SEMrush API pipeline (phrase_fullsearch + phrase_kdi + phrase_organic) run for a specific editorial test. Four Experiences topics analyzed: Landmarks (GO HARD, 1.5M/mo, KD 34), 5-Day Travel (GO HARD, avg KD 15, destination itineraries KD 4–9), Scenic Road Trips (GO HARD, 8,100/mo, KD 26), Solo Dining (SKIP, 260/mo max). 4 color-coded xlsx files + docx analytical report with full verdict framework. All 4 topic briefs added to data-keywords. Establishes performance feedback loop: at end of Sara's content experiment, cross-check what she published + what she skipped against actual performance to calibrate GO HARD / SKIP thresholds.

**2026-04-15 — csa-content-standards v1.8.0: Complete CSA persona definition system**
All 5 National team persona pages now carry fully populated CSA Target Audience Definition sections formatted for direct entry into the CSA product UI — Name, Description (with core driver + full "What They Respond To" specifics + behavioral engagement data), and four focus areas (Discovery/Understanding/Evaluation/Action). Dedicated `csa-target-audience` AGENT-AUDIENCE tag added — unique identifier allowing programmatic extraction of all five definitions from raw Markdown. Sara Vallone confirmed personas and formats are decoupled in the CSA UI; Tone sections preserved on §4.2–§4.5 pages. Full infrastructure sync across site (v1.8.0). Susannah Locke messaged with access instructions and grep tag.

**2026-04-13 — Rocky gap analysis queue confirmed + prototype integration complete**
Sara Vallone confirmed 4 topic categories for Rocky Rhodes' next SEMrush pull: financial services (Chris priority, highest CPC), food+celeb, sleep, creature features. All 8 National Team sites combined per pull. Rocky queued. `fromRocky: true` field and orange "Rocky Gap" badge added to data-keywords data model and UI — prototype now visually distinguishes Rocky-sourced vs. SEMrush-direct briefs.

**2026-04-13 — Rocky-derived briefs added to data-keywords prototype**
Us Weekly competitor gap analysis (Rocky Rhodes / SEMrush, Mar 2026 — 373 keywords >5K vol) integrated into data-keywords prototype as Layer 1 signal. Key brief added: Taylor Swift / Travis Kelce cluster — 19 keywords, 92,910 monthly searches, avg KD 35, 18/19 keywords with no Us Weekly ranking → Go Hard verdict. Entertainment generic cluster (KD 100, unwinnable) added as Skip example. `fromRocky: true` boolean field added to brief data model; orange "Rocky Gap" badge rendered in card UI; `rocky-note` attribution block added. Bianca Censori brief updated to reflect Rocky source. Prototype now visually distinguishes Rocky-derived vs. SEMrush-direct briefs — ready for Chris 1:1 presentation 2026-04-14.

**2026-04-10 — data-headlines cluster/variant production section**
Added `_cluster_production_section()` to `generate_site.py`: 422 clusters tracked, 94% with ≥2 articles, per-author breakdown, distribution table, cluster_id propagated through full pipeline. Three new column tooltips. 19/19 smoke tests pass.

**2026-04-09 — Weekly auto-ingest pipeline operational**
`download_tarrow.py` + `.github/workflows/weekly_ingest.yml` (Monday 8pm CDT): downloads live 2026 Google Sheet via Drive API, runs change-detection, commits xlsx + docs/ + data/, writes `data/build_summary.json` (8 tracked metrics) + `data/weekly_snapshots.json` (longitudinal store). Tarrow shared 2026 sheet with service account 2026-04-09 — fully operational.

**2026-04-12 — data-keywords keyword intelligence prototype MVP**
Full keyword intelligence dashboard built from scratch in `piercewilliams/data-keywords`. 14 briefs across 4 content verticals (Entertainment: 7, Financial Services: 3, Food & Recipes: 3, Health & Wellness: 1 Skip). Priority sort by `impactScore = totalVolume × avgCPC` — normalizes editorial return across verticals with fundamentally different monetization profiles. Skip verdict demonstrated with weight loss generic terms (KD 100 — YMYL space owned by WebMD/Healthline) vs. celebrity weight loss (KD 33 — People.com as competitor, Go Hard). Celebrity weight loss brief discovered from SEMrush CSV analysis (557K vol, avg KD 33, 8 celebrity keywords). Summary bar excludes Skips. Data currency indicator ("Data as of Apr 2026") derived automatically from brief dataSource fields. Full documentation: TECHNICAL.md (architecture reference) + EXECUTIVE-BRIEF.md (non-technical, written for Chris). Ready to present to Chris at 4/14 1:1.

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
| 2026-04-17 | Sara's tracker Snowflake match rate (first run) | 1,808 / 2,002 URLs = 90% | P7 Vallone Tracker · enrich_tracker.py |
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

*Last updated: 2026-04-17 (CSA pipeline diagnostic document + GitHub Pages visualization site built; cascade coupling architectural argument established)*
*Maintained by Claude. Updated proactively as work completes.*
