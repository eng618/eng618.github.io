'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import { MILESTONE_SCORE } from '@/lib/game/constants';
import { SoundSynth } from '@/lib/game/sound';
import { loadHighScore, saveHighScore } from '@/lib/game/storage';
import type { LaunchTrigger, RebootTrigger } from '@/lib/game/types';

export function useLinterInvaders() {
  const [gameActive, setGameActive] = useState(false);
  const [highScore, setHighScore] = useState(() => loadHighScore());
  const soundRef = useRef<SoundSynth | null>(null);

  const scoreRef = useRef(0);
  const isGameOverRef = useRef(false);
  const highScoreRef = useRef(highScore);

  const hasTrackedViewRef = useRef(false);
  const gameStartTimeRef = useRef(0);
  const rebootCountRef = useRef(0);
  const hasFiredShotRef = useRef(false);
  const hasTrackedMilestoneRef = useRef(false);

  useEffect(() => {
    highScoreRef.current = highScore;
  }, [highScore]);

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

  const handleKill = useCallback((score: number) => {
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
      duration_seconds: duration,
      reboot_count: rebootCountRef.current,
    });
  }, []);

  const handleReboot = useCallback((trigger: RebootTrigger) => {
    rebootCountRef.current += 1;
    gameStartTimeRef.current = Date.now();
    hasFiredShotRef.current = false;
    hasTrackedMilestoneRef.current = false;
    trackEvent('Game Reboot', { trigger });
  }, []);

  return {
    gameActive,
    highScore,
    soundRef,
    scoreRef,
    isGameOverRef,
    highScoreRef,
    launchGame,
    collapseGame,
    handleExitClick,
    handleKill,
    handleFirstShot,
    handleGameOver,
    handleReboot,
  };
}

export type LinterInvaders = ReturnType<typeof useLinterInvaders>;
