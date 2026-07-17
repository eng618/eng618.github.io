export type CaseStudy = {
  name: string;
  role: string;
  company?: string;
  problem: string;
  whatIDid: string;
  results: string[];
  stack: string[];
  takeaway: string;
  url?: string;
  featured: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    name: 'Mobile Design System',
    role: 'Principal Engineer – Systems Architect',
    company: 'Verizon',
    problem:
      'Design and engineering shipped inconsistently across mobile and desktop. Handoffs were slow, and brand and interaction patterns drifted across teams supporting a large internal workforce.',
    whatIDid:
      'Architected a multi-platform mobile design system from a shadcn/ui and React Native reusables foundation, customized for brand and developer workflows. Aligned the desktop portfolio in parallel and established tokens, package boundaries, and monorepo release pipelines (Nx).',
    results: [
      'Supported 7,000+ active internal users (field, retail, and leadership)',
      '~40% faster initial UI prototype builds after launch',
      'Clearer design-to-code path and shared component contracts',
    ],
    stack: ['React Native', 'TypeScript', 'shadcn/ui', 'NativeWind', 'Design tokens', 'Nx'],
    takeaway:
      "A design system succeeds when it's a product: versioned, documented, performant on real devices, and owned end-to-end — not a Figma dump.",
    featured: true,
  },
  {
    name: 'AI Feedback Sanitization Engine',
    role: 'Principal Engineer – Systems Architect',
    company: 'Verizon',
    problem:
      'Customer and reseller comments needed safe, structured processing before downstream systems could use them.',
    whatIDid:
      'Designed and implemented an AI-powered pipeline to sanitize sensitive content and extract structured signal from free-text feedback for downstream integration.',
    results: [
      'Automated a manual, error-prone sanitization step',
      'Improved readiness of feedback for integration workflows',
    ],
    stack: ['LLMs', 'TypeScript', 'Enterprise integration'],
    takeaway:
      'AI is most valuable behind clear contracts: inputs, redaction rules, and structured outputs teams can trust.',
    featured: true,
  },
  {
    name: 'Quote-to-Cash Microservices',
    role: 'Senior Full Stack Developer',
    company: 'IBM',
    problem:
      'Core sales deal services needed reliability, modernization, and rapid response when security issues appeared.',
    whatIDid:
      'Led full-stack work on Q2C deal microservices (Go, React, TypeScript); improved database performance and legacy paths; strengthened CI/CD and code quality practices shared across developer chapters.',
    results: [
      'Production security hotfixes within 24 hours',
      'More maintainable service boundaries',
      'Stronger logging and secret-handling hygiene',
    ],
    stack: ['Go', 'React', 'TypeScript', 'Microservices', 'CI/CD'],
    takeaway:
      'Enterprise trust is earned in the boring hours: logging hygiene, secret handling, and fast, disciplined incident response.',
    featured: true,
  },
  {
    name: 'gatsby-theme-carbon',
    role: 'Core Maintainer',
    company: 'IBM Carbon Design System',
    problem:
      'Global IBM and community sites needed a consistent, accessible Gatsby theme on Carbon — and a maintainable upgrade path.',
    whatIDid:
      'Maintained theme upgrades (including major Gatsby moves), fixed bugs, and held the WCAG/a11y bar for widespread organizational use.',
    results: ['Theme used across hundreds of portals', 'Major framework upgrades without sacrificing accessibility'],
    stack: ['Gatsby', 'React', 'Carbon Design System', 'WCAG / a11y'],
    takeaway:
      'Open source maintenance is product ownership: compatibility, docs, and accessibility under real organizational load.',
    url: 'https://github.com/carbon-design-system/gatsby-theme-carbon',
    featured: true,
  },
  {
    name: 'API Connect Migration Utility',
    role: 'Staff Software Engineer',
    company: 'IBM',
    problem:
      'Enterprise clients needed safe data migration between major API Connect versions, including globalized scenarios.',
    whatIDid:
      'Architected a high-performance Go migration utility and led internationalization and architecture work with direct client edge-case resolution.',
    results: [
      'Purpose-built migration path between major product versions',
      'Globalization support for enterprise client environments',
    ],
    stack: ['Go', 'CLI tooling', 'Enterprise data migration'],
    takeaway: 'Migration tools win on correctness and operability — performance without trust is a liability.',
    featured: false,
  },
  {
    name: 'gvtech-design',
    role: 'Author & Maintainer',
    company: 'Garcia Ventures',
    problem:
      'Personal and product apps needed a shared multi-platform UI foundation instead of copy-pasted components.',
    whatIDid:
      'Built a React and React Native design system monorepo (Nx, TypeScript, Storybook) as the UI base for multiple sites and apps.',
    results: [
      'Reusable foundation for Garcia Ventures projects',
      'Consistent tokens and components across web and mobile',
    ],
    stack: ['TypeScript', 'React', 'React Native', 'Nx', 'Storybook'],
    takeaway: 'Shared design systems pay off fastest when they power real products you ship yourself.',
    url: 'https://github.com/Garcia-Ventures/gvtech-design',
    featured: false,
  },
  {
    name: 'Parable Bloom',
    role: 'Author',
    problem:
      'Casual puzzle games rarely combine calm UX with meaningful narrative; faith-based content is often either heavy-handed or shallow.',
    whatIDid:
      'Designed and built a cross-platform Flutter puzzle game: vine-sliding garden puzzles that unlock parables and reflection, with offline play and multi-platform distribution.',
    results: ['Live on web; Android in testing; iOS planned', 'Open-source development public on GitHub'],
    stack: ['Flutter', 'Cross-platform mobile/web'],
    takeaway:
      'Side products are a lab for craft: interaction polish, offline-first design, and shipping multi-platform without enterprise process.',
    url: 'https://parable-bloom.web.app/',
    featured: false,
  },
  {
    name: 'eng (Go CLI)',
    role: 'Author',
    problem: 'Personal and system workflows (dotfiles, process management) needed a single, extensible CLI.',
    whatIDid:
      'Built a Cobra-based Go CLI for daily workflow automation; published as a Go package; continues to grow with practical commands.',
    results: ['Faster, scriptable local ops', 'Learning vehicle for solid Go CLI structure'],
    stack: ['Go', 'Cobra'],
    takeaway: 'The best tools are the ones you use every day — they force clarity of interface and reliability.',
    url: 'https://github.com/eng618/eng',
    featured: false,
  },
];

export const proofMetrics = [
  { value: '7,000+', label: 'Internal users on systems I architected' },
  { value: '~40%', label: 'Faster UI prototype builds after design-system launch' },
  { value: '24h', label: 'Security hotfixes shipped to production at IBM' },
  { value: '11+', label: 'Years building enterprise software' },
] as const;

export const skillGroups = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Go', 'Swift', 'Kotlin / Java', 'Objective-C'],
  },
  {
    title: 'UI & platforms',
    items: ['React', 'React Native', 'Next.js', 'Gatsby', 'Storybook', 'Radix / shadcn', 'NativeWind'],
  },
  {
    title: 'Architecture & delivery',
    items: [
      'Design systems & tokens',
      'Monorepos (Nx)',
      'Microservices',
      'GraphQL / REST',
      'Docker / Kubernetes',
      'CI/CD',
    ],
  },
  {
    title: 'Craft',
    items: ['WCAG / a11y', 'Design-to-code workflows', 'Technical leadership', 'AI-assisted product workflows'],
  },
] as const;
