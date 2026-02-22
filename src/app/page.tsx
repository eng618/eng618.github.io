import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Button } from '@gv-tech/ui-web';
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
              <div className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm">
                <div className="bg-primary/20 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="font-outfit mb-2 text-xl font-bold">Portfolio</h3>
                <p className="text-muted-foreground mb-6">
                  Explore my professional journey, system architectures, and major projects.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/portfolio">
                    View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm">
                <div className="bg-primary/20 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="font-outfit mb-2 text-xl font-bold">Code Notes</h3>
                <p className="text-muted-foreground mb-6">
                  Cheat sheets and technical reference materials for various programming languages.
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link href="/code-notes">
                    Read Code Notes <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm">
                <div className="bg-primary/20 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="font-outfit mb-2 text-xl font-bold">Education</h3>
                <p className="text-muted-foreground mb-6">
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
