# Ops Hub — Project Registry & Dependency Map

Visual project dashboard for Pierce's active work at McClatchy. Tracks ~13 projects across 5 repos with automatic dependency arrows, a live sync-status indicator, version history, and a private accomplishments register.

**Live URL:** `https://piercewilliams.github.io/ops-hub`

---

## What This Is

Ops Hub is a single-page GitHub Pages app — no build step, no server. It reads `data/projects.js` and renders a tiered dependency map showing every active project, its status, its blockers, and which projects it unblocks. Clicking any card opens a full sidebar with next actions, contacts, links, and CSA Dashboard data.

The dashboard polls GitHub every 5 minutes to display how long ago `data/projects.js` was last committed — the sync status pill in the top-left shows green (<3 days), yellow (3–7 days), or red (>7 days).

---

## Live Dashboard

Open `https://piercewilliams.github.io/ops-hub` in any browser.

> **Do not open `index.html` as a local file.** JavaScript ES modules require a server. Always use the GitHub Pages URL.

The page loads instantly. No login required — it's a public GitHub Pages site.

---

## How the Map Works

Projects are grouped into **tiers** that reflect dependency order:

| Tier | Name | What it means |
|------|------|---------------|
| 1 | Foundation | Unblocks everything downstream |
| 2 | Understanding | Parallel investigative work; feeds strategy |
| 3 | Strategy & Schema | Decisions that govern the build phase |
| 4 | Build | Active implementation |
| 5 | Optimize & Extend | Experimentation; requires Tier 4 outputs |
| 0 | Hold | Waiting on an external decision — do not start |

**SVG arrows** flow from an upstream card's bottom to a downstream card's top, showing the direction "this project unlocks this one." Arrows turn red when the downstream project is blocked.

**Card colors:** green border = in progress · red = blocked · amber = hold · grey = not started · blue = done.

Clicking a card opens the **sidebar** with:
- Status badge, tier, and owner
- Description and current status detail
- Blockers and next actions
- Depends On / Unlocks dependency links
- Systems and adapter status tables
- Alignment meeting agenda items
- Key contacts and external links
- CSA Dashboard integration chips (pain points, feature requests, metrics)

---

## Updating Project Data

All project data lives in **`data/projects.js`** — it is the single source of truth. Edit it directly; the diagram re-renders on page refresh.

### Change a project's status, blockers, or next actions

Find the project object in `data/projects.js` and edit the relevant fields:

```js
status: 'blocked',              // in-progress | blocked | not-started | hold | done
blockers: ['Description of what is blocking'],
nextActions: ['First thing to do next'],
```

### Add a new project

Copy an existing entry and fill in all fields:

```js
'p-new-id': {
  id: 'p-new-id', num: '14', tier: 3, type: 'project', status: 'not-started',
  name: 'Project Name',
  owner: 'Pierce',
  description: 'What this project is and why it matters.',
  blockers: [],
  nextActions: ['First thing to do'],
  dependsOn: ['p1-access'],  // IDs of upstream projects this depends on
},
```

### Mark a project complete

Set `status: 'done'` and add `completedDate: 'YYYY-MM-DD'`. Optionally move it to the COMPLETED section at the bottom of the file.

### Push changes

Commit in GitHub Desktop, then push. The GitHub Pages site updates automatically within ~60 seconds.

---

## Sync

Sync is **manual** — open a Claude Code session in this repo, update `data/projects.js` with current project status, commit, and push. No automation, no credentials to manage.

The **sync status pill** in the top-left shows how long ago `data/projects.js` was last committed, read from the public GitHub API (no token required):

| Pill color | Meaning |
|------------|---------|
| Green | Last commit < 3 days ago |
| Yellow | Last commit 3–7 days ago |
| Red | Last commit > 7 days ago |

Click the ↻ button to refresh the timestamp.

### Version history & restore

The **Map versions** bar (below the progress buttons) shows up to 5 recent snapshots — one per sync run. Each is a complete backup of `data/projects.js` from that moment.

**To view a past version:** click its label in the snapshot bar. The diagram re-renders with that version's data. A purple banner appears at the top. Click "← Back to live" to return.

**To restore a past version (overwrite current):**

1. Click the snapshot you want to restore
2. Click "Overwrite current with this version" in the banner
3. Enter the passkey when prompted
4. Two files download: `projects.js` and `index.json`
5. Place both files in their correct locations in the repo and push via GitHub Desktop

The restore flow also prunes the snapshot index — newer-than-restored entries are removed from history so the timeline stays consistent.

---

## Dashboard Features

### Project sidebars

Every project card opens a sidebar with:
- **Status + tier badge** — current status and which tier the project belongs to
- **Description** — what the project is and why it matters
- **Status detail** — optional in-progress note (shown in amber)
- **Blockers** — what is preventing progress (red)
- **Next Actions** — ordered list of immediate steps (green arrows)
- **Depends On / Unlocks** — clickable dependency context
- **Systems table** — API/platform access status per system (for Project 1)
- **Adapters table** — integration adapter status (for Project 2)
- **Contacts** — key people and their roles
- **Links** — external docs, sheets, or tools
- **CSA Dashboard** — linked pain points, feature requests, and metrics (see below)

### Progress tracking pills

Three buttons appear in the header bar:

