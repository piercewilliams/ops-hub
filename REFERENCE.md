# Ops Hub — Reference

Stable facts for this project. Updated in place when facts change.

---

## How Sync Works

Sync is **manual** — open ops-hub in a Claude Code session, update `data/projects.js` with current project status, then commit and push. No automation, no expiring credentials.

**The sync pill** reads the last commit timestamp for `data/projects.js` via the public GitHub API (no token required):
- **Green "Last synced Xm/Xh ago"** — committed within 3 days, all good
- **Yellow "Last synced Xd ago"** — more than 3 days, worth a sync session
- **Red "Last synced Xd ago — due for a sync"** — more than 7 days
- **"Status unavailable"** — can't reach GitHub API (check your connection)

**To sync:** Open a Claude Code session in ops-hub, say "sync with all repos," and push the result.

---

## Compass Weekly Progress Notes Trigger

| Item | Value |
|------|-------|
| Trigger name | Compass Weekly Progress Notes (Fri 4pm Dallas) |
| Trigger ID | `trig_01WwrhCC864xC67e92tReea9` |
| Schedule | Every Friday 4:00 PM Dallas CDT (`0 21 * * 5` UTC) |
| Manage / view logs | https://claude.ai/code/scheduled/trig_01WwrhCC864xC67e92tReea9 |
| What it does | Reads compass-goals.md + session logs + WINS.md → drafts weekly progress entries per Compass goal → appends to compass-goals.md. If goals not yet finalized, outputs a reminder instead. Pierce reviews and commits manually. |

**Setup required:** Once goals are finalized with Jeremy Gockel (by April 26, 2026), save them to `compass-goals.md` using the format defined in that file. The trigger activates automatically on next Friday run.

**DST note:** Same UTC-offset shift as the sync trigger — adjust cron if needed when clocks change.

---

## Weekly Snapshot Trigger (All Sites)

| Item | Value |
|------|-------|
| Trigger name | Weekly Snapshots — All Sites (Mon 8am Dallas) |
| Trigger ID | `trig_014MR5mJJxFsVYLdVdDU4u1d` |
| Schedule | Monday 8:00 AM Dallas CDT (`0 13 * * 1` UTC) |
| Manage / view logs | https://claude.ai/code/scheduled/trig_014MR5mJJxFsVYLdVdDU4u1d |
| Prompt source | `ops-hub/triggers/weekly-snapshots.md` — full prompt backed up here |
| What it does | Snapshots data-headlines, csa-content-standards, and csa-dashboard sequentially; max 5 per site |

**Sites covered:**
- `data-headlines` — copies `docs/index.html` → `docs/snapshots/snap-NNN.html` (strips snapshot bar script tag)
- `csa-content-standards` — bundles all `docs/*.md` + `api/reference.json` → `data/snapshots/snap-NNN.json`
- `csa-dashboard` — bundles `nodes.js`, `pain.js`, `requests.js`, `metrics.js` → `data/snapshots/snap-NNN.json`

**Passkey:** `8812` (same as ops-hub restore). Never touches live source files.

**Troubleshooting:**
- If snapshot bar shows no versions: check trigger ran at claude.ai/code/scheduled; if index.json is still `[]`, trigger may have errored — check logs
- If trigger errors on one site, it continues to the next (failure isolation)
- **If trigger ID returns 404:** it was deleted. Recreate from `triggers/weekly-snapshots.md` — the full prompt is stored there. Update the ID in this table after recreating.

---

## Quick Reference

