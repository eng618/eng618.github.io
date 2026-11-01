'use client';

import { useEffect, useRef } from 'react';

import { TableOfContentsList } from '@/components/table-of-contents';

const ACTIVE_LINK = 'nav[aria-label="Table of contents"] a.text-primary';

/** Keep the highlighted heading inside the sidebar without scrolling the page. */
function revealActiveLink(aside: HTMLElement) {
  const active = aside.querySelector<HTMLAnchorElement>(ACTIVE_LINK);
  if (!active) {
    return;
  }

  const asideRect = aside.getBoundingClientRect();
  const linkRect = active.getBoundingClientRect();
  const padding = 32;
  let nextTop = aside.scrollTop;

  if (linkRect.top < asideRect.top + padding) {
    nextTop -= asideRect.top + padding - linkRect.top;
  } else if (linkRect.bottom > asideRect.bottom - padding) {
    nextTop += linkRect.bottom - (asideRect.bottom - padding);
  } else {
    return;
  }

  aside.scrollTo({ top: Math.max(0, nextTop), behavior: 'smooth' });
}

/**
 * Sticky "On this page" column. The list scrolls inside the viewport instead of
 * painting past the article and over the footer, and follows the active heading.
 */
export function OnThisPage() {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) {
      return;
    }

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => revealActiveLink(aside));
    };

    schedule();
    const observer = new MutationObserver(schedule);
    observer.observe(aside, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <aside
      ref={asideRef}
      className="sticky top-16 hidden max-h-[calc(100vh-4rem)] w-60 shrink-0 self-start overflow-y-auto overscroll-y-contain py-12 lg:block xl:w-64"
    >
      <div className="flex flex-col gap-4">
        <h2 className="font-outfit text-sm font-semibold tracking-wider uppercase">On this page</h2>
        <TableOfContentsList className="text-sm" />
      </div>
    </aside>
  );
}
