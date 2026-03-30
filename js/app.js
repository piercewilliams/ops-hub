// app.js — entry point: wires up diagram, sidebar, and event handling

import { PROJECTS, COMPLETED_TASKS } from '../data/projects.js';
import { CSA_LINKS } from '../data/csa-links.js';
import { renderDiagram, drawArrows } from './diagram.js';

// ── Sidebar ───────────────────────────────────────────────────────────────────

function openSidebar(project) {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('sidebar-content');

  content.innerHTML = buildSidebarHTML(project);
  sidebar.classList.add('open');

  // Highlight the active card
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
  const card = document.querySelector(`.card[data-id="${project.id}"]`);
  if (card) card.classList.add('active');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
}

const STATUS_LABELS = {
  'in-progress': 'In progress',
  'blocked':     'Blocked',
  'not-started': 'Not started',
  'hold':        'Hold',
  'done':        'Done',
};

const TIER_NAMES = { 0: 'Hold', 1: 'Tier 1 — Foundation', 2: 'Tier 2 — Understanding',
  3: 'Tier 3 — Strategy & Schema', 4: 'Tier 4 — Build', 5: 'Tier 5 — Optimize & Extend' };

function buildSidebarHTML(p) {
  const blockerHTML = p.blockers?.length
    ? `<div class="sb-section"><div class="sb-section-title sb-blockers-title">⚠ Blockers</div><ul class="sb-list sb-list-blockers">${p.blockers.map(b => `<li>${b}</li>`).join('')}</ul></div>`
    : '';

  const actionsHTML = p.nextActions?.length
    ? `<div class="sb-section"><div class="sb-section-title">Next Actions</div><ul class="sb-list sb-list-actions">${p.nextActions.map(a => `<li>${a}</li>`).join('')}</ul></div>`
    : '';

  const depsHTML = p.dependsOn?.length
    ? `<div class="sb-section"><div class="sb-section-title">Depends On</div><div class="sb-deps">${p.dependsOn.map(id => {
        const dep = PROJECTS[id];
        return dep ? `<span class="sb-dep-tag">#${dep.num} ${dep.name}</span>` : '';
      }).join('')}</div></div>`
    : '';

  const unlocksHTML = (() => {
    const unlocks = Object.values(PROJECTS).filter(proj => proj.dependsOn?.includes(p.id));
    return unlocks.length
      ? `<div class="sb-section"><div class="sb-section-title">Unlocks</div><div class="sb-deps">${unlocks.map(u => `<span class="sb-dep-tag sb-dep-unlocks">#${u.num} ${u.name}</span>`).join('')}</div></div>`
      : '';
  })();

  const systemsHTML = p.systems?.length
    ? `<div class="sb-section"><div class="sb-section-title">Systems</div><table class="sb-systems-table">${p.systems.map(s => `<tr><td class="sys-name">${s.name}</td><td><span class="sys-status sys-${s.status}">${s.status}</span></td><td class="sys-note">${s.note}</td></tr>`).join('')}</table></div>`
    : '';

  const adaptersHTML = p.adapters?.length
    ? `<div class="sb-section"><div class="sb-section-title">Adapters</div><table class="sb-systems-table">${p.adapters.map(a => `<tr><td class="sys-name">${a.name}</td><td><span class="sys-status sys-${a.status.replace('-creds','').replace('-creds','')}">${a.status}</span></td><td class="sys-note">${a.note}</td></tr>`).join('')}</table></div>`
    : '';

  const agendaHTML = p.alignmentAgendaItems?.length
    ? `<div class="sb-section"><div class="sb-section-title">Alignment Meeting Agenda</div><ul class="sb-list">${p.alignmentAgendaItems.map(i => `<li>${i}</li>`).join('')}</ul></div>`
    : '';

  const contactsHTML = p.contacts?.length
    ? `<div class="sb-section"><div class="sb-section-title">Key Contacts</div><ul class="sb-list">${p.contacts.map(c => `<li><strong>${c.name}</strong>${c.email ? ` &lt;${c.email}&gt;` : ''} — ${c.role}</li>`).join('')}</ul></div>`
    : '';

  const linksHTML = p.links?.length
    ? `<div class="sb-section"><div class="sb-section-title">Links</div><ul class="sb-list sb-list-links">${p.links.map(l => `<li><a href="${l.url}" target="_blank" rel="noopener">${l.label}</a></li>`).join('')}</ul></div>`
    : '';

  const csaData = CSA_LINKS[p.id];
  const csaHTML = (() => {
    if (!csaData) return '';
    const rows = [];
    if (csaData.pain?.length) {
      rows.push(`<div class="csa-row"><span class="csa-row-label">Pain</span><span class="csa-tags">${
        csaData.pain.map(e => `<button class="csa-tag csa-tag-pain" data-csa='${JSON.stringify(e)}' title="${e.label}">${e.id}</button>`).join('')
      }</span></div>`);
    }
    if (csaData.requests?.length) {
      rows.push(`<div class="csa-row"><span class="csa-row-label">Requests</span><span class="csa-tags">${
        csaData.requests.map(e => `<button class="csa-tag csa-tag-req${e.fulfilled ? ' csa-fulfilled' : ''}" data-csa='${JSON.stringify(e)}' title="${e.label}">${e.id}</button>`).join('')
      }</span></div>`);
    }
    if (csaData.metrics?.length) {
      rows.push(`<div class="csa-row"><span class="csa-row-label">Metrics</span><span class="csa-tags">${
        csaData.metrics.map(e => `<button class="csa-tag csa-tag-metric" data-csa='${JSON.stringify(e)}' title="${e.label}">${e.id}</button>`).join('')
      }</span></div>`);
    }
    return rows.length ? `<div class="sb-section"><div class="sb-section-title">CSA Dashboard</div>${rows.join('')}</div>` : '';
  })();

  return `
    <div class="sb-header">
      <div class="sb-num">#${p.num}</div>
      <h2 class="sb-title">${p.name}</h2>
      <div class="sb-meta">
        <span class="status-badge status-${p.status}">${STATUS_LABELS[p.status] ?? p.status}</span>
        <span class="sb-tier">${TIER_NAMES[p.tier] ?? ''}</span>
      </div>
      <div class="sb-owner">👤 ${p.owner}</div>
    </div>
    <div class="sb-description">${p.description}</div>
    ${p.status_detail ? `<div class="sb-status-detail">ℹ ${p.status_detail}</div>` : ''}
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