| Resource | Location |
|----------|----------|
| **National Team Portfolio** | [`data/national-portfolio.js`](data/national-portfolio.js) — canonical publication list (13 brands, domains, verticals, authors, syndication platforms). Live URL: `https://piercewilliams.github.io/ops-hub/data/national-portfolio.js`. Import from here for all SEMrush/Amplitude/Marfeel/API work. Source: Sara Vallone tracker, extracted 2026-04-13. Excludes Life & Style + Mod Moms Club. |
| **The Recipe System** | [`RECIPE.md`](RECIPE.md) — Creator × Format × Topic × Market → Return; cluster definition; vertical signal profiles; current vs. future state |
| Dashboard (this repo) | `index.html` — open in browser |
| CSA Dashboard | https://piercewilliams.github.io/csa-dashboard/ |
| CSA Staging | https://staging.trendhunteragents.ai/csa |
| Sigma TH-CSA Dashboard | Workbook ID: `NkXYNE5ANMr9eMcXI11uP` — Story count, avg/median PVs, market breakdown |
| TBTV | Future distribution channel mentioned by Chris Palo (2026-04-10) — no further details yet; watch for scope definition |
| Sigma Site Dashboard - Audience | Workbook: `Site Dashboard - Audience` (Deedra Lawhead, shared 2026-04-10) — Editor dashboard: 735 stories, 3.74M PVs, 352K SubPVs for CLT newsroom March 2026. Article-level: Headline / Story ID / Pub Date / PVs / SubPVs. Filterable by date/newsroom/site/section. Goes back to March 2023. **This is the template for the planned CSA version** — "upgraded CSA dash limited to those working on CSA content." Two tabs: Headlines + Topic Exam. SubPV = subscriber page views (key revenue signal). |
| CSA Content Standards | https://csa-content-standards.netlify.app |
| Keyword Intelligence (data-keywords) | https://piercewilliams.github.io/data-keywords/ — 14 briefs, 4 verticals (Entertainment ×7, Financial ×3, Food ×3, Health ×1 Skip); verdict: Go Hard / Test Small / Skip; sort: volume × CPC impact score. Single source of truth: `docs/data/briefs.js`. Local dev: `python3 -m http.server 8080` → http://localhost:8080/docs/. Sara Vallone asked for hot take 2026-04-13; Chris 1:1 2026-04-14 12:30pm CDT. No CLAUDE.md yet. |
| T1 Headlines site | `/Users/pierce/Documents/GitHub/data-headlines/docs/index.html` |
| Alignment meeting agenda | https://docs.google.com/document/d/1MtVlBJeh_k9X7dnrpRmEQ9jefrbdWwY2/edit |
| CSA Pipeline Concerns: First Two Weeks (Pierce, April 2026) | Strategic assessment of 9 structural CSA pipeline problems + 2 operational concerns (no shared product vision, no delivery commitments). At: docs.google.com/document/d/105XK60PgJnLUo7tHZ_jdRb_R11J-OsutFXvs8o8K_XY |
| PRD: Content Graph & Operations Layer V3 Breakout | THIS IS THE CURRENT PRD. Describes Content Graph (asset lineage/versioning/performance) and Operations Layer (air traffic control dashboard). Does NOT include a section on what the CSA itself should ultimately be and do — Pierce + Claude are writing that missing section to add to this document. |
| Chris cluster performance sheet | https://docs.google.com/spreadsheets/d/1VGMbJUV2u9QjUpk0QxMdHeNf9sTumEeR/edit |
| Sara Vallone tracker sheet | https://docs.google.com/spreadsheets/d/14_0eK46g3IEj7L_yp9FIdWwvnuYI5f-vAuP7DDhSPg8/edit |
| Content testing tracker (Sarah Price) | Desktop: "Testing tracker.xlsx" — 18 sheets tracking Q1 2026 content experiments (Nostalgia, Swarming, Travel/Experiences, Everyday Life). Articles tagged P/C (parent/child = sibling pairs). Swarming Test = 5 story clusters, 21 articles. Travel avg 328 PV/article vs Everyday Life 51.5. Discover Persona test sheet exists but empty. |

## Team Roster

