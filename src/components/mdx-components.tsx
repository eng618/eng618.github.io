import { cn } from '@/lib/utils';
import NextLink from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { CodeBlock } from './code-block';

export const mdxComponents = {
  // Typography
  h1: ({ className, ...props }: ComponentProps<'h1'>) => (
    <h1
      className={cn('font-outfit text-foreground mt-12 mb-6 text-3xl font-bold tracking-tight lg:text-4xl', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'border-border font-outfit text-foreground mt-10 mb-4 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3
      className={cn('font-outfit text-foreground/90 mt-8 mb-4 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentProps<'h4'>) => (
    <h4
      className={cn('font-outfit text-foreground/80 mt-6 mb-4 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('text-muted-foreground leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps<'li'>) => (
    <li className={cn('text-muted-foreground', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn('border-primary text-muted-foreground mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="border-border my-8" {...props} />,

  // Code & Pre
  pre: (props: ComponentProps<'pre'>) => <CodeBlock {...props} />,
  code: ({ className, ...props }: ComponentProps<'code'>) => {
    const isInline = !className?.includes('language-') && !(props as Record<string, unknown>)['data-language'];
    return (
      <code
        className={cn(
          'relative font-mono text-sm font-semibold',
          isInline ? 'bg-muted text-foreground rounded px-[0.3rem] py-[0.2rem]' : 'text-inherit',
          className,
        )}
        {...props}
      />
    );
  },

  // Links
  a: ({ className, href, ...props }: ComponentProps<'a'>) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('.') || href.startsWith('#'));
    if (isInternal) {
      return (
        <NextLink
          href={href}
          className={cn('text-primary hover:text-primary/80 font-medium underline underline-offset-4', className)}
          {...props}
        />
      );
    }
    return (
      <a
        href={href}
        className={cn('text-primary hover:text-primary/80 font-medium underline underline-offset-4', className)}
        {...props}
      />
    );
  },

  // Support legacy <Link> if any still remain
  Link: ({ href, to, children, ...props }: ComponentProps<typeof NextLink> & { to?: string; children: ReactNode }) => {
    const target = href || to;
    if (!target) {
      return <span>{children}</span>;
    }
    return (
      <NextLink href={target} {...props}>
        {children}
      </NextLink>
    );
  },

  // Tables
  table: ({ className, ...props }: ComponentProps<'table'>) => (
    <div className="border-border bg-card/50 my-6 w-full overflow-y-auto rounded-lg border">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: ComponentProps<'thead'>) => (
    <thead className={cn('bg-muted/50 font-outfit', className)} {...props} />
  ),
  tr: ({ className, ...props }: ComponentProps<'tr'>) => (
    <tr
      className={cn('border-border hover:bg-muted/30 border-b transition-colors last:border-0', className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: ComponentProps<'th'>) => (
    <th
      className={cn(
        'font-outfit text-foreground h-12 px-4 py-2 text-left align-middle text-base font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<'td'>) => (
    <td
      className={cn(
        'text-muted-foreground p-4 align-middle [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),

  // Placeholders for components that might have been missed in refactoring
  AnchorLinks: ({ children }: { children: ReactNode }) => <div className="my-4 flex flex-wrap gap-2">{children}</div>,
  AnchorLink: ({ children, href }: { children: ReactNode; href?: string }) => {
    const target = href || '#';
    return (
      <a href={target} className="text-primary hover:underline">
        {children}
      </a>
    );
  },
  PageDescription: ({ children }: { children: ReactNode }) => (
    <div className="text-muted-foreground mb-8 text-xl">{children}</div>
  ),
  NotesNav: () => null,
};
