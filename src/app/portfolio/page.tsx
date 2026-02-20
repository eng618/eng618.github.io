import { BadgeCard } from '@/components/badge-card';
import { CertCard } from '@/components/cert-card';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-wrapper';
import badgesData from '@/data/badges.json';
import certsData from '@/data/certs.json';

// Define the Certificate interface based on usage and JSON data
interface Certificate {
  category: string;
  certificateNumber?: string;
  course: string;
  url: string;
  completed: string;
  authority: string;
  length: string | null;
}

// Grouping logic
const groupedCerts = certsData.reduce((acc: Record<string, Certificate[]>, cert: Certificate) => {
  const category = cert.category || 'General';
  if (!acc[category]) acc[category] = [];
  acc[category].push(cert);
  return acc;
}, {});

const categories = Object.keys(groupedCerts).sort();

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-background pb-20">
        <section className="border-b border-border py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="mb-4 text-4xl font-bold font-outfit lg:text-5xl">Portfolio</h1>
            <p className="max-w-2xl text-xl text-muted-foreground">
              A collection of architectural solutions, mobile applications, and professional certifications.
            </p>
          </div>
        </section>

        {/* Digital Badges */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold font-outfit">Digital Badges</h2>
            <p className="mb-12 text-muted-foreground">Verified professional achievements and skills from IBM.</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {badgesData.map((badge) => (
                <BadgeCard key={badge.title} badge={badge} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="bg-muted/10 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-12 text-3xl font-bold font-outfit">Featured Projects</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="overflow-hidden border-border bg-card">
                <div className="relative aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                    <span className="text-muted-foreground italic">Memory Vault Preview</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-outfit">Memory Vault</CardTitle>
                  <CardDescription>Cross-platform cloud-synced memory app</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Keeps all your memories safe and synced between all your devices. Your memories are saved in the
                    cloud so they are always safe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold font-outfit">Certifications</h2>
            <p className="mb-12 text-muted-foreground">
              A record of completed courses from Lynda.com and other platforms.
            </p>

            <div className="space-y-16">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="mb-6 flex items-center gap-4 text-xl font-semibold text-primary">
                    <span className="h-px flex-grow bg-border" />
                    {category}
                    <span className="h-px flex-grow bg-border" />
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {groupedCerts[category].map((cert) => (
                      <CertCard key={cert.certificateNumber || cert.course} cert={cert} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
