# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-18 (human) — `tarrow_backfill.py` built + wired into CI (13 rows filled on first run). Hanna WIckes double-entry fixed in source + both generator scripts. `snowflake_discovery2.py` M.HEADLINE → M.TITLE fix. Sigma grant for TRACKER_ENRICHED blocked — pinned for Monday. **PVs/Tracker meeting (Apr 17) fully processed:** cluster PV threshold updated ~6K→~9K; eCPM decisioning framework clarified; Ryan Spalding meeting confirmed with Chris + Sarah Price; defunct pubs (First for Women, Soaps in Depth, InTouch) flagged for scrub; McClatchy 4-4-5 fiscal calendar week-number discrepancy noted. Earlier same session: Snowflake data model complete (ingest_tracker.py + model_tracker.py + SNOWFLAKE.md). **Automated sync: 2026-04-17 22:18 UTC — no changes detected.**
**Status:** 21 active/tracked projects (P20 + P21 added). Compass goals submitted (Jeremy approval pending Apr 30).

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- **Live at** `https://piercewilliams.github.io/ops-hub`
- **v0.88 in production (2026-04-15).** PGS-134 + PGS-96 + PGS-115 DONE. Docker bug patching (Oliver + Marcelo). v0.89 target: 6 items.
- **All 5 personas live as Team Target Audiences (2026-04-15):** Discover Browser + Science Enthusiast (Susannah); Curious Optimizer + Curious Explorer + Watercooler Insider (Pierce). PGS-133 ON HOLD.
- **Data pipeline FULLY AUTOMATED (2026-04-18):** `enrich_tracker.py` now uses RSA key auth (headless) — falls back to Okta MFA only when key absent. Full Monday sequence automated: `ingest_tracker.py` → `model_tracker.py` → `enrich_tracker.py` (Mon 9am CDT, `snowflake-tracker-sync.yml`). Tuesday noon CDT: `download_tarrow.py` → `snowflake_enrich.py` → `generate_site.py` (`weekly_ingest.yml`). See pipeline OOO table in data-headlines CONTEXT.md. `TRACKER_ENRICHED` in `MCC_PRESENTATION.CONTENT_SCALING_AGENT` ready for Chad/Sigma. Revenue (Naviga+GAM) — Ryan Spalding meeting Mon 2026-04-20.
- **MAIA 14-day test started 2026-04-15** (~2026-04-29). Sara's teams log outputs; Pierce monitoring. Access + tracking sheet requested from Derek.
- **Ticket status 2026-04-17:** **PGS-82 CODE REVIEW** (Marcelo fixed bugs 1,2,4 + flags 1,2; pending Efren/Cat UI approval); **PGS-104 IN QA** (Victor Suarez); **PGS-17 CODE REVIEW** (Daury PR, high priority); **PGS-67 CODE REVIEW** (Daury; unblocked 2026-04-16 → Code Review same day); **PGS-170 DONE** (WordPress 301 slug bug shipped to prod 2026-04-16); PGS-62 epic 40% (PGS-68/69/72 + PGS-67 all Code Review); PGS-111 CODE REVIEW; PGS-140 IN QA; PGS-150 ON HOLD; PGS-189 SELECTED FOR DEV; PTECH-7730 TO DO (Julia Kim PM).
- **EGS-127 ticket 12828 in dev** (1 of 4-ticket epic). Marcelo leading.
- **Rajiv on vacation.** Emil Penalo + Oliver Felix have prod merge authority. 2-PR process in effect.
- **Gary (2026-04-16):** Off QA gate. Direct API integration dropped (vendor lock-in). Path forward: audit Gary's public resources, obtain code, propose internal replication to Chris + CSA eng.
- **SEMrush pull paused** (Chris flagged logic flaw 2026-04-15). Rocky/Julio credit rate per endpoint pending before any automation.
- **Q/Cue integration IN CODE REVIEW** (Daury, 31 files, 2026-04-13). WP 301 bug (PGS-170) DONE — shipped to prod 2026-04-16.
- **PGS-150 HOLD** (plagiarism — Copyscape recommended; RAG vs. open-web clarification pending).
- **Sigma CSA dash (Deedra):** Simple version almost done. Await delivery.
- **National portfolio canonical file:** `data/national-portfolio.js` — 13 brands, single source of truth for all API scoping.
- Sync: **Manual** — open ops-hub session, update projects.js, commit + push.

