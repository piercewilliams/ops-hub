# ops-hub — Claude Code Instructions

Ops Hub is a zero-build-step GitHub Pages dashboard that tracks ~13 active projects across 5 repos at McClatchy. It renders a tiered dependency map, sidebar detail panels, progress pills, CSA Dashboard tag chips, and a passkey-protected version history — all as pure ES modules, no bundler, no npm.

---

## Architecture

- **No build step.** Pure ES modules loaded directly by the browser via `<script type="module">`.
- **No npm, no bundler, no transpilation.** Do not introduce package.json or any build toolchain.
- **GitHub Pages only.** The app is served from `https://piercewilliams.github.io/ops-hub`. Do not open `index.html` as a local file — ES modules require a server origin.
- **All imports must use relative paths with file extensions** (e.g. `../data/projects.js`, not `../data/projects`). The browser enforces this strictly.

## Key Files

| File | Role |
|------|------|
| `index.html` | HTML shell; single `<script type="module" src="js/app.js">` |
| `js/app.js` | Entry point: sidebar, progress panel, snapshot UI, sync status, event delegation |
| `js/diagram.js` | Tier rows, project cards, SVG dependency arrows |
| `data/projects.js` | **Single source of truth** for all project data + `COMPLETED_TASKS` |
| `data/csa-links.js` | Auto-generated CSA Dashboard tag data — do not edit manually |
| `data/snapshots/index.json` | Snapshot index (max 5 entries) |
| `data/snapshots/snap-*.json` | Individual snapshot files |
| `css/styles.css` | All styles; CSS custom properties defined in `:root` |
| `sync-status.json` | Legacy — no longer used. Pill now reads GitHub commits API. |

## Important Invariants

- **`data/projects.js`** is the single source of truth. Edit it to change project status, blockers, or next actions. Refresh the page to see changes.
- **`data/csa-links.js`** is auto-generated from `csa-dashboard/data/links.js`. Update manually when csa-dashboard changes, or regenerate in a Claude session.
- **`data/snapshots/index.json`** must always have ≤5 entries. Prune manually if needed.
- **All CSS variables** must be defined in `:root` before use. Run `bash scripts/check.sh` to verify.
- **`sanitize()`** must be applied to all data interpolated into innerHTML. It is defined at the top of `app.js` and handles null/undefined safely.
- **`renderProgressSection()`** is called exactly once on DOMContentLoaded. It only injects `#progress-bar` buttons. `#snapshot-bar` lives in `index.html` at the bottom of `#diagram-pane` and is populated separately by `renderSnapshotBar()`.
- **`setInterval(fetchSyncStatus, SYNC_INTERVAL_MS)`** is set at module top level intentionally — there is no unmount cycle in this static SPA, so no leak risk.
- **The sync pill** reads the last commit timestamp for `data/projects.js` via the public GitHub API. No token required. It reflects when projects.js was last committed — green <3d, yellow 3–7d, red >7d.
- **`#csa-popover`** is `position: absolute` on `<body>`. The `showPopover` function correctly adds `window.scrollX/Y` offsets for positioning.
- **Double `requestAnimationFrame`** in `renderDiagram` is required. One rAF is not enough — the second pass is needed to let the browser finish layout before `getBoundingClientRect` is accurate.

## How to Run the Quality Suite

```bash
bash scripts/check.sh
```

Checks: JS syntax (node --check), CSS variable integrity, required file presence, snapshot JSON validity (max 5 entries), debug artifact scan, HTML meta tags, and git clean status.

Run this before every push.

## How Sync Works

Sync is **manual** — open a Claude Code session in ops-hub, update `data/projects.js` with current project status, commit, and push. No automation, no credentials to manage.

The sync pill reads the last commit time for `data/projects.js` via the public GitHub API. No token required. It shows "Last synced X ago" — green <3d, yellow 3–7d, red >7d.

## Passkey

The snapshot restore feature requires a passkey to download a `projects.js` + `index.json` pair. The passkey is stored as the `PASSKEY` constant in `js/app.js`. Do not print or log it.

## Context Architecture

| File | Purpose | Budget |
|------|---------|--------|
| `CONTEXT.md` | Working memory — current state, open questions, next actions | ≤150 lines |
| `REFERENCE.md` | Stable facts — team, contacts, system URLs, repo map | Update in place |
| `sessions/YYYY-MM.md` | Session logs — what was decided and done | Append only |

Read `CONTEXT.md` at the start of every session. Update it at the end. Archive content older than ~1 week to `sessions/`.

**At the end of any session where work touched multiple repos:** run `/sync-repos` to ensure all deliverables, blockers, decisions, waiting-on-others items, and CSA dashboard state are reflected across all repos. Do not skip this. Do not wait for the user to ask. If the session was ops-hub-only with no cross-repo work, a targeted CONTEXT.md + projects.js update is sufficient.

**Critical sync rule — git log is the source of truth:** When running `/sync-repos`, the very first action must be `git log --oneline -20` and `git status` for every repo. CONTEXT.md and session logs can be stale; git history cannot lie. Any commit not described in that repo's session log and not captured in ops-hub COMPLETED_TASKS is a gap that must be fixed. Never declare "no gaps found" without having checked git log for all five repos.

## WINS.md Update Rules

