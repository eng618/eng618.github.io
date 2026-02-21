'use client';

import { useEffect, useState } from 'react';

type CodeTheme = 'light' | 'dark';

const THEME_KEY = 'gv-code-theme';
const EVENT_NAME = 'gv-code-theme-change';

interface ThemeChangeEvent extends CustomEvent {
  detail: CodeTheme;
}

export function useCodeTheme() {
  const [theme, setTheme] = useState<CodeTheme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as CodeTheme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setMounted(true);

    const handleSync = (e: Event) => {
      if (e instanceof StorageEvent) {
        if (e.key === THEME_KEY) {
          const nextTheme = e.newValue as CodeTheme;
          if (nextTheme) {
            setTheme(nextTheme);
          }
        }
      } else if (e.type === EVENT_NAME) {
        const nextTheme = (e as ThemeChangeEvent).detail;
        if (nextTheme) {
          setTheme(nextTheme);
        }
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener(EVENT_NAME, handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener(EVENT_NAME, handleSync);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: nextTheme }));
  };

  return { theme, toggleTheme, mounted };
}