| Name | Role | Contact / Notes |
|------|------|-----------------|
| Pierce Williams | Project lead — all 5 repos | — |
| Chris Palo | Content team lead (national/audience growth); CSA heaviest user; decision-maker on cluster workflow + Gary integration | cpalo@mcclatchy.com |
| Sara Vallone | Content team lead; owns tracker sheet; stakeholder on CMS Tracker | — |
| Sarah Price | Content strategist; co-analyst (T1 Headlines); has custom Marfeel dashboard | — |
| Susannah Locke | Product manager (CSA); integration lead (Gary); investigating cluster tagging; #1 priority = diff checking | — |
| Chris Tarrow | Distribution/platforms; maintains T1 headline performance sheet (monthly) | — |
| Chad Bruton | Data/analytics; owns Snowflake + Sigma; key architecture guide for tracker | — |
| Kathryn Sheplavy (Kat) | Data/CSA; investigating Q field options in CUE for cluster tagging | — |
| Rajiv Pant | Lead PM/engineer for CSA dev team (Maktachi); has GitHub access to CSA codebase | Met at standup 2026-03-30 |
| Guilherme Gomes Caires | New engineer on CSA dev team | Met at standup 2026-03-31; has system access but needs Bitbucket workspace + Jira board access (Amanda to trigger) |
| Rodrigo Cavalcanti | Engineer on CSA dev team | Met at standup 2026-03-31 |
| Jonathan Gonzalvo | Engineer on CSA dev team | Met at standup 2026-03-31 |
| Saner Keles | PM on CSA dev team | Met at standup 2026-03-30 |
| Marcelo Freitas | Front-end engineer; owns PGS-82 similarity score UI (PyTorch backend working, UX sprint underway) | Met at standup 2026-03-30 |
| Daury Caba | Engineer; owns content generation/XML payload work | Met at standup 2026-03-30 |
| Emil Penalo | Engineer; completed WordPress data linking; working on PGS-106 | Met at standup 2026-03-30 |
| Oliver Felix | Engineer; owns feedback loop (proof of concept ready), PGS-97 (Fetch Target Audience Definitions) | Met at standup 2026-03-30 |
| Patrick Al Khouri | Engineer; owns target audience/personas feature | Met at standup 2026-03-30 |
| Victor Suarez | Engineer/analytics; Amplitude tasks complete, starting PGS-104 (Keywords Input Field) | Met at standup 2026-03-30 |
| Ana Laura Volkman | Product; owns onboarding docs for CSA | Met at standup 2026-03-30 |
| Efren Castillo | Engineer on CSA dev team | Met at standup 2026-04-02 |
| Amanda Hamilton | Amplitude super admin (McClatchy); adds new members to CSA project in BitBucket; meets with Amplitude vendor monthly; manages Amplitude access requests + budget questions | Met at standup 2026-03-30; Amplitude session 2026-04-09 |
| Gary Kirwan | Gary Tools developer | gary@kirwandigital.com |
| Travis Farrar | Infrastructure — handles Claude budget requests; supervisor must contact Travis to request and validate additional Claude budget (not self-service) | Referenced by Amanda Hamilton 2026-04-09 |
| Eric Nelson | Approved United Robots inbound initiative 2026-03-30; greenlit using CSA to capture UR revenue share | — |
| Julia Tortoriello | CSA translation contact | — |
| Andy | Reviews Smart News, Apple News, MSN personas before they go live | — |
| Britney | Uses the update document (executive accountability) | — |
| Dedra Lawhead | Oversees news analytics in Amplitude; has public dashboards useful as starting points for engagement metrics (time on page, scroll depth, pages per session); also building simple CSA Sigma dashboard (PV/SubPV version first) | Sarah Price's contact; also referenced by Amanda Hamilton in 2026-04-09 Amplitude session |
| Melissa Angle | Owns period calendar; McClatchy uses 4-4-5 financial periods (Period 4 started 2026-03-30) | — |
| Jim Robinson | Engineering; built cosine similarity diff tool; internal SEO tool; has novelty concern about Gary | — |
| Jason Smith | External; building similar AI pipeline tools; Chris mentioned as parallel case — also struggling to communicate ideal end state to dev team | — |
| Matheus Czizewski | CSA dev team (engineer) | First appeared in standup 2026-04-06 invite list |
| Kathy | Chris's direct report; owns syndication partnership review + United Robots evaluation. Also owns partner content relationship (P15). Reuters being evaluated as potential replacement for current partner content provider — Kathy is the right contact when P15 activates. | Separate from Kat Sheplavy |
| Kathy Veter | On Eric Nelson's side ("new side of the aisle"). Chris sending her clustering success stats (with Eric Nelson) 2026-04-07. | Distinct from both Kathy above and Kathryn Sheplavy |
| Brody | US Weekly team lead. Chris spoke to Brody about needing an avenue for the team to report tool usage issues (e.g., roundup practice). Chris will surface briefly at CSSE meeting. | — |
| Rasheed | Chris's contact for Bitbucket + Cloudflare JSON access. Chris pinging him 2026-04-07 to see if he can set up a team environment for Pierce's tools (Bitbucket bucket, Cloudflare JSON). | May or may not be within M-Lache environment |
| Stephanie Zandecki | Senior SEO/TEO Lead, Platform Services; reviewing Gary's toolkit; noted Pierce may be getting keyword-to-article data via Sigma dashboard already | szandecki@mcclatchy.com |
| Patrick / Dar | Engineering (dev standup contacts for Amplitude event names) | — |
| Regina | WordPress contact — needed for WordPress integration | — |
| Rocky Rhodes | Snowflake/SEO data warehouse permissions contact; SEMrush API admin (allocated 250K credits to L&E; key sent to Sarah Price via Slack); reached out to SEMrush rep Julio re: credit consumption rates; also offered DataForSEO API as alternative | rrhodes@mcclatchy.com |
| Eric | (with Chris) assessing United Robots business feasibility | — |

