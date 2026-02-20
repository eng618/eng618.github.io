'use client';

import { useCodeTheme } from '@/hooks/use-code-theme';
import { cn } from '@/lib/utils';
import type { ComponentProps, ReactNode } from 'react';
import { isValidElement } from 'react';
import { CopyButton } from './copy-button';
import { ThemeToggle } from './ui-wrapper';

export function CodeBlock({ className, children, ...props }: ComponentProps<'pre'>) {
  const { theme, toggleTheme, mounted } = useCodeTheme();

  const extractText = (node: ReactNode): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return node.toString();
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
    return '';
  };

  const textContent = extractText(children);

  return (
    <div className="group relative" data-code-theme={theme}>
      <div className="absolute right-4 top-4 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {mounted && (
          <ThemeToggle
            variant="binary"
            customTheme={theme}
            onThemeChange={toggleTheme}
            className="h-8 w-8 text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground"
          />
        )}
        <CopyButton text={textContent} />
      </div>
      <pre
        className={cn('mb-4 mt-6 overflow-x-auto rounded-lg border border-border p-4 backdrop-blur-sm', className)}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
