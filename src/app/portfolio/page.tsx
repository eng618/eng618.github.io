import { BadgeCard } from '@/components/badge-card';
import { CertCard } from '@/components/cert-card';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import badgesData from '@/data/badges.json';
import certsData from '@/data/certs.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';

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
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(cert);
  return acc;
}, {});

const categories = Object.keys(groupedCerts).sort();

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <section className="border-border border-b py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-outfit mb-4 text-4xl font-bold lg:text-5xl">Portfolio</h1>
            <p className="text-muted-foreground max-w-2xl text-xl">
              A collection of architectural solutions, mobile applications, and professional certifications.
            </p>
          </div>
        </section>

        {/* Digital Badges */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-outfit mb-4 text-3xl font-bold">Digital Badges</h2>
            <p className="text-muted-foreground mb-12">Verified professional achievements and skills from IBM.</p>
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
            <h2 className="font-outfit mb-12 text-3xl font-bold">Featured Projects</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="border-border bg-card overflow-hidden">
                <div className="relative aspect-video">
                  <div className="bg-muted/20 absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground italic">Memory Vault Preview</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-outfit text-2xl font-bold">Memory Vault</CardTitle>
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
            <h2 className="font-outfit mb-4 text-3xl font-bold">Certifications</h2>
            <p className="text-muted-foreground mb-12">
              A record of completed courses from Lynda.com and other platforms.
            </p>

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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
