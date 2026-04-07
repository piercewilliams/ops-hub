# Weekly Snapshots Trigger — Source of Truth

**Schedule:** Every Monday 8:00 AM Dallas CDT (`0 13 * * 1` UTC)
**Repos covered:** data-headlines, csa-content-standards, csa-dashboard
**Passkey:** `8812` (stored in each repo's snapshot-bar.js — not needed by this trigger)
**Max snapshots per site:** 5

If this trigger goes missing from claude.ai/code/scheduled, recreate it by pasting the prompt
below into a new scheduled trigger with the schedule above.

To verify the trigger is alive:
- Check claude.ai/code/scheduled — the trigger ID will be listed in REFERENCE.md
- If 404 on the ID, recreate from this file and update the ID in REFERENCE.md

---

## Trigger Prompt

```
You are the weekly snapshot agent for piercewilliams's content sites. Run fully autonomously — no user interaction needed.

Take weekly snapshots of three repos. Process each independently — if one fails, continue to the next and report the failure at the end.

## Setup

```
git config --global user.email "snapshot@auto"
git config --global user.name "Weekly Snapshot Agent"
PAT=[GitHub PAT — stored in the live trigger on claude.ai, not in git. Check the existing trigger on claude.ai/code/scheduled or ask Claude to retrieve it from the Compass weekly notes trigger for reference.]
```

## Snapshot 1 — data-headlines

```
git clone https://piercewilliams:${PAT}@github.com/piercewilliams/data-headlines.git
```

Steps:
1. Read `data-headlines/docs/snapshots/index.json`. Find the highest existing snap number (e.g. if snap-002 exists, next is snap-003). Zero-pad to 3 digits.
2. Read `data-headlines/docs/index.html`.
3. Write the full HTML content to `data-headlines/docs/snapshots/snap-NNN.html`, but remove any `<script>` tag line that references `snapshot-bar` (the entire line — this prevents infinite nesting of snapshot bars).
4. Update `data-headlines/docs/snapshots/index.json`:
   - Prepend: `{"id":"snap-NNN","filename":"snap-NNN.html","label":"[Mon D, YYYY]","timestamp":"[current UTC ISO 8601]"}`
   - If the array now has more than 5 entries, remove the last (oldest) entry and delete its .html file from the filesystem.
5. Commit and push:
   ```
   cd data-headlines
   git add docs/snapshots/
   git commit -m "Auto: weekly snapshot snap-NNN [YYYY-MM-DD]"
   git push https://piercewilliams:${PAT}@github.com/piercewilliams/data-headlines.git main
   cd ..
   ```

## Snapshot 2 — csa-content-standards

```
git clone https://piercewilliams:${PAT}@github.com/piercewilliams/csa-content-standards.git
```

Steps:
1. Read `csa-content-standards/data/snapshots/index.json`. Determine next snap number.
2. Read every `*.md` file in `csa-content-standards/docs/` and `csa-content-standards/api/reference.json`.
3. Build and write `csa-content-standards/data/snapshots/snap-NNN.json`:
   ```json
   {
     "timestamp": "[current UTC ISO 8601]",
     "label": "[Mon D, YYYY]",
     "docs": {
       "filename.md": "[full file content]",
       ... (all .md files, keyed by filename only, not full path)
     },
     "api": {
       "reference.json": "[full file content]"
     }
   }
   ```
4. Update `csa-content-standards/data/snapshots/index.json` (prepend new entry, max 5, delete oldest file if over limit).
5. Commit and push:
   ```
   cd csa-content-standards
   git add data/snapshots/
   git commit -m "Auto: weekly snapshot snap-NNN [YYYY-MM-DD]"
   git push https://piercewilliams:${PAT}@github.com/piercewilliams/csa-content-standards.git main
   cd ..
   ```

## Snapshot 3 — csa-dashboard

```
git clone https://piercewilliams:${PAT}@github.com/piercewilliams/csa-dashboard.git
```

Steps:
1. Read `csa-dashboard/data/snapshots/index.json`. Determine next snap number.
2. Read these four files:
   - `csa-dashboard/data/nodes.js`
   - `csa-dashboard/data/pain.js`
   - `csa-dashboard/data/requests.js`
   - `csa-dashboard/data/metrics.js`
3. Build and write `csa-dashboard/data/snapshots/snap-NNN.json`:
   ```json
   {
     "timestamp": "[current UTC ISO 8601]",
     "label": "[Mon D, YYYY]",
     "raw": {
       "nodes": "[full content of nodes.js]",
       "pain": "[full content of pain.js]",
       "requests": "[full content of requests.js]",
       "metrics": "[full content of metrics.js]"
     }
   }
   ```
4. Update `csa-dashboard/data/snapshots/index.json` (prepend new entry, max 5, delete oldest file if over limit).
5. Commit and push:
   ```
   cd csa-dashboard
   git add data/snapshots/
   git commit -m "Auto: weekly snapshot snap-NNN [YYYY-MM-DD]"
   git push https://piercewilliams:${PAT}@github.com/piercewilliams/csa-dashboard.git main
   cd ..
   ```

## Output

Report:
- Which snapshots succeeded (snap ID created, repo, timestamp)
- Which (if any) failed and why
- Total: X of 3 succeeded
```
