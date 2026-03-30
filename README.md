# Ops Hub

Meta project registry and dependency map for Pierce's active work at McClatchy. Tracks ~13 projects across 5 repos with a visual dashboard, automated sync, and private accomplishments register.

---

## What's in this repo

| File / Folder | What it is |
|---------------|-----------|
| `index.html` | The dashboard — open this in a browser |
| `data/projects.js` | Single source of truth for all project data |
| `CONTEXT.md` | Working memory — read this at the start of each session |
| `REFERENCE.md` | Technical reference + troubleshooting guide |
| `sessions/` | Session logs (append-only archive) |
| `WINS.md` | Private accomplishments register — gitignored, never published |

---

## Viewing the dashboard

Open `https://piercewilliams.github.io/ops-hub` in a browser.

> **Note:** Don't open `index.html` directly as a file — JavaScript modules require a server. Always use the GitHub Pages URL above.

The dashboard shows all projects organized by dependency tier, with SVG arrows showing which projects unlock which. Click any card for full details.

**Sync status pill** (top of page):
- Green "Synced Xm ago" — automated sync is working
- Yellow "Sync delayed" — missed one cycle, may self-correct
- Red "Sync offline" — missed 2+ cycles, needs attention
- Red "Sync auth error" — agent ran but couldn't push to GitHub

---

## Updating project data

Edit `data/projects.js` only — everything else renders automatically.

To update a project's status, blockers, or next actions: find the project object and edit it.
To add a project: copy an existing entry, assign the next number, and set the correct `tier` and `dependsOn` values.

After editing: commit and push via GitHub Desktop, then refresh the dashboard.

---

## Automated sync

An hourly Claude Code agent reads `CONTEXT.md` from all 5 subsidiary repos and updates `data/projects.js` and `CONTEXT.md` in this repo. It runs every hour from 8:00 AM–11:00 PM Dallas time.

**To check on it:**
- Look at the sync pill on the dashboard
- Or check recent commits at `github.com/piercewilliams/ops-hub/commits` — look for "Auto-sync" commits

**To manage it (pause, resume, run now, adjust schedule):**
- Go to `claude.ai/code/scheduled` — find "Ops Hub Hourly Sync"
- Or tell Claude: "Check the ops-hub sync trigger" and it will handle it

> **Important:** Manage the sync from your **personal Claude account only**, not your company account. The trigger lives there.

Full troubleshooting guide is in `REFERENCE.md`.

---

## Context architecture

All 6 repos (this one + 5 subsidiaries) use a three-tier context system:

- **`CONTEXT.md`** — working memory. Read at session start, updated at session end. ≤150 lines.
- **`REFERENCE.md`** — stable facts (team, URLs, architecture). Updated in place, never appended.
- **`sessions/YYYY-MM.md`** — session logs. Append-only archive.

When starting a new Claude session in any repo, just say "read CONTEXT.md" and Claude will be fully oriented.

The automated sync agent reads `CONTEXT.md` from each subsidiary repo to keep `data/projects.js` current.

---

## Pushing changes

Terminal push doesn't work (no stored GitHub credentials in this environment). Always push via **GitHub Desktop**.

All repos live on the `main` branch. Stay on `main`.

---

## Working from two Claude accounts

You have two Claude Code accounts — personal (this one) and company. Key things:

- **CONTEXT.md, REFERENCE.md, sessions/** — in git, available from either account
- **Sync trigger** — lives on personal account only; leave it there
- **WINS.md** — local only, visible to personal account only
- **Claude memory** (`~/.claude/projects/...`) — personal account only

You can work freely from either account. Just manage the sync trigger from this personal account.

---

## Private accomplishments register (WINS.md)

`WINS.md` tracks shipped work, analysis delivered, and stakeholder contributions. It is:
- Gitignored — never committed or pushed
- Local only — lives at `/Users/pierce/Documents/GitHub/ops-hub/WINS.md`
- Auto-updated by Claude when relevant work is shared

To view it: ask Claude "show me WINS.md" or open it directly.

---

## Troubleshooting

For sync issues, auth problems, or schedule changes — see `REFERENCE.md`. It has a full troubleshooting guide with step-by-step instructions for every known failure mode.

If something breaks and you don't know where to start: open a Claude session in this repo and say "something is wrong with the ops-hub sync — help me troubleshoot." Claude will read REFERENCE.md and walk you through it.
