import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import fs from 'fs';
import path from 'path';

export default function LicensePage() {
  const licensePath = path.resolve(process.cwd(), 'LICENSE');
  let licenseText = '';
  try {
    licenseText = fs.readFileSync(licensePath, 'utf-8');
  } catch {
    licenseText = 'License file could not be loaded.';
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-outfit mb-6 text-4xl font-bold lg:text-5xl">License</h1>
          <pre className="bg-card border-border rounded-lg p-6 text-sm break-words whitespace-pre-wrap">
            {licenseText}
          </pre>
        </div>
      </main>
      <Footer />
    </div>
  );
}