let _progressData = { next: [], recent: [], projects: [] };
let _activeProgressPanel = null;

function getNextTasks(limit = 5) {
  const statusRank = { 'in-progress': 0, 'not-started': 1, 'blocked': 2 };
  return Object.values(PROJECTS)
    .filter(p => p.nextActions?.length && p.status !== 'done' && p.status !== 'hold')
    .sort((a, b) => {
      const sr = (statusRank[a.status] ?? 3) - (statusRank[b.status] ?? 3);
      return sr !== 0 ? sr : a.tier - b.tier;
    })
    .slice(0, limit)
    .map(p => ({ task: p.nextActions[0], project: p }));
}

function renderProgressSection() {
  const el = document.getElementById('progress-section');
  if (!el) return;

  _progressData.next     = getNextTasks(5);
  _progressData.recent   = (COMPLETED_TASKS || []).slice(0, 5);
  _progressData.projects = Object.values(PROJECTS)
    .filter(p => p.status === 'done')
    .sort((a, b) => (b.completedDate || '').localeCompare(a.completedDate || ''))
    .slice(0, 5);

  el.innerHTML = `
    <div id="progress-bar">
      <button class="prog-btn" data-prog="next">
        Up next <span class="prog-count">${_progressData.next.length}</span>
      </button>
      <button class="prog-btn" data-prog="recent">
        Recently done <span class="prog-count">${_progressData.recent.length}</span>
      </button>
      <button class="prog-btn" data-prog="projects">
        Completed projects <span class="prog-count">${_progressData.projects.length}</span>
      </button>
    </div>
  `;

  // Inject panel into body once
  if (!document.getElementById('progress-panel')) {
    const panel = document.createElement('div');
    panel.id = 'progress-panel';
    panel.innerHTML = `
      <div id="progress-panel-header">
        <span id="progress-panel-title"></span>
        <button id="progress-panel-close" data-prog-close>✕</button>
      </div>
      <div id="progress-panel-body"></div>
    `;
    document.body.appendChild(panel);
  }
}

