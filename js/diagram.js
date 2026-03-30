// diagram.js — renders tier rows, project cards, and SVG dependency arrows

import { TIERS } from '../data/projects.js';

const STATUS_LABELS = {
  'in-progress':  'In progress',
  'blocked':      'Blocked',
  'not-started':  'Not started',
  'hold':         'Hold',
  'done':         'Done',
};

export function renderDiagram(projects, onCardClick) {
  const container = document.getElementById('tiers-container');
  container.innerHTML = '';

  // Render each tier row
  for (const tier of TIERS) {
    const tierProjects = Object.values(projects).filter(p => p.tier === tier.id);
    if (!tierProjects.length) continue;

    const row = document.createElement('div');
    row.className = `tier-row${tier.id === 0 ? ' tier-hold' : ''}`;
    row.dataset.tier = tier.id;

    // Tier label
    const label = document.createElement('div');
    label.className = 'tier-label';
    label.innerHTML = `
      <div class="tier-badge">${tier.id === 0 ? '⏸' : `T${tier.id}`}</div>
      <div class="tier-name">${tier.name}</div>
      <div class="tier-desc">${tier.desc}</div>
    `;
    row.appendChild(label);

    // Cards container
    const cards = document.createElement('div');
    cards.className = 'tier-cards';

    // Sort by project num (numeric, handle '3.5')
    const sorted = [...tierProjects].sort((a, b) => parseFloat(a.num) - parseFloat(b.num));

    for (const project of sorted) {
      const card = renderCard(project, onCardClick);
      cards.appendChild(card);
    }

    row.appendChild(cards);
    container.appendChild(row);
  }

  // Draw arrows after layout is complete
  requestAnimationFrame(() => requestAnimationFrame(() => drawArrows(projects)));
}

function renderCard(project, onCardClick) {
  const card = document.createElement('div');
  card.className = `card status-${project.status}`;
  card.dataset.id = project.id;

  const blockerCount = project.blockers?.length ?? 0;
  const hasBlockers = blockerCount > 0;

  card.innerHTML = `
    <div class="card-header">
      <span class="card-num">#${project.num}</span>
      ${hasBlockers ? `<span class="card-blocker-badge" title="${blockerCount} blocker${blockerCount > 1 ? 's' : ''}">⚠ ${blockerCount}</span>` : ''}
    </div>
    <div class="card-name">${project.name}</div>
    <div class="card-footer">
      <span class="status-badge status-${project.status}">${STATUS_LABELS[project.status] ?? project.status}</span>
    </div>
  `;

  card.addEventListener('click', () => onCardClick(project));
  return card;
}

export function drawArrows(projects) {
  const svg = document.getElementById('arrows-svg');
  if (!svg) return;

  // Clear and re-add defs
  svg.innerHTML = `
    <defs>
      <marker id="arrowhead" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
        <polygon points="0 0, 7 2.5, 0 5" fill="rgba(148,152,176,0.45)" />
      </marker>
      <marker id="arrowhead-blocked" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
        <polygon points="0 0, 7 2.5, 0 5" fill="rgba(248,113,113,0.5)" />
      </marker>
    </defs>
  `;

  for (const project of Object.values(projects)) {
    if (!project.dependsOn?.length) continue;

    const toCard = document.querySelector(`.card[data-id="${project.id}"]`);
    if (!toCard) continue;
    const toRect = toCard.getBoundingClientRect();

    for (const depId of project.dependsOn) {
      const fromCard = document.querySelector(`.card[data-id="${depId}"]`);
      if (!fromCard) continue;
      const fromRect = fromCard.getBoundingClientRect();

      const isBlocked = project.status === 'blocked';

      // Viewport-relative coordinates (SVG is fixed)
      const fromX = fromRect.left + fromRect.width / 2;
      const fromY = fromRect.bottom;
      const toX   = toRect.left + toRect.width / 2;
      const toY   = toRect.top;

      const dy = toY - fromY;
      const cp1Y = fromY + dy * 0.4;
      const cp2Y = toY  - dy * 0.4;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${fromX} ${fromY} C ${fromX} ${cp1Y}, ${toX} ${cp2Y}, ${toX} ${toY}`);
      path.setAttribute('stroke', isBlocked ? 'rgba(248,113,113,0.35)' : 'rgba(148,152,176,0.28)');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', isBlocked ? 'url(#arrowhead-blocked)' : 'url(#arrowhead)');
      svg.appendChild(path);
    }
  }
}
