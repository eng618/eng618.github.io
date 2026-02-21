import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto mb-12 px-4 text-center lg:px-8">
            <h1 className="font-outfit mb-4 text-4xl font-bold lg:text-5xl">Contact</h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              I&apos;m always open to discussing new opportunities, technical collaborations, or system architecture
              insights.
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