function openProgressPanel(type) {
  const panel = document.getElementById('progress-panel');
  const title = document.getElementById('progress-panel-title');
  const body  = document.getElementById('progress-panel-body');
  if (!panel) return;

  // Toggle off if same panel clicked again
  if (_activeProgressPanel === type && panel.classList.contains('open')) {
    closeProgressPanel(); return;
  }
  _activeProgressPanel = type;

  // Update active button state
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
              <div class="pp-task">${t.task}</div>
              <div class="pp-meta">#${t.project.num} ${t.project.name}
                <span class="status-badge status-${t.project.status} pp-badge">${STATUS_LABELS[t.project.status] ?? t.project.status}</span>
              </div>
            </div>
          </div>`).join('')
      : '<div class="pp-empty">No next actions defined yet.</div>';

  } else if (type === 'recent') {
    const items = _progressData.recent;
    body.innerHTML = items.length
      ? items.map(t => `
          <div class="pp-item">
            <div class="pp-date">${t.date}</div>
            <div class="pp-body">
              <div class="pp-task">${t.task}</div>
              <div class="pp-meta">${t.project}</div>
            </div>
          </div>`).join('')
      : '<div class="pp-empty">No completed tasks logged yet.<br>Tasks are added here when you tell Claude something is done.</div>';

  } else if (type === 'projects') {
    const items = _progressData.projects;
    body.innerHTML = items.length
      ? items.map(p => `
          <div class="pp-item">
            <div class="pp-date">${p.completedDate || '—'}</div>
            <div class="pp-body">
              <div class="pp-task">#${p.num} ${p.name}</div>
              <div class="pp-meta">${TIER_NAMES[p.tier] ?? ''}</div>
            </div>
          </div>`).join('')
      : '<div class="pp-empty">No completed projects yet.</div>';
  }

  panel.classList.add('open');
}

function closeProgressPanel() {
  const panel = document.getElementById('progress-panel');
  if (panel) panel.classList.remove('open');
  document.querySelectorAll('.prog-btn').forEach(b => b.classList.remove('active'));
  _activeProgressPanel = null;
}

// ── Sync Status ───────────────────────────────────────────────────────────────

const SYNC_STATUS_URL = 'https://api.github.com/repos/piercewilliams/ops-hub/contents/sync-status.json';
// Schedule: 8am, 12pm, 5pm Dallas CDT (Mon–Fri). Max daytime gap = 5h; overnight = 15h.
const STALE_WARN_MS = 5.5 * 60 * 60 * 1000;  // 5.5h — just over one sync interval
const STALE_CRIT_MS = 16  * 60 * 60 * 1000;  // 16h — covers overnight, flags missed daytime runs

async function fetchSyncStatus() {
  const el = document.getElementById('sync-status');
  if (!el) return;
  try {
    const res = await fetch(SYNC_STATUS_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const json = JSON.parse(atob(data.content));
    const syncTime   = new Date(json.last_sync_utc);
    const elapsed    = Date.now() - syncTime.getTime();
    const mins       = Math.floor(elapsed / 60000);
    const hours      = (elapsed / 3600000).toFixed(1);
    const isWeekend  = [0, 6].includes(new Date().getDay());

    let cls, label;
    if (json.status === 'push_failed') {
      cls   = 'sync-err';
      label = `Sync auth error — push failed ${mins}m ago`;
    } else if (elapsed < STALE_WARN_MS) {
      cls   = 'sync-ok';
      label = `Synced ${mins}m ago`;
    } else if (isWeekend || elapsed < STALE_CRIT_MS) {
      cls   = 'sync-warn';
      label = isWeekend ? `Weekend — last sync ${hours}h ago` : `Sync due — last seen ${hours}h ago`;
    } else {
      cls   = 'sync-err';
      label = `Sync offline — last seen ${hours}h ago`;
    }

    el.className = `sync-pill ${cls}`;
    el.querySelector('.sync-label').textContent = label;
    el.title = `Last sync: ${syncTime.toLocaleString()} · Status: ${json.status} · Changes: ${json.changes}`;
  } catch {
    el.className = 'sync-pill sync-warn';
    el.querySelector('.sync-label').textContent = 'Pending — first sync not yet run';
    el.title = 'sync-status.json not yet written. Check claude.ai/code/scheduled for run status.';
  }
}

// Auto-refresh every 5 minutes
setInterval(fetchSyncStatus, 5 * 60 * 1000);

// ── Event delegation ──────────────────────────────────────────────────────────

// ── CSA Tag Popover ───────────────────────────────────────────────────────────

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

function showPopover(tag, data) {
  const pop = getOrCreatePopover();
  const statusLine = data.fulfilled != null
    ? `<div class="pop-status ${data.fulfilled ? 'pop-fulfilled' : ''}">${data.fulfilled ? 'Fulfilled' : 'Open'}</div>`
    : (data.group ? `<div class="pop-group">${data.group}</div>` : '');
  pop.innerHTML = `
    <div class="pop-id">${data.id}</div>
    <div class="pop-label">${data.label}</div>
    ${statusLine}
    <div class="pop-text">${data.text || ''}</div>
  `;
  pop.classList.add('visible');

  const rect = tag.getBoundingClientRect();
  const pw = pop.offsetWidth || 300;
  let left = rect.left + window.scrollX;
  if (left + pw > window.innerWidth - 12) left = window.innerWidth - pw - 12;
  pop.style.left = `${Math.max(8, left)}px`;
  pop.style.top  = `${rect.bottom + window.scrollY + 6}px`;
}

function hidePopover() {
  const pop = document.getElementById('csa-popover');
  if (pop) pop.classList.remove('visible');
}

document.addEventListener('click', (e) => {
  // Progress panel buttons
  const progBtn = e.target.closest('.prog-btn');
  if (progBtn) { openProgressPanel(progBtn.dataset.prog); return; }
  if (e.target.closest('[data-prog-close]')) { closeProgressPanel(); return; }

  const tag = e.target.closest('.csa-tag');
  if (tag) {
    e.stopPropagation();
    const pop = document.getElementById('csa-popover');
    if (pop?.classList.contains('visible') && pop._lastTag === tag) {
      hidePopover();
      pop._lastTag = null;
    } else {
      try { showPopover(tag, JSON.parse(tag.dataset.csa)); } catch {}
      if (pop) pop._lastTag = tag;
    }
    return;
  }
  hidePopover();
  const el = e.target.closest('[data-action]');
  if (!el) return;
  if (el.dataset.action === 'close-sidebar') closeSidebar();
  if (el.dataset.action === 'refresh-sync')  fetchSyncStatus();
});

// Close sidebar on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});

// Redraw arrows on scroll and resize
window.addEventListener('scroll', () => drawArrows(PROJECTS), { passive: true });
window.addEventListener('resize', () => drawArrows(PROJECTS), { passive: true });

// ── Boot ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderProgressSection();
  renderDiagram(PROJECTS, openSidebar);
  fetchSyncStatus();
});
