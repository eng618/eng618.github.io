'use client';

import { siteConfig } from '@/config/site';
import footerLinksData from '@/data/footer-links.json';
import Link from 'next/link';

function SocialIcon({ icon, url, label }: { icon: string; url: string; label: string }) {
  const iconMap: { [key: string]: React.ReactNode } = {
    github: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.544 2.914 1.183.092-.923.35-1.544.636-1.9-2.22-.253-4.555-1.113-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.195 22 16.44 22 12.017 22 6.484 17.523 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
    linkedin: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    twitter: (
      <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.997 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
      title={label}
    >
      {iconMap[icon] || icon}
    </a>
  );
}

import { cn } from '@/lib/utils';

export function Footer({ className }: { className?: string } = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('border-border bg-background border-t', className)}>
      <div className="container mx-auto px-4 py-12 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">{siteConfig.name}</h2>
            <p className="text-muted-foreground text-sm">
              Principal Engineer and Systems Architect. Eleven years building enterprise software that survives
              production.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4">
              {footerLinksData.social.map((social) => (
                <SocialIcon key={social.name} icon={social.icon} url={social.url} label={social.label} />
              ))}
            </div>
          </div>

          {/* Footer Links Sections */}
          {footerLinksData.sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold tracking-wide uppercase">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-border border-t" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-muted-foreground text-sm">
            <p>
              <Link href="/admin" className="hover:text-muted-foreground cursor-default select-none">
                ©
              </Link>{' '}
              {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <div className="text-muted-foreground text-sm">
            <p>Built with Next.js & Tailwind CSS 4.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
