#!/usr/bin/env bash
# ops-hub quality gate — run this before every push
# Usage: bash scripts/check.sh
set -euo pipefail

PASS=0
FAIL=0
WARN=0

ok()   { echo "  ✓ $1"; PASS=$((PASS+1)); }
fail() { echo "  ✗ $1"; FAIL=$((FAIL+1)); }
warn() { echo "  ⚠ $1"; WARN=$((WARN+1)); }

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ops-hub quality check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. JS syntax check
echo ""
echo "[ JavaScript syntax ]"
for f in js/app.js js/diagram.js; do
  if node --check "$f" 2>/dev/null; then
    ok "$f"
  else
    fail "$f — syntax error (run: node --check $f)"
  fi
done

# data files are ES modules with export — wrap for node --check
for f in data/projects.js data/csa-links.js; do
  # node --check doesn't support ES module syntax well; use a temp file
  TMP=$(mktemp /tmp/ops-hub-check-XXXXXX.mjs)
  cp "$f" "$TMP"
  if node --check "$TMP" 2>/dev/null; then
    ok "$f"
  else
    fail "$f — syntax error"
  fi
  rm -f "$TMP"
done

# 2. Undefined CSS variables
echo ""
echo "[ CSS variable integrity ]"
# Strip CSS comments before scanning, then check for undefined variables.
# Uses node to remove /* ... */ blocks (handles multi-line comments and inline comments).
CSS_STRIPPED=$(node -e "
  const css = require('fs').readFileSync('css/styles.css','utf8');
  console.log(css.replace(/\/\*[\s\S]*?\*\//g,''));
")
DEFINED=$(echo "$CSS_STRIPPED" | grep -oE '\-\-[a-z][a-zA-Z0-9-]+:' | sed 's/://' | sed 's/^--//' | sort -u)
USED=$(echo "$CSS_STRIPPED" | grep -oE 'var\(--[a-z][a-zA-Z0-9-]+' | sed 's/var(--//' | sort -u)
MISSING=$(comm -23 <(echo "$USED") <(echo "$DEFINED"))
if [ -z "$MISSING" ]; then
  ok "All CSS variables defined"
else
  for v in $MISSING; do
    fail "Undefined CSS variable: --$v"
  done
fi

# 3. Required files present
echo ""
echo "[ Required files ]"
REQUIRED=(
  "index.html"
  "js/app.js"
  "js/diagram.js"
  "css/styles.css"
  "data/projects.js"
  "data/csa-links.js"
  "data/snapshots/index.json"
  "sync-status.json"
  "CONTEXT.md"
  "README.md"
  "CLAUDE.md"
)
for f in "${REQUIRED[@]}"; do
  if [ -f "$f" ]; then
    ok "$f"
  else
    warn "$f — missing (may be expected before first sync)"
  fi
done

# 4. snapshots/index.json is valid JSON
echo ""
echo "[ Snapshot index integrity ]"
if [ -f "data/snapshots/index.json" ]; then
  if node -e "JSON.parse(require('fs').readFileSync('data/snapshots/index.json','utf8'))" 2>/dev/null; then
    ok "data/snapshots/index.json is valid JSON"
    COUNT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('data/snapshots/index.json','utf8')).length)")
    if [ "$COUNT" -gt 5 ]; then
      fail "index.json has $COUNT entries (max is 5)"
    else
      ok "index.json has $COUNT entries (≤5)"
    fi
  else
    fail "data/snapshots/index.json is not valid JSON"
  fi
fi

# 5. No debug artifacts
echo ""
echo "[ Debug artifact scan ]"
DEBUG_HITS=$(grep -rn "console\.log\|debugger\|TODO.*REMOVE\|FIXME.*HACK" js/ 2>/dev/null | grep -v "^Binary" || true)
if [ -z "$DEBUG_HITS" ]; then
  ok "No debug artifacts found"
else
  warn "Possible debug artifacts:"
  echo "$DEBUG_HITS" | while IFS= read -r line; do echo "    $line"; done
fi

# 6. HTML has required meta tags
echo ""
echo "[ HTML integrity ]"
if grep -q 'charset="utf-8"' index.html; then ok "charset meta present"; else fail "missing charset meta"; fi
if grep -q 'name="viewport"' index.html; then ok "viewport meta present"; else fail "missing viewport meta"; fi
if grep -q 'name="description"' index.html; then ok "description meta present"; else warn "missing description meta"; fi
if grep -q 'type="module"' index.html; then ok "ES module script tag present"; else fail "missing type=module on script"; fi

# 7. Behavioral integrity
echo ""
echo "[ Behavioral integrity ]"

# Key exports exist
if grep -q 'export function renderDiagram' js/diagram.js && grep -q 'export function drawArrows' js/diagram.js; then
  ok "diagram.js exports renderDiagram + drawArrows"
else
  fail "diagram.js missing expected exports"
fi
if node -e "const src = require('fs').readFileSync('data/projects.js','utf8'); ['PROJECTS','COMPLETED_TASKS','TIERS'].forEach(e => { if (!src.includes('export') || !src.includes(e)) throw new Error(e); });" 2>/dev/null; then
  ok "projects.js exports PROJECTS, COMPLETED_TASKS, TIERS"
else
  fail "projects.js missing expected exports"
fi

# sanitize() is defined
if grep -q 'function sanitize' js/app.js; then
  ok "sanitize() defined in app.js"
else
  fail "sanitize() missing from app.js"
fi

# setInterval not nested inside DOMContentLoaded (module-top-level check)
# Match the actual addEventListener call, not comments that mention DOMContentLoaded
INTERVAL_LINE=$(grep -n 'setInterval(fetchSyncStatus' js/app.js | head -1 | cut -d: -f1)
DCL_LINE=$(grep -n "addEventListener.*DOMContentLoaded" js/app.js | head -1 | cut -d: -f1)
if [ -n "$INTERVAL_LINE" ] && [ -n "$DCL_LINE" ] && [ "$INTERVAL_LINE" -lt "$DCL_LINE" ]; then
  ok "setInterval(fetchSyncStatus) is at module top level"
else
  warn "setInterval(fetchSyncStatus) may be inside DOMContentLoaded — verify manually"
fi

# Snapshot file count matches index.json
if [ -f "data/snapshots/index.json" ]; then
  INDEX_COUNT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('data/snapshots/index.json','utf8')).length)")
  FILE_COUNT=$(find data/snapshots -maxdepth 1 -name '*.json' ! -name 'index.json' | wc -l | tr -d ' ')
  if [ "$INDEX_COUNT" -eq "$FILE_COUNT" ]; then
    ok "Snapshot file count matches index.json ($INDEX_COUNT entries, $FILE_COUNT files)"
  else
    warn "Snapshot file count mismatch: index.json has $INDEX_COUNT entries, found $FILE_COUNT snapshot files"
  fi
