import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto mb-12 px-4 text-center lg:px-8">
            <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">Contact</p>
            <h1 className="font-outfit mb-4 text-4xl font-bold lg:text-5xl">Let&apos;s talk</h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Open to conversations about principal and staff engineering roles, design systems and platform
              architecture, technical collaboration, and mentoring. Remote-friendly; based in Raleigh, NC.
            </p>
            <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-sm">
              Prefer another channel?{' '}
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn
              </Link>
              {' · '}
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </Link>
            </p>
          </div>

          <div className="container mx-auto px-4 lg:px-8">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
