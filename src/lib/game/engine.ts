import {
  BOMB_FLASH_MS,
  BREATHER_MS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INVULN_MS,
  MAX_BOMBS,
  MULTISHOT_DURATION_MS,
  PLAYER_HALF_WIDTH,
  PLAYER_SPEED,
  PLAYER_Y_OFFSET,
  POWERUP_CATCH_RADIUS_X,
  POWERUP_CATCH_RADIUS_Y,
  POWERUP_FALL_SPEED,
  POWERUP_META,
  POWERUP_WEIGHTS,
  PROJECTILE_SPEED_Y,
  PROJECTILE_SPREAD_VX,
  RAPID_COOLDOWN_MS,
  RAPID_DURATION_MS,
  SCORE_PER_KILL,
  SHOOT_COOLDOWN_MS,
  START_BOMBS,
  START_LIVES,
  bonusForLevel,
} from '@/lib/game/constants';
import { getLevelConfig, pickEnemyType } from '@/lib/game/levels';
import type { GameState, PowerUp, PowerUpKind } from '@/lib/game/types';

export interface UpdateEvents {
  onKill?: (score: number) => void;
  onLevelClear?: (level: number, bonus: number, score: number) => void;
  onLifeLost?: (livesLeft: number) => void;
  onPowerUp?: (kind: PowerUpKind) => void;
  onBomb?: (remaining: number, score: number) => void;
  onGameOver?: () => void;
}

export function createGameState(now: number = Date.now()): GameState {
  return {
    player: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - PLAYER_Y_OFFSET,
      speed: PLAYER_SPEED,
      lives: START_LIVES,
      invulnerableUntil: now + 1000,
      shield: false,
      rapidUntil: 0,
      multishotUntil: 0,
      bombs: START_BOMBS,
    },
    projectiles: [],
    enemies: [],
    pickups: [],
    particles: [],
    level: {
      level: 1,
      killsThisLevel: 0,
      quota: getLevelConfig(1).quota,
      phase: 'combat',
      breatherUntil: 0,
      lastBonus: 0,
    },
    score: 0,
    isGameOver: false,
    lastSpawnTime: now,
    lastShootTime: 0,
    bombFlashUntil: 0,
  };
}

export function resetGameState(state: GameState, now: number = Date.now()) {
  const fresh = createGameState(now);
  state.player = fresh.player;
  state.projectiles.length = 0;
  state.enemies.length = 0;
  state.pickups.length = 0;
  state.particles.length = 0;
  state.level = fresh.level;
  state.score = 0;
  state.isGameOver = false;
  state.lastSpawnTime = now;
  state.lastShootTime = 0;
  state.bombFlashUntil = 0;
}

export function clampPlayerX(x: number): number {
  return Math.max(PLAYER_HALF_WIDTH, Math.min(CANVAS_WIDTH - PLAYER_HALF_WIDTH, x));
}

function cooldownFor(state: GameState, now: number): number {
  return now < state.player.rapidUntil ? RAPID_COOLDOWN_MS : SHOOT_COOLDOWN_MS;
}

/** Returns true when projectile(s) were actually fired (cooldown elapsed). */
export function tryShoot(state: GameState, now: number = Date.now()): boolean {
  if (state.isGameOver) {
    return false;
  }
  if (now - state.lastShootTime < cooldownFor(state, now)) {
    return false;
  }
  const multishot = now < state.player.multishotUntil;
  if (multishot) {
    state.projectiles.push(
      { x: state.player.x, y: state.player.y - 15, vx: -PROJECTILE_SPREAD_VX, vy: PROJECTILE_SPEED_Y },
      { x: state.player.x, y: state.player.y - 15, vx: 0, vy: PROJECTILE_SPEED_Y },
      { x: state.player.x, y: state.player.y - 15, vx: PROJECTILE_SPREAD_VX, vy: PROJECTILE_SPEED_Y },
    );
  } else {
    state.projectiles.push({
      x: state.player.x,
      y: state.player.y - 15,
      vx: 0,
      vy: PROJECTILE_SPEED_Y,
    });
  }
  state.lastShootTime = now;
  return true;
}