## Features Live

- Tiered dependency map with SVG arrows
- Sidebar detail panels (status, blockers, next actions, systems, contacts, links)
- Progress pills (Up next / Recently done / Completed projects)
- Snapshot version bar (last 5 syncs, passkey-protected restore)
- CSA Dashboard tag chips (pain / requests / metrics) with popover detail
- Sync status pill — shows "Last synced X ago" (green <3d, yellow 3–7d, red >7d)
- Quality gate script at `scripts/check.sh` (data quality: description length, ticket numbers, PINNED_ACTIONS count, done card completeness)
- Git pre-commit hook — check.sh runs automatically on every commit; no manual step required
- Snapshot version bars on csa-dashboard, csa-content-standards, data-headlines — weekly auto-snapshot (Mon 8am), passkey `8812`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker / State |
|---|---------|------|--------|---------------------|
| 1 | Platform Access & Training | 1 | In progress | All systems confirmed. **Pending:** GitHub→Snowflake (Chad), PTECH-7730 ETA (2026-04-16), Ryan Spalding eCPM. |
| 2 | Dashboard Instrumentation | 4 | In progress | v0.88 live. PGS-82 Product Review (2 must-fix). PGS-104 back In Progress. PGS-140 In QA. PTECH-7730 blocks Amplitude adapter. |
| 3 | T1 Headlines Analysis | 4 | In progress | 13 findings, daily grader, weekly ingest + tarrow_backfill.py operational. **HIGH: Replace Tarrow data with Snowflake.** Blocked on GitHub→Snowflake (Chad). Pending: scrub defunct pubs (First for Women, Soaps in Depth, InTouch); verify Week # / McClatchy 4-4-5 calendar alignment. |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | In progress | Synthesis layer: aggregates data-headlines + data-keywords + P2 instrumentation into circulated pipeline/product narratives. Tooling in active iteration. |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | All 5 personas live. PGS-104/111/135 in progress. Andy sign-off on Apple/SN templates still pending. |
| 5 | Personas & Formats Testing | 5 | In progress | Needs P4 stable + EGS-127. |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | EGS-127 ticket 12828 in dev (1 of 4). |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | EGS-127 + rq-send-to-cue + PGS-80 must land first. |
| 8 | CSA Pipeline Architecture Mapping & Gap Analysis | 2 | In progress | Reframed 2026-04-16: Bitbucket audit → as-built map (Sully AI decomposition lens) → PRD ideal map → prioritized gap delta + stakeholder visualizations. Blocker: confirm Bitbucket access. |
| 9 | ~~PRD Revisions~~ | — | Done | V0.5 delivered 2026-04-10, distributed at CSA Weekly 2026-04-14. |
| 10 | Gary Tools Integration | 2 | In progress | Direct API integration dropped (vendor lock-in). Pierce to audit Gary's public resources, obtain code, and propose internal replication to Chris + CSA eng. |
| 11 | Recipes | 5 | Not started | Needs P4 + P2 + P6 + P14. |
| 12 | United Robots Inbound Pipeline | 4 | Hold | PGS-17 + PGS-67 both CODE REVIEW. PGS-170 DONE (shipped 2026-04-16). EGS-127 + PGS-80 still needed. |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | Done | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | Prototype live. Pull paused (Chris logic flaw 2026-04-15). Rocky/Julio credit rate pending. |
| 15 | Partner Content / Inventory Optimization | 5 | In progress | Reuters RSS confirmed. AI vetting policy not drafted. Legal question unresolved. |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff (Sara, Sarah Price, Pierce, Kathy). |
| 17 | Spanish CSA Pipeline | 5 | Not started | Waiting on Chris/Rajiv direction. |
| 18 | Agentic Writing Helpers | 5 | In progress | /sarah-weekly-update delivered. Phase 2: append to same doc (queued). Sarah PV request = same as enrich_tracker.py — resolved, no new build. Next: Style Checker + pilot author. |
| 19 | MAIA Trend Tool Validation | 4 | In progress | 14-day test underway. Fri 2026-04-18 meeting with Sarah + Chris done — MAIA validated as useful signal but not a replacement for editorial judgment. Kat access denied — two-way comparison confirmed. Waiting on MAIA tab + tracking sheet. |
| 20 | Experiences Vertical Content Test | 4 | In progress | Sara confirmed data usable 2026-04-16 — daily use starting. Feedback loop calibration ~May 2026. |
| 21 | Mode 2 Trust & Editorial Risk Spike | 2 | In progress | PGS-189 — Oliver Felix assigned, Pierce tagged. Mode 2 silently adds content; trust/accuracy risk. PGS-150 HOLD pending Pierce criteria clarification. |

