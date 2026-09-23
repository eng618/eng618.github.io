'use client';

import { Button, CardContent, CardHeader, CardTitle, Label, Separator } from '@gv-tech/ui-web';
import { Terminal } from 'lucide-react';
import Link from 'next/link';

interface NotFoundCardProps {
  onExit: (destination: string) => void;
}

export function NotFoundCard({ onExit }: NotFoundCardProps) {
  return (
    <>
      <CardHeader>
        <div className="flex items-center justify-center">
          <Terminal className="text-primary h-12 w-12" aria-hidden />
        </div>
        <CardTitle className="mt-6 mb-2 text-center font-mono text-4xl font-bold md:text-5xl">
          404: Build Failed
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 text-center">
          Relax, it&rsquo;s not your fault. This route was always a bad idea.
        </p>

        <div className="prose mx-auto mb-6 text-center">
          <p>The page you requested threw an unhandled exception during deployment.</p>
          <p>Don&rsquo;t worry, even senior devs ship broken routes sometimes.</p>
          <p>You can:</p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-6 md:flex-row md:flex-nowrap md:justify-center md:gap-4">
          <div className="flex w-full flex-col items-center gap-2 md:w-auto">
            <Label htmlFor="home-button" className="text-muted-foreground text-center text-sm">
              Roll back to a stable release
            </Label>
            <Button variant="default" asChild className="w-full items-stretch md:w-auto" onClick={() => onExit('home')}>
              <Link href="/" className="flex h-full flex-col justify-center px-4 py-3 text-center">
                <span className="block break-words whitespace-normal">Go to Home</span>
              </Link>
            </Button>
          </div>

          <Separator orientation="vertical" className="hidden h-20 md:block" />

          <div className="flex w-full flex-col items-center gap-2 md:w-auto">
            <Label htmlFor="portfolio-button" className="text-muted-foreground text-center text-sm">
              Inspect the logs
            </Label>
            <Button
              variant="outline"
              asChild
              className="w-full items-stretch md:w-auto"
              onClick={() => onExit('projects')}
            >
              <Link href="/portfolio" className="flex h-full flex-col justify-center px-4 py-3 text-center">
                <span className="block break-words whitespace-normal">View Projects</span>
              </Link>
            </Button>
          </div>

          <Separator orientation="vertical" className="hidden h-20 md:block" />

          <div className="flex w-full flex-col items-center gap-2 md:w-auto">
            <Label htmlFor="contact-button" className="text-muted-foreground text-center text-sm">
              Open a new issue
            </Label>
            <Button
              variant="outline"
              asChild
              className="w-full items-stretch md:w-auto"
              onClick={() => onExit('contact')}
            >
              <Link href="/contact" className="flex h-full flex-col justify-center px-4 py-3 text-center">
                <span className="block break-words whitespace-normal">Contact Me</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
