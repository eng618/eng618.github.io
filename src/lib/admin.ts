import { trackEvent } from './analytics';

export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

export type CoverLetterStatus = 'draft' | 'active' | 'archived';

export interface CoverLetter {
  id: string;
  slug: string;
  recipient: string;
  subject: string;
  content: string;
  company?: string | null;
  role_title?: string | null;
  status?: CoverLetterStatus | null;
  applied_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PrivateNote {
  id: string;
  title: string;
  category: string;
  content: string;
  tags?: string[] | null;
  pinned?: boolean | null;
  created_at?: string;
  updated_at?: string;
}

export const COVER_LETTER_STATUSES: { value: CoverLetterStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
];

/** Generate an unguessable slug token (optionally with a readable prefix). */
export function generateSlug(prefix = ''): string {
  const token =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().replace(/-/g, '').slice(0, 12)
      : Math.random().toString(36).slice(2, 14);

  const safePrefix = prefix
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 24);

  return safePrefix ? `${safePrefix}-${token}` : token;
}

/** Normalize user-entered slug characters. */
export function sanitizeSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-_]/g, '');
}

/** Strip markdown syntax for list card previews. */
export function stripMarkdown(content: string, maxLength = 160): string {
  const plain = content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= maxLength) {
    return plain;
  }
  return `${plain.slice(0, maxLength).trim()}…`;
}

export function formatDate(value?: string | null): string {
  if (!value) {
    return '—';
  }
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '—';
  }
}

export function getCoverLetterShareUrl(slug: string, origin?: string): string {
  const base = origin || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/cover-letter?slug=${slug}`;
}

export function trackAdminEvent(eventName: string, props?: Record<string, string | number | boolean>) {
  trackEvent(eventName, props);
}
