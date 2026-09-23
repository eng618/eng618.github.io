export interface PlayerState {
  x: number;
  y: number;
  speed: number;
  lives: number;
  /** Timestamp (ms) until which collisions with the player are ignored. */
  invulnerableUntil: number;
  /** Single-hit shield from a try/catch pickup. */
  shield: boolean;
  /** Timestamp (ms) until rapid-fire (--watch) is active. */
  rapidUntil: number;
  /** Timestamp (ms) until multi-shot (git stash) is active. */
  multishotUntil: number;
  /** Stored rm -rf bombs. */
  bombs: number;
}

export interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface Enemy {
  x: number;
  y: number;
  type: string;
  color: string;
  speed: number;
  width: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  color: string;
  alpha: number;
}

export type PowerUpKind = 'multishot' | 'rapid' | 'shield' | 'bomb';

export interface PowerUp {
  x: number;
  y: number;
  kind: PowerUpKind;
  glyph: string;
  color: string;
  label: string;
  vy: number;
}

export type LevelPhase = 'combat' | 'breather';

export interface LevelState {
  level: number;
  killsThisLevel: number;
  quota: number;
  phase: LevelPhase;
  /** Timestamp (ms) when the breather ends and the next level starts. */
  breatherUntil: number;
  /** Bonus awarded for the most recently cleared level (for the banner). */
  lastBonus: number;
}

export interface EnemyType {
  text: string;
  color: string;
  width: number;
  /** Speed multiplier — higher = faster, twitchier enemy. */
  speedFactor: number;
  /** Spawn weight multiplier — scales with level for fast types. */
  fastWeight: number;
}

export interface GameState {
  player: PlayerState;
  projectiles: Projectile[];
  enemies: Enemy[];
  pickups: PowerUp[];
  particles: Particle[];
  level: LevelState;
  score: number;
  isGameOver: boolean;
  lastSpawnTime: number;
  lastShootTime: number;
  /** Timestamp (ms) until which the bomb white-flash overlay renders. */
  bombFlashUntil: number;
}

export type RebootTrigger = 'enter' | 'click';
export type LaunchTrigger = 'spacebar' | 'click';
