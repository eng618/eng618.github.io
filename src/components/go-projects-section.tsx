import { Button } from '@gv-tech/ui-web';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProjectCardSkeleton } from './project-card-skeleton';

const goProjects = [
  {
    title: 'eng',
    description:
      'A command line interface (cli), based on spf13/cobra. The primary purpose of it is to facilitate my normal workflow. There are commands to help me maintain my system dot files. As well has other useful commands to kill processes, and more to come.',
    packageUrl: 'https://pkg.go.dev/github.com/eng618/eng',
    repoUrl: 'https://github.com/eng618/eng',
  },
  {
    title: 'eng-go',
    description: 'This package is a learning package used to test various data algorithms for programming in Go.',
    packageUrl: 'https://pkg.go.dev/github.com/eng618/go-eng',
    repoUrl: 'https://github.com/eng618/go-eng',
  },
];

function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {goProjects.map((project) => (
        <div key={project.title} className="border-border bg-card rounded-2xl border p-8 backdrop-blur-sm">
          <div className="bg-primary/20 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
            <Terminal className="h-6 w-6" />
          </div>
          <h2 className="font-outfit mb-4 text-2xl font-bold">{project.title}</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-4">
            <Button variant="default" asChild>
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source Code
              </Link>
            </Button>
            <Button variant="outline" className="border-border hover:bg-accent" asChild>
              <Link href={project.packageUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Go Package
              </Link>
            </Button>
          </div>
        </div>
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
        <h1 className="font-outfit mb-6 text-4xl font-bold lg:text-5xl">Go Projects</h1>
        <p className="text-muted-foreground mb-12 max-w-2xl text-xl">
          A collection of tools and libraries built with the Go programming language.
        </p>

        <Suspense fallback={<ProjectsGridFallback />}>
          <ProjectsGrid />
        </Suspense>
      </div>
    </section>
  );
}
