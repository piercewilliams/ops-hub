# Ops Hub — Reference

Stable facts for this project. Updated in place when facts change.

---

## Quick Reference

| Resource | Location |
|----------|----------|
| Dashboard (this repo) | `index.html` — open in browser |
| CSA Dashboard | https://piercewilliams.github.io/csa-dashboard/ |
| CSA Content Standards | https://csa-content-standards.netlify.app |
| T1 Headlines site | `/Users/pierce/Documents/GitHub/data-t1headlines/docs/index.html` |
| Alignment meeting agenda | https://docs.google.com/document/d/1MtVlBJeh_k9X7dnrpRmEQ9jefrbdWwY2/edit |
| Chris cluster performance sheet | https://docs.google.com/spreadsheets/d/1VGMbJUV2u9QjUpk0QxMdHeNf9sTumEeR/edit |
| Sara Vallone tracker sheet | (get URL from Sara) |

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
| Rajiv | Product/engineering; has GitHub access to CSA codebase | — |
| Gary Kirwan | Gary Tools developer | gary@kirwandigital.com |
| Jim Robinson | Engineering; built cosine similarity diff tool; internal SEO tool; has novelty concern about Gary | — |
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
| Snowflake/Sigma security group | Pending | IT + Chad | Ticket submitted 2026-03-26. Also need SEO data warehouse permissions (Rocky Rhodes). |
| IT webhook ticket | Pending | IT | May become irrelevant if Snowflake path works. |
| Gary API key + endpoint docs | Pending | Gary Kirwan | Required for Project 10. |
| Amplitude p-tagging issue | Dev fix needed | Engineering | Cue/WP tag format incompatibility. Blocks Amplitude adapter. Forward-path: scope event names at dev standup. |
| Susannah: top 15 persona texts | Pending receipt | Susannah | Requested 2026-03-25. |
| Tarrow: MSN full-year 2025 re-export | Pending | Tarrow | Unlocks T1 Finding 5. |
| Tarrow: SmartNews 2026 category columns | Pending | Tarrow | Unlocks T1 Finding 3 for 2026. |
| Content diff tool (PGS-82) | In progress (dev) | Jim Robinson | Cosine similarity approach confirmed feasible; engineer told to proceed. Phase 1 = automate measurement. Pierce's role = TBD. |

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
