# Ops Hub — Reference

Stable facts for this project. Updated in place when facts change.

---

## Automated Sync

| Item | Value |
|------|-------|
| Trigger name | Ops Hub Sync — 3x Daily (Mon–Fri) |
| Trigger ID | `trig_017C1TqSqQ135B7djoGEVaGb` |
| Schedule | 8:00 AM, 12:00 PM, 5:00 PM Dallas time, Mon–Fri (CDT=UTC-5 in summer, CST=UTC-6 in winter) |
| Manage / view logs | https://claude.ai/code/scheduled/trig_017C1TqSqQ135B7djoGEVaGb |
| What it does | Reads CONTEXT.md from all 5 subsidiary repos → updates data/projects.js + CONTEXT.md in ops-hub → commits and pushes |

**DST note:** Cron runs in UTC. Dallas is CDT (UTC-5) Mar–Nov and CST (UTC-6) Nov–Mar. When clocks change, the sync will shift by 1 hour. To fix: tell Claude "update the ops-hub sync schedule for winter time" and it will adjust the cron expression.

### How to tell if sync is working

The dashboard at piercewilliams.github.io/ops-hub shows a live status pill (top of page):
- **Green "Synced Xm ago"** — working normally
- **Yellow "Sync delayed"** — missed 1 cycle, may self-correct
- **Red "Sync offline"** — missed 2+ cycles, needs attention
- **Red "Sync auth error — push failed"** — agent ran but couldn't write to GitHub

The simplest backup check: **github.com/piercewilliams/ops-hub/commits** — look for "Auto-sync" commits. If none in the last 2 hours during waking hours, something is wrong.

### Troubleshooting guide

**Symptom: Red pill on dashboard / no Auto-sync commits for 2+ hours**

1. Go to **claude.ai/code/scheduled** and find "Ops Hub Hourly Sync"
2. Click into it and check the last run — did it error? What did it say?
3. If it says "push failed" or auth error → see "Push auth broke" below
4. If there are no recent runs at all → the trigger may be paused; click Enable

**Symptom: Sync auth error / push_failed in status**

The remote agent can't push to GitHub. This happens if GitHub auth expires or repo permissions change. Fix:
1. Open a new Claude Code session in this repo (`/Users/pierce/Documents/GitHub/ops-hub`)
2. Tell Claude: "The ops-hub sync agent is getting push_failed errors. Help me re-authorize it or set up a GitHub token so the remote agent can push."
3. Claude will walk you through generating a deploy key or token and updating the trigger

**Symptom: Sync is running but dashboard cards show stale statuses**

The agent is conservative by design — it only updates a status if CONTEXT.md explicitly says so. If subsidiary repos haven't been updated recently, the statuses in ops-hub won't change either. Fix:
- Open the relevant subsidiary repo with Claude and update its CONTEXT.md to reflect current state
- The next sync will pick it up

**Symptom: sync-status.json doesn't exist / pill says "Sync file not found"**

This means the trigger has never successfully completed a push. Wait for the next scheduled run, or:
1. Go to **claude.ai/code/scheduled/trig_017C1TqSqQ135B7djoGEVaGb**
2. Click "Run now"
3. Watch whether it completes and whether a new commit appears on github.com/piercewilliams/ops-hub/commits

**Symptom: Trigger missing entirely from claude.ai/code/scheduled**

Tell Claude: "Re-create the ops-hub hourly sync trigger. All the details are in ops-hub/REFERENCE.md." Claude will read this file and rebuild it.

**To pause the sync** (e.g., you're on vacation and don't want noise):
- Go to claude.ai/code/scheduled → find the trigger → disable it
- Or tell Claude: "Pause the ops-hub sync trigger"

**To resume:**
- Re-enable at claude.ai/code/scheduled
- Or tell Claude: "Re-enable the ops-hub sync trigger"

**To adjust the schedule:**
- Tell Claude: "Change the ops-hub sync to run every 2 hours" (or whatever)
- Claude will update the cron expression via the RemoteTrigger tool

---

## Weekly Snapshot Trigger (All Sites)

| Item | Value |
|------|-------|
| Trigger name | Weekly Snapshots - All Sites (Mon 8am) |
| Trigger ID | `trig_01Qze9PVrNErCEYa1fMXxF2U` |
| Schedule | Monday 8:00 AM Dallas CDT (`0 13 * * 1` UTC) |
| Manage / view logs | https://claude.ai/code/scheduled/trig_01Qze9PVrNErCEYa1fMXxF2U |
| What it does | Snapshots data-t1headlines, csa-content-standards, and csa-dashboard sequentially; max 5 per site |

**Sites covered:**
- `data-t1headlines` — copies `docs/index.html` → `docs/snapshots/snap-NNN.html` (strips snapshot bar script tag)
- `csa-content-standards` — bundles all `docs/*.md` + `api/reference.json` → `data/snapshots/snap-NNN.json`
- `csa-dashboard` — bundles `nodes.js`, `pain.js`, `requests.js`, `metrics.js` → `data/snapshots/snap-NNN.json`

**Passkey:** `8812` (same as ops-hub restore). Never touches live source files.

**Troubleshooting:**
- If snapshot bar shows no versions: check trigger ran at claude.ai/code/scheduled; if index.json is still `[]`, trigger may have errored — check logs
- If trigger errors on one site, it continues to the next (failure isolation)
- To re-create: tell Claude "Re-create the weekly snapshot trigger. Details in ops-hub/REFERENCE.md."

---

## Quick Reference

