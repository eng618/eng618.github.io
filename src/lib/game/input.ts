import { CANVAS_HEIGHT, CANVAS_WIDTH } from '@/lib/game/constants';
import { clampPlayerX } from '@/lib/game/engine';
import type { RebootTrigger } from '@/lib/game/types';

export interface GameInputState {
  left: boolean;
  right: boolean;
  firing: boolean;
  useMouse: boolean;
}

export interface GameInputCallbacks {
  /** Direct-aim positioning from mouse/touch, already clamped. */
  onAim: (x: number) => void;
  /** Pointer/tap fired a shot (mouse aiming implied). */
  onShoot: (usingMouse: boolean) => void;
  onReboot: (trigger: RebootTrigger) => void;
  onFirstInteraction: () => void;
  isGameOver: () => boolean;
}

const GAME_KEYS = ['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD', 'Space'] as const;

function canvasPos(canvas: HTMLCanvasElement, clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: clampPlayerX(((clientX - rect.left) / rect.width) * CANVAS_WIDTH),
    y: ((clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
  };
}

/**
 * Attaches keyboard + mouse + touch controls to the game canvas. Returns the live input state (read each frame) plus a
 * detach cleanup.
 */
export function attachGameInput(canvas: HTMLCanvasElement, callbacks: GameInputCallbacks) {
  const input: GameInputState = {
    left: false,
    right: false,
    firing: false,
    useMouse: false,
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((GAME_KEYS as readonly string[]).includes(e.code)) {
      e.preventDefault();
    }
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      input.left = true;
    }
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      input.right = true;
    }
    if (e.code === 'Space') {
      input.firing = true;
    }
    if (callbacks.isGameOver() && e.code === 'Enter') {
      e.preventDefault();
      callbacks.onReboot('enter');
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
      input.left = false;
    }
    if (e.code === 'ArrowRight' || e.code === 'KeyD') {
      input.right = false;
    }
    if (e.code === 'Space') {
      input.firing = false;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    input.useMouse = true;
    callbacks.onAim(canvasPos(canvas, e.clientX, e.clientY).x);
  };

  const handleMouseDown = (e: MouseEvent) => {
    callbacks.onFirstInteraction();
    if (callbacks.isGameOver()) {
      callbacks.onReboot('click');
      return;
    }
    input.useMouse = true;
    callbacks.onAim(canvasPos(canvas, e.clientX, e.clientY).x);
    callbacks.onShoot(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    input.useMouse = true;
    if (e.touches.length > 0) {
      callbacks.onAim(canvasPos(canvas, e.touches[0].clientX, e.touches[0].clientY).x);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    callbacks.onFirstInteraction();
    if (callbacks.isGameOver()) {
      callbacks.onReboot('click');
      return;
    }
    input.useMouse = true;
    if (e.touches.length > 0) {
      callbacks.onAim(canvasPos(canvas, e.touches[0].clientX, e.touches[0].clientY).x);
      callbacks.onShoot(true);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
  canvas.addEventListener('touchstart', handleTouchStart, { passive: true });

  return {
    input,
    detach() {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
    },
  };
}
