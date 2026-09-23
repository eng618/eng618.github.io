import { expect, test } from 'vitest';

import { BREATHER_MS, MAX_BOMBS, SCORE_PER_KILL, bonusForLevel } from '@/lib/game/constants';
import { applyPickup, createGameState, detonateBomb, tryShoot, updateGame, type MoveInput } from '@/lib/game/engine';
import { getLevelConfig, PLATEAU_LEVEL } from '@/lib/game/levels';

const IDLE_INPUT: MoveInput = { left: false, right: false, firing: false, useMouse: false };

function vulnerable(state: ReturnType<typeof createGameState>) {
  state.player.invulnerableUntil = 0;
  return state;
}

function noSpawns(state: ReturnType<typeof createGameState>, now: number) {
  state.lastSpawnTime = now;
  return state;
}

test('shoot respects cooldown, rapid-fire shortens it', () => {
  const state = createGameState(1000);
  expect(tryShoot(state, 1000)).toBe(true);
  expect(tryShoot(state, 1100)).toBe(false);
  expect(tryShoot(state, 1300)).toBe(true);

  state.player.rapidUntil = 6000;
  state.lastShootTime = 5000;
  expect(tryShoot(state, 5050)).toBe(false);
  expect(tryShoot(state, 5100)).toBe(true);
});

test('multishot fires a 3-way spread', () => {
  const state = createGameState(0);
  state.player.multishotUntil = 60_000;
  expect(tryShoot(state, 1000)).toBe(true);
  expect(state.projectiles).toHaveLength(3);
  const vxs = state.projectiles.map((p) => p.vx).toSorted((a, b) => a - b);
  expect(vxs[0]).toBeLessThan(0);
  expect(vxs[1]).toBe(0);
  expect(vxs[2]).toBeGreaterThan(0);
});

test('kill scores and progresses the level quota into a breather', () => {
  const now = 10_000;
  const state = noSpawns(vulnerable(createGameState(now)), now);
  const quota = state.level.quota;
  state.level.killsThisLevel = quota - 1;

  state.enemies.push({ x: state.player.x, y: state.player.y - 30, type: 'x', color: '#fff', speed: 0, width: 20 });
  state.projectiles.push({ x: state.player.x, y: state.player.y - 30, vx: 0, vy: 0 });

  const cleared: Array<{ level: number; bonus: number; score: number }> = [];
  updateGame(state, IDLE_INPUT, { onLevelClear: (level, bonus, score) => cleared.push({ level, bonus, score }) }, now);

  expect(state.level.phase).toBe('breather');
  expect(state.level.breatherUntil).toBe(now + BREATHER_MS);
  expect(state.score).toBe(SCORE_PER_KILL + bonusForLevel(1));
  expect(cleared).toHaveLength(1);
  expect(cleared[0].level).toBe(1);

  // Breather ends → next level starts in combat with a fresh quota.
  updateGame(state, IDLE_INPUT, {}, now + BREATHER_MS + 1);
  expect(state.level.level).toBe(2);
  expect(state.level.phase).toBe('combat');
  expect(state.level.killsThisLevel).toBe(0);
  expect(state.level.quota).toBe(getLevelConfig(2).quota);
});

test('difficulty plateaus instead of spiraling forever', () => {
  const plateau = getLevelConfig(PLATEAU_LEVEL);
  const far = getLevelConfig(PLATEAU_LEVEL + 50);
  expect(far.spawnIntervalMs).toBe(plateau.spawnIntervalMs);
  expect(far.enemySpeed).toBe(plateau.enemySpeed);
  expect(far.quota).toBe(plateau.quota);
  expect(far.maxOnscreen).toBeLessThanOrEqual(6);
});

test('spawner stops once the quota is covered by kills + on-screen enemies', () => {
  const now = 20_000;
  const state = noSpawns(vulnerable(createGameState(now)), now);
  state.level.killsThisLevel = state.level.quota;
  state.lastSpawnTime = 0; // long overdue — still must not spawn
  updateGame(state, IDLE_INPUT, {}, now);
  expect(state.enemies).toHaveLength(0);
});