## Repositories

| Repo | Purpose | Live URL |
|------|---------|----------|
| `ops-hub` | Meta project registry + dependency map (this repo) | local |
| `csa-dashboard` | CSA pipeline health monitoring + request register | https://piercewilliams.github.io/csa-dashboard/ |
| `csa-content-standards` | CSA style/format documentation site | https://csa-content-standards.netlify.app |
| `data-headlines` | T1 headline performance analysis (monthly) | local `docs/index.html` |
| `data-keywords` | Keyword signal intelligence — 14 briefs across 4 verticals; verdict + impact sort; seed data from Rocky Rhodes US Weekly gap analysis | https://piercewilliams.github.io/data-keywords/ |
| `data-cmstracker` | CMS automation planning (pre-build) | local |
| `gary-tools` | Gary API integration planning | local |
| `csa-prd` | CSA PRD verbatim + context, gaps, action items | local |
| `write-assist` | P18 — agent-in-document workflows (PRDs + content creation) | local |

## Key Open Tickets / Pending Items

### Platform & Access

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| Snowflake login issue | In progress | IT | Access granted (role: growth_and_strategy_role, wh: growth_and_strategy_role_wh). Login issue being remedied. Sigma still pending. |
| Amplitude / SemRush / Marfeel access | Awaiting follow-up | IT (help@mcclatchy.com) | IT responded 2026-03-31 claiming access was granted — but Marfeel, Amplitude, and SemRush are still inaccessible (no special boards, accounts, or APIs working). Pierce replied; waiting for IT follow-up. |
| IT webhook ticket | Pending | IT | May become irrelevant if Snowflake path works. |
| Gary API key + endpoint docs | **RECEIVED 2026-04-08** | Gary Kirwan | Full API docs sent to Chris. Base URL: `https://unified-seo-gateway.kirwan-digital-marketing-ltd.workers.dev`. McClatchy key: `uak_AWuPNYNP7j2BYi8ZDiAACwPaueknsRHM` (rotatable per Gary). Key fact-checking endpoint: `POST /api/v1/research/data-validity`. Stored in gary-tools repo. |
| Amplitude p-tagging issue | Dev fix needed | Engineering | Cue/WP tag format incompatibility. Blocks Amplitude adapter. |

### Content & Personas

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| Persona drafts | In progress | Sara Vallone | Sara committed to 1-2 personas for testing by 2026-04-01. Full set of 6-7 new personas (Apple News, Smart News, MSN) still to be drafted. |
| Format/persona layering tooling | Dev request logged | Susannah Locke | Decision 2026-03-31: build tooling to layer content formats on top of target audiences independently (mix-and-match, column A + column B). Sara Vallone prefers format-first workflow. Currently they are combined in a single persona item. |
| Tarrow: MSN full-year 2025 re-export | Done | Tarrow | Re-exported and re-analyzed 2026-03-31. Handed to Sarah Price. |
| Tarrow: SmartNews 2026 category columns | Done | Tarrow | Re-exported and re-analyzed 2026-03-31. Handed to Sarah Price. |

