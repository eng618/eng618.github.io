import { BEST_LEVEL_KEY, HIGH_SCORE_KEY } from '@/lib/game/constants';

function loadNumber(key: string): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  try {
    const saved = localStorage.getItem(key);
    return saved ? Number.parseInt(saved, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function saveNumber(key: string, value: number) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, value.toString());
  } catch {
    // Private mode / quota — value just won't persist.
  }
}

export function loadHighScore(): number {
  return loadNumber(HIGH_SCORE_KEY);
}

export function saveHighScore(score: number) {
  saveNumber(HIGH_SCORE_KEY, score);
}

export function loadBestLevel(): number {
  return loadNumber(BEST_LEVEL_KEY);
}

export function saveBestLevel(level: number) {
  saveNumber(BEST_LEVEL_KEY, level);
}