## What's Next — Pierce's Action Items

**G1 — Product/Pipeline:**
- [ ] **PGS-150:** Send Sara email + schedule criteria session with Chris Palo — Susannah has ticket on HOLD waiting (email drafted 2026-04-16)
- [ ] **CSA pipeline visuals for Britney** — "completed / working / in-transit" diagram; Chris ask 2026-04-14
- [ ] **Confirm first per-pub SEMrush pull with Rocky** — financial services confirmed as topic; pub not locked yet

**G2 — Editorial Standards:**
- [ ] **Build Style Checker (P18 quick win)** — paste CSA output + select brand → auto-enforce style guide; AP base + Women's World/US Weekly exceptions; Pierce confirmed feasible
- [ ] **Pierce + Sara huddle (P18)** — pick pilot author from Apr 16 session pain points (Samantha Agate for style enforcement is leading candidate)
- [ ] **Verify input-length/output-length fix status** — confirm with engineering whether CSA output-length-pinned-to-input has been addressed

**G3 — Quality/Testing:**
- [ ] **Gary: audit public resources** — identify what's replicable; then obtain code and propose internal build to Chris + CSA eng

**G4 — Documentation:**
- [ ] **Document sandbox base build** — Chris explicitly asked; package toolkit + guardrails so Chris + Sarah Price can replicate

**G5 — Technical/Analytical:**
- [ ] **Mon 2026-04-20: Ping Chad Bruton** — grant `Data_Engineer_L` + `Data_Engineer_M` Sigma roles SELECT on `MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED`. Both connections visible in Sigma but schema not exposed. Needed before Sarah Price workbook can be built.
- [ ] **Replace Tarrow data with Snowflake (HIGH PRIORITY)** — All data-headlines Tarrow dependencies (weekly ingest, grader, author playbooks, tracker_raw) must be replaced with direct Snowflake pulls. Tarrow is poor quality; Snowflake is the authoritative source. Gate: GitHub→Snowflake connection (Chad Bruton). Tables: STORY_TRAFFIC_MAIN + DYN_STORY_META_DATA.
- [ ] **Mon 2026-04-20 3pm CDT — Ryan Spalding meeting** — Chris Palo + Sarah Price joining. Three asks: (1) eCPM by publication as Snowflake data for Recipe system Market dimension; (2) clarify which eCPM number to use — OM tab vs loaded (two different numbers surfaced 2026-04-17); (3) partner contact inbound — Chris flagged this as hardest AI application; wants Ryan's view from a revenue/cost angle.
- [ ] **Scrub defunct publications** — Remove First for Women, Soaps in Depth, InTouch from `data/national-portfolio.js` and all data-headlines pipeline references (AUTHOR_VERTICAL, any hardcoded pub lists).
- [ ] **Verify Week # alignment** — Tracker Week # column may not align with McClatchy 4-4-5 fiscal calendar (weeks start on 4th of year, not Jan 1 like Google). Confirm before any week-based analysis or reporting.

**Compass:**
- [ ] Jeremy Gockel approval — must reach "Track Goals" status by **April 30, 2026**
- [ ] First Compass progress notes: **Fri 2026-04-25** (earliest — goals not yet approved)
- [ ] Every Friday: request Compass progress notes from Claude (per-goal, based on WINS.md)