### Cluster Taxonomy Decisions — 2026-03-31

| Decision | Status | Notes |
|----------|--------|-------|
| Canonical ID = Cluster ID | **Confirmed** | Serves as session ID connecting sibling article variants. Chris Palo, Sara Vallone, Susannah Locke all agreed. |
| CSA articles are siblings (not parent/child) | **Confirmed** | Parent/child structure in the Sara Vallone tracker sheet was a Google Sheets workaround. Articles from the same research draft are siblings. |
| Variant linking dev request | To be submitted | Susannah logging request to link CSA siblings via canonical article ID + article ID. Next dev priority after current eng queue. |

### Jira Board — Updated 2026-04-10

| Ticket | Status | Owner | Notes |
|--------|--------|-------|-------|
| PGS-171: Publication Dropdown Not Scrollable | **IN PROGRESS (2026-04-13)** | CSA eng (unassigned) | Medium priority. UX bug — publication dropdown not scrollable. New ticket as of 2026-04-13 EOD. |
| PGS-150: Spike — Investigate Plagiarism Detection Options for CSA-Generated Content | **PRODUCT REVIEW (2026-04-11)** | Victor Suarez (spike complete) | Spike complete. Recommends Copyscape Premium API (~$72/month, pay-as-you-go) as primary; Originality.ai as fallback. Internal tooling: not feasible. Integration: alongside PGS-82 at Audience Variants stage. Susannah asking Pierce for team tool preference. Emily Bohnet surfaced in B2B feedback. |
| PTECH-7730: Update category tag derived property | **TO DO (new, 2026-04-11)** | Platform Technology [PT] Delta — unassigned | Amplitude work to make L&E CSA property = CUE CSA property. "From CSA" checkbox in WordPress. Creates "fudge" so category tag derived property displays comparable value. When done: enables Amplitude adapter + Deedra's unified Sigma dashboard. Parent: PTECH-7005. Reporter: Julia Kim. Susannah CC'd Pierce. **This is the p-tagging fix.** |
| PGS-148: Implement SEO Field Rules for National Team Agent Prompt (seo title, meta description, seo keywords) | **IN PROGRESS (unblocked 2026-04-08)** | Oliver Felix. Conditional rules: general set + national-team-specific set. **SEO keywords spec finalized by Pierce:** 1–5 keywords (TEO is 3–5), single words OK (TEO requires multi-word phrases), all lowercase, comma-separated, include location names for local stories. Example: "travel, supplements, Jason Kelce, dca plane crash, reagan airport crash, washington plane crash, potomac river crash". Susannah confirmed Oliver using Pierce's spec. Overrides PGS-102 for national team; must review alongside PGS-104. |
| PGS-147: Add Intro Length Requirement for National Team (~80–100 Words) | **CODE REVIEW (2026-04-08)** | Daury Caba completed implementation. Array-based org-specific instruction system — extra instructions stored per-team, loaded based on requesting org, making it reusable for other orgs. PR under review. Scope: all National team content formats (standard Audience Variants, Google Discover Explainer). Out of scope: What to Know Content Format, Video Script. National team only — News/L&E/E-commerce unaffected. Pierce confirmed requirement still wanted 2026-04-10. |
| PGS-141: Implement Headline (H1) Rules for National Team Agent Prompt | **CODE REVIEW (2026-04-08)** | Patrick Al Khouri put changes in PR. |
| PGS-140: Duplicate Content (Differentiation) Analytics | **IN PROGRESS (2026-04-13)** | Implemented on top of PGS-82 fixes. Oliver flagged a bug → Marcelo fixed it. Now needs Amplitude data test + push for review. Blocker (PGS-82 merge) now resolved. @Pierce Williams + @Jim Robinson tagged. |
| PGS-139: CSA Internal Duplicate Content (Differentiation) Test + Auto-Regeneration | **Selected for dev** | Ideal workflow: CSA runs differentiation check internally; regenerates if fail; notifies user if still fails. UX for extended generation time is key concern (Efren Castillo). Susannah's "this week/next" priority. UX meeting to be scheduled. @Pierce Williams + @Jim Robinson tagged. |
| PGS-85: Staging Release Coordination (pre-production checklist for PGS-82) | **In progress** | Susannah's Priority 1. Includes: staging test session (Monday+) with TEO + national team, QA test plan, mitigation strategies, national team leadership communication. Susannah is driving all coordination. |
| PGS-135: Enforce National Team H1 Headline Length Guidance (80–100 Characters) | **CODE REVIEW (2026-04-10)** | CSA eng | Root cause: no headline config for National team identity. News set to 60–80 chars, L&E/USW 80–100, National had nothing. Fix must take precedence over L&E/News style settings. Susannah also needs to fix at prompt level. |
| PGS-134: Add "Everything to Know" and "FAQ / Service Journalism" Content Formats for National Team | **READY FOR PRODUCTION (2026-04-10)** | Emil Penalo | Code review passed. Refactored into shared components (DB-driven). Ready to ship. When live: migrate Apple News + SmartNews best practices from persona → format section in csa-content-standards. |
| PGS-133: Create and Save 4 Additional National Team Target Audiences to All National Accounts | **Code review** | CSA eng | Pierce sent all 5 personas to Susannah 2026-04-03. Discover Browser already saved (PGS-96); this tickets the 4 additional. |
| PGS-115: Google Discover Explainer visible to all users (not national team only) | **PRODUCT REVIEW (2026-04-13)** | Daury Caba | Fix shipped same day (2026-04-01). Moved Code Review → Product Review 2026-04-13. Root cause: PGS-94 wasn't complete during PGS-95 dev; now resolved. |
| PGS-114: Remove automatic AI disclaimer from Discovery Content Format | **DONE (2026-04-10)** | Daury Caba | Scope: Discovery Content Format only. Decision: writers add disclaimer manually if needed. Acceptance: new generations produce no disclaimer; existing saved drafts out of scope. |
| PGS-111: SEO metadata fields not displayed at Step 3 for Content Format variants | **Code review** | Patrick Al Khouri | PR up for review as of 2026-04-02. Patrick fixed bug Susannah noticed — SEO data missing across all audience variants at Step 3. Unblocks PGS-104 QA. |
| PGS-104: Add keywords input field + downstream enforcement to Research Draft | **IN PROGRESS (2026-04-13 evening)** | Victor Suarez (dev); Jonathan Gonzalvo (QA) | National team only (feature-flagged). **Moved back In QA → In Progress 2026-04-13 evening.** Jonathan Gonzalvo QA finding: keyword enforcement NOT running on Google Discover Explainer format at all — systemic Q&A structure issue, not keyword-by-keyword failure. The Q&A structure of the Explainer may be bypassing the enforcement pipeline entirely. Victor Suarez confirmed 2 bugs; working on fix, will notify when ready for review. Spec: first comma-separated term = primary keyword; rest = secondary. Primary must appear in H1 (front-loaded, first 8 words), meta title, dek, meta description, lede. Feeds P4 keyword governance. |
| PGS-102: Add meta field TEO best practices for meta title, meta description, meta keywords | **Code review** | CSA eng | **All teams scope** (not just National). TEO collaboration required — @Stephanie Zandecki. Standards: meta title 55–60 chars + keywords front-loaded; meta description 150–160 chars, active/captivating, keyword variations; meta keywords 3–5 terms, include location for local stories. Google Trends integration flagged as nice-to-have by requestor. Key constraint: words in meta fields must appear in body (no keyword stuffing). |
| PGS-98: Investigate missing impact of Additional Context and Editorial Notes on output | **DONE (2026-04-11)** | CSA eng | Bug resolved — user-provided context in Additional Context and Editorial Notes fields now influences generated output. Prompt injection failure fixed. This is how editors inject intelligence into the pipeline — fix is significant. |
| PGS-97: Fetch Target Audience Definitions | **Done** | Oliver Felix | Pierce confirmed done 2026-04-02. Oliver extracted definitions from production DB (dump 2026-03-29). Key finding: "Trend Hunter" / "Trend Hunter B2C" / "Trend Hunter B2C (The Curious Optimizer)" / "Curious Optimizer" are all aliases for a single hardcoded predefined persona (864 uses). Discover Browser has 85 uses + 4 saved custom personas, consistent definition. Science-Curious Retiree (15 uses) and Science-Curious Casual Reader (9 uses) are AI-suggested, never saved, no canonical definition — focus areas vary per article. **Pierce action remaining: finalize canonical definitions for Science-Curious Retiree + Science-Curious Casual Reader before they can be saved as shared custom personas.** |
| PGS-96: Add "The Discover Browser" as saved target audience for all National team users | **IN QA (2026-04-10)** | CSA eng | The Discover Browser persona may need structural editing to fit the Target Audience format before implementation. Susannah is collaborating on it. Pierce should verify the Content Standards version of this persona is in proper shape for Susannah's use. |
| PGS-95: Add Google Discover Explainer format for National team | **Done** | CSA eng | Confirmed in production 2026-04-07 standup. Content Format rules override other rules when they conflict. AI disclaimer removed (PGS-114). |
| PGS-94: Establish National team as CSA configuration | Done | CSA eng | Complete. National team roster configured as of 2026-04-01. Unblocks PGS-115 fix. |
| PGS-93: Add "Create Research Draft" option to Import from URL(s) flow | **BACKLOG (2026-04-13)** | CSA eng | Susannah put on hold after checking with Pierce. Pierce commented: "Sara says this needs to be reworked; please do not prioritize." Ticket came from Ryan directly — Susannah ticketed it without consulting Sara's team first. Rework needed before resuming. |
| PGS-87: Target Audience label missing from Google Doc export for platform variants | **DONE (2026-04-11)** | CSA eng | Fixed. Each variant section now labeled with its audience (e.g., "Trend Hunter — Apple News"). Data-passing bug between Target Audience step and Platform Distribution export step resolved. |
| PGS-82: Spike — investigate assessing duplicate content for CSA variants | **IN QA (2026-04-13)** | Marcelo pushed fixes morning 2026-04-13. Oliver Felix integrating into production (first batch of 3 PRs). Staging QA will use real national team users + real content (Susannah has samples) — not pass/fail only. Jonathan Gonzalvo reviewing docs; will QA when ticket moves. National team flag required before production. Jim Robinson has a Python script — dev team to coordinate. Future: use scores to influence agent formatting at generation time. Pierce = stakeholder; Sarah Price to test. **Strategic framing (approved 2026-04-08):** Differentiation score = quality signal for whether variant system is working, not just an SEO compliance check. If variants aren't differentiated, personas/formats aren't doing their job. Google penalty is a consequence, not the core problem. Analytics layer (PGS-140) turns this into a feedback loop on prompt/definition quality over time. |
| PGS-80: Implement analytics tracking for user events | **Done** (2026-04-06) | Victor Suarez | Tracks: logins by user type, process initiated from URL import / Search / Research Draft, draft-to-publish ratio, drafts sent to CUE / WP / Google Docs / downloaded. Amplitude event tracking now implemented. Remaining P2 blocker: CSA eng p-tagging bug (CUE/WP format mismatch) must be resolved before event data is reliable. **Directly feeds P2 Dashboard Instrumentation.** |
| PGS-125: Amazon API integration | In progress | Guilherme Gomes Caires | Testing locally; Amazon API issues nearly resolved; close to code review as of 2026-04-07. |
| PGS-124: (dropdown/filtering options) | **On hold** | Susannah Locke | Held to discuss customization scope with Kathryn Sheplavy before hard-coding. Spike ticket to be created for dropdown and filtering options. |
| PGS-109: (unknown title) | Pending merge approval | Marcelo Freitas | Ready to merge; pending approval from Daury Caba and Emil Penalo as of 2026-04-07. |
| PGS-40: Define tagging taxonomy for CSA output tracking | **WON'T DO (2026-04-08)** | — | Work restructured into EGS-127 (epic, 4 subtasks). See EGS-127 below. |
| EGS-127: Tagging + Analytics — Track Content Variant Origins | **IN PROGRESS (2026-04-13)** | Marcelo Freitas | Epic with 4 subtasks. **Ticket 12828 (first of 4) moved to Selected for Development 2026-04-13.** Marcelo offering guidance (did original planning). Has engineering mods. Susannah's #1 analytics priority — currently one editor manually tracking 700+ stories/month. |
| PGS-172 + PGS-173: (spike result PRs) | **CODE REVIEW (2026-04-13)** | Victor Suarez | Two new PRs from spike results. Must be reviewed and merged in order: PGS-172 first, then PGS-173 (related). Victor dropped both PRs in channel. |
| PGS-149: Search results relevance | **INVESTIGATING (2026-04-13)** | Guilherme Gomes Caires + Jonathan Gonzalvo | Search results issue — user searched by exact headline; results may not have been most relevant. Kathryn thinks Shelby reported it. Saner checking reporter. Jonathan also reviewing. |

