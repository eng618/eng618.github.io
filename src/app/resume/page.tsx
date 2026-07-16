'use client';

import careerData from '@/data/career.json';
import { cn } from '@/lib/utils';
import { Button, ThemeToggle } from '@gv-tech/ui-web';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

// Analytics helper to safely send events to Plausible
const trackEvent = (eventName: string, props?: Record<string, string | number | boolean>) => {
  const formattedProps: Record<string, string> = {};
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      formattedProps[key] = String(val);
    });
  }

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log(`[Analytics Dev] Event: ${eventName}`, formattedProps);
    return;
  }

  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: formattedProps });
  }
};

interface ResumeHeaderProps {
  activeTab: 'resume' | 'cv';
  setActiveTab: (tab: 'resume' | 'cv') => void;
}

function ResumeHeader({ activeTab, setActiveTab }: ResumeHeaderProps) {
  const searchParams = useSearchParams();
  const clSlug = searchParams ? searchParams.get('cl') : null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="no-print dark:bg-brand-gray900 sticky top-0 z-50 border-b border-gray-200 bg-white py-3 shadow-sm dark:border-gray-800 print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div id="dynamic-links" className="flex items-center gap-4">
          <Link
            href="/"
            className="text-brand-blue-light dark:text-brand-blue-dark flex items-center text-sm font-semibold hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to site
          </Link>
          {clSlug && (
            <>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <Link
                href={`/cover-letter?slug=${clSlug}`}
                className="text-brand-blue-light dark:text-brand-blue-dark flex items-center text-sm font-semibold hover:underline"
              >
                {clSlug.includes('manager') || clSlug.includes('em') ? 'Manager CL' : 'Design Eng CL'}
              </Link>
            </>
          )}
        </div>

        {/* Tab Toggle Controls */}
        <div className="flex justify-center">
          <div className="dark:bg-brand-gray950 flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-800">
            <button
              onClick={() => {
                trackEvent('Resume Tab Toggle', { selected_tab: 'resume' });
                setActiveTab('resume');
              }}
              className={cn(
                'rounded-md px-4 py-1.5 text-xs font-bold transition-all duration-200',
                activeTab === 'resume'
                  ? 'bg-brand-blue-light dark:bg-brand-blue-dark text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
              )}
            >
              Resume
            </button>
            <button
              onClick={() => {
                trackEvent('Resume Tab Toggle', { selected_tab: 'cv' });
                setActiveTab('cv');
              }}
              className={cn(
                'rounded-md px-4 py-1.5 text-xs font-bold transition-all duration-200',
                activeTab === 'cv'
                  ? 'bg-brand-blue-light dark:bg-brand-blue-dark text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
              )}
            >
              CV (Timeline)
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 md:justify-end">
          {mounted ? (
            <ThemeToggle variant="ternary" className="text-muted-foreground hover:text-accent-foreground" />
          ) : (
            <div className="h-9 w-9" />
          )}
          <Button
            onClick={() => {
              trackEvent('Resume Print', { document_type: activeTab });
              window.print();
            }}
            className="flex items-center gap-2 font-semibold"
          >
            <Printer className="h-4 w-4" />
            {activeTab === 'resume' ? 'Print Resume' : 'Print CV'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Simple helper to parse bold and code snippets in markdown text
function parseFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<'resume' | 'cv'>('resume');

  return (
    <div className="bg-brand-gray50 text-brand-oxford dark:bg-brand-gray975 min-h-screen font-sans transition-colors duration-200 dark:text-gray-100">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media print {
          body {
            background-color: white !important;
            color: #111827 !important;
          }
          .no-print {
            display: none !important;
          }
          .print-layout {
            display: block !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          .print-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1.5rem !important;
          }
          .print-col-span-2 {
            grid-column: span 2 / span 2 !important;
          }
          .print-border {
            border-color: #e5e7eb !important;
          }
          .print-bg-transparent {
            background-color: transparent !important;
          }
          .print-text-primary {
            color: hsl(225, 73%, 57%) !important;
          }
          .print-text-dark {
            color: #111827 !important;
          }
          .print-text-muted {
            color: #4b5563 !important;
          }
          @page {
            margin: 1.2cm;
          }
          h2, h3 {
            page-break-after: avoid;
          }
          .print-card {
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            padding: 0 !important;
          }
        }
      `,
        }}
      />
      <Suspense
        fallback={
          <div className="no-print dark:bg-brand-gray900 sticky top-0 z-50 border-b border-gray-200 bg-white py-3 shadow-sm dark:border-gray-800 print:hidden">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-brand-blue-light dark:text-brand-blue-dark flex items-center text-sm font-semibold hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to site
                </Link>
              </div>
            </div>
          </div>
        }
      >
        <ResumeHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </Suspense>

      {/* Main Container */}
      <main className="print-layout mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 print:p-0">
        {/* Top Header Card */}
        <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-outfit text-brand-oxford print-text-dark text-4xl font-extrabold tracking-tight sm:text-5xl dark:text-white print:text-black">
                {careerData.personal.name}
              </h1>
              <p className="text-brand-blue-light dark:text-brand-blue-dark font-outfit print-text-primary print:text-primary mt-2 text-xl font-semibold">
                {careerData.personal.title}
              </p>
              <p className="text-md print-text-muted mt-2 max-w-3xl font-normal text-gray-500 dark:text-gray-400 print:text-gray-700">
                Specializing in cross-platform design systems, developer platforms, and robust cloud-native
                architecture.
              </p>
            </div>

            {/* Contact Info Row */}
            <div className="print-text-dark mt-2 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-600 dark:text-gray-300 print:text-black">
              <a
                href={`mailto:${careerData.personal.email}`}
                onClick={() =>
                  trackEvent('Resume Contact Click', {
                    channel: 'email',
                    link_url: `mailto:${careerData.personal.email}`,
                  })
                }
                className="hover:text-brand-blue-light dark:hover:text-brand-blue-dark flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <svg
                  className="print-text-primary h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {careerData.personal.email}
              </a>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <svg
                  className="print-text-primary h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {careerData.personal.phone}
              </span>
              <a
                href={`http://${careerData.personal.website}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('Resume Contact Click', {
                    channel: 'website',
                    link_url: `http://${careerData.personal.website}`,
                  })
                }
                className="hover:text-brand-blue-light dark:hover:text-brand-blue-dark flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <svg
                  className="print-text-primary h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18"
                  />
                </svg>
                {careerData.personal.website}
              </a>
              <a
                href={`https://${careerData.personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('Resume Contact Click', {
                    channel: 'github',
                    link_url: `https://${careerData.personal.github}`,
                  })
                }
                className="hover:text-brand-blue-light dark:hover:text-brand-blue-dark flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <svg
                  className="print-text-primary h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                    clipRule="evenodd"
                  />
                </svg>
                {careerData.personal.github}
              </a>
              <a
                href={`https://${careerData.personal.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('Resume Contact Click', {
                    channel: 'linkedin',
                    link_url: `https://${careerData.personal.linkedin}`,
                  })
                }
                className="hover:text-brand-blue-light dark:hover:text-brand-blue-dark flex items-center gap-2 whitespace-nowrap transition-colors"
              >
                <svg
                  className="print-text-primary h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
                {careerData.personal.linkedin}
              </a>
            </div>
          </div>

          <hr className="print-border my-6 border-gray-200 dark:border-gray-800" />

          {/* Professional Summary */}
          <div>
            <h2 className="print-text-primary mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Professional Summary
            </h2>
            <p className="text-md print-text-dark leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
              {careerData.personal.summary}
            </p>
          </div>
        </div>

        {activeTab === 'resume' ? (
          <div className="print-grid grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Side: Experience (Span 2) */}
            <div className="print-col-span-2 space-y-8 lg:col-span-2">
              <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
                <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-6 border-b border-gray-100 pb-3 text-2xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                  Professional Experience
                </h2>

                <div className="space-y-8">
                  {careerData.experiences
                    .filter((exp) => exp.showOnResume)
                    .map((exp, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'relative border-l-2 pl-6',
                          idx === 0
                            ? 'border-brand-blue-light dark:border-brand-blue-dark'
                            : 'border-gray-300 dark:border-gray-700',
                        )}
                      >
                        <div
                          className={cn(
                            'absolute top-1.5 -left-1.5 h-3 w-3 rounded-full',
                            idx === 0 ? 'bg-brand-blue-light dark:bg-brand-blue-dark' : 'bg-gray-300 dark:bg-gray-700',
                          )}
                        ></div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                              {exp.role}
                            </h3>
                            <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                              {exp.company}
                            </p>
                          </div>
                          <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                            {exp.period}
                          </span>
                        </div>
                        <ul className="print-text-dark mt-4 list-outside list-disc space-y-2.5 pl-4 text-sm text-gray-600 dark:text-gray-300 print:text-black">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{parseFormattedText(bullet)}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right Side: Skills, Certs, Projects (Span 1) */}
            <div className="space-y-8">
              {/* Skills Card */}
              <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
                <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-5 border-b border-gray-100 pb-3 text-xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                  Technical Skills
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="print-text-primary mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500 print:text-gray-600">
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {careerData.skills.languages.map((lang) => (
                        <span
                          key={lang}
                          className="print-bg-transparent print-border print-text-dark rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300 print:border-gray-300 print:text-black"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="print-text-primary mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500 print:text-gray-600">
                      Frameworks & Design Systems
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {careerData.skills.frameworks.map((framework) => (
                        <span
                          key={framework}
                          className="print-bg-transparent print-border print-text-dark rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300 print:border-gray-300 print:text-black"
                        >
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="print-text-primary mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500 print:text-gray-600">
                      Tooling & Infrastructure
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {careerData.skills.tooling.map((tool) => (
                        <span
                          key={tool}
                          className="print-bg-transparent print-border print-text-dark rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300 print:border-gray-300 print:text-black"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="print-text-primary mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500 print:text-gray-600">
                      Standards
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {careerData.skills.standards.map((standard) => (
                        <span
                          key={standard}
                          className="print-bg-transparent print-border print-text-dark rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300 print:border-gray-300 print:text-black"
                        >
                          {standard}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Card */}
              <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
                <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-5 border-b border-gray-100 pb-3 text-xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                  Open Source Projects
                </h2>
                <div className="print-text-dark space-y-4 text-sm print:text-black">
                  {careerData.projects
                    .filter((p) => p.showOnResume)
                    .map((proj, idx) => (
                      <div key={idx}>
                        <h3 className="print-text-dark font-bold text-gray-800 dark:text-gray-200 print:text-black">
                          {proj.name}
                        </h3>
                        <p className="print-text-muted mt-0.5 text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                          {proj.role}
                        </p>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 print:text-black">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Education Card */}
              <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
                <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-5 border-b border-gray-100 pb-3 text-xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                  Education
                </h2>
                <div className="print-text-dark text-sm print:text-black">
                  <h3 className="print-text-dark font-bold text-gray-800 dark:text-gray-200 print:text-black">
                    {careerData.education.institution}
                  </h3>
                  <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary mt-0.5 text-xs font-semibold">
                    {careerData.education.degree}
                  </p>
                  <p className="print-text-muted mt-0.5 text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                    {careerData.education.period}
                  </p>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 print:text-black">
                    {careerData.education.description}
                  </p>
                </div>
              </div>

              {/* Certifications Card */}
              <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
                <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-5 border-b border-gray-100 pb-3 text-xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                  Certifications & Badges
                </h2>
                <ul className="print-text-dark list-none space-y-3 pl-1 text-xs text-gray-600 dark:text-gray-300 print:text-black">
                  {careerData.certifications
                    .filter((c) => c.showOnResume)
                    .map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary mt-0.5 font-bold">
                          •
                        </span>
                        <div>
                          <strong>{cert.resumeTitle}</strong>
                          <p className="print-text-muted mt-0.5 text-[10px] text-gray-500 dark:text-gray-400 print:text-gray-600">
                            {cert.resumeSub}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
              <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-8 border-b border-gray-100 pb-3 text-2xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                Curriculum Vitae — Comprehensive Timeline
              </h2>

              <div className="relative ml-4 space-y-10 border-l-2 border-gray-200 pl-6 dark:border-gray-800">
                {careerData.cvTimeline.map((item, idx) => {
                  const isMainRole =
                    item.organization === 'Verizon' ||
                    item.organization === 'IBM Corp.' ||
                    item.organization.includes('Full Sail');
                  return (
                    <div key={idx} className="relative">
                      <div
                        className={cn(
                          'dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white',
                          isMainRole ? 'bg-brand-blue-light dark:bg-brand-blue-dark' : 'bg-gray-300 dark:bg-gray-700',
                        )}
                      ></div>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                            {item.title}
                          </h3>
                          <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                            {item.organization}
                          </p>
                        </div>
                        <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                          {item.period}
                        </span>
                      </div>
                      {item.description.includes('\n') ||
                      item.description.startsWith('-') ||
                      item.description.includes('<li>') ? (
                        <div className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                          {/* If timeline item has sub-points split by bullet points, parse them */}
                          <ul className="list-outside list-disc space-y-1.5 pl-4">
                            {item.description
                              .split('\n')
                              .filter((line) => line.trim().length > 0)
                              .map((line, lIdx) => {
                                const cleanLine = line.replace(/^\s*-\s*/, '');
                                return <li key={lIdx}>{parseFormattedText(cleanLine)}</li>;
                              })}
                          </ul>
                        </div>
                      ) : (
                        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                          {parseFormattedText(item.description)}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="no-print dark:bg-brand-gray900 border-t border-gray-200 bg-white py-10 text-center text-xs text-gray-500 transition-colors dark:border-gray-800 dark:text-gray-600">
        <div className="mx-auto max-w-5xl px-4">
          <p>© 2026 Eric Garcia. All rights reserved.</p>
          <p className="mt-1">Styled with Tailwind CSS · Built for the Next.js hosted site</p>
        </div>
      </footer>
    </div>
  );
}