**G6 — Tooling / Access:**
- [ ] **Escalate Sigma creator permissions** — 3rd request to Dedra Lawhead still pending as of 2026-04-17. If not resolved by end of week of Apr 21, escalate to Chris directly.
- [ ] **Joint tooling review** — Chris raised whether the group (Pierce, Sarah Price, Sara Vallone, Kathy) needs ClickUp or another tracking tool now that there are 2,000+ articles. Pierce's position: tooling is sufficient, permissions are the blocker. Schedule a brief discussion to align before any new tool purchase.
- [ ] **Investigate Snowflake native semantic analysis** — Snowflake stores full article text in a `plain text` table and has a native embedding model for cosine similarity. Pierce proposed using it to validate/compare CSA's variant similarity scores. Chris: "I'm very curious." Investigate: (1) confirm `plain text` table is accessible; (2) run a sample similarity comparison against known variant pairs; (3) assess whether Snowflake embeddings are better than the current CSA diff checker for headline variance detection.

**Waiting — no Pierce action needed:**
- Deedra Lawhead: Sigma creator access for Pierce + Sarah Price (asked 2026-04-18) — gate on building TRACKER_ENRICHED workbook
- Chad Bruton: reviewing TRACKER_ENRICHED model + Sigma hookup (this afternoon 2026-04-18)
- Joe Vitali: PTECH-7730 ETA (Julia Kim is PM)
- Derek/Sara: MAIA tab access + tracking sheet (P19; Sara requested 2026-04-15)
- Gary Kirwan: code access response (Jason + Rajiv discussing)
- Chris Palo: LTV kickoff scheduling; Reuters link
- Susannah/Saner: weekly release estimates with specific dates to management (Chris ask — on them, not Pierce)
- Engineering: PGS-82 must-fix (banner states, re-analysis indicator), PGS-104 keyword enforcement fix, EGS-127, PTECH-7730, PGS-189 spike (Oliver Felix)
- Kat Sheplavy: access denied 2026-04-16 — P19 proceeds as MAIA vs. TH native two-way comparison

**Later — not this week:**
- Design pairwise test schedule with Sarah Price (P5; needs P4 stable + EGS-127 first)
- Extend AGENT-AUDIENCE routing to §2+ sections in csa-content-standards
- Finalize Science-Curious persona definitions (Retiree + Casual Reader)
- Build data-headlines adapter pattern (GOVERNOR_CORE.md, ADAPTER_TEMPLATE.md)
- Revamp data-keywords tool per stakeholder feedback (read REFERENCE.md first)
- MAIA 14-day validation analysis (~2026-04-29)
- Investigate Bitbucket shared repo provisioning
- Expand data-keywords to TH team (Allison Ciaccio) — after national team validated
- Scoping V1 internal source ranking library — after Gary parameter session
- Share data-headlines findings → editorial leads + distribution team — blocked on Snowflake (Chad); switch from Tarrow pulls to direct pipe first


## Strategic Frameworks (from Chris Palo)

