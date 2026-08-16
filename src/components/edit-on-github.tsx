'use client';

import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { Button } from '@gv-tech/ui-web';
import { Edit2 } from 'lucide-react';

interface EditOnGithubProps {
  relativePath: string;
  className?: string;
}

export function EditOnGithub({ relativePath, className }: EditOnGithubProps) {
  const GITHUB_BASE_URL = 'https://github.com/eng618/eng618.github.io/edit/develop';
  const url = `${GITHUB_BASE_URL}/${relativePath}`;

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className={cn(
        'text-muted-foreground hover:text-accent-foreground inline-flex items-center space-x-2 text-xs font-medium transition-colors',
        className,
      )}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('Edit on GitHub Click', { relative_path: relativePath })}
      >
        <Edit2 className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
        <span>Edit this page on GitHub</span>
      </a>
    </Button>
  );
}
