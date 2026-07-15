'use client';

import { cn } from '@/lib/utils';
import { Button, ThemeToggle } from '@gv-tech/ui-web';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

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
              onClick={() => setActiveTab('resume')}
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
              onClick={() => setActiveTab('cv')}
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
          <Button onClick={() => window.print()} className="flex items-center gap-2 font-semibold">
            <Printer className="h-4 w-4" />
            {activeTab === 'resume' ? 'Print Resume' : 'Print CV'}
          </Button>
        </div>
      </div>
    </div>
  );
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
                Eric Garcia
              </h1>
              <p className="text-brand-blue-light dark:text-brand-blue-dark font-outfit print-text-primary print:text-primary mt-2 text-xl font-semibold">
                Senior Software Engineer & Systems Architect
              </p>
              <p className="text-md print-text-muted mt-2 max-w-3xl font-normal text-gray-500 dark:text-gray-400 print:text-gray-700">
                Specializing in cross-platform design systems, developer platforms, and robust cloud-native
                architecture.
              </p>
            </div>

            {/* Contact Info Row */}
            <div className="print-text-dark mt-2 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-600 dark:text-gray-300 print:text-black">
              <a
                href="mailto:eng618@garciaericn.com"
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
                eng618@garciaericn.com
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
                407-536-9513
              </span>
              <a
                href="http://www.garciaericn.com"
                target="_blank"
                rel="noopener noreferrer"
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
                www.garciaericn.com
              </a>
              <a
                href="https://github.com/eng618"
                target="_blank"
                rel="noopener noreferrer"
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
                github.com/eng618
              </a>
              <a
                href="https://linkedin.com/in/eng618"
                target="_blank"
                rel="noopener noreferrer"
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
                linkedin.com/in/eng618
              </a>
            </div>
          </div>

          <hr className="print-border my-6 border-gray-200 dark:border-gray-800" />

          <div>
            <h2 className="print-text-primary mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
              Professional Summary
            </h2>
            <p className="text-md print-text-dark leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
              A results-oriented Senior Software Engineer and Systems Architect with over 11 years of professional
              experience designing, building, and scaling cross-platform design systems and cloud-native enterprise
              architectures. Deeply experienced in bridging the gap between design and engineering, maintaining
              open-source software, and driving the adoption of accessible (a11y) component libraries. Proficient in
              React, React Native, TypeScript, Node.js, and Go, with a track record of leading critical migrations and
              architecting high-performance UI systems for over 7,000+ active users.
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
                  {/* Verizon */}
                  <div className="border-brand-blue-light dark:border-brand-blue-dark relative border-l-2 pl-6">
                    <div className="bg-brand-blue-light dark:bg-brand-blue-dark absolute top-1.5 -left-1.5 h-3 w-3 rounded-full"></div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                          Principal Engineer - Systems Architect
                        </h3>
                        <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                          Verizon
                        </p>
                      </div>
                      <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                        Jan 2024 – Present
                      </span>
                    </div>
                    <ul className="print-text-dark mt-4 list-outside list-disc space-y-2.5 pl-4 text-sm text-gray-600 dark:text-gray-300 print:text-black">
                      <li>
                        <strong>Mobile Design System</strong>: Architected and built a custom multi-platform mobile
                        design system from the ground up, starting from a foundation of shadcn/ui and{' '}
                        <code>reactnative-reusables</code>, customized for brand identity and developer ergonomics.
                      </li>
                      <li>
                        <strong>Design-to-Code Handoff</strong>: Bridged the product development lifecycle by
                        establishing the mobile design system portfolio while continuously enhancing the desktop
                        library, accelerating velocity across engineering and product teams.
                      </li>
                      <li>
                        <strong>Enterprise Scale</strong>: Scaled application architecture and component systems to
                        serve 7,000+ active internal users, supporting staff from field engineers to executive
                        leadership.
                      </li>
                      <li>
                        <strong>AI Enablement</strong>: Designed and delivered an AI-powered feedback sanitization
                        engine to process and validate downstream customer and reseller messages.
                      </li>
                      <li>
                        <strong>Technical Roadmaps</strong>: Acted as primary engineering lead on large-scale features,
                        defining development scope, scoping architectures, and conducting reviews.
                      </li>
                    </ul>
                  </div>

                  {/* IBM Senior Full Stack */}
                  <div className="relative border-l-2 border-gray-300 pl-6 dark:border-gray-700">
                    <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                          Senior Full Stack Developer (Quote to Cash)
                        </h3>
                        <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                          IBM Corp.
                        </p>
                      </div>
                      <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                        Jul 2021 – Dec 2023
                      </span>
                    </div>
                    <ul className="print-text-dark mt-4 list-outside list-disc space-y-2.5 pl-4 text-sm text-gray-600 dark:text-gray-300 print:text-black">
                      <li>
                        <strong>Microservices & API Architecture</strong>: Led the development and maintenance of core
                        sales deal microservices (Go, React, TypeScript) on the Quote-to-Cash (Q2C) platform, driving
                        database performance improvements and legacy system modernizations.
                      </li>
                      <li>
                        <strong>Security Engineering</strong>: Triaged and resolved critical high-priority security
                        vulnerabilities (e.g. logging and watcher leaks of config keys and API secrets), executing
                        production hotfixes within a strict 24-hour turnaround.
                      </li>
                      <li>
                        <strong>CI/CD & Developer Experience</strong>: Streamlined pipeline integrations, enhanced
                        testing tooling, and promoted code quality standards (such as untyped Go constants) during
                        developer chapter calls.
                      </li>
                      <li>
                        <strong>Open-Source Design Systems (Extra Initiative)</strong>: Core maintainer of the IBM
                        Carbon Design System&apos;s <code>gatsby-theme-carbon</code> project, leading Gatsby major
                        upgrades, fixing theme bugs, and maintaining strict WCAG/a11y compatibility for hundreds of
                        global portals.
                      </li>
                    </ul>
                  </div>

                  {/* IBM Staff SE Go */}
                  <div className="relative border-l-2 border-gray-300 pl-6 dark:border-gray-700">
                    <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                          Staff Software Engineer (Migration & Analytics)
                        </h3>
                        <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                          IBM Corp.
                        </p>
                      </div>
                      <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                        Jan 2020 – Jun 2021
                      </span>
                    </div>
                    <ul className="print-text-dark mt-4 list-outside list-disc space-y-2.5 pl-4 text-sm text-gray-600 dark:text-gray-300 print:text-black">
                      <li>
                        <strong>Go Migration Utility</strong>: Built, architected, and expanded a CLI-based migration
                        tool written in Go to transition enterprise client data seamlessly between major versions of IBM
                        API Connect.
                      </li>
                      <li>
                        <strong>Internationalization</strong>: Spearheaded architectural changes to translate and
                        globalize the CLI tool, addressing client specifications directly.
                      </li>
                    </ul>
                  </div>

                  {/* IBM Staff SE Analytics */}
                  <div className="relative border-l-2 border-gray-300 pl-6 dark:border-gray-700">
                    <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                          Staff Software Engineer (API Connect)
                        </h3>
                        <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                          IBM Corp.
                        </p>
                      </div>
                      <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                        Feb 2017 – Dec 2019
                      </span>
                    </div>
                    <ul className="print-text-dark mt-4 list-outside list-disc space-y-2.5 pl-4 text-sm text-gray-600 dark:text-gray-300 print:text-black">
                      <li>
                        <strong>Enterprise Analytics</strong>: Developed telemetry, analytics, and enterprise data
                        integration endpoints for a cloud-native API management portal.
                      </li>
                      <li>
                        <strong>Collaboration</strong>: Partnered across design and engineering silos to preserve
                        component stability and ensure performance under high workloads.
                      </li>
                    </ul>
                  </div>

                  {/* IBM SE MobileFirst */}
                  <div className="relative border-l-2 border-gray-300 pl-6 dark:border-gray-700">
                    <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                          Software Engineer (MobileFirst Support)
                        </h3>
                        <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                          IBM Corp.
                        </p>
                      </div>
                      <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                        Jul 2015 – Feb 2017
                      </span>
                    </div>
                    <ul className="print-text-dark mt-4 list-outside list-disc space-y-2.5 pl-4 text-sm text-gray-600 dark:text-gray-300 print:text-black">
                      <li>
                        <strong>Level 3 Support</strong>: Audited customer codebases, diagnosed runtime bugs, and
                        deployed core software patches to MobileFirst foundation modules.
                      </li>
                      <li>
                        <strong>Technical Content</strong>: Created end-to-end integration push notification samples and
                        developer guides in Swift, Java, and Objective-C.
                      </li>
                    </ul>
                  </div>
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
                      {['TypeScript', 'JavaScript', 'Go', 'Swift', 'Java', 'Kotlin', 'Objective-C'].map((lang) => (
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
                      {['React (DOM)', 'React Native', 'Next.js', 'Gatsby', 'Storybook', 'Radix UI', 'NativeWind'].map(
                        (framework) => (
                          <span
                            key={framework}
                            className="print-bg-transparent print-border print-text-dark rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300 print:border-gray-300 print:text-black"
                          >
                            {framework}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="print-text-primary mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500 print:text-gray-600">
                      Tooling & Infrastructure
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {['Monorepos (Nx)', 'GraphQL', 'REST APIs', 'Kubernetes', 'Docker', 'CI/CD'].map((tool) => (
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
                      {['WCAG / a11y', 'Design Tokens', 'UX/UI Patterns'].map((standard) => (
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
                  <div>
                    <h3 className="print-text-dark font-bold text-gray-800 dark:text-gray-200 print:text-black">
                      gvtech-design
                    </h3>
                    <p className="print-text-muted mt-0.5 text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                      Author & Maintainer
                    </p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 print:text-black">
                      Multi-platform React & React Native monorepo powered by Nx. Serves as component baseline for
                      personal & customer platforms.
                    </p>
                  </div>

                  <div>
                    <h3 className="print-text-dark font-bold text-gray-800 dark:text-gray-200 print:text-black">
                      gatsby-theme-carbon
                    </h3>
                    <p className="print-text-muted mt-0.5 text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                      Core Maintainer
                    </p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 print:text-black">
                      Accessible Gatsby documentation framework for the IBM Carbon Design System. Led major core library
                      upgrades.
                    </p>
                  </div>

                  <div>
                    <h3 className="print-text-dark font-bold text-gray-800 dark:text-gray-200 print:text-black">
                      HomeHarmony / Parable Bloom
                    </h3>
                    <p className="print-text-muted mt-0.5 text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                      Author
                    </p>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 print:text-black">
                      Cross-platform mobile applications developed with Flutter, Firebase, and design token
                      architectures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Card */}
              <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
                <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-5 border-b border-gray-100 pb-3 text-xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                  Education
                </h2>
                <div className="print-text-dark text-sm print:text-black">
                  <h3 className="print-text-dark font-bold text-gray-800 dark:text-gray-200 print:text-black">
                    Full Sail University
                  </h3>
                  <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary mt-0.5 text-xs font-semibold">
                    B.S. in Mobile Development
                  </p>
                  <p className="print-text-muted mt-0.5 text-xs text-gray-500 dark:text-gray-400 print:text-gray-600">
                    Graduated 10/2015 · Winter Park, FL
                  </p>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 print:text-black">
                    Focused on native mobile application development, visual assets, scalable infrastructures, and
                    cross-platform layouts.
                  </p>
                </div>
              </div>

              {/* Certifications Card */}
              <div className="dark:bg-brand-gray900 print-card print-border print-bg-transparent rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 print:border-none print:p-0 print:shadow-none">
                <h2 className="font-outfit text-brand-oxford print-border print-text-dark mb-5 border-b border-gray-100 pb-3 text-xl font-bold dark:border-gray-800 dark:text-white print:border-gray-200 print:text-black">
                  Certifications & Badges
                </h2>
                <ul className="print-text-dark list-none space-y-3 pl-1 text-xs text-gray-600 dark:text-gray-300 print:text-black">
                  {[
                    { title: 'Google AI Essentials Specialization', sub: 'Google / Coursera · May 2026' },
                    { title: 'Developer Profession - Level 3 Expert', sub: 'IBM Credential · Sep 2023' },
                    { title: 'Carbon Design System Developer Essentials', sub: 'IBM Credential - React · Jul 2019' },
                    { title: 'IBM Cloud Kubernetes Service', sub: 'IBM Credential · Jan 2020' },
                    { title: 'Enterprise Design Thinking Practitioner', sub: 'IBM Credential · 2016' },
                  ].map((cert, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary mt-0.5 font-bold">
                        •
                      </span>
                      <div>
                        <strong>{cert.title}</strong>
                        <p className="print-text-muted mt-0.5 text-[10px] text-gray-500 dark:text-gray-400 print:text-gray-600">
                          {cert.sub}
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
                {/* 2026 Q2 */}
                <div className="relative">
                  <div className="bg-brand-blue-light dark:bg-brand-blue-dark dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Google AI Essentials Certification
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        Credential / Training
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q2 2026
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Earned Google AI Essentials V1 credential (verifiable on Credly), focusing on prompt engineering,
                    generative AI applications, and ethical AI development guidelines.
                  </p>
                </div>

                {/* 2026 Q1 */}
                <div className="relative">
                  <div className="bg-brand-blue-light dark:bg-brand-blue-dark dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Principal Engineer - Systems Architect
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        Verizon
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q1 2026
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>
                      Refined cross-platform design token configurations and monorepo release pipelines (Nx) to align
                      web and mobile packages.
                    </li>
                    <li>Established strict system boundaries and interface contracts across monorepo packages.</li>
                  </ul>
                </div>

                {/* 2025 Q3 */}
                <div className="relative">
                  <div className="bg-brand-blue-light dark:bg-brand-blue-dark dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        AI Feedback Sanitization Engine
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        Verizon
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q3 2025
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Designed, architected, and built an AI-powered feedback sanitization engine to automatically process
                    customer comments and reseller reviews for downstream ingestion. Utilized large language models to
                    sanitize sensitive customer data and extract structured sentiments.
                  </p>
                </div>

                {/* 2025 Q1 */}
                <div className="relative">
                  <div className="bg-brand-blue-light dark:bg-brand-blue-dark dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Scaling the Mobile Design System
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        Verizon
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q1 2025
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>
                      Scaled the custom mobile design system (built with shadcn/ui and NativeWind) to support an
                      internal user base of 7,000+ active users from field engineers to executive leadership.
                    </li>
                    <li>Conducted performance benchmarking on rendering design tokens on legacy Android devices.</li>
                  </ul>
                </div>

                {/* 2024 Q3 */}
                <div className="relative">
                  <div className="bg-brand-blue-light dark:bg-brand-blue-dark dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Mobile Platform Design System Launch
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        Verizon
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q3 2024
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Launched the first version of the mobile platform design system, successfully bridging the
                    design-to-code gap and streamlining developer handoffs. Accelerated initial UI prototype builds by
                    over 40% across native teams.
                  </p>
                </div>

                {/* 2024 Q1 */}
                <div className="relative">
                  <div className="bg-brand-blue-light dark:bg-brand-blue-dark dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Principal Systems Architect Appointment
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        Verizon
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q1 2024
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Appointed as Principal Engineer - Systems Architect at Verizon to lead the next-generation
                    cross-platform component framework and layout infrastructure.
                  </p>
                </div>

                {/* 2023 Q4 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Senior Full Stack Developer (Quote to Cash)
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp.
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q4 2023
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Continued leading engineering efforts for IBM Quote-to-Cash core sales services prior to transition
                    to Verizon.
                  </p>
                </div>

                {/* 2023 Q3 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        IBM Level 3 Expert Credential & Recognition Award
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp. / Credential
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q3 2023
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>Earned the Developer Profession - Level 3 Expert badge.</li>
                    <li>
                      Received peer and manager awards for going above and beyond responsibilities, helping cross-team
                      members set up complex development environments.
                    </li>
                  </ul>
                </div>

                {/* 2023 Q2 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Chapter Presentation on Go Typings
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp. / Speaking Engagement
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q2 2023
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Spoke on global Developer Chapter calls discussing Go repository standards, advocating for untyped
                    constants to enhance package usability and flexibility.
                  </p>
                </div>

                {/* 2023 Q1 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Security Incident Response & Optimization
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp.
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q1 2023
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>
                      Resolved print-logging security vulnerabilities (which printed API keys and secrets to standard
                      log streams) within a 24-hour turnaround including production hotfix.
                    </li>
                    <li>
                      Optimized constants for high-throughput micro backend services by converting to unsigned
                      constants.
                    </li>
                  </ul>
                </div>

                {/* 2022 Q4 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Carbon Design System Maintainer & CIO Hackathon
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp. / Open Source
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q4 2022
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>
                      Joined Carbon Design System maintainers team and became a core maintainer of
                      `gatsby-theme-carbon`.
                    </li>
                    <li>Participated in IBM 2022 CIO Hackathon.</li>
                    <li>Earned IBM Agile Explorer credential.</li>
                  </ul>
                </div>

                {/* 2021 Q3 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Promotion to Senior Full Stack Developer
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp.
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q3 2021
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Promoted to Senior Full Stack Developer (July 2021) in recognition of technical leadership and
                    contribution to internal business platforms.
                  </p>
                </div>

                {/* 2020 Q1 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Staff Engineer Promotion & Kubernetes Certification
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp.
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q1 2020
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>Promoted to Staff Software Engineer (January 2020).</li>
                    <li>Earned IBM Cloud Kubernetes Service validation.</li>
                  </ul>
                </div>

                {/* 2019 Q3 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Carbon Design System React Essentials
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp. / Credential
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q3 2019
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Earned Carbon Design System Developer Essentials - React badge, confirming deep competency in React
                    component libraries and design tokens.
                  </p>
                </div>

                {/* 2017 Q1 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Staff Engineer Promotion & Android/iOS Push Assets
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp.
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q1 2017
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>Promoted to Staff Software Engineer (February 2017).</li>
                    <li>
                      Authored MobileFirst Platform Android Push notification and iOS Push notification (Swift) reusable
                      tutorials and sample applications.
                    </li>
                  </ul>
                </div>

                {/* 2016 Q3 */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Design Thinking Practitioner
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        IBM Corp. / Training
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      Q3 2016
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    Earned Enterprise Design Thinking Practitioner badge, validating competency in customer-centric UX
                    design paradigms.
                  </p>
                </div>

                {/* 2015 Jul - Oct */}
                <div className="relative">
                  <div className="dark:border-brand-gray900 absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700"></div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-brand-oxford print-text-dark text-lg font-bold dark:text-white print:text-black">
                        Career Launch & Graduation
                      </h3>
                      <p className="text-brand-blue-light dark:text-brand-blue-dark print-text-primary print:text-primary text-sm font-medium">
                        Full Sail University / IBM Corp.
                      </p>
                    </div>
                    <span className="print-bg-transparent print-text-muted rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-gray-500 dark:bg-gray-800 dark:text-gray-400 print:text-gray-600">
                      2015
                    </span>
                  </div>
                  <ul className="print-text-dark mt-2 list-outside list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 print:text-black">
                    <li>Joined IBM as a Software Engineer (July 2015).</li>
                    <li>
                      Graduated with a Bachelor of Science (B.S.) in Mobile Development from Full Sail University
                      (October 2015).
                    </li>
                  </ul>
                </div>
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
