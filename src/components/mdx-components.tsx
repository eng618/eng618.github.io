import { cn } from '@/lib/utils';
import NextLink from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { CodeBlock } from './code-block';

export const mdxComponents = {
  // Typography
  h1: ({ className, ...props }: ComponentProps<'h1'>) => (
    <h1
      className={cn('mt-12 mb-6 font-outfit text-3xl font-bold tracking-tight text-foreground lg:text-4xl', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'mt-10 mb-4 border-b border-border pb-2 font-outfit text-2xl font-semibold tracking-tight text-foreground first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3
      className={cn('mt-8 mb-4 font-outfit text-xl font-semibold tracking-tight text-foreground/90', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentProps<'h4'>) => (
    <h4
      className={cn('mt-6 mb-4 font-outfit text-lg font-semibold tracking-tight text-foreground/80', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('leading-7 text-muted-foreground [&:not(:first-child)]:mt-6', className)} {...props} />
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
      className={cn('mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground', className)}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,

  // Code & Pre
  pre: (props: ComponentProps<'pre'>) => <CodeBlock {...props} />,
  code: ({ className, ...props }: ComponentProps<'code'>) => {
    const isInline = !className?.includes('language-') && !(props as Record<string, unknown>)['data-language'];
    return (
      <code
        className={cn(
          'relative font-mono text-sm font-semibold',
          isInline ? 'rounded bg-muted px-[0.3rem] py-[0.2rem] text-foreground' : 'text-inherit',
          className,
        )}
        {...props}
      />
    );
  },

  // Links
  a: ({ className, ...props }: ComponentProps<'a'>) => (
    <a
      className={cn('font-medium text-primary underline underline-offset-4 hover:text-primary/80', className)}
      {...props}
    />
  ),

  // Support legacy <Link> if any still remain
  Link: ({ href, to, children, ...props }: ComponentProps<typeof NextLink> & { to?: string; children: ReactNode }) => {
    const target = href || to;
    if (!target) return <span>{children}</span>;
    return (
      <NextLink href={target} {...props}>
        {children}
      </NextLink>
    );
  },

  // Tables
  table: ({ className, ...props }: ComponentProps<'table'>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: ComponentProps<'tr'>) => (
    <tr className={cn('m-0 border-t p-0 even:bg-muted/50', className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentProps<'th'>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<'td'>) => (
    <td
      className={cn('border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right', className)}
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
    <div className="mb-8 text-xl text-muted-foreground">{children}</div>
  ),
  NotesNav: () => null,
};
