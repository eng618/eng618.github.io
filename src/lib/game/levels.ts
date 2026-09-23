import { ENEMY_TYPES } from '@/lib/game/constants';
import type { EnemyType } from '@/lib/game/types';

/**
 * Per-level tuning table. Difficulty ramps through PLATEAU_LEVEL and then holds forever — hard but survivable, so runs
 * end on mistakes rather than the old uncapped spawn-rate death spiral.
 */
export interface LevelConfig {
  level: number;
  /** Kills required to clear the level. */
  quota: number;
  /** Ms between spawns while in combat. */
  spawnIntervalMs: number;
  /** Base enemy fall speed (px/frame) before type/speed jitter. */
  enemySpeed: number;
  /** Max simultaneous enemies. */
  maxOnscreen: number;
  /** Chance (0-1) that a kill drops a power-up. */
  dropRate: number;
}

export const PLATEAU_LEVEL = 8;
export const LEVEL_QUOTA_BASE = 12;
export const LEVEL_QUOTA_STEP = 4;
export const LEVEL_QUOTA_MAX = 40;

export function quotaForLevel(level: number): number {
  const clamped = Math.min(Math.max(1, level), PLATEAU_LEVEL);
  return Math.min(LEVEL_QUOTA_MAX, LEVEL_QUOTA_BASE + (clamped - 1) * LEVEL_QUOTA_STEP);
}

export function getLevelConfig(level: number): LevelConfig {
  const clamped = Math.min(Math.max(1, level), PLATEAU_LEVEL);
  return {
    level,
    quota: quotaForLevel(level),
    spawnIntervalMs: Math.max(550, 1400 - clamped * 120),
    enemySpeed: Math.min(3.2, 1.5 + clamped * 0.2),
    maxOnscreen: 6,
    dropRate: 0.12,
  };
}

/**
 * Weighted enemy-type pick. Fast ✗ types get up to ~2x weight by the plateau so later levels feel twitchier without
 * changing raw speed much.
 */
export function pickEnemyType(level: number): EnemyType {
  const bias = Math.min(1, Math.max(1, level) / PLATEAU_LEVEL);
  const weights = ENEMY_TYPES.map((t) => 1 + t.fastWeight * bias);
  const total = weights.reduce((sum, w) => sum + w, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < ENEMY_TYPES.length; i++) {
    roll -= weights[i];
    if (roll <= 0) {
      return ENEMY_TYPES[i];
    }
  }
  return ENEMY_TYPES[0];
}
