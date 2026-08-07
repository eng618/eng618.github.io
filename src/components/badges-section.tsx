'use client';

import { BadgeCard } from '@/components/badge-card';
import { BadgeSkeleton } from '@/components/badge-skeleton';
import { CertLightbox } from '@/components/cert-lightbox';
import badgesData from '@/data/badges.json';
import { Suspense, useState } from 'react';

function BadgesGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {badgesData.map((badge, idx) => (
          <BadgeCard key={badge.title} badge={badge} onOpenLightbox={() => setSelectedIndex(idx)} />
        ))}
      </div>

      <CertLightbox
        items={badgesData}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={(index) => setSelectedIndex(index)}
      />
    </>
  );
}

function BadgesGridFallback() {
  const skeletonCount = 5;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <BadgeSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}

export function BadgesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-outfit mb-4 text-3xl font-bold">Digital Badges</h2>
        <p className="text-muted-foreground mb-12">
          Verified professional credentials and skills from IBM and Google. Click any badge to view in full gallery.
        </p>
        <Suspense fallback={<BadgesGridFallback />}>
          <BadgesGrid />
        </Suspense>
      </div>
    </section>
  );
}
