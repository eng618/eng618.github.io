import type { EnemyType } from '@/lib/game/types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const PLAYER_Y_OFFSET = 40;
export const PLAYER_SPEED = 8;
export const PLAYER_HALF_WIDTH = 20;

export const SHOOT_COOLDOWN_MS = 220;
export const PROJECTILE_SPEED_Y = -10;

export const ENEMY_TYPES: EnemyType[] = [
  { text: '✗', color: '#FF3333', width: 20 },
  { text: '⚠', color: '#FFAA00', width: 20 },
  { text: '[!]', color: '#FF3333', width: 35 },
  { text: 'null', color: '#FFAA00', width: 40 },
];

export const SCORE_PER_KILL = 10;
export const MILESTONE_SCORE = 100;

export const HIGH_SCORE_KEY = 'linter_invaders_high_score';

export function spawnIntervalForScore(score: number): number {
  return Math.max(350, 1500 - score * 8);
}

export function enemySpeedForScore(score: number): number {
  return 1.5 + Math.min(3.5, score * 0.006);
}
