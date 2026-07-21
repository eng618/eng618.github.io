export type CoverLetterTemplate = {
  id: string;
  name: string;
  description: string;
  subject: string;
  content: string;
};

export const COVER_LETTER_TEMPLATES: CoverLetterTemplate[] = [
  {
    id: 'principal-ic',
    name: 'Principal / Staff IC',
    description: 'Enterprise architecture, reliability, and hands-on leadership.',
    subject: 'Application for Principal / Staff Software Engineer',
    content: `# Dear Hiring Team,

I am writing to express interest in the **{{role}}** role on the **{{company}}** team.

Over 11 years I have built enterprise software that survives production — from mobile platforms and Go services to design systems and AI-assisted workflows. As Principal Engineer – Systems Architect at Verizon, I lead multi-platform component systems used by 7,000+ internal users and set technical direction without losing the details that make systems shippable: contracts, CI, performance, and clear ownership.

Previously at IBM I delivered Quote-to-Cash microservices (Go, React, TypeScript), shipped security hotfixes to production within 24 hours, and maintained open-source Carbon Design System tooling used across hundreds of portals.

I would welcome a conversation about how I can contribute to {{company}}'s engineering goals.

Sincerely,  
Eric Garcia
`,
  },
  {
    id: 'design-systems',
    name: 'Design Systems / Platform',
    description: 'Design-to-code, component libraries, and developer experience.',
    subject: 'Application for Design Systems / Platform Engineering',
    content: `# Dear Hiring Team,

I am excited to apply for the **{{role}}** position at **{{company}}**.

My focus is turning design intent into production systems: multi-platform design systems, accessible component libraries, and the platform practices that help teams ship consistently. At Verizon I architected a mobile design system (React Native, design tokens, monorepo releases) that scaled to 7,000+ users and improved UI prototype velocity by ~40%.

I have also maintained open-source design-system tooling (\`gatsby-theme-carbon\`) with a strong WCAG/a11y bar, and I build shared UI foundations (React + React Native) for products I ship myself.

I would love to discuss how a product-minded design system practice could accelerate {{company}}'s product teams.

Sincerely,  
Eric Garcia
`,
  },
  {
    id: 'platform',
    name: 'Platform Engineering',
    description: 'Services, tooling, CI/CD, and operational excellence.',
    subject: 'Application for Platform Engineering',
    content: `# Dear Hiring Team,

I am applying for the **{{role}}** role at **{{company}}**.

I specialize in platforms that make product teams faster and safer: service boundaries, migration tooling, CI/CD quality, and incident response. At IBM I owned core sales microservices, improved reliability paths, and led a high-performance Go migration utility for enterprise clients. At Verizon I continue to set monorepo release practices, package contracts, and AI-assisted pipelines for structured feedback processing.

I care about architecture that is boring in production and exciting in how quickly teams can build on it.

Thank you for your consideration.

Sincerely,  
Eric Garcia
`,
  },
  {
    id: 'blank',
    name: 'Blank',
    description: 'Empty body with a simple greeting structure.',
    subject: '',
    content: `# Dear Hiring Team,

Sincerely,  
Eric Garcia
`,
  },
];

export function applyTemplate(
  template: CoverLetterTemplate,
  vars: { company?: string; role?: string },
): { subject: string; content: string } {
  const company = vars.company?.trim() || 'your company';
  const role = vars.role?.trim() || 'this role';

  const replace = (text: string) => text.replaceAll('{{company}}', company).replaceAll('{{role}}', role);

  return {
    subject: replace(template.subject),
    content: replace(template.content),
  };
}