/**
 * Detonates a stored rm -rf bomb: every on-screen enemy explodes for full kill value and quota progress. Returns true
 * when a bomb was spent.
 */
export function detonateBomb(state: GameState, events: UpdateEvents = {}, now: number = Date.now()): boolean {
  if (state.isGameOver || state.player.bombs <= 0) {
    return false;
  }
  state.player.bombs -= 1;
  state.bombFlashUntil = now + BOMB_FLASH_MS;
  for (const enemy of state.enemies) {
    spawnExplosion(state, enemy.x, enemy.y, enemy.color);
    state.score += SCORE_PER_KILL;
    state.level.killsThisLevel += 1;
  }
  state.enemies.length = 0;
  events.onBomb?.(state.player.bombs, state.score);
  maybeEnterBreather(state, events, now);
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

function spawnEnemy(state: GameState, config: { enemySpeed: number; level: number }) {
  const type = pickEnemyType(config.level);
  const speed = config.enemySpeed * type.speedFactor * (0.8 + Math.random() * 0.4);
  state.enemies.push({
    x: Math.max(40, Math.min(CANVAS_WIDTH - 40, Math.random() * CANVAS_WIDTH)),
    y: -20,
    type: type.text,
    color: type.color,
    speed,
    width: type.width,
  });
}

function rollPowerUpDrop(dropRate: number): PowerUpKind | null {
  if (Math.random() > dropRate) {
    return null;
  }
  const total = POWERUP_WEIGHTS.reduce((sum, w) => sum + w.weight, 0);
  let roll = Math.random() * total;
  for (const { kind, weight } of POWERUP_WEIGHTS) {
    roll -= weight;
    if (roll <= 0) {
      return kind;
    }
  }
  return POWERUP_WEIGHTS[0].kind;
}

function spawnPickup(state: GameState, x: number, y: number, kind: PowerUpKind) {
  const meta = POWERUP_META[kind];
  const pickup: PowerUp = {
    x,
    y,
    kind,
    glyph: meta.glyph,
    color: meta.color,
    label: meta.label,
    vy: POWERUP_FALL_SPEED,
  };
  state.pickups.push(pickup);
}

export function applyPickup(state: GameState, kind: PowerUpKind, now: number = Date.now()) {
  switch (kind) {
    case 'multishot':
      state.player.multishotUntil = now + MULTISHOT_DURATION_MS;
      break;
    case 'rapid':
      state.player.rapidUntil = now + RAPID_DURATION_MS;
      break;
    case 'shield':
      state.player.shield = true;
      break;
    case 'bomb':
      state.player.bombs = Math.min(MAX_BOMBS, state.player.bombs + 1);
      break;
  }
}

function clearFieldWithExplosions(state: GameState) {
  for (const enemy of state.enemies) {
    spawnExplosion(state, enemy.x, enemy.y, enemy.color);
  }
  state.enemies.length = 0;
  state.projectiles.length = 0;
}

/** A damaging hit landed: shield absorbs, otherwise lose a life (or the run). */
function loseLife(state: GameState, events: UpdateEvents, now: number) {
  clearFieldWithExplosions(state);
  state.player.lives -= 1;
  state.player.x = CANVAS_WIDTH / 2;
  events.onLifeLost?.(state.player.lives);
  if (state.player.lives <= 0) {
    state.isGameOver = true;
    events.onGameOver?.();
    return;
  }
  state.player.invulnerableUntil = now + INVULN_MS;
}

/** Destroyed by a colliding enemy while the try/catch shield holds. */
function absorbWithShield(state: GameState, index: number) {
  const enemy = state.enemies[index];
  spawnExplosion(state, enemy.x, enemy.y, enemy.color);
  state.enemies.splice(index, 1);
  state.player.shield = false;
}

function maybeEnterBreather(state: GameState, events: UpdateEvents, now: number) {
  if (state.level.phase !== 'combat' || state.level.killsThisLevel < state.level.quota) {
    return;
  }
  const bonus = bonusForLevel(state.level.level);
  state.score += bonus;
  state.level.lastBonus = bonus;
  state.level.phase = 'breather';
  state.level.breatherUntil = now + BREATHER_MS;
  // Leftover errors are auto-resolved by the passing build — spectacle only.
  clearFieldWithExplosions(state);
  events.onLevelClear?.(state.level.level, bonus, state.score);
}

function advanceLevel(state: GameState, now: number) {
  const next = state.level.level + 1;
  const config = getLevelConfig(next);
  state.level.level = next;
  state.level.killsThisLevel = 0;
  state.level.quota = config.quota;
  state.level.phase = 'combat';
  state.level.breatherUntil = 0;
  state.lastSpawnTime = now;
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

  const config = getLevelConfig(state.level.level);

  // 0. Breather phase: drift particles/pickups, then start the next level.
  if (state.level.phase === 'breather') {
    updateParticles(state);
    updatePickups(state, events, now);
    if (now >= state.level.breatherUntil) {
      advanceLevel(state, now);
    } else {
      return;
    }
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

  // 3. Spawning (combat only): capped on-screen count and level quota.
  if (
    state.enemies.length < config.maxOnscreen &&
    state.level.killsThisLevel + state.enemies.length < state.level.quota
  ) {
    if (now - state.lastSpawnTime >= config.spawnIntervalMs) {
      spawnEnemy(state, config);
      state.lastSpawnTime = now;
    }
  }

  // 4. Projectiles
  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    const p = state.projectiles[i];
    p.x += p.vx;
    p.y += p.vy;
    if (p.y < 0 || p.x < -20 || p.x > CANVAS_WIDTH + 20) {
      state.projectiles.splice(i, 1);
    }
  }

  // 5. Pickups drift down and can be caught mid-combat.
  updatePickups(state, events, now);

  // 6. Enemies
  const vulnerable = now >= state.player.invulnerableUntil;
  for (let i = state.enemies.length - 1; i >= 0; i--) {
    const enemy = state.enemies[i];
    enemy.y += enemy.speed;

    // Bottom leak: the error shipped — always costs a life.
    if (enemy.y >= CANVAS_HEIGHT - 20) {
      loseLife(state, events, now);
      return;
    }

    // Player collision: ignored while blinking, absorbed by shield.
    if (Math.abs(enemy.x - state.player.x) < enemy.width / 2 + 15 && Math.abs(enemy.y - state.player.y) < 20) {
      if (!vulnerable) {
        continue;
      }
      if (state.player.shield) {
        absorbWithShield(state, i);
        continue;
      }
      loseLife(state, events, now);
      return;
    }
  }

  // 7. Projectile vs enemy collisions
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
        state.level.killsThisLevel += 1;
        events.onKill?.(state.score);

        const drop = rollPowerUpDrop(config.dropRate);
        if (drop) {
          spawnPickup(state, e.x, e.y, drop);
        }

        maybeEnterBreather(state, events, now);
        break;
      }
    }
  }

  // 8. Particles
  updateParticles(state);
}

function updatePickups(state: GameState, events: UpdateEvents, now: number) {
  for (let i = state.pickups.length - 1; i >= 0; i--) {
    const pickup = state.pickups[i];
    pickup.y += pickup.vy;
    if (pickup.y > CANVAS_HEIGHT + 20) {
      state.pickups.splice(i, 1);
      continue;
    }
    const caught =
      Math.abs(pickup.x - state.player.x) < POWERUP_CATCH_RADIUS_X &&
      Math.abs(pickup.y - state.player.y) < POWERUP_CATCH_RADIUS_Y;
    if (caught) {
      state.pickups.splice(i, 1);
      applyPickup(state, pickup.kind, now);
      events.onPowerUp?.(pickup.kind);
    }
  }
}

function updateParticles(state: GameState) {
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
