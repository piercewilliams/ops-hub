/**
 * national-portfolio.js
 *
 * CANONICAL SOURCE OF TRUTH — National Content Team publication portfolio.
 * Do not duplicate this file. Import from here or reference the live URL.
 *
 * Canonical URL (browser imports, cross-repo):
 *   https://piercewilliams.github.io/ops-hub/data/national-portfolio.js
 *
 * Local import (scripts within ops-hub or adjacent repos):
 *   import { PUBLICATIONS, DOMAINS } from '../ops-hub/data/national-portfolio.js';
 *
 * Use this to scope SEMrush, Amplitude, Marfeel, and other API queries
 * to only the properties relevant to Pierce's team.
 *
 * To update: edit this file in ops-hub, commit, and push. All consumers
 * automatically get the updated list on next load.
 *
 * Source: Sara Vallone tracker (Tracker Template.xlsx), extracted 2026-04-13.
 * Excludes: Life & Style, Mod Moms Club (per Sara Vallone, 2026-04-13).
 */

export const PUBLICATIONS = [
  {
    brand: 'Us Weekly',
    domain: 'usmagazine.com',
    assetPrefix: 'UW',
    verticals: ['Discover', 'Mind/Body'],
    syndication: ['Apple News', 'MSN', 'Smart News'],
  },
  {
    brand: "Woman's World",
    domain: 'womansworld.com',
    assetPrefix: 'WW',
    verticals: ['Discover', 'Everyday Life', 'Experiences', 'Mind/Body'],
    syndication: ['Apple News', 'MSN', 'Smart News'],
  },
  {
    brand: 'Miami Herald',
    domain: 'miamiherald.com',
    assetPrefix: 'MH',
    verticals: ['Discover', 'Everyday Life', 'Experiences', 'Mind/Body'],
    syndication: ['Apple News', 'Google News', 'MSN', 'Smart News'],
  },
  {
    brand: 'Kansas City Star',
    domain: 'kansascity.com',
    assetPrefix: 'KA',
    verticals: ['Discover', 'Everyday Life', 'Experiences', 'Mind/Body'],
    syndication: ['Apple News', 'Google News', 'MSN', 'Smart News'],
  },
  {
    brand: 'Charlotte Observer',
    domain: 'charlotteobserver.com',
    assetPrefix: 'CH',
    verticals: ['Discover', 'Everyday Life', 'Experiences', 'Mind/Body'],
    syndication: ['Apple News', 'Google News', 'MSN', 'Smart News'],
  },
  {
    brand: 'Fort Worth Star-Telegram',
    domain: 'star-telegram.com',
    assetPrefix: 'FO',
    verticals: ['Discover', 'Everyday Life', 'Experiences', 'Mind/Body'],
    syndication: ['Apple News', 'MSN', 'Smart News'],
  },
  {
    brand: 'Sacramento Bee',
    domain: 'sacbee.com',
    assetPrefix: 'SA',
    verticals: ['Discover', 'Everyday Life', 'Experiences', 'Mind/Body'],
    syndication: ['Google News', 'Smart News'],
  },
  {
    brand: 'Raleigh News & Observer',
    domain: 'newsobserver.com',
    assetPrefix: 'RA',
    verticals: ['Discover', 'Experiences', 'Mind/Body'],
    syndication: [],
  },
  {
    brand: 'Centre Daily Times',
    domain: 'centredaily.com',
    assetPrefix: 'CE',
    verticals: ['Discover'],
    syndication: [],
  },
  {
    brand: 'Coral Springs (FL)',
    domain: 'coralspringsflnews.com',
    assetPrefix: null,
    verticals: ['Everyday Life', 'Experiences', 'Mind/Body'],
    syndication: [],
    notes: 'Variant/child destination only.',
  },
  {
    brand: 'Miramar (FL)',
    domain: 'miramarflnews.com',
    assetPrefix: null,
    verticals: ['Everyday Life', 'Mind/Body'],
    syndication: [],
    notes: 'Variant/child destination only.',
  },
  {
    brand: 'Pembroke Pines (FL)',
    domain: 'pembrokepinesflnews.com',
    assetPrefix: null,
    verticals: ['Experiences', 'Mind/Body'],
    syndication: [],
    notes: 'Variant/child destination only.',
  },
  {
    brand: 'The State (Columbia, SC)',
    domain: 'thestate.com',
    assetPrefix: null,
    verticals: ['Discover'],
    syndication: [],
    notes: 'Minimal presence in tracker as of extraction date.',
  },
];

// Flat domain list — drop this directly into SEMrush batch queries,
// Amplitude property filters, Marfeel site selectors, etc.
export const DOMAINS = PUBLICATIONS.map(p => p.domain);

// Authors active in the tracker as of 2026-04-13.
export const AUTHORS = [
  'Allison Palmer',
  'Hanna Wickes',
  'Lauren JG',
  'Lauren Schuster',
  'Ryan Brennan',
  'Samantha Agate',
];

export const VERTICALS = ['Discover', 'Everyday Life', 'Experiences', 'Mind/Body'];

export const SYNDICATION_PLATFORMS = ['Apple News', 'Google News', 'MSN', 'Smart News'];

export const PORTFOLIO_META = {
  extractedDate: '2026-04-13',
  sourceFile: 'Sara Vallone Tracker Template.xlsx',
  excludedBrands: ['Life & Style', 'Mod Moms Club'],
};