| Button | What it shows |
|--------|--------------|
| Up next | Top 5 next actions across all active projects, sorted by priority then tier |
| Recently done | Last 5 completed tasks logged in `COMPLETED_TASKS` |
| Completed projects | Last 5 projects marked `status: 'done'`, sorted by completion date |

Clicking a button opens a slide-in panel. Clicking again closes it. Only one panel (sidebar or progress) is open at a time.

To log a completed task so it appears in "Recently done": add an entry to `COMPLETED_TASKS` in `data/projects.js`, or tell Claude "mark X as done" and it will update the file.

### CSA Dashboard integration

`data/csa-links.js` maps project IDs to their associated CSA Dashboard entries — pain points (`p-*`), feature requests (`rq-*`), and metrics (`m-*`). It is updated manually during sync sessions to mirror `csa-dashboard/data/` changes.

These appear as colored chip buttons at the bottom of the project sidebar:
- **Pain chips** (red) — known problems logged in the CSA Dashboard
- **Request chips** (amber) — feature requests; fulfilled ones are struck through
- **Metric chips** (blue) — KPIs tracked for this project area

Clicking a chip opens a popover with the full description.

---

## File Structure

```
ops-hub/
├── index.html              # Single-page app shell
├── css/
│   └── styles.css          # All styles; CSS custom properties in :root
├── js/
│   ├── app.js              # Entry point: sidebar, panels, sync, events
│   └── diagram.js          # Tier rows, project cards, SVG arrows
├── data/
│   ├── projects.js         # Source of truth: all project data + COMPLETED_TASKS
│   ├── csa-links.js        # Auto-generated CSA link data (do not edit manually)
│   └── snapshots/
│       ├── index.json      # Snapshot index (id, label, filename, timestamp)
│       └── snap-*.json     # Individual snapshot files (last 5 kept)
├── CONTEXT.md              # Working memory — read at session start
├── REFERENCE.md            # Stable facts: team, contacts, systems, architecture
├── sessions/               # Session logs (append-only archive)
│   └── YYYY-MM.md
├── WINS.md                 # Private accomplishments register (gitignored)
├── sync-status.json        # Written by sync agent after each run (gitignored locally, pushed by agent)
└── CLAUDE.md               # Claude Code instructions for this repo
```

---

## Context Architecture

All 6 repos (this one + 5 subsidiaries) use a three-tier context system designed to keep Claude oriented across sessions without reading the entire repo:

| File | Purpose | Update pattern |
|------|---------|----------------|
| `CONTEXT.md` | Working memory — current status, open questions, next actions | Overwrite at session end; keep ≤150 lines |
| `REFERENCE.md` | Stable facts — team members, contacts, system URLs, repo map | Update in place; never append |
| `sessions/YYYY-MM.md` | Session logs — what was decided and done | Append only; never overwrite |

**Starting a session:** open any Claude session in this repo and say "read CONTEXT.md." Claude will be fully oriented in one step.

**During a sync session:** read `CONTEXT.md` from each subsidiary repo to detect status changes, then update `data/projects.js` accordingly.

**Archiving:** when `CONTEXT.md` grows stale (content older than ~1 week), move old content to `sessions/YYYY-MM.md` and update `REFERENCE.md` with any newly stable facts.

---

## GitHub Setup Notes

**No terminal push:** Git credentials are not stored in the Claude Code environment. Always push via **GitHub Desktop**. All repos use the `main` branch.

| Resource | Where it lives |
|----------|---------------|
| `CONTEXT.md`, `REFERENCE.md`, `sessions/`, `WINS.md` | In git — committed and pushed with every sync |
| Claude memory (`~/.claude/projects/...`) | Local only — personal account |

---

## WINS Register

`WINS.md` tracks shipped work, analysis delivered, and stakeholder contributions. It is:
- **Git-tracked** — committed and pushed to GitHub as part of every sync
- **Auto-updated** — Claude updates it on every significant completion and every sync session, without being asked
- **Tiered** — organized by impact tier; entries are cumulative, not session-by-session

To view: ask Claude "show me WINS.md" or open the file directly.

---

## Roadmap

Potential future additions (not scheduled):

- **Amplitude integration** — blocked by p-tagging dev fix; once resolved, activate the adapter in `csa-dashboard`'s `ingest.js`
- **Snowflake/Sigma integration** — once Sigma OAuth2 credentials land, activate the Sigma adapter
- **Per-project history view** — show status changes over time for a single project using snapshot diffing
- **Mobile layout** — current layout requires a wide screen; responsive breakpoints would help on tablets

---

## Troubleshooting

**Sync pill shows red**
`data/projects.js` hasn't been committed in >7 days. Open a Claude session in this repo, update project status, commit, and push.

**Snapshot bar is missing**
Either no snapshots exist yet or `data/snapshots/index.json` is missing or empty.

**Diagram arrows are misaligned after resize**
Arrows are redrawn on `scroll` and `resize` events. If they're off, scroll the page slightly or resize the window to trigger a redraw.

**Changes to projects.js aren't showing**
GitHub Pages has a ~60-second propagation delay. Hard-refresh the page (`Cmd+Shift+R`) after the push completes. If still stale, check that the push actually completed in GitHub Desktop.

**Something else is wrong**
Open a Claude session in this repo and say: "something is wrong with the ops-hub sync — help me troubleshoot." Claude will read `REFERENCE.md` and walk through the issue step by step.
