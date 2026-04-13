/**
 * app.js — Ops Hub entry point
 *
 * Purpose:
 *   Wires together the diagram renderer, sidebar, progress panel, snapshot
 *   version history, and sync-status pill into a single-page dashboard.
 *
 * Architecture:
 *   - Pure ES modules; no build step.
 *   - `data/projects.js` is the single source of truth for project data.
 *   - `data/csa-links.js` provides CSA Dashboard tag data keyed by project ID.
 *   - `js/diagram.js` owns DOM rendering of tier rows and SVG arrows.
 *   - This file owns: sidebar, progress panel, snapshot UI, sync status.
 *
 * Key data flows:
 *   1. DOMContentLoaded → renderDiagram(PROJECTS) → cards in DOM
 *   2. Card click → openSidebar(project) → buildSidebarHTML → innerHTML
 *   3. Snapshot btn → viewSnapshot() → _activeProjects swapped → renderDiagram
 *   4. fetchSyncStatus() → GitHub API → sync-status pill updated
 *   5. Progress btn → openProgressPanel() → reads _progressData
 */

import { PROJECTS, COMPLETED_TASKS } from '../data/projects.js';
import { CSA_LINKS } from '../data/csa-links.js';
import { renderDiagram, drawArrows } from './diagram.js';

// ── Constants ─────────────────────────────────────────────────────────────────

/** GitHub public API — last commit to data/projects.js (no auth required). */
const SYNC_STATUS_URL = 'https://api.github.com/repos/piercewilliams/ops-hub/commits?path=data%2Fprojects.js&per_page=1';

/** Stale thresholds for the updated-at pill. */
const STALE_WARN_MS     = 3 * 24 * 60 * 60 * 1000; // 3 days — worth a nudge
const STALE_CRIT_MS     = 7 * 24 * 60 * 60 * 1000; // 7 days — clearly stale

/** Auto-refresh interval for the sync-status pill. */
const SYNC_INTERVAL_MS  = 5 * 60 * 1000; // 5 minutes

/** Passkey required to download a snapshot restore. */
const PASSKEY           = '8812';

/** Maximum number of snapshots kept in version history (for pruning display). */
const SNAPSHOT_MAX      = 5;

// ── Status / Tier label maps ──────────────────────────────────────────────────

/** Human-readable labels for project status values. Used in sidebar and progress panel. */
const STATUS_LABELS = {
  'in-progress': 'In progress',
  'blocked':     'Blocked',
  'not-started': 'Not started',
  'hold':        'Hold',
  'done':        'Done',
};

/** Human-readable tier names. Used in sidebar and progress panel. */
const TIER_NAMES = {
  0: 'Hold',
  1: 'Tier 1 — Foundation',
  2: 'Tier 2 — Understanding',
  3: 'Tier 3 — Strategy & Schema',
  4: 'Tier 4 — Build',
  5: 'Tier 5 — Optimize & Extend',
};

// ── Snapshot state ────────────────────────────────────────────────────────────

/** Active project set — swapped to snapshot data when browsing version history. */
let _activeProjects     = PROJECTS;
let _activeSnapshotId   = null;
let _activeSnapshotRaw  = null;   // raw projects.js text, used for restore download
let _activeSnapshotLabel= null;
let _snapshotIndex      = [];     // full index array, kept for restore pruning

// ── Utilities ─────────────────────────────────────────────────────────────────

/**
 * Escapes a string for safe interpolation into HTML.
 * Replaces &, <, >, ", and ' with HTML entities.
 * Applied defensively even on trusted internal data.
 *
 * @param {string} str - Raw string value.
 * @returns {string} HTML-safe string.
 */
