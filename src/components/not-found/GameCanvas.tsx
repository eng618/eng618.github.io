'use client';

import { useEffect, useRef, type RefObject } from 'react';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/lib/game/constants';
import { createGameState, resetGameState, tryShoot, updateGame } from '@/lib/game/engine';
import { attachGameInput } from '@/lib/game/input';
import { drawGame } from '@/lib/game/renderer';
import type { SoundSynth } from '@/lib/game/sound';
import type { RebootTrigger } from '@/lib/game/types';

interface GameCanvasProps {
  soundRef: RefObject<SoundSynth | null>;
  scoreRef: RefObject<number>;
  isGameOverRef: RefObject<boolean>;
  highScoreRef: RefObject<number>;
  onKill: (score: number) => void;
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
  scoreRef,
  isGameOverRef,
  highScoreRef,
  onKill,
  onFirstShot,
  onGameOver,
  onReboot,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const callbacksRef = useRef({ onKill, onFirstShot, onGameOver, onReboot });

  useEffect(() => {
    callbacksRef.current = { onKill, onFirstShot, onGameOver, onReboot };
  }, [onKill, onFirstShot, onGameOver, onReboot]);

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
    scoreRef.current = 0;
    isGameOverRef.current = false;

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
      onReboot: (trigger) => {
        resetGameState(state);
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
  }, [soundRef, scoreRef, isGameOverRef, highScoreRef]);

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
