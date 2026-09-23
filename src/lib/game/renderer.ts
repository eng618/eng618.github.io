import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/lib/game/constants';
import type { GameState } from '@/lib/game/types';

export function drawGame(ctx: CanvasRenderingContext2D, state: GameState, highScore: number) {
  const now = Date.now();
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (state.isGameOver) {
    drawGameOver(ctx, state.score, highScore, state.level.level);
    return;
  }

  // Background title
  ctx.fillStyle = 'rgba(0, 255, 0, 0.15)';
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(
    `LINTER INVADERS LV${String(state.level.level).padStart(2, '0')} - TERMINAL DEFENSE PROTOCOL`,
    CANVAS_WIDTH / 2,
    25,
  );

  // Player (blinks while invulnerable)
  const invulnerable = now < state.player.invulnerableUntil;
  const blinkOn = Math.floor(now / 150) % 2 === 0;
  if (!invulnerable || blinkOn) {
    ctx.fillStyle = '#00FF00';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('>', state.player.x, state.player.y);
  }

  // Shield ring
  if (state.player.shield) {
    ctx.save();
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(state.player.x, state.player.y, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // Projectiles
  ctx.fillStyle = '#00FF00';
  ctx.font = 'bold 26px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (const p of state.projectiles) {
    ctx.fillText(';', p.x, p.y);
  }

  // Enemies
  ctx.font = 'bold 26px monospace';
  for (const e of state.enemies) {
    ctx.fillStyle = e.color;
    ctx.fillText(e.type, e.x, e.y);
  }

  // Power-up pickups (gentle pulse)
  const pulse = 0.6 + 0.4 * Math.sin(now / 180);
  for (const pickup of state.pickups) {
    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.fillStyle = pickup.color;
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pickup.glyph, pickup.x, pickup.y);
    ctx.globalAlpha = 0.9;
    ctx.font = '10px monospace';
    ctx.fillText(pickup.label, pickup.x, pickup.y + 20);
    ctx.restore();
  }

  // Particles
  ctx.font = '12px monospace';
  for (const p of state.particles) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.fillStyle = p.color;
    ctx.fillText(p.char, p.x, p.y);
    ctx.restore();
  }

  drawHud(ctx, state, highScore, now);

  // Breather banner
  if (state.level.phase === 'breather') {
    drawBreather(ctx, state.level.level, state.level.lastBonus);
  }

  // Bomb flash
  if (now < state.bombFlashUntil) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function drawHud(ctx: CanvasRenderingContext2D, state: GameState, highScore: number, now: number) {
  // Top-left: score + level progress
  ctx.fillStyle = '#00FF00';
  ctx.font = '18px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Errors Resolved: ${state.score}`, 20, 20);
  ctx.fillStyle = 'rgba(0, 255, 0, 0.75)';
  ctx.font = '14px monospace';
  ctx.fillText(`LV ${state.level.level}  ${state.level.killsThisLevel}/${state.level.quota}`, 20, 44);

  // Top-right: lives + best
  const hearts = '♥'.repeat(Math.max(0, state.player.lives));
  ctx.fillStyle = '#FF5555';
  ctx.font = '18px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(hearts || '—', CANVAS_WIDTH - 20, 20);
  ctx.fillStyle = '#00FF00';
  ctx.font = '14px monospace';
  ctx.fillText(`Cleanest Build: ${highScore}`, CANVAS_WIDTH - 20, 44);

  // Bottom-left: active effects + bomb stock
  let effectY = CANVAS_HEIGHT - 24;
  ctx.textAlign = 'left';
  ctx.font = '13px monospace';

  if (now < state.player.multishotUntil) {
    const remaining = Math.ceil((state.player.multishotUntil - now) / 1000);
    ctx.fillStyle = '#22D3EE';
    ctx.fillText(`⋔ stash ${remaining}s`, 20, effectY);
    effectY -= 20;
  }
  if (now < state.player.rapidUntil) {
    const remaining = Math.ceil((state.player.rapidUntil - now) / 1000);
    ctx.fillStyle = '#FACC15';
    ctx.fillText(`≋ watch ${remaining}s`, 20, effectY);
    effectY -= 20;
  }
  if (state.player.shield) {
    ctx.fillStyle = '#60A5FA';
    ctx.fillText('◈ try/catch', 20, effectY);
    effectY -= 20;
  }
  ctx.fillStyle = state.player.bombs > 0 ? '#E879F9' : 'rgba(232, 121, 249, 0.35)';
  ctx.fillText(`✸ rm -rf x${state.player.bombs} [B]`, 20, effectY);
}

function drawBreather(ctx: CanvasRenderingContext2D, level: number, bonus: number) {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
  ctx.fillRect(0, CANVAS_HEIGHT / 2 - 90, CANVAS_WIDTH, 150);

  ctx.fillStyle = '#00FF00';
  ctx.font = 'bold 34px monospace';
  ctx.fillText(`LEVEL ${level} CLEARED`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 35);

  ctx.fillStyle = '#FACC15';
  ctx.font = 'bold 22px monospace';
  ctx.fillText(`BUILD BONUS +${bonus}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

  ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
  ctx.font = '16px monospace';
  ctx.fillText(`Deploying level ${level + 1}...`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 45);
  ctx.restore();
}

function drawGameOver(ctx: CanvasRenderingContext2D, score: number, highScore: number, level: number) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = '#FF3333';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('FATAL ERROR: Stack Overflow.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 80);

  ctx.fillStyle = '#FFAA00';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('Process exited with code 404.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);

  ctx.fillStyle = '#22D3EE';
  ctx.font = '20px monospace';
  ctx.fillText(`Survived to level ${level}.`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 10);

  ctx.fillStyle = '#00FF00';
  ctx.font = '20px monospace';

  const blink = Math.floor(Date.now() / 500) % 2 === 0;
  if (blink) {
    ctx.fillText('Press ENTER or Click to reboot compiler.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 55);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px monospace';
  ctx.fillText(`Resolved: ${score}  |  Cleanest: ${highScore}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 105);
}
