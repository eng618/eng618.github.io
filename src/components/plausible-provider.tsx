'use client';

import { useEffect } from 'react';

export function PlausibleProvider() {
  useEffect(() => {
    // Dynamically load and initialize Plausible
    const initPlausible = async () => {
      const Plausible = await import('@plausible-analytics/tracker');

      if (window.location.hostname !== 'localhost') {
        Plausible.init({
          domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'garciaericn.com',
          endpoint: process.env.NEXT_PUBLIC_PLAUSIBLE_ENDPOINT || 'https://stats.garciaericn.com/api/event',
          autoCapturePageviews: true,
          formSubmissions: true,
          outboundLinks: true,
        });
      }
    };

    initPlausible();
  }, []);

  return null;
}
