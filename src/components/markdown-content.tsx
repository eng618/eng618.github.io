'use client';

import { marked } from 'marked';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';

marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Drop a leading YAML frontmatter block. With `breaks: true`, marked treats the
 * closing `---` as a setext underline and turns the whole block into one heading.
 * Only a simple `key: value` block is removed, so a horizontal rule stays put.
 */
export function stripMarkdownFrontmatter(content: string): string {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match?.[1]) {
    return content;
  }

  const lines = match[1].split(/\r?\n/).filter((line) => line.trim() !== '');
  const isMapping = lines.length > 0 && lines.every((line) => /^[A-Za-z0-9_-]+\s*:/.test(line));
  if (!isMapping) {
    return content;
  }

  return content.slice(match[0].length);
}

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
      const parsed = marked.parse(stripMarkdownFrontmatter(content)) as string;
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
