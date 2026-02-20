export const siteConfig = {
  name: 'Eric N. Garcia',
  description:
    'System Architect at Verizon with over a decade of experience in software engineering and technical leadership.',
  author: 'eng618',
  url: 'https://engarcia.com',
  links: {
    github: 'https://github.com/eng618',
    linkedin: 'https://linkedin.com/in/eng618',
    twitter: 'https://twitter.com/eng618',
  },
  navItems: [
    { title: 'About', href: '/about' },
    { title: 'Portfolio', href: '/portfolio' },
    { title: 'Apps', href: '/apps' },
    { title: 'Go Projects', href: '/go-projects' },
    { title: 'Code Notes', href: '/code-notes' },
    { title: 'Contact', href: '/contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
