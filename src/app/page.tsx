import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Button } from '@/components/ui-wrapper';
import { ArrowRight, BookOpen, Briefcase, Code } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />

        {/* Featured Sections Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold font-outfit">Portfolio</h3>
                <p className="mb-6 text-muted-foreground">
                  Explore my professional journey, system architectures, and major projects.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/portfolio">
                    View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold font-outfit">Code Notes</h3>
                <p className="mb-6 text-muted-foreground">
                  Cheat sheets and technical reference materials for various programming languages.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/code-notes">
                    Read Code Notes <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card/50 p-8 backdrop-blur-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold font-outfit">Education</h3>
                <p className="mb-6 text-muted-foreground">
                  Lifelong learning journey including degrees, specialized certifications, and courses.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