`WINS.md` is a cumulative accomplishments register. It must be kept current. These rules are **non-negotiable and require no prompting from Pierce:**

1. **Update on every significant completion.** Any time a task is added to `COMPLETED_TASKS` in `projects.js`, the same work must be reflected in `WINS.md` under the appropriate tier. Do not defer this to a future sync.
2. **Update during every sync.** `/sync-repos` and any session-close update must include a WINS.md audit — add anything not yet captured, update performance metrics, refresh the "Last updated" line.
3. **Commit and push WINS.md** as part of the same commit as any ops-hub sync. Never leave WINS.md updated locally but uncommitted.
4. **WINS.md is tracked by git.** It is committed to the repo and pushed to GitHub. This is intentional — it is the preservation mechanism. Do not gitignore it.

---

## Project Card Description Rules

The `description` field is a **2–3 sentence paragraph** that answers:
1. What is this project and why does it exist?
2. What does it produce or deliver?

**Nothing else belongs in `description`.** The following must live in other fields — move them there, do not summarize them in the description:

| Belongs elsewhere | Goes in |
|-------------------|---------|
| Ticket numbers (PGS-###, EGS-###) | `nextActions` or `blockers` |
| Specific dates, version history | Session logs or `COMPLETED_TASKS` |
| Who said what in which meeting | Session logs or `CONTEXT.md` |
| Current status or recent progress | `status`, `blockers[]`, `nextActions[]` |
| Stakeholder feedback or conversation outcomes | Session logs |

**Self-test before writing:** If you removed the description and read only the other fields, would the description add something those fields cannot? If not, cut it.

**Enforcement — mandatory on every `projects.js` edit:** Before committing, scan every `description` field. Any that contain ticket numbers, specific dates, meeting outcomes, or who-said-what detail must be trimmed. No exceptions, no deferral to a later session.

## PINNED_ACTIONS — Global Up Next Priority

`PINNED_ACTIONS` in `data/projects.js` is the mechanism for surfacing urgent cross-project items at the top of the Up next panel, above the per-project tier/status sort.

**When to add:** Any time Pierce says something needs to be at the top of Up next, is tomorrow's first item, or is urgent regardless of which project it belongs to — add it to `PINNED_ACTIONS`.

**When to remove:** When Pierce marks it done, or when it's no longer urgent. Do not let items accumulate — `PINNED_ACTIONS` is not a second todo list. Keep to ≤3 items.

**Format:** `{ task: 'plain-language description', projectId: 'p##-slug' }`. The `projectId` is optional but preferred — it lets the panel link the item back to its project card.

**How it works:** Pinned items always render first in the Up next panel with a blue `▲` marker and blue left border, before any per-project nextActions. The limit of 5 total items is maintained — pinned items reduce the per-project slots accordingly.

---

## Completed Project Card Rules

When a project moves to `status: 'done'`, the sidebar is the only way to see its full history (the diagram card is hidden; only the pill ledger entry remains, and it is clickable). Before marking any project done, ensure the card has:

1. **`completedDate`** — set to the ISO date the project closed (e.g. `'2026-04-03'`)
2. **`description`** — updated to read as a retrospective: what the project was, what it resolved, what the outcome was. Still 2–3 sentences, but past-tense and conclusive.
3. **`resolvedBlockers[]`** — at least one entry describing the key blocker(s) that were cleared. Format: `'What was blocked → how it was resolved (who, when)'`. This is Pierce's review-cycle reference.
4. **`nextActions: []`** and **`blockers: []`** — both empty. Done projects have no open actions.

Do not move a project to `status: 'done'` without filling all four. These fields are what makes the completed pill sidebar useful during review cycles.

---

## projects.js Staleness Rules

Any time `data/projects.js` is updated — including during sync — audit every project's `nextActions` and `blockers` arrays against the following rules. Do not wait for the user to flag stale entries:

1. **Remove items marked DONE.** If a nextAction starts with "DONE:" or describes something already in `COMPLETED_TASKS`, delete it from `nextActions`.
2. **Remove past-dated items.** If a nextAction references a specific past date ("2026-04-04 meeting", "last week"), it is stale — remove or replace with what's now pending from it.
3. **Strip resolved conditionals.** If a nextAction starts with "After X meeting:" or "Once Y lands:" and that condition has been met, remove the prefix — the action is now unconditional.
4. **Update blockers that have been resolved.** If a blocker says "blocked by X" and X is now done or unblocked, update the blocker to reflect the actual current gate.
5. **Put most actionable items first.** Order `nextActions` by: (1) things Pierce can do today, (2) things waiting on a scheduled meeting, (3) things waiting on others, (4) things blocked by upstream work. Items that are purely "monitor" or "await" belong at the bottom.

## Known Tech Debt

- `ensureElement('progress-panel', 'div', 'body')` passes `'body'` as parent ID, but `<body>` has no `id` attribute, so `document.getElementById('body')` returns null and `ensureElement` can't create the element. A `|| fallback` creates it manually. Works correctly but is misleading — future refactor should use `document.body` directly.
- Several CSS `/* TODO: */` comments mark magic values (z-indices, opacities, widths) that could be promoted to CSS variables.
- No mobile/responsive layout — designed for wide desktop screens only.
