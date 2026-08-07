'use client';

import { CertCard } from '@/components/cert-card';
import { CertLightbox } from '@/components/cert-lightbox';
import certsData from '@/data/certs.json';
import { Suspense, useState } from 'react';

function CertsGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certsData.map((cert, idx) => (
          <CertCard key={cert.title} cert={cert} onOpenLightbox={() => setSelectedIndex(idx)} />
        ))}
      </div>

      <CertLightbox
        items={certsData}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={(index) => setSelectedIndex(index)}
      />
    </>
  );
}

function CertsGridFallback() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`skeleton-${i}`}
          className="border-border bg-card flex h-[350px] animate-pulse flex-col rounded-xl border"
        >
          <div className="bg-muted/20 aspect-[4/3] w-full rounded-t-xl" />
          <div className="flex-grow space-y-4 p-6">
            <div className="bg-muted h-6 w-3/4 rounded" />
            <div className="bg-muted h-4 w-1/2 rounded" />
            <div className="mt-auto space-y-2">
              <div className="bg-muted h-3 w-full rounded" />
              <div className="bg-muted h-3 w-5/6 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CertsSection() {
  return (
    <section className="bg-muted/5 py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-outfit mb-4 text-3xl font-bold">Professional Certifications</h2>
        <p className="text-muted-foreground mb-12">
          Verified specializations and comprehensive educational programs. Click any certificate for full gallery view.
        </p>
        <Suspense fallback={<CertsGridFallback />}>
          <CertsGrid />
        </Suspense>
      </div>
    </section>
  );
}
