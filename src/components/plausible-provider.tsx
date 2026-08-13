'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

// Extend window interface to support Plausible custom types safely
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function PlausibleProvider() {
  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      return;
    }

    // Dynamically load and initialize Plausible to avoid SSR issues during Next.js prerendering
    const initPlausible = async () => {
      try {
        const { init, track } = await import('@plausible-analytics/tracker');

        // Initialize Plausible
        init({
          domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'garciaericn.com',
          endpoint: process.env.NEXT_PUBLIC_PLAUSIBLE_ENDPOINT || 'https://stats.garciaericn.com/api/event',
          autoCapturePageviews: true,
          formSubmissions: true,
          outboundLinks: true,
          fileDownloads: true,
          customProperties: () => ({
            page_title: document.querySelector('h1')?.textContent || document.title,
          }),
        });

        // Set global window.plausible for custom events across components
        window.plausible = (eventName, options) => {
          track(eventName, options || {});
        };

        // 1. Theme Change Tracking (via MutationObserver on <html> class list)
        let currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const observer = new MutationObserver(() => {
          const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          if (newTheme !== currentTheme) {
            currentTheme = newTheme;
            trackEvent('Theme Change', { theme: newTheme });
          }
        });

        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ['class'],
        });

        // 2. Global Interaction Event Delegation
        const handleGlobalClick = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          const anchor = target.closest('a');

          if (!anchor) {
            return;
          }

          const href = anchor.getAttribute('href') || '';
          const text = anchor.textContent?.trim() || '';

          // Track digital badge verification clicks
          if (href.includes('credly.com')) {
            trackEvent('Badge Verification Click', {
              badge_title: text,
              url: href,
            });
          }

          // Track certificate views/downloads
          const isLocalPdf = href.includes('/coursera/') && href.endsWith('.pdf');
          const isVerificationLink =
            href.includes('coursera.org/verify') || href.includes('lynda.com') || href.includes('udemy');

          if (isLocalPdf || isVerificationLink) {
            trackEvent('Certificate View', {
              course_title: text,
              type: isLocalPdf ? 'PDF Download/View' : 'Official Verification',
              url: href,
            });
          }

          // Track external social and repository clicks
          if (href.startsWith('http') && !href.includes(window.location.hostname)) {
            trackEvent('Outbound Link Click', {
              target_url: href,
              link_text: text,
            });
          }
        };

        document.addEventListener('click', handleGlobalClick);

        return () => {
          observer.disconnect();
          document.removeEventListener('click', handleGlobalClick);
        };
      } catch (error) {
        console.error('Failed to initialize Plausible Analytics:', error);
      }
    };

    const cleanupPromise = initPlausible();

    return () => {
      cleanupPromise.then((cleanup) => {
        if (cleanup) {
          cleanup();
        }
      });
    };
  }, []);

  return null;
}
