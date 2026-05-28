import { CertCard } from '@/components/cert-card';
import certsData from '@/data/certs.json';
import { Suspense } from 'react';

function CertsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certsData.map((cert) => (
        <CertCard key={cert.title} cert={cert} />
      ))}
    </div>
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
        <p className="text-muted-foreground mb-12">Verified specializations and comprehensive educational programs.</p>
        <Suspense fallback={<CertsGridFallback />}>
          <CertsGrid />
        </Suspense>
      </div>
    </section>
  );
}
