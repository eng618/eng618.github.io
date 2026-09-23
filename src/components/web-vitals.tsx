'use client';

import { useReportWebVitals } from 'next/web-vitals';

import { trackEvent } from '@/lib/analytics';

export function WebVitals() {
  useReportWebVitals((metric) => {
    trackEvent(`Web Vital: ${metric.name}`, {
      value: metric.name === 'CLS' ? String(Math.round(metric.value * 1000)) : String(Math.round(metric.value)),
      id: metric.id,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });
  });

  return null;
}
