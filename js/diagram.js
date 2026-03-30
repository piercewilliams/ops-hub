/**
 * diagram.js — renders the tier rows, project cards, and SVG dependency arrows.
 *
 * Purpose:
 *   Owns all DOM construction for the main diagram pane. Receives a projects map
 *   and a click handler from app.js; produces card elements in tier rows and
 *   draws bezier-curve SVG arrows between dependent cards.
 *
 * Key exports:
 *   renderDiagram(projects, onCardClick) — full re-render of #tiers-container
 *   drawArrows(projects)                 — re-draw SVG arrows only (called on scroll/resize)
 *
 * Static dependency note:
 *   TIERS is imported from data/projects.js. It defines the ordered tier list
 *   used to group and label project cards. If a new tier is added to projects.js,
 *   it will appear automatically here without code changes.
 */

// NOTE: TIERS is a static dependency — tier order and labels come from projects.js
import { TIERS } from '../data/projects.js';

/** Human-readable labels for project status values — used in card status badges. */
const STATUS_LABELS = {
  'in-progress':  'In progress',
  'blocked':      'Blocked',
  'not-started':  'Not started',
  'hold':         'Hold',
  'done':         'Done',
};

/**
 * Fully re-renders the #tiers-container with tier rows and project cards,
 * then schedules SVG arrow drawing after two animation frames (to allow layout).
 *
 * @param {Object}   projects    - Map of project id → project object (PROJECTS or snapshot data).
 * @param {Function} onCardClick - Callback invoked with the project object when a card is clicked.
 */
export function renderDiagram(projects, onCardClick) {
  const container = document.getElementById('tiers-container');
  container.innerHTML = '';

  // Render each tier row in tier order
  for (const tier of TIERS) {
    const tierProjects = Object.values(projects).filter(p => p.tier === tier.id);
    if (!tierProjects.length) continue;

    const row = document.createElement('div');
    row.className = `tier-row${tier.id === 0 ? ' tier-hold' : ''}`;
    row.dataset.tier = tier.id;

    // Tier label column (badge, name, description)
    const label = document.createElement('div');
    label.className = 'tier-label';
    label.innerHTML = `
      <div class="tier-badge">${tier.id === 0 ? '⏸' : `T${tier.id}`}</div>
      <div class="tier-name">${tier.name}</div>
      <div class="tier-desc">${tier.desc}</div>
    `;
    row.appendChild(label);

    // Cards grid — sorted by project num (numeric, handles decimals like '3.5')
    const cards = document.createElement('div');
    cards.className = 'tier-cards';

    const sorted = [...tierProjects].sort((a, b) => parseFloat(a.num) - parseFloat(b.num));

    for (const project of sorted) {
      const card = renderCard(project, onCardClick);
      cards.appendChild(card);
    }

    row.appendChild(cards);
    container.appendChild(row);
  }

  // Two rAF passes: first lets the browser calculate layout, second reads positions
  requestAnimationFrame(() => requestAnimationFrame(() => drawArrows(projects)));
}

/**
 * Creates and returns a single project card element.
 * Attaches a click listener that invokes onCardClick with the project object.
 *
 * @param {Object}   project     - Project data object.
 * @param {Function} onCardClick - Click handler.
 * @returns {HTMLElement}
 */
function renderCard(project, onCardClick) {
  const card = document.createElement('div');
  card.className = `card status-${project.status}`;
  card.dataset.id = project.id;

  const blockerCount = project.blockers?.length ?? 0;
  const hasBlockers  = blockerCount > 0;

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

/**
 * Clears and redraws all SVG dependency arrows in #arrows-svg.
 * Called after renderDiagram completes (via rAF) and on scroll/resize.
 *
 * Arrow style:
 *   - Cubic bezier from the bottom-center of the upstream card to the
 *     top-center of the downstream card.
 *   - Blocked dependencies use a red stroke; others use a muted grey.
 *   - Coordinates are viewport-relative (SVG is fixed, so no scroll offset needed).
 *
 * @param {Object} projects - Map of project id → project object.
 */
export function drawArrows(projects) {
  const svg = document.getElementById('arrows-svg');
  if (!svg) return;

  // Reset SVG contents; re-define arrowhead markers
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

      // Viewport-relative coordinates — SVG is position:fixed so no scroll offset needed
      const fromX = fromRect.left + fromRect.width  / 2;
      const fromY = fromRect.bottom;
      const toX   = toRect.left  + toRect.width   / 2;
      const toY   = toRect.top;

      // Cubic bezier control points: curve bows gently between the two cards
      const dy   = toY - fromY;
      const cp1Y = fromY + dy * 0.4;
      const cp2Y = toY   - dy * 0.4;

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
