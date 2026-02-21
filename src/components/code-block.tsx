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
    if (typeof node === 'string') {
      return node;
    }
    if (typeof node === 'number') {
      return node.toString();
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join('');
    }
    if (isValidElement<{ children?: ReactNode }>(node)) {
      return extractText(node.props.children);
    }
    return '';
  };

  const textContent = extractText(children);

  return (
    <div className="group relative" data-code-theme={theme}>
      <div className="absolute top-4 right-4 z-10 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {mounted && (
          <ThemeToggle
            variant="binary"
            customTheme={theme}
            onThemeChange={toggleTheme}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8 transition-all"
          />
        )}
        <CopyButton text={textContent} />
      </div>
      <pre
        className={cn('border-border mt-6 mb-4 overflow-x-auto rounded-lg border p-4 backdrop-blur-sm', className)}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
