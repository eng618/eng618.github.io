'use client';

import { MarkdownContent } from '@/components/markdown-content';
import { trackEvent } from '@/lib/analytics';
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
  company?: string | null;
  role_title?: string | null;
  created_at: string;
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
      trackEvent('Cover Letter Error', { slug: targetSlug, reason: 'database_error' });
    } else if (!data) {
      setError('Cover letter not found. Please double-check the URL.');
      trackEvent('Cover Letter Error', { slug: targetSlug, reason: 'not_found' });
    } else {
      setLetter(data);
      trackEvent('Cover Letter View', {
        slug: data.slug,
        company: data.company || 'unspecified',
        role_title: data.role_title || 'unspecified',
        has_subject: Boolean(data.subject),
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground font-outfit mt-4">Retrieving cover letter…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h2 className="font-outfit mb-2 text-xl font-bold">Retrieval failed</h2>
        <p className="text-muted-foreground mb-6 text-sm">{error}</p>
        <Link href="/">
          <Button variant="outline" className="mx-auto flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Button>
        </Link>
      </div>
    );
  }

  if (!letter) {
    return null;
  }

  const recipientLine = letter.company
    ? [letter.company, letter.recipient].filter(Boolean).join(' — ')
    : letter.recipient;

  return (
    <article className="w-full">
      <div className="border-border/50 bg-card mb-8 rounded-2xl border p-6 shadow-sm sm:p-8 print:border-gray-200 print:bg-transparent print:shadow-none">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="font-outfit text-3xl font-extrabold tracking-tight sm:text-4xl print:text-black">
              Eric Garcia
            </h1>
            <p className="text-primary font-outfit print:text-primary mt-1 text-lg font-semibold">
              Principal Engineer & Systems Architect
            </p>
          </div>

          <div className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 text-sm print:text-black">
            <span>eng618@garciaericn.com</span>
            <span>407-536-9513</span>
            <span>www.garciaericn.com</span>
          </div>
        </div>
      </div>

      <div className="border-border/50 bg-card rounded-2xl border p-6 shadow-sm sm:p-8 print:border-none print:shadow-none">
        <div className="mx-auto max-w-3xl">
          <div className="text-muted-foreground mb-6 space-y-1 font-medium print:text-black">
            <p className="text-foreground font-semibold print:text-black">
              {new Date(letter.created_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <div className="pt-2">
              <p className="text-foreground font-bold print:text-black">{recipientLine}</p>
              {letter.role_title && (
                <p className="text-muted-foreground text-sm print:text-black">{letter.role_title}</p>
              )}
            </div>
          </div>

          {letter.subject && (
            <div className="border-border/50 mb-6 border-b pb-4">
              <h2 className="text-primary text-md font-bold print:text-black">Subject: {letter.subject}</h2>
            </div>
          )}

          <div className="print:text-black">
            <MarkdownContent
              content={letter.content}
              className="prose-p:text-muted-foreground print:prose-p:text-black"
            />
          </div>

          {/* Signature only if content doesn't already end with a closing */}
          {!/sincerely|best regards|respectfully/i.test(letter.content.slice(-200)) && (
            <div className="space-y-1 pt-8 print:text-black">
              <p className="text-muted-foreground print:text-black">Sincerely,</p>
              <p className="font-outfit text-foreground pt-2 text-lg font-bold print:text-black">Eric Garcia</p>
            </div>
          )}
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
                onClick={() => trackEvent('Cover Letter Resume Click', { slug })}
                className="text-primary flex items-center text-sm font-semibold hover:underline"
              >
                View resume
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
          <Button
            onClick={() => {
              trackEvent('Cover Letter Print', { slug: slug || 'unspecified' });
              window.print();
            }}
            className="flex items-center gap-2 font-semibold"
          >
            <Printer className="h-4 w-4" />
            Print cover letter
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
              <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
              <p className="text-muted-foreground font-outfit mt-4">Loading…</p>
            </div>
          }
        >
          <CoverLetterLoader />
        </Suspense>
      </main>

      <footer className="border-border/50 bg-background text-muted-foreground border-t py-8 text-center text-xs print:hidden">
        <div className="mx-auto max-w-5xl px-4">
          <p>© {new Date().getFullYear()} Eric Garcia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
