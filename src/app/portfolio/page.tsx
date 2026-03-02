import { BadgesSection } from '@/components/badges-section';
import { CertsSection } from '@/components/certs-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';

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
        <BadgesSection />

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
        <CertsSection />
      </main>
      <Footer />
    </div>
  );
}
