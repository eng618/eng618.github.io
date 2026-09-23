import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  ENEMY_TYPES,
  PLAYER_HALF_WIDTH,
  PLAYER_SPEED,
  PLAYER_Y_OFFSET,
  PROJECTILE_SPEED_Y,
  SCORE_PER_KILL,
  SHOOT_COOLDOWN_MS,
  enemySpeedForScore,
  spawnIntervalForScore,
} from '@/lib/game/constants';
import type { GameState } from '@/lib/game/types';

export interface UpdateEvents {
  onKill?: (score: number) => void;
  onGameOver?: () => void;
}

export function createGameState(now: number = Date.now()): GameState {
  return {
    player: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - PLAYER_Y_OFFSET,
      speed: PLAYER_SPEED,
    },
    projectiles: [],
    enemies: [],
    particles: [],
    score: 0,
    isGameOver: false,
    lastSpawnTime: now,
    lastShootTime: 0,
  };
}

export function resetGameState(state: GameState, now: number = Date.now()) {
  state.projectiles.length = 0;
  state.enemies.length = 0;
  state.particles.length = 0;
  state.score = 0;
  state.isGameOver = false;
  state.player.x = CANVAS_WIDTH / 2;
  state.lastSpawnTime = now;
  state.lastShootTime = 0;
}

export function clampPlayerX(x: number): number {
  return Math.max(PLAYER_HALF_WIDTH, Math.min(CANVAS_WIDTH - PLAYER_HALF_WIDTH, x));
}

/** Returns true when a projectile was actually fired (cooldown elapsed). */
export function tryShoot(state: GameState, now: number = Date.now()): boolean {
  if (state.isGameOver) {
    return false;
  }
  if (now - state.lastShootTime < SHOOT_COOLDOWN_MS) {
    return false;
  }
  state.projectiles.push({
    x: state.player.x,
    y: state.player.y - 15,
    vy: PROJECTILE_SPEED_Y,
  });
  state.lastShootTime = now;
  return true;
}

export function spawnExplosion(state: GameState, x: number, y: number, color: string) {
  const count = 5 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    const char = Math.random() > 0.5 ? '0' : '1';
    const particleColor = Math.random() > 0.4 ? '#00FF00' : color;
    state.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      char,
      color: particleColor,
      alpha: 1.0,
    });
  }
}

function spawnEnemy(state: GameState) {
  const typeIndex = Math.floor(Math.random() * ENEMY_TYPES.length);
  const type = ENEMY_TYPES[typeIndex];
  const speed = enemySpeedForScore(state.score) * (0.8 + Math.random() * 0.4);
  state.enemies.push({
    x: Math.max(40, Math.min(CANVAS_WIDTH - 40, Math.random() * CANVAS_WIDTH)),
    y: -20,
    type: type.text,
    color: type.color,
    speed,
    width: type.width,
  });
}

export interface MoveInput {
  left: boolean;
  right: boolean;
  firing: boolean;
  useMouse: boolean;
}

export function updateGame(
  state: GameState,
  input: MoveInput,
  events: UpdateEvents = {},
  now: number = Date.now(),
): void {
  if (state.isGameOver) {
    return;
  }

  // 1. Player movement (keyboard always wins when pressed, even with mouse aim)
  if (!input.useMouse || input.left || input.right) {
    if (input.left) {
      state.player.x = clampPlayerX(state.player.x - state.player.speed);
    }
    if (input.right) {
      state.player.x = clampPlayerX(state.player.x + state.player.speed);
    }
  }

  // 2. Shooting
  if (input.firing) {
    tryShoot(state, now);
  }

  // 3. Spawning (difficulty ramps with score)
  if (now - state.lastSpawnTime >= spawnIntervalForScore(state.score)) {
    spawnEnemy(state);
    state.lastSpawnTime = now;
  }

  // 4. Projectiles
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    state.projectiles[i].y += state.projectiles[i].vy;
    if (state.projectiles[i].y < 0) {
      state.projectiles.splice(i, 1);
    }
  }

  // 5. Enemies
  for (let i = state.enemies.length - 1; i >= 0; i--) {
    const enemy = state.enemies[i];
    enemy.y += enemy.speed;

    if (enemy.y >= CANVAS_HEIGHT - 20) {
      state.isGameOver = true;
      events.onGameOver?.();
      return;
    }

    if (Math.abs(enemy.x - state.player.x) < enemy.width / 2 + 15 && Math.abs(enemy.y - state.player.y) < 20) {
      state.isGameOver = true;
      events.onGameOver?.();
      return;
    }
  }

  // 6. Projectile vs enemy collisions
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const p = state.projectiles[i];
    for (let j = state.enemies.length - 1; j >= 0; j--) {
      const e = state.enemies[j];
      const hitX = Math.abs(p.x - e.x) < e.width / 2 + 10;
      const hitY = Math.abs(p.y - e.y) < 18;

      if (hitX && hitY) {
        spawnExplosion(state, e.x, e.y, e.color);
        state.projectiles.splice(i, 1);
        state.enemies.splice(j, 1);
        state.score += SCORE_PER_KILL;
        events.onKill?.(state.score);
        break;
      }
    }
  }

  // 7. Particles
  for (let i = state.particles.length - 1; i >= 0; i--) {
    const part = state.particles[i];
    part.x += part.vx;
    part.y += part.vy;
    part.alpha -= 0.03;
    if (part.alpha <= 0) {
      state.particles.splice(i, 1);
    }
  }
}
