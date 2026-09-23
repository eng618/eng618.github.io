'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import { MILESTONE_SCORE } from '@/lib/game/constants';
import { SoundSynth } from '@/lib/game/sound';
import { loadBestLevel, loadHighScore, saveBestLevel, saveHighScore } from '@/lib/game/storage';
import type { LaunchTrigger, PowerUpKind, RebootTrigger } from '@/lib/game/types';

export function useLinterInvaders() {
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(() => loadHighScore());
  const [bestLevel, setBestLevel] = useState(() => loadBestLevel());
  const soundRef = useRef<SoundSynth | null>(null);
  /** Incremented by UI (bomb button) to request a detonation in the game loop. */
  const detonateRef = useRef(0);

  const scoreRef = useRef(0);
  const isGameOverRef = useRef(false);
  const highScoreRef = useRef(highScore);
  const bestLevelRef = useRef(bestLevel);
  const levelRef = useRef(1);

  const hasTrackedViewRef = useRef(false);
  const gameStartTimeRef = useRef(0);
  const rebootCountRef = useRef(0);
  const hasFiredShotRef = useRef(false);
  const hasTrackedMilestoneRef = useRef(false);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

  useEffect(() => {
    bestLevelRef.current = bestLevel;
  }, [bestLevel]);

  useEffect(() => {
    if (!hasTrackedViewRef.current) {
      trackEvent('404 Page View', {
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        broken_url: typeof window !== 'undefined' ? window.location.pathname : '',
      });
      hasTrackedViewRef.current = true;
    }
    soundRef.current = new SoundSynth();
  }, []);

  const launchGame = useCallback((trigger: LaunchTrigger) => {
    soundRef.current?.init();
    soundRef.current?.playReboot();
    gameStartTimeRef.current = Date.now();
    trackEvent('Game Launch', { trigger });
    setGameActive(true);
  }, []);

  const collapseGame = useCallback(() => {
    setGameActive(false);
  }, []);

  // Spacebar launches the game from the idle terminal overlay.
  useEffect(() => {
    if (gameActive) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        launchGame('spacebar');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, launchGame]);

  const handleExitClick = useCallback(
    (destination: string) => {
      trackEvent('404 Exit', {
        destination,
        played_game: gameActive ? 'true' : 'false',
      });
    },
    [gameActive],
  );

  const commitScore = useCallback((score: number) => {
    if (score >= MILESTONE_SCORE && !hasTrackedMilestoneRef.current) {
      trackEvent('Clean Build Milestone', {
        score,
        high_score: highScoreRef.current,
      });
      hasTrackedMilestoneRef.current = true;
    }
    if (score > highScoreRef.current) {
      setHighScore(score);
      saveHighScore(score);
    }
  }, []);

  const handleKill = useCallback(
    (score: number) => {
      commitScore(score);
    },
    [commitScore],
  );

  const handleLevelClear = useCallback(
    (level: number, bonus: number, score: number) => {
      levelRef.current = level + 1;
      commitScore(score);
      if (level > bestLevelRef.current) {
        setBestLevel(level);
        saveBestLevel(level);
      }
      trackEvent('Level Clear', {
        level,
        bonus,
        score,
        high_score: highScoreRef.current,
      });
    },
    [commitScore],
  );

  const handleLifeLost = useCallback((livesLeft: number) => {
    trackEvent('Life Lost', {
      lives_left: livesLeft,
      level: levelRef.current,
      score: scoreRef.current,
    });
  }, []);

  const handlePowerUp = useCallback((kind: PowerUpKind) => {
    trackEvent('Power-Up Collected', {
      kind,
      level: levelRef.current,
    });
  }, []);

  const handleBomb = useCallback(
    (remaining: number, score: number) => {
      commitScore(score);
      trackEvent('Bomb Used', {
        remaining,
        level: levelRef.current,
        score,
      });
    },
    [commitScore],
  );

  const handleFirstShot = useCallback((usingMouse: boolean) => {
    if (!hasFiredShotRef.current) {
      trackEvent('First Shot', { trigger: usingMouse ? 'click' : 'spacebar' });
      hasFiredShotRef.current = true;
    }
  }, []);

  const handleGameOver = useCallback(() => {
    const duration = Math.floor((Date.now() - gameStartTimeRef.current) / 1000);
    trackEvent('Game Over', {
      score: scoreRef.current,
      high_score: highScoreRef.current,
      level_reached: levelRef.current,
      best_level: bestLevelRef.current,
      duration_seconds: duration,
      reboot_count: rebootCountRef.current,
    });
  }, []);

  const handleReboot = useCallback((trigger: RebootTrigger) => {
    rebootCountRef.current += 1;
    gameStartTimeRef.current = Date.now();
    hasFiredShotRef.current = false;
    hasTrackedMilestoneRef.current = false;
    levelRef.current = 1;
    trackEvent('Game Reboot', { trigger });
  }, []);

  return {
    gameActive,
    highScore,
    bestLevel,
    soundRef,
    detonateRef,
    scoreRef,
    isGameOverRef,
    highScoreRef,
    launchGame,
    collapseGame,
    handleExitClick,
    handleKill,
    handleLevelClear,
    handleLifeLost,
    handlePowerUp,
    handleBomb,
    handleFirstShot,
    handleGameOver,
    handleReboot,
  };
}

export type LinterInvaders = ReturnType<typeof useLinterInvaders>;
