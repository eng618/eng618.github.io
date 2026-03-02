'use client';

import { useEffect, useState } from 'react';

export function useActiveHeading(selector = 'h1, h2, h3, h4, h5, h6') {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeText, setActiveText] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(selector));
    if (headings.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            setActiveText(entry.target.textContent);
          }
        });
      },
      {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0.1,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [selector]);

  return { activeId, activeText };
}
