import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { AspectRatio, Button } from '@gv-tech/ui-web';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h1 className="font-outfit mb-6 text-4xl font-bold lg:text-5xl">About Me</h1>
                <div className="text-muted-foreground space-y-6 text-lg leading-relaxed">
                  <p>
                    My name is Eric Garcia. I am a graduate from Full Sail University with a Bachelors Degree in Mobile
                    Development.
                  </p>
                  <p>
                    I am currently a <span className="text-foreground font-semibold">System Architect</span> at{' '}
                    <span className="text-foreground font-semibold">Verizon</span>, where I lead the design of
                    high-performance, scalable enterprise systems. My career has evolved from deep hands-on software
                    engineering into architectural leadership, focusing on cloud-native strategies and technical
                    excellence.
                  </p>
                  <p>
                    I am passionate about technical mentorship and building resilient digital experiences that stand the
                    test of time.
                  </p>
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
            <h2 className="font-outfit mb-12 text-3xl font-bold">Education & Experience</h2>

            {/* Education */}
            <div className="mb-16">
              <h3 className="font-outfit text-foreground mb-8 text-2xl font-bold">Education</h3>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <div className="border-border bg-card rounded-lg border p-6">
                    <h4 className="font-outfit text-foreground mb-2 text-xl font-semibold">Full Sail University</h4>
                    <p className="text-muted-foreground mb-4 italic">
                      Bachelor of Science in Mobile Development · 2015
                    </p>
                    <ul className="text-muted-foreground grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                      <li>• Mobile Media Design</li>
                      <li>• Scalable Data Infrastructures</li>
                      <li>• Visual Frameworks</li>
                      <li>• Mobile User Experience</li>
                      <li>• Objective C I & II</li>
                      <li>• Java I & II</li>
                      <li>• Application Deployment</li>
                      <li>• Cross-Platform Dev</li>
                    </ul>
                  </div>
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

            {/* Professional Experience */}
            <div>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-outfit text-foreground text-2xl font-bold">Professional Experience</h3>
                <Button variant="outline" size="sm" asChild>
                  <a href="/assets/resume.html" target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </Button>
              </div>
              <div className="space-y-6">
                <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-outfit text-foreground text-lg font-semibold">
                        Principal Engineer - Systems Architect
                      </h4>
                      <p className="text-primary font-medium">Verizon</p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-sm whitespace-nowrap">Jan 2024 - Present</span>
                  </div>
                  <div className="text-muted-foreground mt-3 space-y-2 text-sm">
                    <p>
                      Leading the design of high-performance, scalable enterprise systems and cloud-native solutions.
                      Bridged the design-to-code gap by architecting and building a custom mobile design system from
                      scratch using shadcn/ui and React Native, scaling it to support 7,000+ active users from field
                      engineers to executive leadership.
                    </p>
                    <p>
                      Spearheading cross-functional roadmaps, establishing technical strategies, and implementing
                      AI-powered solutions to sanitize and process downstream comments and reviews.
                    </p>
                  </div>
                </div>

                <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-outfit text-foreground text-lg font-semibold">Senior Full Stack Developer</h4>
                      <p className="text-primary font-medium">IBM</p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-sm whitespace-nowrap">Jul 2021 - Dec 2023</span>
                  </div>
                  <div className="text-muted-foreground mt-3 space-y-2 text-sm">
                    <p>
                      Led full-stack development and open-source contributions for the Carbon Design System. Served as a
                      core maintainer of <code>gatsby-theme-carbon</code>, supporting hundreds of documentation and
                      components portals globally while ensuring strict web accessibility (WCAG / a11y) standards.
                    </p>
                    <p>
                      Directed major migrations to upgrade Gatsby core libraries, resolving extensive breaking changes.
                      Presented architectural standards on untyped Go constants and executed production hotfixes for
                      critical security leaks within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-outfit text-foreground text-lg font-semibold">Staff Software Engineer</h4>
                      <p className="text-primary font-medium">IBM</p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-sm whitespace-nowrap">Jan 2020 - Jun 2021</span>
                  </div>
                  <div className="text-muted-foreground mt-3 space-y-2 text-sm">
                    <p>
                      Designed, architected, and globalized a high-performance migration utility written in Go, utilized
                      by enterprise clients to transition data between major versions of IBM API Connect.
                    </p>
                    <p>
                      Focused on enterprise analytics and data integration endpoints, resolving critical vulnerabilities
                      and ensuring system reliability under heavy workloads.
                    </p>
                  </div>
                </div>

                <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-outfit text-foreground text-lg font-semibold">Software Engineer</h4>
                      <p className="text-primary font-medium">IBM</p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-sm whitespace-nowrap">Jul 2015 - Dec 2019</span>
                  </div>
                  <div className="text-muted-foreground mt-3 space-y-2 text-sm">
                    <p>
                      Responsible for Level-3 product support for the IBM MobileFirst Platform. Diagnosed client-side
                      codebase issues in customer apps and authored core software patches.
                    </p>
                    <p>
                      Created developer relations content, including push notification tutorials and sample applications
                      written in Swift, Objective-C, and Java.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
