import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/lib/game/constants';
import type { GameState } from '@/lib/game/types';

export function drawGame(ctx: CanvasRenderingContext2D, state: GameState, highScore: number) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (state.isGameOver) {
    drawGameOver(ctx, state.score, highScore);
    return;
  }

  // Background title
  ctx.fillStyle = 'rgba(0, 255, 0, 0.15)';
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('LINTER INVADERS - TERMINAL DEFENSE PROTOCOL', CANVAS_WIDTH / 2, 25);

  // Player
  ctx.fillStyle = '#00FF00';
  ctx.font = 'bold 32px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('>', state.player.x, state.player.y);

  // Projectiles
  ctx.font = 'bold 26px monospace';
  for (const p of state.projectiles) {
    ctx.fillText(';', p.x, p.y);
  }

  // Enemies
  ctx.font = 'bold 26px monospace';
  for (const e of state.enemies) {
    ctx.fillStyle = e.color;
    ctx.fillText(e.type, e.x, e.y);
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

  // HUD
  ctx.fillStyle = '#00FF00';
  ctx.font = '18px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Errors Resolved: ${state.score}`, 20, 20);

  ctx.textAlign = 'right';
  ctx.fillText(`Cleanest Build: ${highScore}`, CANVAS_WIDTH - 20, 20);
}

function drawGameOver(ctx: CanvasRenderingContext2D, score: number, highScore: number) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillStyle = '#FF3333';
  ctx.font = 'bold 36px monospace';
  ctx.fillText('FATAL ERROR: Stack Overflow.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);

  ctx.fillStyle = '#FFAA00';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('Process exited with code 404.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  ctx.fillStyle = '#00FF00';
  ctx.font = '20px monospace';

  const blink = Math.floor(Date.now() / 500) % 2 === 0;
  if (blink) {
    ctx.fillText('Press ENTER or Click to reboot compiler.', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 70);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '20px monospace';
  ctx.fillText(`Resolved: ${score}  |  Cleanest: ${highScore}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 130);
}
