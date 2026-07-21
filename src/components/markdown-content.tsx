'use client';

import { cn } from '@/lib/utils';
import { marked } from 'marked';
import { useMemo } from 'react';

marked.setOptions({
  gfm: true,
  breaks: true,
});

type MarkdownContentProps = {
  content: string;
  className?: string;
  /** Add heading ids for table-of-contents integration */
  headingIds?: boolean;
};

function addHeadingIds(html: string): string {
  return html.replace(/<h([1-6])>(.*?)<\/h\1>/gi, (_match, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

export function MarkdownContent({ content, className, headingIds = false }: MarkdownContentProps) {
  const html = useMemo(() => {
    if (!content?.trim()) {
      return '';
    }
    try {
      const parsed = marked.parse(content) as string;
      return headingIds ? addHeadingIds(parsed) : parsed;
    } catch (error) {
      console.error('Markdown parse failed', error);
      return `<p>${content}</p>`;
    }
  }, [content, headingIds]);

  if (!html) {
    return <p className="text-muted-foreground text-sm italic">Nothing to preview yet.</p>;
  }

  return (
    <div
      className={cn(
        'prose dark:prose-invert prose-neutral max-w-none',
        'prose-headings:font-outfit prose-a:text-primary',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