## Strategic Guidance from Chris (2026-03-30)

**Pierce's role:** Pipeline, quality control, operations. Content analysis = Sarah Price's job.

**Prioritization framework:** Economic impact × (inverse of) complexity. Easy wins with good economic return go first. Hard + low impact = back burner.

**Auto-greenlight rule:** Anything that can apply to the news/L&S division as well gets greenlit automatically across the org. Keep this in mind when scoping.

**The "control room" model (ideal end state for CSA pipeline):**
Trend signals in → content generation → drafts greenlit / revised / sent back → United Robots-style auto-content flows like a ticker → distribution → performance data feeds back into the system. The dev team currently lacks a clear picture of this end state and is building half-steps toward an undefined goal. Pierce's job is to document and hold them to this vision.

**On the dev team:** They think at button-placement level, not pipeline level. They're missing the entire workstream that happens after the CSA (distribution + performance feedback loop). Pierce should hold them to 3-6 month pipeline thinking.

**On SEO team:** Now has a seat at the table but should not put locks on content format decisions. Data and intelligence drive formats — not Google announcements. Gary's tools are not fully an SEO play; don't let SEO team gate the non-SEO modules.

**On Sara Vallone tracker (P7):** Deprioritized explicitly. CMS architecture (CSA sitting above both CMSs with a data layer) will eventually make it obsolete. Let it fall on the wayside.

