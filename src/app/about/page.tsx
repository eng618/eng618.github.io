import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { AspectRatio } from '@gv-tech/ui-web';
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
              <h3 className="font-outfit text-foreground mb-8 text-2xl font-bold">Professional Experience</h3>
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
                  <p className="text-muted-foreground text-sm">
                    Leading the design of high-performance, scalable enterprise systems. Architecting cloud-native
                    solutions and providing technical leadership across distributed teams.
                  </p>
                </div>

                <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-outfit text-foreground text-lg font-semibold">Senior Full Stack Developer</h4>
                      <p className="text-primary font-medium">IBM</p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-sm whitespace-nowrap">Jul 2021 - Dec 2023</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Promoted to Senior role with responsibility for full-stack development. Contributed to Carbon Design
                    System as a maintainer and worked on enterprise-scale applications.
                  </p>
                </div>

                <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-outfit text-foreground text-lg font-semibold">Staff Software Engineer</h4>
                      <p className="text-primary font-medium">IBM</p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-sm whitespace-nowrap">Jan 2020 - Jun 2021</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Advanced technical role focusing on software engineering excellence. Optimized backend services and
                    resolved critical security vulnerabilities.
                  </p>
                </div>

                <div className="border-border bg-card rounded-lg border p-6 transition-shadow hover:shadow-md">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h4 className="font-outfit text-foreground text-lg font-semibold">Software Engineer</h4>
                      <p className="text-primary font-medium">IBM</p>
                    </div>
                    <span className="text-muted-foreground ml-4 text-sm whitespace-nowrap">Jul 2015 - Dec 2019</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Started career at IBM as a Software Engineer. Developed mobile and web applications, created sample
                    applications for MobileFirst Platform.
                  </p>
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
