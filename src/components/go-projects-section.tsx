import { Button, Card, CardContent, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { ExternalLink, Terminal } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { FaGithub } from 'react-icons/fa';
import { ProjectCardSkeleton } from './project-card-skeleton';

const goProjects = [
  {
    title: 'eng',
    description:
      'A Cobra-based CLI for daily workflow automation — dotfile maintenance, process management, and other practical commands I use every day. Published as a Go package and still growing.',
    packageUrl: 'https://pkg.go.dev/github.com/eng618/eng',
    repoUrl: 'https://github.com/eng618/eng',
  },
  {
    title: 'eng-go',
    description:
      'A learning package for data structures and algorithms in Go — a sandbox for testing patterns before they land in production tools.',
    packageUrl: 'https://pkg.go.dev/github.com/eng618/go-eng',
    repoUrl: 'https://github.com/eng618/go-eng',
  },
];

function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {goProjects.map((project) => (
        <Card key={project.title} className="backdrop-blur-sm transition-all hover:shadow-md">
          <CardHeader className="pb-4">
            <div className="bg-primary/20 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
              <Terminal className="h-6 w-6" />
            </div>
            <CardTitle className="font-outfit text-2xl font-bold">{project.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button variant="default" asChild>
                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-2 h-4 w-4" /> Source Code
                </Link>
              </Button>
              <Button variant="outline" className="border-border hover:bg-accent" asChild>
                <Link href={project.packageUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Go Package
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProjectsGridFallback() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <ProjectCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}

export function GoProjectsSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-primary mb-3 text-sm font-medium tracking-wide uppercase">Work</p>
        <h1 className="font-outfit mb-6 text-4xl font-bold lg:text-5xl">Go projects</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl text-xl">
          CLI tools and libraries built with Go for daily workflows and deliberate practice. Full case studies live
          under Work.
        </p>

        <Suspense fallback={<ProjectsGridFallback />}>
          <ProjectsGrid />
        </Suspense>
      </div>
    </section>
  );
}
