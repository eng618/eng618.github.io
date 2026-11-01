import { marked } from 'marked';
import { expect, test } from 'vitest';

import { stripMarkdownFrontmatter } from '@/components/markdown-content';

marked.setOptions({ gfm: true, breaks: true });

const roadmap = `---
title: Career roadmap
description: A brag list of milestones in my career.
category: Career
---

> A place to keep track of my career milestones.

## 2026
`;

test('strips a key-value frontmatter block before markdown parsing', () => {
  const html = marked.parse(stripMarkdownFrontmatter(roadmap)) as string;
  expect(html).not.toContain('title: Career roadmapdescription');
  expect(html).toContain('<h2>2026</h2>');
  expect(html).toContain('A place to keep track of my career milestones.');
});

test('leaves a horizontal rule and ordinary markdown alone', () => {
  expect(stripMarkdownFrontmatter('---\n\nDear hiring manager,\n')).toBe('---\n\nDear hiring manager,\n');
  expect(stripMarkdownFrontmatter('# Title\n\nBody\n')).toBe('# Title\n\nBody\n');
});
