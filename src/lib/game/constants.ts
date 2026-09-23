import type { EnemyType, PowerUpKind } from '@/lib/game/types';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const PLAYER_Y_OFFSET = 40;
export const PLAYER_SPEED = 8;
export const PLAYER_HALF_WIDTH = 20;

export const SHOOT_COOLDOWN_MS = 220;
export const RAPID_COOLDOWN_MS = 90;
export const PROJECTILE_SPEED_Y = -10;
export const PROJECTILE_SPREAD_VX = 1.6;

export const ENEMY_TYPES: EnemyType[] = [
  { text: '✗', color: '#FF3333', width: 20, speedFactor: 1.15, fastWeight: 1 },
  { text: '⚠', color: '#FFAA00', width: 20, speedFactor: 1.0, fastWeight: 0 },
  { text: '[!]', color: '#FF3333', width: 35, speedFactor: 0.9, fastWeight: 0 },
  { text: 'null', color: '#FFAA00', width: 40, speedFactor: 0.85, fastWeight: 0 },
];

export const SCORE_PER_KILL = 10;
export const MILESTONE_SCORE = 100;

export const HIGH_SCORE_KEY = 'linter_invaders_high_score';
export const BEST_LEVEL_KEY = 'linter_invaders_best_level';

// Lives & survivability
export const START_LIVES = 3;
export const START_BOMBS = 1;
export const INVULN_MS = 2000;
export const BREATHER_MS = 2500;

export function bonusForLevel(level: number): number {
  return 150 + level * 50;
}

// Power-ups
export const POWERUP_FALL_SPEED = 1.6;
export const POWERUP_CATCH_RADIUS_X = 26;
export const POWERUP_CATCH_RADIUS_Y = 26;
export const RAPID_DURATION_MS = 10_000;
export const MULTISHOT_DURATION_MS = 12_000;
export const MAX_BOMBS = 3;
export const BOMB_FLASH_MS = 180;

export const POWERUP_META: Record<PowerUpKind, { glyph: string; color: string; label: string }> = {
  multishot: { glyph: '⋔', color: '#22D3EE', label: 'git stash' },
  rapid: { glyph: '≋', color: '#FACC15', label: '--watch' },
  shield: { glyph: '◈', color: '#60A5FA', label: 'try/catch' },
  bomb: { glyph: '✸', color: '#E879F9', label: 'rm -rf' },
};

export const POWERUP_WEIGHTS: Array<{ kind: PowerUpKind; weight: number }> = [
  { kind: 'multishot', weight: 3 },
  { kind: 'rapid', weight: 3 },
  { kind: 'shield', weight: 2 },
  { kind: 'bomb', weight: 2 },
];
