'use client';

import { BadgesSection } from '@/components/badges-section';
import { CoursesSection } from '@/components/courses-section';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { motion } from 'framer-motion';

const featuredProjects = [
  {
    title: 'HomeHarmony',
    description: 'Family management app',
    content:
      'A Flutter & Firebase app for parents to manage rules, chores, rewards, and consequences. Fosters family cooperation and accountability.',
  },
  {
    title: 'Parable Bloom',
    description: 'Serene puzzle game',
    content:
      "A serene Flutter puzzle game where sliding vines to bloom unlocks Jesus' parables and Bible verses for spiritual growth.",
  },
  {
    title: 'ENG CLI',
    description: 'Personal workflow CLI tool',
    content: 'A personal CLI tool built with Go to facilitate normal workflow tasks, based on the cobra CLI program.',
  },
];

const githubProjects = [
  {
    title: 'gvtech-design',
    description: 'Garcia Enterprise Design System',
    content: 'A comprehensive design system for Garcia Enterprise applications, built with TypeScript and Storybook.',
    stars: 2,
    forks: 1,
    issues: 4,
    url: 'https://github.com/Garcia-Ventures/gvtech-design',
  },
  {
    title: 'eslint-config',
    description: 'Standardized ESLint Configuration',
    content:
      'A standardized ESLint configuration using the modern flat config style for consistent code quality across projects.',
    stars: 0,
    forks: 0,
    issues: 2,
    url: 'https://github.com/Garcia-Ventures/eslint-config',
  },
  {
    title: 'gvtravel',
    description: "GV Travel's Website",
    content: 'The official website for GV Travel, built with TypeScript for a modern web experience.',
    stars: 0,
    forks: 0,
    issues: 0,
    url: 'https://github.com/Garcia-Ventures/gvtravel',
  },
  {
    title: 'gatsby-theme-carbon',
    description: 'A Carbon Inspired Gatsby Theme',
    content:
      'A Gatsby theme inspired by the Carbon Design System, providing a consistent and accessible design foundation for web applications.',
    stars: 358,
    forks: 279,
    issues: 70,
    url: 'https://github.com/carbon-design-system/gatsby-theme-carbon',
  },
];

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow pb-20">
        <motion.section
          className="border-border border-b py-16 lg:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h1
              className="font-outfit mb-4 text-4xl font-bold lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Portfolio
            </motion.h1>
            <motion.p
              className="text-muted-foreground max-w-2xl text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              A collection of architectural solutions, mobile applications, and professional certifications.
            </motion.p>
          </div>
        </motion.section>

        {/* Digital Badges */}
        <BadgesSection />

        {/* Featured Projects */}
        <motion.section
          className="bg-muted/10 py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2
              className="font-outfit mb-12 text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="border-border bg-card h-full overflow-hidden">
                    <CardHeader>
                      <CardTitle className="font-outfit text-2xl font-bold">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.content}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* GitHub Organization & Projects */}
        <motion.section
          className="bg-muted/10 py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2
              className="font-outfit mb-4 text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              GitHub Organization & Projects
            </motion.h2>
            <motion.p
              className="text-muted-foreground mb-12 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I own and maintain the Garcia-Ventures organization on GitHub, which hosts various open-source projects
              focused on design systems, development tools, and web applications.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {githubProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="border-border bg-card h-full overflow-hidden">
                    <CardHeader>
                      <CardTitle className="font-outfit text-xl font-bold">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{project.content}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">⭐ {project.stars} stars</Badge>
                        <Badge variant="outline">🍴 {project.forks} forks</Badge>
                        <Badge variant="outline">🐛 {project.issues} issues</Badge>
                      </div>
                      <Button variant="link" asChild className="mt-2 h-auto p-0">
                        <a href={project.url}>View on GitHub</a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Personal Projects */}
        <motion.section
          className="py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <motion.h2
              className="font-outfit mb-12 text-3xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Personal Projects
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="border-border bg-card h-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-outfit text-2xl font-bold">Memory Vault</CardTitle>
                    <CardDescription>Cross-platform cloud-synced memory app</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Keeps all your memories safe and synced between all your devices. Your memories are saved in the
                      cloud so they are always safe.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Completed Courses */}
        <CoursesSection />
      </main>
      <Footer />
    </div>
  );
}
