'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals(async (metric) => {
    if (typeof window === 'undefined' || window.location.hostname === 'localhost') {
      return;
    }

    try {
      // Dynamically import Plausible on the client only to avoid SSR issues
      const { track } = await import('@plausible-analytics/tracker');

      // Send the web vital metric as a custom event to Plausible
      track(`Web Vital: ${metric.name}`, {
        props: {
          value: metric.name === 'CLS' ? String(Math.round(metric.value * 1000)) : String(Math.round(metric.value)),
          id: metric.id,
          rating: metric.rating,
          navigationType: metric.navigationType,
        },
      });
    } catch (error) {
      console.error('Failed to log Web Vital to Plausible:', error);
    }
  });

  return null;
}