**Syndication ecosystems:** App-based captured (Apple News, SmartNews, Newsbreak) — LTV=0, pure PV increment. Web-based competitive (Yahoo, O&O) — standard CTR/PV dynamics. Do NOT commingle in analytics.
**LTV=0 for syndication:** PV delta only — no subscriber conversion. Every syndication slot = incremental PVs on top of O&O.
**Cluster batting average:** 1-in-3.3 as of 2026-04-07 (target 1-in-4, before CSA: 1-in-5). Q2 metrics: 3× output; $85/asset cost; 500K PV goal; 5–8% long-term traffic lift. **PV cost-recovery threshold: ~9,000 PVs** (Sarah Price recalculated 2026-04-17 with current eCPM data; prior figure was ~6,000).
**Headline vs. article:** Headline = click acquisition (syndication surface). Article = retention/subscriber conversion. Analytically distinct — do not conflate.
**Political data:** Justin's/Dedra's macro dashboards are separate from Pierce's CSA statistical testing layer.
**Context engineering over iteration (Sully AI, 2026-04-16):** Chris Palo shared whitepaper — decomposed, focused agents outperform iterative correction loops. Applying: each CSA quality gate (keyword validation, fact-check, brand-fit, format compliance, headline gen, SEO metadata, diff check) should be a separate focused agent. Deterministic elements (facts, attribution) = human sign-off gate; probabilistic (optimization, scoring) = AI judgment. "Prompt quality becomes load-bearing" — format templates, persona files, and keyword specs are engineering infrastructure. Parallel focused agents = enrichment layer completes in slowest single agent's time, not sum. Validates our architecture direction.
**Purpose-driven pipelines (2026-04-10):** Every pipeline has an explicit purpose — engagement, revenue, acquisition, or other. Purpose may vary at the asset level within a pipeline (e.g. core TH asset = drive app clickthroughs; bottom-tier variants = acquire new readers). CPA is a cost-center signal, not the goal. OKRs differ per pipeline.
**Distribution channels (2026-04-10):** O&O, Trend Hunter app, Syndication, TBTV (future). Each has a different value calculation. Syndication = avenue, not focus.
**Inclination Engine (2026-04-10):** Named concept — sole future input for automated signals and trend unit brief generation. Feeds T1/T2 pipelines without human initiation. Not yet built. Needs PRD section.
**CPA breakeven reference (2026-04-10):** ~$85 asset cost → ~9,000 PVs to cover cost (Sarah Price recalculated 2026-04-17 with current eCPM data; earlier figure was 6,156). Reference only — do not specify in PRD.
**Content decisioning hierarchy (2026-04-17):** Money is the correct optimization target, not PVs — Chris's explicit framing. PVs are a proxy for what teams can currently access. eCPM translates PVs into revenue. Ideal decisioning: "creature features perform well in Sacramento AND Sacramento eCPM is high → publish there." Page views alone is an incomplete signal for content placement decisions.
**eCPM as content decisioning signal (2026-04-17):** Audience growth (PVs) is the primary goal. eCPM is a tiebreaker: when two publications offer roughly equal volume opportunity, take the higher eCPM pub. Do not let eCPM displace PV-growth primacy. eCPM refresh cadence: once a week or once a month is sufficient — daily is excessive.
**eCPM data structure — OM vs loaded (2026-04-17):** Two numbers exist. OM tab = Open Market only (page view eCPM; not fully loaded). The "loaded" number includes Canadex + Tiboula (video) + Kinetics + PMP — numerically lower eCPM but more impressions per page view, more representative of full programmatic RPM. Chris: "the revenue team needs to tell us what number to use — don't decide." Ask Ryan Spalding directly. Mislabeled tabs cause incorrect AI decisioning (garbage in / garbage out). Do NOT use OM number unilaterally.
**eCPM by publication = confirmed Market dimension of Recipe system (2026-04-17):** Pierce explicitly described the Ryan Spalding Monday meeting to Chris: "I'm building a keyword content decision tool and trying to wire in ad yield as one of the signals — the Market dimension — eCPM by publication." Chris: "It's great." Confirmed build direction. Revenue data should NOT go into Sara's tracker yet (Chris's explicit decision, 2026-04-17) — PVs only for now; revenue comes via the Snowflake integration.
**Decision Engine vs Pierce's layer (2026-04-17):** Justin's team is building the Decision Engine — how content is placed on sites from an ad/revenue standpoint (front-end placement, ad unit optimization). Pierce's layer is the content creation decisioning tool — what to make, for which persona, for which publication. Complementary systems; Pierce's feeds creation decisions, Decision Engine feeds distribution/placement decisions. Do not conflate the two.
**Optimized Value vs LTV (2026-04-17):** Syndication adds optimization value (incremental cash on top of existing O&O audience) — not lifetime value. These are analytically distinct. Syndication slots = cash flow optimization, not subscriber conversion.
**McClatchy 4-4-5 fiscal calendar:** Fiscal weeks start on the 4th calendar day of the year, not January 1. Week numbers in McClatchy data will not match Google Calendar or ISO week numbering. Always reconcile before week-based analysis.
**Recipe system (2026-04-12):** Creator × Format × Topic × Market → Predictable Return. Before committing pipeline capacity, configure the four dimensions. data-keywords = Topic layer (keyword signal; is the opportunity there?). CSA = Format layer. Inclination Engine = Creator layer (future). Snowflake/Sigma = Market layer (eCPM by site). Full canonical reference: `RECIPE.md` in ops-hub.
**Cluster (precise definition, 2026-04-12):** Canonical article + analytically-determined variants. Predictive output of the analytics signal. NOT synonymous with topic, vertical, or keyword group. Cluster ID = Canonical ID.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