test('bottom leak costs a life and clears the field, not the run', () => {
  const now = 30_000;
  const state = noSpawns(vulnerable(createGameState(now)), now);
  state.enemies.push({ x: 400, y: 595, type: 'x', color: '#fff', speed: 5, width: 20 });

  let lost = -1;
  let over = 0;
  updateGame(state, IDLE_INPUT, { onLifeLost: (l) => (lost = l), onGameOver: () => over++ }, now);

  expect(lost).toBe(2);
  expect(over).toBe(0);
  expect(state.isGameOver).toBe(false);
  expect(state.enemies).toHaveLength(0);
  expect(state.player.invulnerableUntil).toBe(now + 2000);
  expect(state.player.x).toBe(400); // reset to center
});

test('final life lost ends the run', () => {
  const now = 40_000;
  const state = noSpawns(vulnerable(createGameState(now)), now);
  state.player.lives = 1;
  state.enemies.push({ x: 400, y: 595, type: 'x', color: '#fff', speed: 5, width: 20 });

  let over = 0;
  updateGame(state, IDLE_INPUT, { onGameOver: () => over++ }, now);
  expect(over).toBe(1);
  expect(state.isGameOver).toBe(true);
});

test('shield absorbs a player collision without losing a life', () => {
  const now = 50_000;
  const state = noSpawns(vulnerable(createGameState(now)), now);
  state.player.shield = true;
  state.enemies.push({ x: state.player.x, y: state.player.y, type: 'x', color: '#fff', speed: 0, width: 20 });

  updateGame(state, IDLE_INPUT, {}, now);
  expect(state.player.shield).toBe(false);
  expect(state.player.lives).toBe(3);
  expect(state.enemies).toHaveLength(0);
  expect(state.isGameOver).toBe(false);
});

test('invulnerability lets enemies pass through the player', () => {
  const now = 60_000;
  const state = noSpawns(createGameState(now), now);
  state.player.invulnerableUntil = now + 5000;
  state.enemies.push({ x: state.player.x, y: state.player.y, type: 'x', color: '#fff', speed: 0, width: 20 });

  updateGame(state, IDLE_INPUT, {}, now);
  expect(state.player.lives).toBe(3);
  expect(state.enemies).toHaveLength(1);
});

test('bomb clears the field for full kill value and spends stock', () => {
  const now = 70_000;
  const state = noSpawns(vulnerable(createGameState(now)), now);
  state.player.bombs = 2;
  for (let i = 0; i < 3; i++) {
    state.enemies.push({ x: 100 + i * 100, y: 100, type: 'x', color: '#fff', speed: 0, width: 20 });
  }

  let bombed = -1;
  const spent = detonateBomb(state, { onBomb: (remaining) => (bombed = remaining) }, now);
  expect(spent).toBe(true);
  expect(bombed).toBe(1);
  expect(state.enemies).toHaveLength(0);
  expect(state.score).toBe(3 * SCORE_PER_KILL);
  expect(state.level.killsThisLevel).toBe(3);
  expect(state.bombFlashUntil).toBeGreaterThan(now);
});

test('bomb with empty stock is a no-op', () => {
  const state = createGameState(0);
  state.player.bombs = 0;
  expect(detonateBomb(state, {}, 1000)).toBe(false);
});

test('pickup catch applies its effect', () => {
  const now = 80_000;
  const state = noSpawns(vulnerable(createGameState(now)), now);
  state.pickups.push({
    x: state.player.x,
    y: state.player.y,
    kind: 'rapid',
    glyph: '~',
    color: '#fff',
    label: '',
    vy: 0,
  });

  const kinds: string[] = [];
  updateGame(state, IDLE_INPUT, { onPowerUp: (k) => kinds.push(k) }, now);
  expect(kinds).toEqual(['rapid']);
  expect(state.pickups).toHaveLength(0);
  expect(state.player.rapidUntil).toBeGreaterThan(now);
});

test('bomb pickups respect the stock cap', () => {
  const state = createGameState(0);
  state.player.bombs = MAX_BOMBS;
  applyPickup(state, 'bomb', 1000);
  expect(state.player.bombs).toBe(MAX_BOMBS);

  state.player.bombs = 0;
  applyPickup(state, 'bomb', 1000);
  expect(state.player.bombs).toBe(1);
});
