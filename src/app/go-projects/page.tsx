import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui-wrapper';
import { ExternalLink, Github, Terminal } from 'lucide-react';
import Link from 'next/link';

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

export default function GoProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-background pb-20">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="mb-6 text-4xl font-bold font-outfit lg:text-5xl">Go Projects</h1>
            <p className="mb-12 max-w-2xl text-xl text-muted-foreground">
              A collection of tools and libraries built with the Go programming language.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {goProjects.map((project) => (
                <div key={project.title} className="rounded-2xl border border-border bg-card p-8 backdrop-blur-sm">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Terminal className="h-6 w-6" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold font-outfit">{project.title}</h2>
                  <p className="mb-8 text-lg text-muted-foreground leading-relaxed">{project.description}</p>

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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
