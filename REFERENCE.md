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
| Dashboard (this repo) | `index.html` — open in browser |
| CSA Dashboard | https://piercewilliams.github.io/csa-dashboard/ |
| CSA Staging | https://staging.trendhunteragents.ai/csa |
| Sigma TH-CSA Dashboard | Workbook ID: `NkXYNE5ANMr9eMcXI11uP` — Story count, avg/median PVs, market breakdown |
| CSA Content Standards | https://csa-content-standards.netlify.app |
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
| Amanda Hamilton | Content leadership (McClatchy side); adds new members to CSA project in BitBucket | Met at standup 2026-03-30 |
| Gary Kirwan | Gary Tools developer | gary@kirwandigital.com |
| Eric Nelson | Approved United Robots inbound initiative 2026-03-30; greenlit using CSA to capture UR revenue share | — |
| Julia Tortoriello | CSA translation contact | — |
| Andy | Reviews Smart News, Apple News, MSN personas before they go live | — |
| Britney | Uses the update document (executive accountability) | — |
| Dedra | Sigma access/dashboards contact (Sarah Price's contact) | — |
| Melissa Angle | Owns period calendar; McClatchy uses 4-4-5 financial periods (Period 4 started 2026-03-30) | — |
| Jim Robinson | Engineering; built cosine similarity diff tool; internal SEO tool; has novelty concern about Gary | — |
| Jason Smith | External; building similar AI pipeline tools; Chris mentioned as parallel case — also struggling to communicate ideal end state to dev team | — |
| Matheus Czizewski | CSA dev team (engineer) | First appeared in standup 2026-04-06 invite list |
| Kathy | Chris's direct report; owns syndication partnership review + United Robots evaluation. Also owns partner content relationship (P15). Reuters being evaluated as potential replacement for current partner content provider — Kathy is the right contact when P15 activates. | Separate from Kat Sheplavy |
| Kathy Veter | On Eric Nelson's side ("new side of the aisle"). Chris sending her clustering success stats (with Eric Nelson) 2026-04-07. | Distinct from both Kathy above and Kathryn Sheplavy |
| Brody | US Weekly team lead. Chris spoke to Brody about needing an avenue for the team to report tool usage issues (e.g., roundup practice). Chris will surface briefly at CSSE meeting. | — |
| Rasheed | Chris's contact for Bitbucket + Cloudflare JSON access. Chris pinging him 2026-04-07 to see if he can set up a team environment for Pierce's tools (Bitbucket bucket, Cloudflare JSON). | May or may not be within M-Lache environment |
| Stephanie Zandecki | Internal SEO; reviewing Gary's toolkit | — |
| Patrick / Dar | Engineering (dev standup contacts for Amplitude event names) | — |
| Regina | WordPress contact — needed for WordPress integration | — |
| Rocky Rhodes | Snowflake/SEO data warehouse permissions contact | — |
| Eric | (with Chris) assessing United Robots business feasibility | — |

## Repositories

| Repo | Purpose | Live URL |
|------|---------|----------|
| `ops-hub` | Meta project registry + dependency map (this repo) | local |
| `csa-dashboard` | CSA pipeline health monitoring + request register | https://piercewilliams.github.io/csa-dashboard/ |
| `csa-content-standards` | CSA style/format documentation site | https://csa-content-standards.netlify.app |
| `data-headlines` | T1 headline performance analysis (monthly) | local `docs/index.html` |
| `data-cmstracker` | CMS automation planning (pre-build) | local |
| `gary-tools` | Gary API integration planning | local |

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

### Jira Board — Updated 2026-04-03

| Ticket | Status | Owner | Notes |
|--------|--------|-------|-------|
| PGS-147: Add Intro Length Requirement for National Team (~80–100 Words) | **In progress** | National team only (feature flag). Current: ~50 words. Target: ~80–100 words before first H2. Applies to all content formats for National team users. Style guide uploaded 2026-04-02 may need this added at prompt level as well. Slack: #nationalteam-csa-feedback, 2026-04-06. |
| PGS-148: Implement SEO Field Rules for National Team Agent Prompt (seo title, meta description, seo keywords) | **Selected for dev** | High priority. Susannah Locke reporter; @Pierce Williams tagged. Scope: seo title 50–70 chars, meta description 100–155 chars, focus keyphrase rules — all from attached seo-rules.md. National team only (feature flag); overrides PGS-102 for National team. Eng must review alongside PGS-104 to avoid conflicts. |
| PGS-141: Implement Headline (H1) Rules for National Team Agent Prompt | **Selected for dev** | New ticket 2026-04-07. |
| PGS-140: Duplicate Content (Differentiation) Analytics | **Selected for dev** | Track pass/fail rate, failing variant pairs, reanalysis clicks, CSA auto-regeneration events. Marcelo starting Amplitude implementation 2026-04-07 (intelligence only, no UI). Feeds P2 Amplitude adapter once live. @Pierce Williams + @Jim Robinson tagged. |
| PGS-139: CSA Internal Duplicate Content (Differentiation) Test + Auto-Regeneration | **Selected for dev** | Ideal workflow: CSA runs differentiation check internally; regenerates if fail; notifies user if still fails. UX for extended generation time is key concern (Efren Castillo). Susannah's "this week/next" priority. UX meeting to be scheduled. @Pierce Williams + @Jim Robinson tagged. |
| PGS-85: Staging Release Coordination (pre-production checklist for PGS-82) | **In progress** | Susannah's Priority 1. Includes: staging test session (Monday+) with TEO + national team, QA test plan, mitigation strategies, national team leadership communication. Susannah is driving all coordination. |
| PGS-135: Enforce National Team H1 Headline Length Guidance (80–100 Characters) | **Selected for dev** | CSA eng | Root cause: no headline config for National team identity. News set to 60–80 chars, L&E/USW 80–100, National had nothing. Fix must take precedence over L&E/News style settings. Susannah also needs to fix at prompt level. |
| PGS-134: Add "Everything to Know" and "FAQ / Service Journalism" Content Formats for National Team | **In progress** | CSA eng | National team only. Specs at csa-content-standards.netlify.app/docs/everything-to-know and /docs/faq. Follow PGS-95 implementation pattern. Content Format rules override all others. Scope-downs acceptable for speed but must be followed up. |
| PGS-133: Create and Save 4 Additional National Team Target Audiences to All National Accounts | **Code review** | CSA eng | Pierce sent all 5 personas to Susannah 2026-04-03. Discover Browser already saved (PGS-96); this tickets the 4 additional. |
| PGS-115: Google Discover Explainer visible to all users (not national team only) | **Code review** | Daury Caba | Fix shipped same day (2026-04-01). PR in code review. Root cause: PGS-94 wasn't complete during PGS-95 dev; now resolved. Google Discover Explainer nearly properly scoped to national team only. |
| PGS-114: Remove automatic AI disclaimer from Discovery Content Format | **Code review** | Daury Caba | Completed 2026-04-02. Scope: Discovery Content Format only. Decision: writers add disclaimer manually if needed. Acceptance: new generations produce no disclaimer; existing saved drafts out of scope. |
| PGS-111: SEO metadata fields not displayed at Step 3 for Content Format variants | **Code review** | Patrick Al Khouri | PR up for review as of 2026-04-02. Patrick fixed bug Susannah noticed — SEO data missing across all audience variants at Step 3. Unblocks PGS-104 QA. |
| PGS-104: Add keywords input field + downstream enforcement to Research Draft | Code review | Victor Suarez | National team only (feature-flagged). Spec: first comma-separated term = primary keyword; rest = secondary. Primary must appear in H1 (front-loaded, first 8 words), meta title, dek, meta description, and article lede. Secondary keywords distributed in body (not clustered; not forced into H1/meta). Warning surfaced if primary can't be naturally placed. Field persists across variants from same canonical article. **QA blocker (PGS-111) now in code review — QA unblocked.** Feeds P4 keyword governance. |
| PGS-102: Add meta field TEO best practices for meta title, meta description, meta keywords | **Code review** | CSA eng | **All teams scope** (not just National). TEO collaboration required — @Stephanie Zandecki. Standards: meta title 55–60 chars + keywords front-loaded; meta description 150–160 chars, active/captivating, keyword variations; meta keywords 3–5 terms, include location for local stories. Google Trends integration flagged as nice-to-have by requestor. Key constraint: words in meta fields must appear in body (no keyword stuffing). |
| PGS-98: Investigate missing impact of Additional Context and Editorial Notes on output | **In QA** | CSA eng | **Substantive bug** — user-provided context in these fields does not influence generated output. Example from ticket: user specified "focus on an Instagram post" in Additional Context; generated output ignored the post entirely. Likely either prompt injection failure or insufficient weighting. Affects the editorial direction workflow broadly — this is how editors inject their intelligence into the pipeline. |
| PGS-97: Fetch Target Audience Definitions | **Done** | Oliver Felix | Pierce confirmed done 2026-04-02. Oliver extracted definitions from production DB (dump 2026-03-29). Key finding: "Trend Hunter" / "Trend Hunter B2C" / "Trend Hunter B2C (The Curious Optimizer)" / "Curious Optimizer" are all aliases for a single hardcoded predefined persona (864 uses). Discover Browser has 85 uses + 4 saved custom personas, consistent definition. Science-Curious Retiree (15 uses) and Science-Curious Casual Reader (9 uses) are AI-suggested, never saved, no canonical definition — focus areas vary per article. **Pierce action remaining: finalize canonical definitions for Science-Curious Retiree + Science-Curious Casual Reader before they can be saved as shared custom personas.** |
| PGS-96: Add "The Discover Browser" as saved target audience for all National team users | Code review | CSA eng | The Discover Browser persona may need structural editing to fit the Target Audience format before implementation. Susannah is collaborating on it. Pierce should verify the Content Standards version of this persona is in proper shape for Susannah's use. |
| PGS-95: Add Google Discover Explainer format for National team | **Done** | CSA eng | Confirmed in production 2026-04-07 standup. Content Format rules override other rules when they conflict. AI disclaimer removed (PGS-114). |
| PGS-94: Establish National team as CSA configuration | Done | CSA eng | Complete. National team roster configured as of 2026-04-01. Unblocks PGS-115 fix. |
| PGS-93: Add "Create Research Draft" option to Import from URL(s) flow | Code review | CSA eng | Reduces friction for National team (currently using external AI tools for outlines). Flow: after URL import, user sees two CTAs — "Create Research Draft" (routes to Research Draft with prefilled content) or "Continue to Target Audiences" (existing flow). Both paths preserved to avoid disrupting News/L&E. |
| PGS-87: Target Audience label missing from Google Doc export for platform variants | **In QA** | CSA eng | Audience label exists earlier in workflow but is dropped at the platform distribution step — likely a data-passing bug. Users currently have to manually re-label each variant after export (significant time + error risk for syndicated content). Expected: each variant section labeled with audience (e.g., "Trend Hunter — Apple News"). |
| PGS-82: Spike — investigate assessing duplicate content for CSA variants | Code review | Marcelo / Susannah | Scoring system SHIPPED 2026-04-01. Staging QA will use real national team users + real content (Susannah has samples) — not pass/fail only. Jonathan Gonzalvo reviewing docs; will QA when ticket moves. National team flag required before production. Jim Robinson has a Python script — dev team to coordinate. Future: use scores to influence agent formatting at generation time. Pierce = stakeholder; Sarah Price to test. |
| PGS-80: Implement analytics tracking for user events | **Done** (2026-04-06) | Victor Suarez | Tracks: logins by user type, process initiated from URL import / Search / Research Draft, draft-to-publish ratio, drafts sent to CUE / WP / Google Docs / downloaded. Amplitude event tracking now implemented. Remaining P2 blocker: CSA eng p-tagging bug (CUE/WP format mismatch) must be resolved before event data is reliable. **Directly feeds P2 Dashboard Instrumentation.** |
| PGS-125: Amazon API integration | In progress | Guilherme Gomes Caires | Testing locally; Amazon API issues nearly resolved; close to code review as of 2026-04-07. |
| PGS-124: (dropdown/filtering options) | **On hold** | Susannah Locke | Held to discuss customization scope with Kathryn Sheplavy before hard-coding. Spike ticket to be created for dropdown and filtering options. |
| PGS-109: (unknown title) | Pending merge approval | Marcelo Freitas | Ready to merge; pending approval from Daury Caba and Emil Penalo as of 2026-04-07. |
| PGS-40: Define tagging taxonomy for CSA output tracking | **In progress** | Eng team | Scope: content formats, personas, output variants, distribution platforms. P6 strategy settled 2026-04-01. Tagging model must support analytics/reporting across all CSA dimensions. Reference doc: tagging-taxonomy-kickoff-v3.docx + alignment meeting agenda. |

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