**On CSA mapping (P8):** Not urgent. Pierce already has sufficient working understanding to draft the PRD.

## Dev Team Org Changes (2026-03-31)

- **Standup split incoming:** As upstatement work expands, Rajiv Pant plans to split into 2 separate standups + 2 Jira boards. Team maintaining cross-training via same Slack channel for now. **Two new Jira boards being set up (2026-04-07):** one for Hunter project, one for Trend Agent project — Saner Keles coordinating with Amanda.
- **Upstatement repo sync:** Rajiv to mirror upstatement consumer repo onto Flatiron and MLache Bitbucket repositories.
- **Claude config update:** Rajiv set CSA Claude to 'max effort' mode + increased allowed tokens to improve content quality/rules adherence.

## Dashboard Architecture (ops-hub)

- Pure vanilla JS ES modules, no build step
- Same CSS token system as `csa-dashboard`
- `data/projects.js` — single source of truth for all project data
- `js/diagram.js` — renders tier rows and SVG arrows
- `js/app.js` — sidebar, event handling, initialization
- SVG overlay is `position: fixed` and redrawn on scroll/resize
- To add/update a project: edit `data/projects.js` only

## Dependency Chain Summary

**Access chain:** P1 (access/training) → unlocks P2 (dashboard), P3 O&O layer, P7 (tracker), P10 (Gary)
**Cluster chain:** P6 (taxonomy) → P7 (tracker) → P5 (testing)
**Understanding chain:** P8 + P13 → P9 (PRD) → P11 (Recipes)
**Analysis chain:** P3 (T1 Headlines) → P3.5 (Narrative Dashboard)
**Governance chain:** P6 → P4 → P5
**Partner content chain:** P9 (PRD) → P15 (Partner Content Optimization) — gated on Chris green-light + Kathy

**Meeting framing:** Which chain to move faster on — Access or Cluster? That's the real prioritization question for Chris.
