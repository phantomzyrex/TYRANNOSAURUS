import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMyaFromScroll,
  calculateHeroParallax,
  calculateScalePercentage,
  OVERVIEW_STATS,
  DISCOVERY_TIMELINE,
  ANATOMY_HOTSPOTS,
  TREX_SPECIMENS,
  FOSSIL_LOCATIONS,
  GROWTH_STAGES,
  MYTH_CARDS,
  FAST_FACTS,
  SCIENTIFIC_SOURCES,
} from './paleoLogic';

test('calculateMyaFromScroll maps 0..1 scroll progress to 68.0..66.0 MYA accurately', () => {
  const start = calculateMyaFromScroll(0);
  assert.equal(start.mya, 68.0);
  assert.equal(start.formatted, '68.0 MYA');
  assert.equal(start.isKPgBoundary, false);

  const mid = calculateMyaFromScroll(0.5);
  assert.equal(mid.mya, 67.0);
  assert.equal(mid.formatted, '67.0 MYA');
  assert.equal(mid.isKPgBoundary, false);

  const end = calculateMyaFromScroll(1);
  assert.equal(end.mya, 66.0);
  assert.equal(end.formatted, '66.0 MYA');
  assert.equal(end.isKPgBoundary, true);

  // Clamping out-of-range inputs
  assert.equal(calculateMyaFromScroll(-0.5).mya, 68.0);
  assert.equal(calculateMyaFromScroll(2.0).mya, 66.0);
});

test('calculateHeroParallax enforces opposite direction between wordmark and creature and respects reducedMotion', () => {
  const offsets = calculateHeroParallax(1, -0.5, false);
  assert.equal(offsets.wordmark.x, 12);
  assert.equal(offsets.creature.x, -24);
  assert.equal(offsets.sunbeams.x, 40);
  assert.equal(offsets.particles.x, 60);
  assert.equal(offsets.silhouettes.x, -80);

  const reduced = calculateHeroParallax(1, 1, true);
  assert.equal(reduced.wordmark.x, 0);
  assert.equal(reduced.creature.x, 0);
  assert.equal(reduced.silhouettes.x, 0);
});

test('calculateScalePercentage computes accurate silhouette bar lengths for Sue and Scotty', () => {
  const suePct = calculateScalePercentage(TREX_SPECIMENS.sue.lengthMeters, 13.5);
  const scottyPct = calculateScalePercentage(TREX_SPECIMENS.scotty.lengthMeters, 13.5);
  assert.ok(scottyPct > suePct);
  assert.equal(calculateScalePercentage(0, 13.5), 0);
});

test('scientific datasets match all prompt specifications', () => {
  assert.equal(OVERVIEW_STATS.length, 12);
  assert.equal(DISCOVERY_TIMELINE.length, 11);
  assert.equal(ANATOMY_HOTSPOTS.length, 11);
  assert.equal(GROWTH_STAGES.length, 5);
  assert.equal(MYTH_CARDS.length, 6);
  assert.equal(FAST_FACTS.length, 8);
  assert.ok(SCIENTIFIC_SOURCES.length >= 12);

  const tentativeSites = FOSSIL_LOCATIONS.filter((l) => l.status === 'tentative');
  assert.equal(tentativeSites.length, 2); // New Mexico and Texas
});
