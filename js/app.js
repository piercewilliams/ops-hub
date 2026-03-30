// app.js — entry point: wires up diagram, sidebar, and event handling

import { PROJECTS, COMPLETED_TASKS } from '../data/projects.js';
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
  `;
}

// ── Progress Section ──────────────────────────────────────────────────────────

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

  const nextTasks = getNextTasks(5);
  const recentTasks = (COMPLETED_TASKS || []).slice(0, 5);
  const completedProjects = Object.values(PROJECTS)
    .filter(p => p.status === 'done')
    .sort((a, b) => (b.completedDate || '').localeCompare(a.completedDate || ''))
    .slice(0, 5);

  const empty = (cols) =>
    `<tr><td colspan="${cols}" class="pt-empty">Nothing here yet</td></tr>`;

  el.innerHTML = `
    <div class="progress-tables">
      <div class="progress-col">
        <div class="progress-col-title">Recently completed tasks</div>
        <table class="progress-table">
          <thead><tr><th>Date</th><th>Task</th><th>Project</th></tr></thead>
          <tbody>${recentTasks.length ? recentTasks.map(t =>
            `<tr><td class="pt-date">${t.date}</td><td class="pt-task">${t.task}</td><td class="pt-proj">${t.project}</td></tr>`
          ).join('') : empty(3)}</tbody>
        </table>
      </div>
      <div class="progress-col">
        <div class="progress-col-title">Up next — by priority</div>
        <table class="progress-table">
          <thead><tr><th>Task</th><th>Project</th></tr></thead>
          <tbody>${nextTasks.length ? nextTasks.map(t =>
            `<tr><td class="pt-task">${t.task}</td><td class="pt-proj">#${t.project.num} ${t.project.name}</td></tr>`
          ).join('') : empty(2)}</tbody>
        </table>
      </div>
      <div class="progress-col">
        <div class="progress-col-title">Completed projects</div>
        <table class="progress-table">
          <thead><tr><th>Date</th><th>Project</th></tr></thead>
          <tbody>${completedProjects.length ? completedProjects.map(p =>
            `<tr><td class="pt-date">${p.completedDate || '—'}</td><td class="pt-task">#${p.num} ${p.name}</td></tr>`
          ).join('') : empty(2)}</tbody>
        </table>
      </div>
    </div>
  `;
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

document.addEventListener('click', (e) => {
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
