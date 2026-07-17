import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { skillGroups } from '@/data/case-studies';
import { AspectRatio, Badge, Button } from '@gv-tech/ui-web';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">About</p>
                <h1 className="font-outfit mb-6 text-4xl font-bold lg:text-5xl">Eric N. Garcia</h1>
                <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
                  <p>
                    I&apos;m a Principal Engineer who still stays close to the code. My work spans React/React Native
                    design systems, cloud-native services, and operational reliability — including 24-hour security
                    response on enterprise platforms.
                  </p>
                  <p>
                    I lead technical direction without losing the details that make systems shippable: contracts, CI,
                    performance, and clear ownership.
                  </p>
                  <p>
                    Currently{' '}
                    <span className="text-foreground font-semibold">Principal Engineer – Systems Architect</span> at{' '}
                    <span className="text-foreground font-semibold">Verizon</span>, I architect multi-platform component
                    systems used by <span className="text-foreground font-semibold">7,000+</span> internal users.
                    Previously at IBM, I built Quote-to-Cash microservices, enterprise migration tooling in Go, and
                    helped maintain Carbon Design System open source.
                  </p>
                  <p>
                    I started in mobile development (B.S., Full Sail University) and still care about the full path from
                    design tokens to production code — accessibility, developer experience, and systems that hold up
                    under real load.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/portfolio">View selected work</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/resume" target="_blank" rel="noopener noreferrer">
                      View resume
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="border-border bg-card text-muted-foreground relative w-full overflow-hidden rounded-2xl border italic backdrop-blur-sm">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      src="/images/garcia_family.jpg"
                      alt="Eric Garcia and his family"
                      fill
                      className="object-cover"
                      priority
                    />
                  </AspectRatio>
                </div>
                <div className="bg-primary/20 absolute -bottom-6 -left-6 h-32 w-32 rounded-full opacity-50 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-outfit mb-12 text-3xl font-bold">Experience</h2>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground max-w-2xl">
                Impact-focused highlights. Full chronology and credentials live on the resume.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="/resume" target="_blank" rel="noopener noreferrer">
                  View full resume
                </a>
              </Button>
            </div>

            <div className="space-y-6">
              <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-outfit text-foreground text-lg font-semibold">
                      Principal Engineer – Systems Architect
                    </h3>
                    <p className="text-primary font-medium">Verizon</p>
                  </div>
                  <span className="text-muted-foreground text-sm whitespace-nowrap">Jan 2024 – Present</span>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  Lead architecture for cross-platform design systems and enterprise mobile/web experiences used by
                  thousands of internal users.
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  <li>
                    • Built a mobile design system from the ground up (shadcn/ui, React Native reusables, NativeWind),
                    aligned to brand and developer workflows.
                  </li>
                  <li>• Scaled systems to 7,000+ active users; improved prototype velocity ~40% after launch.</li>
                  <li>• Delivered an AI-powered feedback sanitization pipeline for customer and reseller comments.</li>
                  <li>
                    • Set technical roadmaps, package boundaries, and monorepo release practices (Nx, design tokens).
                  </li>
                </ul>
              </div>

              <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-outfit text-foreground text-lg font-semibold">
                      Senior Full Stack Developer (Quote to Cash)
                    </h3>
                    <p className="text-primary font-medium">IBM</p>
                  </div>
                  <span className="text-muted-foreground text-sm whitespace-nowrap">Jul 2021 – Dec 2023</span>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  Owned core sales deal microservices and reliability work on the Q2C platform.
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  <li>
                    • Built and maintained services in Go, React, and TypeScript; modernized legacy paths and improved
                    database performance.
                  </li>
                  <li>• Drove critical security fixes to production within 24 hours.</li>
                  <li>
                    • Core maintainer of open-source <code>gatsby-theme-carbon</code> (Carbon Design System) — major
                    upgrades, a11y, and global portal quality.
                  </li>
                </ul>
              </div>

              <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-outfit text-foreground text-lg font-semibold">
                      Staff Software Engineer (Migration, Analytics & API Connect)
                    </h3>
                    <p className="text-primary font-medium">IBM</p>
                  </div>
                  <span className="text-muted-foreground text-sm whitespace-nowrap">Feb 2017 – Jun 2021</span>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  Enterprise tooling and analytics for IBM API Connect.
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  <li>
                    • Designed a high-performance Go migration utility for clients moving between major API Connect
                    versions, including globalization.
                  </li>
                  <li>• Built analytics and enterprise integration endpoints for high-throughput API management.</li>
                </ul>
              </div>

              <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-outfit text-foreground text-lg font-semibold">
                      Software Engineer (MobileFirst Platform)
                    </h3>
                    <p className="text-primary font-medium">IBM</p>
                  </div>
                  <span className="text-muted-foreground text-sm whitespace-nowrap">Jul 2015 – Feb 2017</span>
                </div>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  Level-3 product support and developer relations for IBM MobileFirst.
                </p>
                <ul className="text-muted-foreground mt-4 space-y-2 text-sm">
                  <li>• Diagnosed customer iOS/Android issues and shipped core product patches.</li>
                  <li>
                    • Authored push notification samples and tutorials (Swift, Java, Objective-C) for the developer
                    community.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-outfit mb-2 text-3xl font-bold">Skills</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl">
              Grouped by how I use them in production — not an exhaustive keyword dump.
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

        {/* Education */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-outfit mb-12 text-3xl font-bold">Education</h2>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="font-outfit text-foreground mb-2 text-xl font-semibold">Full Sail University</h3>
                <p className="text-muted-foreground mb-4 italic">Bachelor of Science in Mobile Development · 2015</p>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  Native iOS and Android, mobile UX, scalable data infrastructures, and cross-platform foundations.
                </p>
                <ul className="text-muted-foreground grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <li>• Mobile Media Design</li>
                  <li>• Scalable Data Infrastructures</li>
                  <li>• Visual Frameworks</li>
                  <li>• Mobile User Experience</li>
                  <li>• Objective-C I & II</li>
                  <li>• Java I & II</li>
                  <li>• Application Deployment</li>
                  <li>• Cross-Platform Dev</li>
                </ul>
              </div>

              <div className="border-border aspect-video w-full overflow-hidden rounded-2xl border bg-black shadow-2xl">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/5FohgYaD9OU"
                  title="YouTube video player"
                  className="border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
