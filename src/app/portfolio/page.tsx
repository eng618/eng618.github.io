'use client';

import { BadgesSection } from '@/components/badges-section';
import { CertsSection } from '@/components/certs-section';
import { CoursesSection } from '@/components/courses-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import careerData from '@/data/career.json';
import { caseStudies } from '@/data/case-studies';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { motion } from 'framer-motion';
import Link from 'next/link';

const featuredCaseStudies = caseStudies.filter((study) => study.featured);
const additionalCaseStudies = caseStudies.filter((study) => !study.featured);
const githubProjects = careerData.projects.filter((p) => p.category === 'github');

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <motion.section
          className="border-border border-b py-16 lg:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.p
              className="text-primary mb-3 text-sm font-medium tracking-wide uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Work
            </motion.p>
            <motion.h1
              className="font-outfit mb-4 text-4xl font-bold lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Selected work
            </motion.h1>
            <motion.p
              className="text-muted-foreground max-w-2xl text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Enterprise design systems, platform engineering, open source, and product experiments. Each case
              highlights the problem, what I owned, and the outcome.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button asChild>
                <a href="/resume" target="_blank" rel="noopener noreferrer">
                  View full resume
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Get in touch</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured case studies */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2
              className="font-outfit mb-4 text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Featured case studies
            </motion.h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Highest-signal work for principal and staff-level conversations.
            </p>

            <div className="space-y-8">
              {featuredCaseStudies.map((study, index) => (
                <motion.div
                  key={study.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Card className="border-border bg-card overflow-hidden">
                    <CardHeader className="border-border border-b pb-6">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          {study.company && (
                            <p className="text-primary mb-1 text-sm font-medium tracking-wide uppercase">
                              {study.company}
                            </p>
                          )}
                          <CardTitle className="font-outfit text-2xl font-bold">{study.name}</CardTitle>
                          <CardDescription className="mt-1 text-base">{study.role}</CardDescription>
                        </div>
                        {study.url && (
                          <Button variant="outline" size="sm" asChild className="shrink-0">
                            <a href={study.url} target="_blank" rel="noopener noreferrer">
                              View project
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="grid gap-8 pt-6 lg:grid-cols-2">
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-outfit text-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                            Problem
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{study.problem}</p>
                        </div>
                        <div>
                          <h3 className="font-outfit text-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                            What I did
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{study.whatIDid}</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-outfit text-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                            Results
                          </h3>
                          <ul className="text-muted-foreground space-y-2 text-sm">
                            {study.results.map((result) => (
                              <li key={result} className="flex gap-2">
                                <span className="text-primary mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full" />
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-outfit text-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {study.stack.map((tech) => (
                              <Badge key={tech} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-outfit text-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                            Takeaway
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed italic">{study.takeaway}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Additional projects */}
        <motion.section
          className="bg-muted/10 py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-outfit mb-4 text-3xl font-bold">More projects</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Tools, product experiments, and design-system foundations.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {additionalCaseStudies.map((study) => (
                <Card key={study.name} className="border-border bg-card h-full">
                  <CardHeader>
                    {study.company && (
                      <p className="text-primary mb-1 text-xs font-medium tracking-wide uppercase">{study.company}</p>
                    )}
                    <CardTitle className="font-outfit text-xl font-bold">{study.name}</CardTitle>
                    <CardDescription>{study.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{study.whatIDid}</p>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      {study.results.slice(0, 2).map((result) => (
                        <li key={result} className="flex gap-2">
                          <span className="text-primary mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {study.stack.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {study.url && (
                      <Button variant="link" asChild className="h-auto p-0">
                        <a href={study.url} target="_blank" rel="noopener noreferrer">
                          View project
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Apps & tools entry points */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="font-outfit text-xl font-bold">Apps</CardTitle>
                  <CardDescription>
                    Product experiments and shipped mobile apps — from faith-based puzzle games to platform trials.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link href="/apps">Browse apps</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardHeader>
                  <CardTitle className="font-outfit text-xl font-bold">Go projects</CardTitle>
                  <CardDescription>
                    CLI tools and learning packages built with Go for daily workflows and algorithms.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link href="/go-projects">Browse Go projects</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* GitHub Organization & Projects */}
        <motion.section
          className="bg-muted/10 py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2
              className="font-outfit mb-4 text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Open source & GitHub
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-12 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I maintain Garcia-Ventures on GitHub — design systems, tooling, and apps I use in production. Highlights
              include gvtech-design, eslint-config, and contributions to Carbon&apos;s gatsby-theme-carbon.
            </motion.p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {githubProjects.map((project) => (
                <Card key={project.name} className="border-border bg-card h-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-outfit text-xl font-bold">{project.name}</CardTitle>
                    <CardDescription>{project.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">⭐ {project.stars} stars</Badge>
                      <Badge variant="outline">🍴 {project.forks} forks</Badge>
                      <Badge variant="outline">🐛 {project.issues} issues</Badge>
                    </div>
                    <Button variant="link" asChild className="h-auto p-0">
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Credentials last */}
        <section className="border-border border-t">
          <div className="container mx-auto px-4 pt-16 lg:px-8">
            <h2 className="font-outfit mb-2 text-3xl font-bold">Credentials</h2>
            <p className="text-muted-foreground mb-4 max-w-2xl">
              Badges, certifications, and coursework that support the work above.
            </p>
          </div>
          <BadgesSection />
          <CertsSection />
          <CoursesSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}
