import { CertCard } from '@/components/cert-card';
import { CertSkeleton } from '@/components/cert-skeleton';
import certsData from '@/data/certs.json';
import { Suspense } from 'react';

interface Certificate {
  category: string;
  certificateNumber?: string;
  course: string;
  url: string;
  completed: string;
  authority: string;
  length: string | null;
}

function CertsGrid() {
  const groupedCerts = certsData.reduce((acc: Record<string, Certificate[]>, cert: Certificate) => {
    const category = cert.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cert);
    return acc;
  }, {});

  const categories = Object.keys(groupedCerts).sort();

  return (
    <div className="space-y-16">
      {categories.map((category) => (
        <div key={category}>
          <h3 className="text-primary mb-6 flex items-center gap-4 text-xl font-semibold">
            <span className="bg-border h-px flex-grow" />
            {category}
            <span className="bg-border h-px flex-grow" />
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groupedCerts[category].map((cert) => (
              <CertCard key={cert.certificateNumber || cert.course} cert={cert} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CertsGridFallback() {
  // Show 8 skeleton loaders
  const skeletonCount = 8;
  return (
    <div className="space-y-16">
      <div>
        <h3 className="text-primary mb-6 flex items-center gap-4 text-xl font-semibold">
          <span className="bg-border h-px flex-grow" />
          <span className="h-4 w-24">{/* skeleton placeholder for category name */}</span>
          <span className="bg-border h-px flex-grow" />
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <CertSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CertsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-outfit mb-4 text-3xl font-bold">Certifications</h2>
        <p className="text-muted-foreground mb-12">A record of completed courses from Lynda.com and other platforms.</p>

        <Suspense fallback={<CertsGridFallback />}>
          <CertsGrid />
        </Suspense>
      </div>
    </section>
  );
}
