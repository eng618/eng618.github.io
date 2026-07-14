'use client';

import { supabase } from '@/lib/supabase';
import { Button, ThemeToggle } from '@gv-tech/ui-web';
import { AlertTriangle, ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

interface CoverLetter {
  id: string;
  slug: string;
  recipient: string;
  subject: string;
  content: string;
  created_at: string;
}

// Simple Markdown parser for client-side rendering
function Markdown({ content }: { content: string }) {
  if (!content) {
    return null;
  }

  const lines = content.split('\n');
  return (
    <div className="text-md space-y-6 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Headers
        if (trimmed.startsWith('# ')) {
          return (
            <h1
              key={idx}
              className="font-outfit text-foreground border-border/50 mt-8 mb-4 border-b pb-2 text-3xl font-extrabold"
            >
              {trimmed.slice(2)}
            </h1>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="font-outfit text-foreground mt-6 mb-3 text-2xl font-bold">
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-outfit text-foreground mt-5 mb-2 text-xl font-semibold">
              {trimmed.slice(4)}
            </h3>
          );
        }

        // Bullet points
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <ul key={idx} className="text-muted-foreground my-2 list-outside list-disc space-y-2 pl-6">
              <li>{trimmed.slice(2)}</li>
            </ul>
          );
        }

        // Empty lines
        if (trimmed === '') {
          return <div key={idx} className="h-2" />;
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-primary/50 text-muted-foreground my-3 border-l-4 pl-4 italic">
              {trimmed.slice(2)}
            </blockquote>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-muted-foreground">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

function CoverLetterLoader() {
  const searchParams = useSearchParams();
  const slug = searchParams ? searchParams.get('slug') : null;

  const [letter, setLetter] = useState<CoverLetter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No cover letter slug was specified in the URL.');
      setLoading(false);
      return;
    }

    fetchCoverLetter(slug);
  }, [slug]);

  const fetchCoverLetter = async (targetSlug: string) => {
    setLoading(true);
    setError(null);

    const { data, error: dbError } = await supabase
      .from('cover_letters')
      .select('*')
      .eq('slug', targetSlug)
      .maybeSingle();

    if (dbError) {
      setError(dbError.message);
    } else if (!data) {
      setError('Cover letter not found. Please double-check the URL.');
    } else {
      setLetter(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-muted-foreground font-outfit mt-4">Retrieving cover letter...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="font-outfit mb-2 text-xl font-bold">Retrieval Failed</h2>
        <p className="text-muted-foreground mb-6 text-sm">{error}</p>
        <Link href="/">
          <Button variant="outline" className="mx-auto flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  if (!letter) {
    return null;
  }

  return (
    <article className="w-full">
      {/* Top Header Card */}
      <div className="border-border/50 bg-card mb-8 rounded-2xl border p-6 shadow-sm sm:p-8 print:border-gray-200 print:bg-transparent print:shadow-none">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-outfit text-3xl font-extrabold tracking-tight sm:text-4xl print:text-black">
              Eric Garcia
            </h1>
            <p className="text-primary font-outfit print:text-primary mt-1 text-lg font-semibold">
              Senior Software Engineer & Systems Architect
            </p>
          </div>

          {/* Contact Row */}
          <div className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 text-sm print:text-black">
            <span>eng618@garciaericn.com</span>
            <span>407-536-9513</span>
            <span>www.garciaericn.com</span>
          </div>
        </div>
      </div>

      {/* Main Cover Letter Container */}
      <div className="border-border/50 bg-card rounded-2xl border p-6 shadow-sm sm:p-8 print:border-none print:shadow-none">
        <div className="mx-auto max-w-3xl">
          {/* Metadata Header */}
          <div className="text-muted-foreground mb-6 space-y-1 font-medium print:text-black">
            <p className="text-foreground font-semibold print:text-black">
              {new Date(letter.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <div className="pt-2">
              <p className="text-foreground font-bold print:text-black">{letter.recipient}</p>
            </div>
          </div>

          {/* Subject Line */}
          {letter.subject && (
            <div className="border-border/50 mb-6 border-b pb-4">
              <h2 className="text-primary text-md font-bold print:text-black">Subject: {letter.subject}</h2>
            </div>
          )}

          {/* Content */}
          <div className="print:text-black">
            <Markdown content={letter.content} />
          </div>

          <div className="space-y-1 pt-8 print:text-black">
            <p className="text-muted-foreground print:text-black">Sincerely,</p>
            <p className="font-outfit text-foreground pt-2 text-lg font-bold print:text-black">Eric Garcia</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function CoverLetterHeader() {
  const searchParams = useSearchParams();
  const slug = searchParams ? searchParams.get('slug') : null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="border-border/50 bg-background/80 sticky top-0 z-50 border-b py-3 shadow-sm backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-primary flex items-center text-sm font-semibold hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to site
          </Link>
          {slug && (
            <>
              <span className="text-muted-foreground">|</span>
              <Link
                href={`/resume?cl=${slug}`}
                className="text-primary flex items-center text-sm font-semibold hover:underline"
              >
                View Resume
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {mounted ? (
            <ThemeToggle variant="ternary" className="text-muted-foreground hover:text-accent-foreground" />
          ) : (
            <div className="h-9 w-9" />
          )}
          <Button onClick={() => window.print()} className="flex items-center gap-2 font-semibold">
            <Printer className="h-4 w-4" />
            Print Cover Letter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CoverLetterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense
        fallback={
          <div className="border-border/50 bg-background/80 sticky top-0 z-50 border-b py-3 shadow-sm backdrop-blur-md print:hidden">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <Link href="/" className="text-primary flex items-center text-sm font-semibold hover:underline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to site
                </Link>
              </div>
            </div>
          </div>
        }
      >
        <CoverLetterHeader />
      </Suspense>

      <main className="mx-auto w-full max-w-5xl flex-grow px-4 py-8 sm:px-6 lg:px-8 print:p-0">
        <Suspense
          fallback={
            <div className="flex min-h-[400px] flex-col items-center justify-center">
              <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
              <p className="text-muted-foreground font-outfit mt-4">Loading...</p>
            </div>
          }
        >
          <CoverLetterLoader />
        </Suspense>
      </main>

      <footer className="border-border/50 bg-background text-muted-foreground border-t py-8 text-center text-xs print:hidden">
        <div className="mx-auto max-w-5xl px-4">
          <p>© 2026 Eric Garcia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
