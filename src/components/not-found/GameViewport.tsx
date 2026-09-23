'use client';

import { useEffect, type ReactNode } from 'react';

interface GameViewportProps {
  active: boolean;
  highScore: number;
  onCollapse: () => void;
  children: ReactNode;
}

/**
 * Retro arcade cabinet wrapper. Idle = compact 450px preview inside the 404 card; active = expands to dominate the
 * viewport (~70vh) with bezel glow, scanlines, and an ESC/minimize affordance.
 */
export function GameViewport({ active, highScore, onCollapse, children }: GameViewportProps) {
  useEffect(() => {
    if (!active) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        onCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, onCollapse]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border bg-black transition-all duration-500 ${
        active
          ? 'h-[70vh] max-h-[800px] min-h-[520px] border-green-500/40 shadow-[0_0_50px_rgba(0,255,0,0.15)]'
          : 'h-[450px] border-green-500/20 shadow-lg'
      }`}
    >
      {active && (
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-black/70 px-4 py-2 font-mono text-xs text-green-400/80">
          <span className="tracking-widest">LINTER INVADERS // TERMINAL DEFENSE</span>
          <span className="hidden sm:inline">CLEANEST BUILD: {highScore}</span>
          <button
            type="button"
            onClick={onCollapse}
            className="cursor-pointer rounded border border-green-500/30 px-2 py-1 text-green-400 transition-colors hover:bg-green-500/10"
          >
            MINIMIZE [ESC]
          </button>
        </div>
      )}

      {children}

      {/* CRT scanlines + vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
        }}
        aria-hidden
      />
    </div>
  );
}
