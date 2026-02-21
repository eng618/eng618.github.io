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
    .filter((item) => item.slug !== '');
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
      const { data, content } = matter(fileContent);
      return {
        metadata: data as NoteMetadata,
        content,
        filePath: path.relative(process.cwd(), fullPath),
      };
    }
  }

  return null;
}