| Resource | Location |
|----------|----------|
| Dashboard (this repo) | `index.html` — open in browser |
| CSA Dashboard | https://piercewilliams.github.io/csa-dashboard/ |
| CSA Staging | https://staging.trendhunteragents.ai/csa |
| Sigma TH-CSA Dashboard | Workbook ID: `NkXYNE5ANMr9eMcXI11uP` — Story count, avg/median PVs, market breakdown |
| CSA Content Standards | https://csa-content-standards.netlify.app |
| T1 Headlines site | `/Users/pierce/Documents/GitHub/data-t1headlines/docs/index.html` |
| Alignment meeting agenda | https://docs.google.com/document/d/1MtVlBJeh_k9X7dnrpRmEQ9jefrbdWwY2/edit |
| Chris cluster performance sheet | https://docs.google.com/spreadsheets/d/1VGMbJUV2u9QjUpk0QxMdHeNf9sTumEeR/edit |
| Sara Vallone tracker sheet | https://docs.google.com/spreadsheets/d/14_0eK46g3IEj7L_yp9FIdWwvnuYI5f-vAuP7DDhSPg8/edit |

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
| Saner Keles | PM on CSA dev team | Met at standup 2026-03-30 |
| Marcelo Freitas | Front-end engineer; owns PGS-82 similarity score UI (PyTorch backend working, UX sprint underway) | Met at standup 2026-03-30 |
| Daury Caba | Engineer; owns content generation/XML payload work | Met at standup 2026-03-30 |
| Emil Penalo | Engineer; completed WordPress data linking; working on PGS-106 | Met at standup 2026-03-30 |
| Oliver Felix | Engineer; owns feedback loop (proof of concept ready), PGS-97 (Fetch Target Audience Definitions) | Met at standup 2026-03-30 |
| Patrick Al Khouri | Engineer; owns target audience/personas feature | Met at standup 2026-03-30 |
| Victor Suarez | Engineer/analytics; Amplitude tasks complete, starting PGS-104 (Keywords Input Field) | Met at standup 2026-03-30 |
| Ana Laura Volkman | Product; owns onboarding docs for CSA | Met at standup 2026-03-30 |
| Amanda Hamilton | Content leadership (McClatchy side); adds new members to CSA project in BitBucket | Met at standup 2026-03-30 |
| Gary Kirwan | Gary Tools developer | gary@kirwandigital.com |
| Eric Nelson | Approved United Robots inbound initiative 2026-03-30; greenlit using CSA to capture UR revenue share | — |
| Julia Torelli | CSA translation contact | — |
| Andy | Reviews Smart News, Apple News, MSN personas before they go live | — |
| Britney | Uses the update document (executive accountability) | — |
| Dedra | Sigma access/dashboards contact (Sarah Price's contact) | — |
| Melissa Angle | Owns period calendar; McClatchy uses 4-4-5 financial periods (Period 4 started 2026-03-30) | — |
| Jim Robinson | Engineering; built cosine similarity diff tool; internal SEO tool; has novelty concern about Gary | — |
| Jason Smith | External; building similar AI pipeline tools; Chris mentioned as parallel case — also struggling to communicate ideal end state to dev team | — |
| Kathy | Chris's direct report; owns syndication partnership review + United Robots evaluation | Separate from Kat Sheplavy |
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
| `data-t1headlines` | T1 headline performance analysis (monthly) | local `docs/index.html` |
| `data-cmstracker` | CMS automation planning (pre-build) | local |
| `gary-tools` | Gary API integration planning | local |

## Key Open Tickets / Pending Items

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| Snowflake login issue | In progress | IT | Access granted (role: growth_and_strategy_role, wh: growth_and_strategy_role_wh). Login issue being remedied. Sigma still pending. |
| Amplitude / SemRush / Marfeel access | Awaiting response | IT (help@mcclatchy.com) | Sent 2026-03-30. |
| IT webhook ticket | Pending | IT | May become irrelevant if Snowflake path works. |
| Gary API key + endpoint docs | Awaiting reply | Gary Kirwan | Messaged via Slack/email 2026-03-30. Required for Project 10. |
| Amplitude p-tagging issue | Dev fix needed | Engineering | Cue/WP tag format incompatibility. Blocks Amplitude adapter. Forward-path: scope event names at dev standup. |
| Persona drafts | Pending | Sara Vallone | Susannah persona texts not forthcoming; Sara to draft 6-7 new personas (Apple News, Smart News, MSN). |
| Tarrow: MSN full-year 2025 re-export | Pending | Tarrow | Unlocks T1 Finding 5. |
| Tarrow: SmartNews 2026 category columns | Pending | Tarrow | Unlocks T1 Finding 3 for 2026. |
| Content diff tool (PGS-82) | In progress (UX sprint) | Marcelo Freitas (front-end) · Jim Robinson (backend script) · Susannah Locke (PM) · Efren Castillo (design) | Backend similarity scoring working (PyTorch, local tests pass). Architecture decided 2026-03-30: worst-pair score = cluster risk score; expose failing pair to user. UX sprint: Susannah + Efren own checkbox placement; Marcelo owns score display + variant controls + recalculation. Pierce = stakeholder; Sarah Price to test full flow later. |
| PGS-40: Tagging Taxonomy | ON HOLD | Eng team | Jira confirms eng side blocked — aligns with P6 alignment meeting not yet scheduled. |
| PGS-80: Analytics Tracking | Code review | Victor Suarez / CSA eng | CSA team's internal Amplitude user-event tracking. Related to but distinct from our P2 Amplitude adapter blocker (which is about CMS p-tagging). |
| PGS-97: Fetch Target Audience Definitions | In progress | Oliver Felix | Eng side of Pierce's action item to write target audiences. Coordinate timing. |
| PGS-104: Keywords Input Field | In progress | Victor Suarez | Adds keyword input + enforcement to Research Draft step. Feeds P4 keyword governance work. |

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

**Meeting framing:** Which chain to move faster on — Access or Cluster? That's the real prioritization question for Chris.
