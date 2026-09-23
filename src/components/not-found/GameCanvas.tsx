'use client';

import { useEffect, useRef, type RefObject } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/lib/game/constants';
import { createGameState, detonateBomb, resetGameState, tryShoot, updateGame } from '@/lib/game/engine';
import { attachGameInput } from '@/lib/game/input';
import { drawGame } from '@/lib/game/renderer';
import type { SoundSynth } from '@/lib/game/sound';
import type { PowerUpKind, RebootTrigger } from '@/lib/game/types';

interface GameCanvasProps {
  soundRef: RefObject<SoundSynth | null>;
  /** Counter incremented by UI to request a bomb detonation in the loop. */
  detonateRef: RefObject<number>;
  scoreRef: RefObject<number>;
  isGameOverRef: RefObject<boolean>;
  highScoreRef: RefObject<number>;
  onKill: (score: number) => void;
  onLevelClear: (level: number, bonus: number, score: number) => void;
  onLifeLost: (livesLeft: number) => void;
  onPowerUp: (kind: PowerUpKind) => void;
  onBomb: (remaining: number, score: number) => void;
  onFirstShot: (usingMouse: boolean) => void;
  onGameOver: () => void;
  onReboot: (trigger: RebootTrigger) => void;
}

/**
 * Owns the canvas element, rAF loop, input wiring, and sound effects. Analytics + high-score persistence flow out
 * through callbacks so the engine stays framework-free.
 */
export function GameCanvas({
  soundRef,
  detonateRef,
  scoreRef,
  isGameOverRef,
  highScoreRef,
  onKill,
  onLevelClear,
  onLifeLost,
  onPowerUp,
  onBomb,
  onFirstShot,
  onGameOver,
  onReboot,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const callbacksRef = useRef({
    onKill,
    onLevelClear,
    onLifeLost,
    onPowerUp,
    onBomb,
    onFirstShot,
    onGameOver,
    onReboot,
  });

  useEffect(() => {
    callbacksRef.current = { onKill, onLevelClear, onLifeLost, onPowerUp, onBomb, onFirstShot, onGameOver, onReboot };
  }, [onKill, onLevelClear, onLifeLost, onPowerUp, onBomb, onFirstShot, onGameOver, onReboot]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const state = createGameState();
    let lastDetonateSeen = detonateRef.current ?? 0;
    scoreRef.current = 0;
    isGameOverRef.current = false;

    const detonate = () => {
      const spent = detonateBomb(
        state,
        {
          onBomb: (remaining, score) => {
            scoreRef.current = score;
            callbacksRef.current.onBomb(remaining, score);
          },
          onLevelClear: (level, bonus, score) => {
            scoreRef.current = score;
            soundRef.current?.playLevelClear();
            callbacksRef.current.onLevelClear(level, bonus, score);
          },
        },
        Date.now(),
      );
      if (spent) {
        soundRef.current?.playExplosion();
      }
    };

    const { input, detach } = attachGameInput(canvas, {
      onAim: (x) => {
        state.player.x = x;
      },
      onShoot: (usingMouse) => {
        if (tryShoot(state)) {
          soundRef.current?.playShoot();
          callbacksRef.current.onFirstShot(usingMouse);
        }
      },
      onBomb: () => {
        soundRef.current?.init();
        detonate();
      },
      onReboot: (trigger) => {
        resetGameState(state);
        lastDetonateSeen = detonateRef.current ?? 0;
        scoreRef.current = 0;
        isGameOverRef.current = false;
        callbacksRef.current.onReboot(trigger);
        soundRef.current?.playReboot();
      },
      onFirstInteraction: () => {
        soundRef.current?.init();
      },
      isGameOver: () => state.isGameOver,
    });

    let animationFrameId = 0;

    const tick = () => {
      // Touch/mouse bomb button requests funnel through the same path as KeyB.
      if ((detonateRef.current ?? 0) !== lastDetonateSeen) {
        lastDetonateSeen = detonateRef.current ?? 0;
        detonate();
      }

      const projectilesBefore = state.projectiles.length;
      updateGame(
        state,
        input,
        {
          onKill: (score) => {
            scoreRef.current = score;
            soundRef.current?.playExplosion();
            callbacksRef.current.onKill(score);
          },
          onLevelClear: (level, bonus, score) => {
            scoreRef.current = score;
            soundRef.current?.playLevelClear();
            callbacksRef.current.onLevelClear(level, bonus, score);
          },
          onLifeLost: (livesLeft) => {
            isGameOverRef.current = state.isGameOver;
            soundRef.current?.playLifeLost();
            callbacksRef.current.onLifeLost(livesLeft);
          },
          onPowerUp: (kind) => {
            soundRef.current?.playPowerUp();
            callbacksRef.current.onPowerUp(kind);
          },
          onGameOver: () => {
            isGameOverRef.current = true;
            soundRef.current?.playGameOver();
            callbacksRef.current.onGameOver();
          },
        },
        Date.now(),
      );

      // Keyboard auto-fire (Space held) fires inside updateGame — count the
      // delta to trigger sound + first-shot analytics without double-counting
      // pointer shots, which are fired synchronously in onShoot above.
      if (state.projectiles.length > projectilesBefore) {
        soundRef.current?.playShoot();
        callbacksRef.current.onFirstShot(input.useMouse);
      }

      isGameOverRef.current = state.isGameOver;
      scoreRef.current = state.score;
      drawGame(ctx, state, highScoreRef.current ?? 0);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      detach();
    };
  }, [soundRef, detonateRef, scoreRef, isGameOverRef, highScoreRef]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="absolute inset-0 h-full w-full [touch-action:none] bg-black [image-rendering:pixelated]"
      aria-label="Linter Invaders game canvas"
    />
  );
}