function sanitize(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Ensures a DOM element with the given id exists, creating and appending it
 * to `parentId` if it doesn't. Returns the element.
 * Use for one-time injections to avoid repeated createElement/appendChild.
 *
 * @param {string} id       - Element id.
 * @param {string} tag      - HTML tag name (e.g. 'div').
 * @param {string} parentId - id of parent element to append to if created.
 * @returns {HTMLElement|null}
 */
function ensureElement(id, tag, parentId) {
  let el = document.getElementById(id);
  if (!el) {
    const parent = document.getElementById(parentId);
    if (!parent) return null;
    el = document.createElement(tag);
    el.id = id;
    parent.appendChild(el);
  }
  return el;
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

/** Opens the sidebar for a project, closing any open progress panel first. */
function openSidebar(project) {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('sidebar-content');
  if (!sidebar || !content) return;

  closeProgressPanel(); // only one panel open at a time
  content.innerHTML = buildSidebarHTML(project);
  sidebar.classList.add('open');

  // Highlight the active card
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
  const card = document.querySelector(`.card[data-id="${sanitize(project.id)}"]`);
  if (card) card.classList.add('active');
}

/** Closes the sidebar and removes card active state. */
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
}

/**
 * Builds the full HTML string for the sidebar content of a project.
 *
 * @param {Object} p - A project object from PROJECTS / _activeProjects.
 * @returns {string} HTML string for injection into #sidebar-content.
 *
 * Sections rendered (each only if data exists):
 *   - Header (num, name, status badge, tier, owner)
 *   - Description + status_detail
 *   - Blockers, Next Actions
 *   - Depends On, Unlocks
 *   - Systems, Adapters
 *   - Alignment Agenda
 *   - Key Contacts
 *   - Links
 *   - CSA Dashboard (pain, requests, metrics chips)
 */
function buildSidebarHTML(p) {
  const blockerHTML = p.blockers?.length
    ? `<div class="sb-section"><div class="sb-section-title sb-blockers-title">⚠ Blockers</div><ul class="sb-list sb-list-blockers">${p.blockers.map(b => `<li>${sanitize(b)}</li>`).join('')}</ul></div>`
    : '';

  const actionsHTML = p.nextActions?.length
    ? `<div class="sb-section"><div class="sb-section-title">Next Actions</div><ul class="sb-list sb-list-actions">${p.nextActions.map(a => `<li>${sanitize(a)}</li>`).join('')}</ul></div>`
    : '';

  const depsHTML = p.dependsOn?.length
    ? `<div class="sb-section"><div class="sb-section-title">Depends On</div><div class="sb-deps">${p.dependsOn.map(id => {
        const dep = _activeProjects[id];
        return dep ? `<span class="sb-dep-tag">#${sanitize(dep.num)} ${sanitize(dep.name)}</span>` : '';
      }).join('')}</div></div>`
    : '';

  const unlocksHTML = (() => {
    const unlocks = Object.values(_activeProjects).filter(proj => proj.dependsOn?.includes(p.id));
    return unlocks.length
      ? `<div class="sb-section"><div class="sb-section-title">Unlocks</div><div class="sb-deps">${unlocks.map(u => `<span class="sb-dep-tag sb-dep-unlocks">#${sanitize(u.num)} ${sanitize(u.name)}</span>`).join('')}</div></div>`
      : '';
  })();

  const systemsHTML = p.systems?.length
    ? `<div class="sb-section"><div class="sb-section-title">Systems</div><table class="sb-systems-table">${p.systems.map(s => `<tr><td class="sys-name">${sanitize(s.name)}</td><td><span class="sys-status sys-${sanitize(s.status)}">${sanitize(s.status)}</span></td><td class="sys-note">${sanitize(s.note)}</td></tr>`).join('')}</table></div>`
    : '';

  // Strip adapter status suffixes used for variant styling (e.g. 'pending-creds' → 'pending')
  const adaptersHTML = p.adapters?.length
    ? `<div class="sb-section"><div class="sb-section-title">Adapters</div><table class="sb-systems-table">${p.adapters.map(a => `<tr><td class="sys-name">${sanitize(a.name)}</td><td><span class="sys-status sys-${sanitize(a.status.replace(/-creds$/, ''))}">${sanitize(a.status)}</span></td><td class="sys-note">${sanitize(a.note)}</td></tr>`).join('')}</table></div>`
    : '';

  const agendaHTML = p.alignmentAgendaItems?.length
    ? `<div class="sb-section"><div class="sb-section-title">Alignment Meeting Agenda</div><ul class="sb-list">${p.alignmentAgendaItems.map(i => `<li>${sanitize(i)}</li>`).join('')}</ul></div>`
    : '';

  const contactsHTML = p.contacts?.length
    ? `<div class="sb-section"><div class="sb-section-title">Key Contacts</div><ul class="sb-list">${p.contacts.map(c => `<li><strong>${sanitize(c.name)}</strong>${c.email ? ` &lt;${sanitize(c.email)}&gt;` : ''} — ${sanitize(c.role)}</li>`).join('')}</ul></div>`
    : '';

  // URL is trusted internal data; sanitize label only
  const linksHTML = p.links?.length
    ? `<div class="sb-section"><div class="sb-section-title">Links</div><ul class="sb-list sb-list-links">${p.links.map(l => `<li><a href="${sanitize(l.url)}" target="_blank" rel="noopener">${sanitize(l.label)}</a></li>`).join('')}</ul></div>`
    : '';

  // CSA Dashboard section — pain, requests, metrics chips
  const csaData = CSA_LINKS[p.id];
  const csaHTML = (() => {
    if (!csaData) return '';
    const rows = [];

    if (csaData.pain?.length) {
      rows.push(`<div class="csa-row"><span class="csa-row-label">Pain</span><span class="csa-tags">${
        // data-csa stores percent-encoded JSON to safely handle quotes/special chars
        csaData.pain.map(e => `<button class="csa-tag csa-tag-pain" data-csa="${sanitize(encodeURIComponent(JSON.stringify(e)))}" title="${sanitize(e.label)}">${sanitize(e.id)}</button>`).join('')
      }</span></div>`);
    }
    if (csaData.requests?.length) {
      rows.push(`<div class="csa-row"><span class="csa-row-label">Requests</span><span class="csa-tags">${
        csaData.requests.map(e => `<button class="csa-tag csa-tag-req${e.fulfilled ? ' csa-fulfilled' : ''}" data-csa="${sanitize(encodeURIComponent(JSON.stringify(e)))}" title="${sanitize(e.label)}">${sanitize(e.id)}</button>`).join('')
      }</span></div>`);
    }
    if (csaData.metrics?.length) {
      rows.push(`<div class="csa-row"><span class="csa-row-label">Metrics</span><span class="csa-tags">${
        csaData.metrics.map(e => `<button class="csa-tag csa-tag-metric" data-csa="${sanitize(encodeURIComponent(JSON.stringify(e)))}" title="${sanitize(e.label)}">${sanitize(e.id)}</button>`).join('')
      }</span></div>`);
    }
    return rows.length ? `<div class="sb-section"><div class="sb-section-title">CSA Dashboard</div>${rows.join('')}</div>` : '';
  })();

  const compassHTML = p.compassGoal
    ? `<div class="sb-compass-goal">🧭 ${sanitize(p.compassGoal)}</div>`
    : '';

  return `
    <div class="sb-header">
      <div class="sb-num">#${sanitize(p.num)}</div>
      <h2 class="sb-title">${sanitize(p.name)}</h2>
      <div class="sb-meta">
        <span class="status-badge status-${sanitize(p.status)}">${sanitize(STATUS_LABELS[p.status] ?? p.status)}</span>
        <span class="sb-tier">${sanitize(TIER_NAMES[p.tier] ?? '')}</span>
      </div>
      <div class="sb-owner">👤 ${sanitize(p.owner)}</div>
      ${compassHTML}
    </div>
    <div class="sb-description">${sanitize(p.description)}</div>
    ${p.status_detail ? `<div class="sb-status-detail">ℹ ${sanitize(p.status_detail)}</div>` : ''}
    ${blockerHTML}
    ${actionsHTML}
    ${depsHTML}
    ${unlocksHTML}
    ${systemsHTML}
    ${adaptersHTML}
    ${agendaHTML}
    ${contactsHTML}
    ${linksHTML}
    ${csaHTML}
  `;
}

// ── Progress Panel ────────────────────────────────────────────────────────────

/**
 * Computed progress data for the progress panel.
 * Populated by renderProgressSection(); read by openProgressPanel().
 *   - next:     top 5 upcoming tasks sorted by status rank then tier
 *   - recent:   last 5 entries from COMPLETED_TASKS
 *   - projects: last 5 done projects sorted by completedDate desc
 */
let _progressData       = { next: [], recent: [], projects: [] };

/** Tracks which progress panel tab is open (null = closed). */
let _activeProgressPanel = null;

/**
 * Returns the top N upcoming tasks sorted by status priority then tier.
 * Only includes projects with nextActions that are not done or hold.
 *
 * @param {number} [limit=5] - Max tasks to return.
 * @returns {Array<{task: string, project: Object}>}
 */
function getNextTasks(limit = 5) {
  // Lower rank = higher priority: in-progress first, then not-started, then blocked
  const statusRank = { 'in-progress': 0, 'not-started': 1, 'blocked': 2 };
  return Object.values(PROJECTS)
    .filter(p => p.nextActions?.length && p.status !== 'done' && p.status !== 'hold')
    .sort((a, b) => {
      const sr = (statusRank[a.status] ?? 3) - (statusRank[b.status] ?? 3);
      return sr !== 0 ? sr : a.tier - b.tier; // secondary sort: lower tier first
    })
    .slice(0, limit)
    .map(p => ({ task: p.nextActions[0], project: p }));
}

/**
 * Renders the progress bar buttons and snapshot bar into #progress-section.
 * Also injects the #progress-panel into <body> once if not present.
 * Populates _progressData for use when panels are opened.
 *
 * NOTE: Called exactly once, on DOMContentLoaded. #snapshot-bar is injected
 * via innerHTML here; if this were called a second time it would reset bar
 * state (including el.style.display set by renderSnapshotBar). Don't call again.
 */
function renderProgressSection() {
  const el = document.getElementById('progress-section');
  if (!el) return;

  // Pre-compute all panel data so openProgressPanel() can render instantly
  _progressData.next     = getNextTasks(5);
  _progressData.recent   = (COMPLETED_TASKS || []).slice(0, 5);
  _progressData.projects = Object.values(PROJECTS)
    .filter(p => p.status === 'done')
    .sort((a, b) => (b.completedDate || '').localeCompare(a.completedDate || ''))
    .slice(0, 5);

  el.innerHTML = `
    <div id="progress-bar">
      <button class="prog-btn" data-prog="next">Up next</button>
      <button class="prog-btn" data-prog="recent">Recently done</button>
      <button class="prog-btn" data-prog="projects">Completed projects</button>
    </div>
  `;

  // Inject the progress panel into <body> once; reused across open/close cycles
  ensureElement('progress-panel', 'div', 'body') || (() => {
    const panel = document.createElement('div');
    panel.id = 'progress-panel';
    document.body.appendChild(panel);
  })();

  const panel = document.getElementById('progress-panel');
  if (panel && !panel.querySelector('#progress-panel-header')) {
    panel.innerHTML = `
      <div id="progress-panel-header">
        <span id="progress-panel-title"></span>
        <button id="progress-panel-close" data-prog-close>✕</button>
      </div>
      <div id="progress-panel-body"></div>
    `;
  }
}

/**
 * Opens the progress panel to the given type tab.
 * Closes the sidebar first (only one panel open at a time).
 * Toggling the same tab while open closes the panel.
 *
 * @param {'next'|'recent'|'projects'} type - Which tab to show.
 */
function openProgressPanel(type) {
  const panel = document.getElementById('progress-panel');
  const title = document.getElementById('progress-panel-title');
  const body  = document.getElementById('progress-panel-body');
  if (!panel || !title || !body) return;

  // Toggle off if the same panel tab is clicked again
  if (_activeProgressPanel === type && panel.classList.contains('open')) {
    closeProgressPanel(); return;
  }
  closeSidebar(); // only one panel open at a time
  _activeProgressPanel = type;

  // Highlight active button
  document.querySelectorAll('.prog-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.prog === type));

  const TITLES = { next: 'Up Next', recent: 'Recently Done', projects: 'Completed Projects' };
  title.textContent = TITLES[type] ?? '';

  if (type === 'next') {
    const items = _progressData.next;
    body.innerHTML = items.length
      ? items.map((t, i) => `
          <div class="pp-item">
            <div class="pp-num">${i + 1}</div>
            <div class="pp-body">
              <div class="pp-task">${sanitize(t.task)}</div>
              <div class="pp-meta">#${sanitize(t.project.num)} ${sanitize(t.project.name)}
                <span class="status-badge status-${sanitize(t.project.status)} pp-badge">${sanitize(STATUS_LABELS[t.project.status] ?? t.project.status)}</span>
              </div>
            </div>
          </div>`).join('')
      : '<div class="pp-empty">No next actions defined yet.</div>';

  } else if (type === 'recent') {
    const items = _progressData.recent;
    body.innerHTML = items.length
      ? items.map(t => `
          <div class="pp-item">
            <div class="pp-date">${sanitize(t.date)}</div>
            <div class="pp-body">
              <div class="pp-task">${sanitize(t.task)}</div>
              <div class="pp-meta">${sanitize(t.project)}</div>
            </div>
          </div>`).join('')
      : '<div class="pp-empty">No completed tasks logged yet.<br>Tasks are added here when you tell Claude something is done.</div>';

  } else if (type === 'projects') {
    const items = _progressData.projects;
    body.innerHTML = items.length
      ? items.map(p => `
          <div class="pp-item">
            <div class="pp-date">${sanitize(p.completedDate || '—')}</div>
            <div class="pp-body">
              <div class="pp-task">#${sanitize(p.num)} ${sanitize(p.name)}</div>
              <div class="pp-meta">${sanitize(TIER_NAMES[p.tier] ?? '')}</div>
            </div>
          </div>`).join('')
      : '<div class="pp-empty">No completed projects yet.</div>';
  }

  panel.classList.add('open');
}

/** Closes the progress panel and clears active button state. */
function closeProgressPanel() {
  const panel = document.getElementById('progress-panel');
  if (panel) panel.classList.remove('open');
  document.querySelectorAll('.prog-btn').forEach(b => b.classList.remove('active'));
  _activeProgressPanel = null;
}

// ── Snapshot Version History ──────────────────────────────────────────────────

/**
 * Fetches data/snapshots/index.json and populates the snapshot bar with version buttons.
 * Uses cache: 'no-store' to always get the latest index on each call.
 * Hides the bar entirely if no snapshots exist or the fetch fails.
 */
async function renderSnapshotBar() {
  const el = document.getElementById('snapshot-bar');
  if (!el) return;
  try {
    const res = await fetch(`./data/snapshots/index.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error();
    const snapshots = (await res.json()).slice(0, SNAPSHOT_MAX);
    if (!snapshots.length) { el.style.display = 'none'; return; }

    _snapshotIndex = snapshots;
    el.innerHTML = `
      <span id="snapshot-bar-label">Map versions</span>
      ${snapshots.map(s => `<button class="snap-btn" data-snap-id="${sanitize(s.id)}" data-snap-file="${sanitize(s.filename)}" title="${sanitize(new Date(s.timestamp).toLocaleString())}">${sanitize(s.label)}</button>`).join('')}
    `;
  } catch {
    el.style.display = 'none';
  }
}

