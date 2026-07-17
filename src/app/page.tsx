import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { caseStudies, proofMetrics, skillGroups } from '@/data/case-studies';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { ArrowRight, BookOpen, Briefcase, User } from 'lucide-react';
import Link from 'next/link';

const featuredCaseStudies = caseStudies.filter((study) => study.featured).slice(0, 3);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />

        {/* Proof metrics */}
        <section className="border-border border-y py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {proofMetrics.map((metric) => (
                <div key={metric.label} className="text-center md:text-left">
                  <p className="font-outfit text-primary text-3xl font-bold tracking-tight lg:text-4xl">
                    {metric.value}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm leading-snug">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured work */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-outfit mb-2 text-3xl font-bold">Selected work</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Enterprise design systems, platform engineering, and open source — problem, approach, and outcomes.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/portfolio">
                  View all work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {featuredCaseStudies.map((study) => (
                <Card key={study.name} className="border-border bg-card/50 flex h-full flex-col backdrop-blur-sm">
                  <CardHeader className="space-y-2">
                    {study.company && (
                      <p className="text-primary text-sm font-medium tracking-wide uppercase">{study.company}</p>
                    )}
                    <CardTitle className="font-outfit text-xl font-bold">{study.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{study.role}</p>
                  </CardHeader>
                  <CardContent className="flex flex-grow flex-col gap-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{study.problem}</p>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      {study.results.slice(0, 2).map((result) => (
                        <li key={result} className="flex gap-2">
                          <span className="text-primary mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      {study.stack.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills snapshot */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-outfit mb-2 text-3xl font-bold">Skills</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Languages, platforms, and delivery practices I use to ship systems teams can maintain.
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-outfit mb-4 text-lg font-semibold">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="secondary" className="font-normal">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation cards */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="bg-primary/20 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-outfit text-xl font-bold">Selected work</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Design systems, enterprise platforms, and open-source libraries — with outcomes, not just titles.
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link href="/portfolio">
                      View work <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="bg-primary/20 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <User className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-outfit text-xl font-bold">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Principal-level architecture at Verizon; senior full-stack and platform work at IBM.
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link href="/about">
                      About & experience <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 rounded-2xl border p-8 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                  <div className="bg-primary/20 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-outfit text-xl font-bold">Writing & notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Practical references for Git, tooling, and day-to-day engineering.
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link href="/code-notes">
                      Code notes <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-muted/30 border-border border-t py-20">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <h2 className="font-outfit mb-4 text-3xl font-bold">Let’s talk</h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
              Open to conversations about principal and staff engineering roles, design systems and platform
              architecture, technical collaboration, and mentoring.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/resume" target="_blank" rel="noopener noreferrer">
                  View resume
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
