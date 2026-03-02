import { Footer } from '@/components/footer';
import { GoProjectsSection } from '@/components/go-projects-section';
import { Header } from '@/components/header';

export default function GoProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <GoProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