/**
 * Fetches a snapshot file, swaps _activeProjects, and re-renders the diagram.
 * Shows a "Loading…" state on the clicked button while fetching.
 * Displays the snapshot banner and highlights the active snapshot button.
 *
 * @param {string} snapshotFile - Filename within data/snapshots/ (e.g. 'snap-001.json').
 * @param {string} snapId       - Snapshot id matching index.json entry.
 */
async function viewSnapshot(snapshotFile, snapId) {
  // Find the button and set a loading state while fetching
  const btn = document.querySelector(`.snap-btn[data-snap-id="${snapId}"]`);
  const originalLabel = btn ? btn.textContent : null;
  if (btn) btn.textContent = 'Loading…';

  try {
    const res = await fetch(`./data/snapshots/${snapshotFile}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    _activeProjects      = data.projects;
    _activeSnapshotId    = snapId;
    _activeSnapshotRaw   = data.raw || null;
    _activeSnapshotLabel = new Date(data.timestamp).toLocaleString(undefined,
      { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

    // Restore button label before toggling active state
    if (btn && originalLabel) btn.textContent = originalLabel;

    document.querySelectorAll('.snap-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.snapId === snapId));

    closeSidebar();
    renderDiagram(_activeProjects, openSidebar);
    showSnapshotBanner(data.timestamp);
  } catch (err) {
    console.error('Failed to load snapshot:', err);
    // Restore button label on error
    if (btn && originalLabel) btn.textContent = originalLabel;
  }
}

/** Exits snapshot mode, restoring live PROJECTS data and re-rendering the diagram. */
function exitSnapshotMode() {
  _activeProjects    = PROJECTS;
  _activeSnapshotId  = null;
  document.querySelectorAll('.snap-btn').forEach(b => b.classList.remove('active'));
  closeSidebar();
  renderDiagram(PROJECTS, openSidebar);
  hideSnapshotBanner();
}

/**
 * Shows the snapshot mode banner inside #header with timestamp and action buttons.
 * Creates the banner element on first call; reuses it on subsequent calls.
 *
 * @param {string} timestamp - ISO timestamp string from snapshot data.
 */
function showSnapshotBanner(timestamp) {
  // Create banner inside header if it doesn't exist yet
  const header = document.getElementById('header');
  let banner = document.getElementById('snapshot-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'snapshot-banner';
    if (header) header.appendChild(banner);
  }
  const label = new Date(timestamp).toLocaleString(undefined,
    { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  banner.innerHTML = `
    <span>Viewing sync from <strong>${sanitize(label)}</strong></span>
    <span class="snap-banner-actions">
      <button class="snap-banner-btn" data-snap-restore>Overwrite current with this version</button>
      <button class="snap-banner-btn snap-banner-exit" data-snap-exit>← Back to live</button>
    </span>
  `;
  banner.style.display = 'flex';
}

/** Hides the snapshot banner (does not remove it from DOM). */
function hideSnapshotBanner() {
  const banner = document.getElementById('snapshot-banner');
  if (banner) banner.style.display = 'none';
}

/** Shows the restore confirmation modal with passkey gate. */
function showRestoreModal() {
  // Use ensureElement to create modal in body only once
  const modal = ensureElement('snap-restore-modal', 'div', 'body');
  if (!modal) return;
  modal.innerHTML = `
    <div class="srm-inner">
      <div class="srm-title">Restore this version?</div>
      <div class="srm-body">This will overwrite the current <code>data/projects.js</code> with the <strong>${sanitize(_activeSnapshotLabel)}</strong> sync version. Enter passkey to download and replace.</div>
      <input id="srm-passkey" class="srm-input" type="password" placeholder="Passkey" maxlength="10" autocomplete="off">
      <div class="srm-error" id="srm-error"></div>
      <div class="srm-btns">
        <button class="srm-confirm" data-srm-confirm>Download &amp; Restore</button>
        <button class="srm-dismiss" data-srm-close>Cancel</button>
      </div>
    </div>
  `;
  modal.classList.add('visible');
  // Small delay to allow the DOM to paint before focusing
  setTimeout(() => document.getElementById('srm-passkey')?.focus(), 50);
}

/**
 * Validates the passkey and, if correct, triggers a download of projects.js
 * and a pruned index.json for the selected snapshot.
 *
 * Prune logic: drops all snapshot index entries newer than the restored
 * snapshot (i.e. those at indices 0..(restoredPos-1)), keeping the restored
 * version as the most recent entry. This prevents "future" snapshots from
 * appearing in history after a rollback.
 */
function attemptRestore() {
  const input = document.getElementById('srm-passkey');
  const errEl = document.getElementById('srm-error');
  if (!input) return;

  // Guard: snapshot index must be loaded before restore is attempted.
  // _snapshotIndex is populated by renderSnapshotBar() which is async; if it
  // hasn't resolved yet (e.g. slow network), we can't compute the pruned index.
  if (_snapshotIndex.length === 0) {
    if (errEl) errEl.textContent = 'Snapshot index not loaded — refresh and try again.';
    return;
  }

  // Passkey gate — compare against PASSKEY constant
  if (input.value !== PASSKEY) {
    if (errEl) errEl.textContent = 'Incorrect passkey.';
    input.value = '';
    input.classList.add('srm-shake');
    setTimeout(() => input.classList.remove('srm-shake'), 400);
    return;
  }

  // Passkey correct — trigger downloads
  if (_activeSnapshotRaw) {
    /** Helper: triggers a browser download of `content` as `filename`. */
    const dlFile = (content, filename, mime) => {
      const blob = new Blob([content], { type: mime });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = filename; a.click();
      URL.revokeObjectURL(url);
    };

    // 1. Download the raw projects.js from the chosen snapshot
    dlFile(_activeSnapshotRaw, 'projects.js', 'text/javascript');

    // 2. Prune index: keep only the restored snapshot + all older entries
    //    restoredPos is the array index; entries before it are "newer" (most-recent-first order)
    const restoredPos  = _snapshotIndex.findIndex(s => s.id === _activeSnapshotId);
    const prunedIndex  = restoredPos >= 0 ? _snapshotIndex.slice(restoredPos) : _snapshotIndex;
    dlFile(JSON.stringify(prunedIndex, null, 2), 'index.json', 'application/json');

    const modal = document.getElementById('snap-restore-modal');
    if (modal) {
      const newer = restoredPos > 0 ? restoredPos : 0;
      modal.querySelector('.srm-inner').innerHTML = `
        <div class="srm-title srm-success">2 files downloaded</div>
        <div class="srm-body">
          Place both files in your ops-hub repo:<br><br>
          · <code>projects.js</code> → <code>data/projects.js</code><br>
          · <code>index.json</code> → <code>data/snapshots/index.json</code><br><br>
          ${newer > 0 ? `This removes ${newer} newer version${newer > 1 ? 's' : ''} from history. ` : ''}Push via GitHub Desktop to apply.
        </div>
        <div class="srm-btns"><button class="srm-dismiss" data-srm-close>Done</button></div>
      `;
    }
  } else {
    // Snapshot was created before the raw field was added to the sync format
    const errEl2 = document.getElementById('srm-error');
    if (errEl2) errEl2.textContent = 'Raw file not in this snapshot. Re-run a sync to generate a restorable version.';
  }
}

// ── Sync Status ───────────────────────────────────────────────────────────────

/**
 * Fetches the last commit to data/projects.js from the public GitHub API
 * and updates the pill with how long ago it was updated.
 *
 * No auth token required — works on any public repo.
 * Green: updated within 3 days. Yellow: 3–7 days. Red: older than 7 days.
 */
async function fetchSyncStatus() {
  const el = document.getElementById('sync-status');
  if (!el) return;
  try {
    const res = await fetch(SYNC_STATUS_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const commits = await res.json();
    if (!Array.isArray(commits) || commits.length === 0) throw new Error('No commits found');

    const updated = new Date(commits[0].commit.committer.date);
    const elapsed = Date.now() - updated.getTime();
    const mins    = Math.floor(elapsed / 60000);
    const hours   = Math.floor(elapsed / 3600000);
    const days    = Math.floor(elapsed / 86400000);

    let cls, label;
    if (elapsed < STALE_WARN_MS) {
      cls   = 'sync-ok';
      label = mins < 60 ? `Last synced ${mins}m ago` : `Last synced ${hours}h ago`;
    } else if (elapsed < STALE_CRIT_MS) {
      cls   = 'sync-warn';
      label = `Last synced ${days}d ago`;
    } else {
      cls   = 'sync-err';
      label = `Last synced ${days}d ago — due for a sync`;
    }

    el.className = `sync-pill ${cls}`;
    const labelEl = el.querySelector('.sync-label');
    if (labelEl) labelEl.textContent = label;
    el.title = `projects.js last committed: ${updated.toLocaleString()} · ${sanitize(commits[0].commit.message)}`;
  } catch {
    el.className = 'sync-pill sync-warn';
    const labelEl = el.querySelector('.sync-label');
    if (labelEl) labelEl.textContent = 'Status unavailable';
    el.title = 'Could not reach GitHub API — check your connection.';
  }
}

// Auto-refresh sync status every SYNC_INTERVAL_MS.
// Intentionally at module top level (not inside DOMContentLoaded) — this is fine
// because the module only loads once per page lifecycle. There is no unmount cycle
// in this static SPA, so there is no interval leak risk.
setInterval(fetchSyncStatus, SYNC_INTERVAL_MS);

// ── CSA Tag Popover ───────────────────────────────────────────────────────────

/**
 * Returns the #csa-popover element, creating and appending it to <body> if needed.
 * @returns {HTMLElement}
 */
function getOrCreatePopover() {
  let el = document.getElementById('csa-popover');
  if (!el) {
    el = document.createElement('div');
    el.id = 'csa-popover';
    el.setAttribute('role', 'tooltip');
    document.body.appendChild(el);
  }
  return el;
}

/**
 * Positions and shows the CSA tag popover next to the clicked tag button.
 * Keeps the popover within the viewport horizontally.
 *
 * @param {HTMLElement} tag  - The .csa-tag button that was clicked.
 * @param {Object}      data - Decoded CSA entry object (id, label, text, fulfilled?, group?).
 */
function showPopover(tag, data) {
  const pop = getOrCreatePopover();
  const statusLine = data.fulfilled != null
    ? `<div class="pop-status ${data.fulfilled ? 'pop-fulfilled' : ''}">${data.fulfilled ? 'Fulfilled' : 'Open'}</div>`
    : (data.group ? `<div class="pop-group">${sanitize(data.group)}</div>` : '');
  pop.innerHTML = `
    <div class="pop-id">${sanitize(data.id)}</div>
    <div class="pop-label">${sanitize(data.label)}</div>
    ${statusLine}
    <div class="pop-text">${sanitize(data.text || '')}</div>
  `;
  pop.classList.add('visible');

  // Position below the tag, clamped to viewport right edge
  const rect = tag.getBoundingClientRect();
  const pw   = pop.offsetWidth || 300;
  let left   = rect.left + window.scrollX;
  if (left + pw > window.innerWidth - 12) left = window.innerWidth - pw - 12;
  pop.style.left = `${Math.max(8, left)}px`;
  pop.style.top  = `${rect.bottom + window.scrollY + 6}px`;
}

/** Hides the CSA tag popover. */
function hidePopover() {
  const pop = document.getElementById('csa-popover');
  if (pop) pop.classList.remove('visible');
}

// ── Event delegation ──────────────────────────────────────────────────────────

/**
 * Single delegated click handler for the entire document.
 * Handles: progress panel buttons, snapshot buttons, snapshot banner actions,
 * restore modal, CSA tag popovers, sidebar close, and sync refresh.
 */
document.addEventListener('click', (e) => {
  // Progress panel tab buttons
  const progBtn = e.target.closest('.prog-btn');
  if (progBtn) { openProgressPanel(progBtn.dataset.prog); return; }
  if (e.target.closest('[data-prog-close]')) { closeProgressPanel(); return; }

  // Snapshot version history buttons
  const snapBtn = e.target.closest('.snap-btn');
  if (snapBtn) { viewSnapshot(snapBtn.dataset.snapFile, snapBtn.dataset.snapId); return; }
  if (e.target.closest('[data-snap-exit]'))    { exitSnapshotMode(); return; }
  if (e.target.closest('[data-snap-restore]')) { showRestoreModal(); return; }
  if (e.target.closest('[data-srm-confirm]'))  { attemptRestore(); return; }
  if (e.target.closest('[data-srm-close]')) {
    document.getElementById('snap-restore-modal')?.classList.remove('visible'); return;
  }

  // CSA tag chip — toggle popover on click
  const tag = e.target.closest('.csa-tag');
  if (tag) {
    e.stopPropagation();
    const pop = document.getElementById('csa-popover');
    // Toggle: clicking the same tag while popover is visible closes it
    if (pop?.classList.contains('visible') && pop._lastTag === tag) {
      hidePopover();
      pop._lastTag = null;
    } else {
      try {
        // data-csa is stored as percent-encoded JSON to safely handle any characters
        showPopover(tag, JSON.parse(decodeURIComponent(tag.dataset.csa)));
      } catch {
        // Silently ignore malformed tag data
      }
      if (pop) pop._lastTag = tag;
    }
    return;
  }

  // Clicking anywhere else closes the popover
  hidePopover();

  const el = e.target.closest('[data-action]');
  if (!el) return;
  if (el.dataset.action === 'close-sidebar') closeSidebar();
  if (el.dataset.action === 'refresh-sync')  fetchSyncStatus();
});

// ── Keyboard shortcuts ────────────────────────────────────────────────────────

document.addEventListener('keydown', (e) => {
  // Escape: close modal first, then sidebar
  if (e.key === 'Escape') {
    const modal = document.getElementById('snap-restore-modal');
    if (modal?.classList.contains('visible')) { modal.classList.remove('visible'); return; }
    closeSidebar();
  }
  // Enter while passkey field is focused triggers restore attempt
  // Guard: only fire if the restore modal is actually open (visible class present)
  if (e.key === 'Enter' && document.activeElement?.id === 'srm-passkey' &&
      document.getElementById('snap-restore-modal')?.classList.contains('visible')) {
    attemptRestore();
  }
});

// Redraw arrows on scroll and resize (uses _activeProjects so it works in snapshot mode)
window.addEventListener('scroll', () => drawArrows(_activeProjects), { passive: true });
window.addEventListener('resize', () => drawArrows(_activeProjects), { passive: true });

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderProgressSection();
  renderSnapshotBar();
  renderDiagram(PROJECTS, openSidebar);
  fetchSyncStatus();
});
