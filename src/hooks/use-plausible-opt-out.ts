import { useCallback } from 'react';

const PLAUSIBLE_IGNORE_KEY = 'plausible_ignore';

export function usePlausibleOptOut() {
  const isOptedOut = useCallback((): boolean => {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage.getItem(PLAUSIBLE_IGNORE_KEY) === 'true';
  }, []);

  const optOut = useCallback((): void => {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(PLAUSIBLE_IGNORE_KEY, 'true');
  }, []);

  const optIn = useCallback((): void => {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(PLAUSIBLE_IGNORE_KEY);
  }, []);

  const toggleOptOut = useCallback((): void => {
    if (isOptedOut()) {
      optIn();
    } else {
      optOut();
    }
  }, [isOptedOut, optIn, optOut]);

  return { isOptedOut, optOut, optIn, toggleOptOut };
}
