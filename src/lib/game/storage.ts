import { HIGH_SCORE_KEY } from '@/lib/game/constants';

export function loadHighScore(): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  try {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? Number.parseInt(saved, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score: number) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
  } catch {
    // Private mode / quota — high score just won't persist.
  }
}
