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
      <main className="bg-background flex-grow pb-20">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="font-outfit mb-4 text-4xl font-bold lg:text-5xl">Apps</h1>
            <p className="text-muted-foreground max-w-2xl text-xl">A showcase of my mobile and web applications.</p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <Link key={app.slug} href={`/apps/${app.slug}`} className="group block h-full">
                  <Card className="border-border/50 bg-card/50 flex h-full flex-col backdrop-blur-sm transition-shadow hover:shadow-md">
                    <CardHeader className="flex-grow">
                      <div className="bg-primary/20 text-primary group-hover:bg-primary/30 mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <CardTitle className="font-outfit text-2xl font-bold">{app.title || app.slug}</CardTitle>
                      {app.description && (
                        <CardDescription className="line-clamp-3 pt-2 text-base leading-relaxed">
                          {app.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-primary flex items-center font-semibold">
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
