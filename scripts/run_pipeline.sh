#!/usr/bin/env bash
# run_pipeline.sh — National Content Pipeline orchestration
#
# Runs the full 4-step pipeline in sequence. Each step must succeed
# before the next runs. Exit code 0 = all steps passed.
#
# Usage:
#   bash scripts/run_pipeline.sh              # full run
#   bash scripts/run_pipeline.sh --skip-sheet # skip sheet enrichment (ingest + model + snapshot only)
#
# Steps:
#   1. ingest_tracker.py   — Sara's Google Sheet → MCC_RAW.GROWTH_AND_STRATEGY.NATIONAL_CONTENT_TRACKER
#   2. model_tracker.py    — Build/refresh MCC_PRESENTATION.CONTENT_SCALING_AGENT.TRACKER_ENRICHED
#   3. enrich_tracker.py   — Write traffic + cluster data back to Sara's sheet (optional skip)
#   4. snapshot_tracker.py — Append weekly snapshot to TRACKER_WEEKLY

set -euo pipefail

SKIP_SHEET=false
for arg in "$@"; do
  [[ "$arg" == "--skip-sheet" ]] && SKIP_SHEET=true
done

SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPTS_DIR")"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

run_step() {
  local step_num="$1"
  local step_name="$2"
  local script="$3"
  log "Step $step_num: $step_name"
  python3 "$SCRIPTS_DIR/$script"
  log "Step $step_num complete."
  echo
}

cd "$REPO_DIR"

echo
echo "══════════════════════════════════════════════════════"
echo "  National Content Pipeline"
echo "  $(date '+%A, %B %-d, %Y at %-I:%M %p')"
echo "══════════════════════════════════════════════════════"
echo

run_step 1 "Ingest Sara's tracker sheet → Snowflake raw" "ingest_tracker.py"
run_step 2 "Build TRACKER_ENRICHED (full refresh)"        "model_tracker.py"

if [[ "$SKIP_SHEET" == false ]]; then
  run_step 3 "Enrich Sara's sheet ← Snowflake metrics"   "enrich_tracker.py"
else
  log "Step 3: Sheet enrichment skipped (--skip-sheet)."
  echo
fi

run_step 4 "Snapshot TRACKER_ENRICHED → TRACKER_WEEKLY"   "snapshot_tracker.py"

echo "══════════════════════════════════════════════════════"
log "Pipeline complete."
echo "══════════════════════════════════════════════════════"
echo