fi

# 8. Data quality
echo ""
echo "[ Data quality ]"
node - <<'EOF'
const fs = require('fs');
const src = fs.readFileSync('data/projects.js', 'utf8');

let failCount = 0;
const ok   = msg => console.log('  ✓ ' + msg);
const bad  = msg => { console.log('  ✗ ' + msg); failCount++; };
const caution = msg => console.log('  ⚠ ' + msg);

// Load PROJECTS by stripping ES module syntax and evaling
let PROJECTS = {}, PINNED_ACTIONS = [];
try {
  const transformed = src
    .replace(/^export const /gm, 'const ')
    .replace(/^export function /gm, 'function ');
  const fn = new Function(transformed + '\nreturn { PROJECTS: typeof PROJECTS !== "undefined" ? PROJECTS : {}, PINNED_ACTIONS: typeof PINNED_ACTIONS !== "undefined" ? PINNED_ACTIONS : [] };');
  const result = fn();
  PROJECTS = result.PROJECTS;
  PINNED_ACTIONS = result.PINNED_ACTIONS;
} catch (e) {
  bad('Could not parse projects.js for data quality checks: ' + e.message);
  process.exit(1);
}

// --- PINNED_ACTIONS count ---
const pinCount = (PINNED_ACTIONS || []).length;
if (pinCount <= 3) ok(`PINNED_ACTIONS has ${pinCount} item(s) (≤3)`);
else bad(`PINNED_ACTIONS has ${pinCount} items — max 3 (trim low-urgency pins)`);

// --- Done project card requirements ---
const done = Object.entries(PROJECTS).filter(([, p]) => p.status === 'done');
if (done.length === 0) {
  ok('No done projects to audit');
} else {
  let doneOk = 0;
  for (const [id, p] of done) {
    const missingDate = !p.completedDate;
    const missingResolved = !Array.isArray(p.resolvedBlockers);
    if (missingDate) bad(`${id}: done project missing completedDate`);
    if (missingResolved) caution(`${id}: done project missing resolvedBlockers[] (add [] if none)`);
    if (!missingDate && !missingResolved) doneOk++;
  }
  if (doneOk > 0) ok(`${doneOk} of ${done.length} done project(s) have completedDate + resolvedBlockers`);
}

// --- Description length (>400 chars = too verbose, skip done projects) ---
const allProjects = Object.entries(PROJECTS);
const activeProjects = allProjects.filter(([, p]) => p.status !== 'done');
let descOk = 0, descBad = 0;
for (const [id, p] of activeProjects) {
  if (!p.description) continue;
  const len = p.description.trim().length;
  if (len > 400) {
    bad(`${id}: description ${len} chars (>400 — trim to 2–3 sentences)`);
    descBad++;
  } else {
    descOk++;
  }
}
if (descBad === 0 && descOk > 0) ok(`All ${descOk} active project descriptions within length limit`);

// --- Ticket numbers in descriptions (all projects) ---
const ticketPattern = /PGS-\d+|EGS-\d+|PTECH-\d+/;
const ticketViolations = allProjects.filter(([, p]) => p.description && ticketPattern.test(p.description));
if (ticketViolations.length === 0) {
  ok('No ticket numbers found in descriptions');
} else {
  for (const [id] of ticketViolations) bad(`${id}: ticket number in description (move to notes/nextActions)`);
}

process.exitCode = failCount > 0 ? 1 : 0;
EOF
DQ_EXIT=$?
if [ $DQ_EXIT -ne 0 ]; then FAIL=$((FAIL+1)); fi

# 9. Git status
echo ""
echo "[ Git status ]"
if git diff --quiet && git diff --cached --quiet; then
  ok "Working tree clean"
else
  warn "Uncommitted changes present"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
printf "  Results: %d passed, %d warnings, %d failed\n" $PASS $WARN $FAIL
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
if [ $FAIL -gt 0 ]; then exit 1; fi
exit 0
