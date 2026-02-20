import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-wrapper';
import { getAllContent } from '@/lib/notes';
import { ArrowRight, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function AppsIndexPage() {
  const apps = getAllContent('apps');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-background pb-20">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="mb-4 text-4xl font-bold font-outfit lg:text-5xl">Apps</h1>
            <p className="max-w-2xl text-xl text-muted-foreground">A showcase of my mobile and web applications.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <Link key={app.slug} href={`/apps/${app.slug}`} className="block h-full group">
                  <Card className="h-full transition-shadow hover:shadow-md border-border/50 bg-card/50 backdrop-blur-sm flex flex-col">
                    <CardHeader className="flex-grow">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary transition-colors group-hover:bg-primary/30">
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-2xl font-bold font-outfit">{app.title || app.slug}</CardTitle>
                      {app.description && (
                        <CardDescription className="line-clamp-3 text-base leading-relaxed pt-2">
                          {app.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center font-semibold text-primary">
                        Learn more{' '}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
