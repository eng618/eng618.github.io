import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export interface NoteMetadata {
  title?: string;
  description?: string;
  date?: string;
  slug: string;
}

export type ContentType = 'notes' | 'code-notes' | 'apps';

function sanitizeSlug(slugArray: string[]): string {
  const rawSlug = slugArray.join('/');
  // Allow only URL-safe characters: letters, digits, hyphen, underscore, and forward slash for nesting
  const cleaned = rawSlug.replace(/[^A-Za-z0-9/_-]/g, '');
  // Normalize multiple slashes and trim leading/trailing slashes
  return cleaned.replace(/\/+/g, '/').replace(/^\/+|\/+$/g, '');
}

export function getAllContent(type: ContentType) {
  const basePath = path.join(CONTENT_PATH, type);
  if (!fs.existsSync(basePath)) {
    return [];
  }

  const getFilesRecursively = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.flatMap((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getFilesRecursively(res) : res;
    });
    return files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  };

  const files = getFilesRecursively(basePath);

  return files
    .map((filePath) => {
      const relativePath = path.relative(basePath, filePath);
      const slugArray = relativePath
        .replace(/\.mdx?$/, '')
        .replace(/index$/, '')
        .split(path.sep)
        .filter(Boolean);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      return {
        ...(data as NoteMetadata),
        slug: sanitizeSlug(slugArray),
      };
    })
    .filter((item) => item.slug !== '' && !item.slug.endsWith('privacy'));
}

export function getContentBySlug(type: ContentType, slugArray: string[]) {
  const slugPath = slugArray.join(path.sep);
  const basePath = path.join(CONTENT_PATH, type);

  const possiblePaths = [
    path.join(basePath, `${slugPath}.md`),
    path.join(basePath, `${slugPath}.mdx`),
    path.join(basePath, slugPath, 'index.md'),
    path.join(basePath, slugPath, 'index.mdx'),
  ];

  for (const fullPath of possiblePaths) {
    if (fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContent);
      let { content } = matter(fileContent);

      // Pre-process relative links inside MDX content to resolve relative to the current parent slug.
      // For example, if slug is ['eng618'], a link like `[Privacy Policy](./privacy)` becomes `[Privacy Policy](/apps/eng618/privacy)`
      const parentRoute = `/apps/${slugArray.slice(0, -1).join('/') || slugArray[0]}`;

      // Matches markdown links: [text](./relative) or [text](../relative) or [text](relative) where relative is not a URL
      content = content.replace(/\]\((?!\w+:)([^)]+)\)/g, (match, p1) => {
        let targetPath = p1.trim();
        // Resolve relative link relative to the current slug
        if (targetPath.startsWith('.')) {
          // Normalize the relative path manually
          const currentDir = `/apps/${slugArray.slice(0, -1).join('/') || slugArray[0]}`;
          if (targetPath.startsWith('./')) {
            targetPath = `${currentDir}/${targetPath.slice(2)}`;
          } else if (targetPath.startsWith('../')) {
            const grandDir = `/apps/${slugArray.slice(0, -2).join('/') || ''}`;
            targetPath = `${grandDir}/${targetPath.slice(3)}`.replace(/\/+$/, '');
          }
        } else if (!targetPath.startsWith('/') && !targetPath.startsWith('#')) {
          // It's a plain relative path (e.g., "privacy")
          const currentDir = `/apps/${slugArray.slice(0, -1).join('/') || slugArray[0]}`;
          targetPath = `${currentDir}/${targetPath}`;
        }

        // Remove trailing index/slash if any
        targetPath = targetPath.replace(/\/index$/, '').replace(/\/$/, '');
        return `](${targetPath})`;
      });

      return {
        metadata: data as NoteMetadata,
        content,
        filePath: path.relative(process.cwd(), fullPath),
      };
    }
  }

  return null;
}
