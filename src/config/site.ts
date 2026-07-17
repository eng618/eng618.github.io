export const siteConfig = {
  name: 'Eric N. Garcia',
  description:
    'Principal Engineer and Systems Architect. Eleven years building enterprise software — design systems, cloud-native services, and production-ready platforms.',
  author: 'eng618',
  url: 'https://engarcia.com',
  links: {
    github: 'https://github.com/eng618',
    linkedin: 'https://linkedin.com/in/garciaericn/',
    twitter: 'https://twitter.com/eng618',
  },
  navItems: [
    { title: 'Work', href: '/portfolio' },
    { title: 'About', href: '/about' },
    { title: 'Notes', href: '/code-notes' },
    { title: 'Contact', href: '/contact' },
  ],
};

export type SiteConfig = typeof siteConfig;
