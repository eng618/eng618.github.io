export interface PlayerState {
  x: number;
  y: number;
  speed: number;
}

export interface Projectile {
  x: number;
  y: number;
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

export interface EnemyType {
  text: string;
  color: string;
  width: number;
}

export interface GameState {
  player: PlayerState;
  projectiles: Projectile[];
  enemies: Enemy[];
  particles: Particle[];
  score: number;
  isGameOver: boolean;
  lastSpawnTime: number;
  lastShootTime: number;
}

export type RebootTrigger = 'enter' | 'click';
export type LaunchTrigger = 'spacebar' | 'click';
