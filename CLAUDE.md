# ops-hub — Claude Code Instructions

This repo is the meta project registry for all of Pierce's active work. It tracks ~13 projects across 5 repos (csa-dashboard, csa-content-standards, data-cmstracker, data-t1headlines, gary-tools) plus standalone projects.

## Context Architecture

This repo follows the Tiered Context Architecture (see synthesis-context-lifecycle skill):
- **CONTEXT.md** — working memory (≤150 lines). Read this first every session.
- **REFERENCE.md** — stable facts: team, contacts, systems, repo map. Update in place.
- **sessions/YYYY-MM.md** — session logs. Append, never overwrite.

## How to Update Projects

All project data lives in `data/projects.js`. It is the single source of truth.

To add a project:
1. Add an entry to the `PROJECTS` object with the correct `tier` and `dependsOn` array
2. Open `index.html` in a browser — the card and arrows render automatically

To update project status, blockers, or nextActions:
1. Edit the relevant object in `data/projects.js`

To archive a completed project:
1. Change `status: 'done'`
2. Move to a `COMPLETED` section at the bottom of the file

## Maintaining Context

At the start of each session: read CONTEXT.md and update the status snapshot.
At the end of each session: update CONTEXT.md (current state, next actions) and append to sessions/YYYY-MM.md.

Archive CONTEXT.md content older than 1 week → sessions/.
Archive stable facts → REFERENCE.md (update in place).

## Dashboard

`index.html` — open directly in a browser. No build step, no server needed.
Pure ES modules. Edit `data/projects.js` → refresh → diagram updates.

## Adding a New Project

```javascript
'p-new-id': {
  id: 'p-new-id', num: '14', tier: 3, type: 'project', status: 'not-started',
  name: 'Project Name',
  owner: 'Pierce',
  description: 'What this project is and why it matters.',
  blockers: ['What is blocking progress'],
  nextActions: ['First thing to do'],
  dependsOn: ['p1-access'],  // IDs of projects this depends on
},
```
