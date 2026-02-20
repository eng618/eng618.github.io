import { cn } from '@/lib/utils';
import { Edit2 } from 'lucide-react';

interface EditOnGithubProps {
  relativePath: string;
  className?: string;
}

export function EditOnGithub({ relativePath, className }: EditOnGithubProps) {
  const GITHUB_BASE_URL = 'https://github.com/eng618/eng618.github.io/edit/develop';
  const url = `${GITHUB_BASE_URL}/${relativePath}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group inline-flex items-center space-x-2 text-xs font-medium text-muted-foreground transition-colors hover:text-accent-foreground',
        className,
      )}
    >
      <Edit2 className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
      <span>Edit this page on GitHub</span>
    </a>
  );
}
