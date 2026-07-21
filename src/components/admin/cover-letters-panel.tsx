'use client';

import {
  applyTemplate,
  COVER_LETTER_TEMPLATES,
  type CoverLetterTemplate,
} from '@/components/admin/cover-letter-templates';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
import {
  COVER_LETTER_STATUSES,
  formatDate,
  generateSlug,
  getCoverLetterShareUrl,
  sanitizeSlug,
  stripMarkdown,
  type CoverLetter,
  type CoverLetterStatus,
} from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  toast,
} from '@gv-tech/ui-web';
import { Check, Copy, Edit2, ExternalLink, Plus, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

type CoverLettersPanelProps = {
  initialEditId?: string | null;
  onClearEditId?: () => void;
};

const STATUS_STYLES: Record<CoverLetterStatus, string> = {
  draft: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  archived: 'bg-muted text-muted-foreground',
};

export function CoverLettersPanel({ initialEditId, onClearEditId }: CoverLettersPanelProps) {
  const [letters, setLetters] = useState<CoverLetter[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<CoverLetter> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CoverLetterStatus>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'recipient'>('updated');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchLetters = useCallback(async () => {
    setLoading(true);
    setListError(null);
    const { data, error } = await supabase.from('cover_letters').select('*').order('created_at', { ascending: false });

    if (error) {
      setListError(error.message);
      setLetters([]);
    } else {
      setLetters((data as CoverLetter[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  useEffect(() => {
    if (!initialEditId || letters.length === 0) {
      return;
    }
    const match = letters.find((l) => l.id === initialEditId);
    if (match) {
      setEditing(match);
      setDirty(false);
      onClearEditId?.();
    }
  }, [initialEditId, letters, onClearEditId]);

  useEffect(() => {
    if (!dirty) {
      return;
    }
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  useEffect(() => {
    if (!editing) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        const form = document.getElementById('cover-letter-form') as HTMLFormElement | null;
        form?.requestSubmit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [editing]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let items = [...letters];

    if (statusFilter !== 'all') {
      items = items.filter((l) => (l.status || 'active') === statusFilter);
    }

    if (q) {
      items = items.filter((l) => {
        const haystack = [l.recipient, l.subject, l.slug, l.company, l.role_title, l.content]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    items.sort((a, b) => {
      if (sortBy === 'recipient') {
        return (a.recipient || '').localeCompare(b.recipient || '');
      }
      const aDate = sortBy === 'created' ? a.created_at : a.updated_at || a.created_at;
      const bDate = sortBy === 'created' ? b.created_at : b.updated_at || b.created_at;
      return new Date(bDate || 0).getTime() - new Date(aDate || 0).getTime();
    });

    return items;
  }, [letters, search, statusFilter, sortBy]);

  const updateField = <K extends keyof CoverLetter>(key: K, value: CoverLetter[K]) => {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : null));
    setDirty(true);
  };

  const startCreate = () => {
    setEditing({
      slug: generateSlug('cl'),
      recipient: '',
      subject: '',
      content: '',
      company: '',
      role_title: '',
      status: 'draft',
      applied_at: '',
    });
    setFormError(null);
    setDirty(false);
  };

  const startEdit = (letter: CoverLetter) => {
    setEditing({ ...letter });
    setFormError(null);
    setDirty(false);
  };

  const duplicateLetter = (letter: CoverLetter) => {
    setEditing({
      ...letter,
      id: undefined,
      slug: generateSlug(letter.company || letter.recipient || 'cl'),
      status: 'draft',
      subject: letter.subject ? `${letter.subject} (copy)` : '',
      created_at: undefined,
      updated_at: undefined,
    });
    setFormError(null);
    setDirty(true);
    toast({ title: 'Duplicated', description: 'Review the slug and details, then save.' });
  };

  const applyTemplateToEditor = (template: CoverLetterTemplate) => {
    if (!editing) {
      return;
    }
    const { subject, content } = applyTemplate(template, {
      company: editing.company || editing.recipient || undefined,
      role: editing.role_title || undefined,
    });
    setEditing({
      ...editing,
      subject: subject || editing.subject,
      content,
    });
    setDirty(true);
    toast({ title: 'Template applied', description: template.name });
  };

  const saveLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.slug || !editing?.content) {
      setFormError('Slug and content are required.');
      return;
    }

    setSaving(true);
    setFormError(null);

    const payload = {
      slug: sanitizeSlug(editing.slug),
      recipient: editing.recipient || '',
      subject: editing.subject || '',
      content: editing.content,
      company: editing.company || null,
      role_title: editing.role_title || null,
      status: editing.status || 'active',
      applied_at: editing.applied_at || null,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (editing.id) {
      result = await supabase.from('cover_letters').update(payload).eq('id', editing.id);
    } else {
      result = await supabase.from('cover_letters').insert([payload]);
    }

    // Fallback if optional columns are not migrated yet
    if (result.error && /column|schema cache/i.test(result.error.message)) {
      const basePayload = {
        slug: payload.slug,
        recipient: payload.recipient,
        subject: payload.subject,
        content: payload.content,
        updated_at: payload.updated_at,
      };
      if (editing.id) {
        result = await supabase.from('cover_letters').update(basePayload).eq('id', editing.id);
      } else {
        result = await supabase.from('cover_letters').insert([basePayload]);
      }
      if (!result.error) {
        toast({
          title: 'Saved (core fields)',
          description: 'Optional columns missing — run the Supabase migration for status/company fields.',
        });
      }
    }

    setSaving(false);

    if (result.error) {
      setFormError(result.error.message);
      toast({ title: 'Save failed', description: result.error.message, variant: 'destructive' });
      return;
    }

    setDirty(false);
    setEditing(null);
    toast({ title: 'Cover letter saved' });
    fetchLetters();
  };

  const deleteLetter = async (id: string) => {
    if (!confirm('Delete this cover letter? This cannot be undone.')) {
      return;
    }
    const { error } = await supabase.from('cover_letters').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Cover letter deleted' });
    if (editing?.id === id) {
      setEditing(null);
    }
    fetchLetters();
  };

  const copyLink = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(getCoverLetterShareUrl(slug));
      setCopiedId(slug);
      toast({ title: 'Share link copied' });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast({ title: 'Could not copy link', variant: 'destructive' });
    }
  };

  const cancelEdit = () => {
    if (dirty && !confirm('Discard unsaved changes?')) {
      return;
    }
    setEditing(null);
    setFormError(null);
    setDirty(false);
  };

  useEffect(() => {
    if (editing || loading || filtered.length === 0) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        startEdit(filtered[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editing, loading, filtered, selectedIndex]);

  if (editing) {
    return (
      <Card className="border-border">
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="font-outfit">{editing.id ? 'Edit cover letter' : 'Create cover letter'}</CardTitle>
              <CardDescription>
                Markdown with live preview. Cmd/Ctrl+S to save.
                {dirty ? ' · Unsaved changes' : ''}
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {COVER_LETTER_TEMPLATES.map((template) => (
                <Button
                  key={template.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => applyTemplateToEditor(template)}
                  title={template.description}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form id="cover-letter-form" onSubmit={saveLetter} className="space-y-4">
            {formError && (
              <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3 text-sm">
                {formError}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input
                  id="company"
                  placeholder="e.g., Acme"
                  value={editing.company || ''}
                  onChange={(e) => updateField('company', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role_title" className="text-sm font-medium">
                  Role
                </label>
                <Input
                  id="role_title"
                  placeholder="e.g., Principal Engineer"
                  value={editing.role_title || ''}
                  onChange={(e) => updateField('role_title', e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm font-medium">
                  Recipient organization / team
                </label>
                <Input
                  id="recipient"
                  placeholder="e.g., Cloud Engineering Team"
                  value={editing.recipient || ''}
                  onChange={(e) => updateField('recipient', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <select
                  id="status"
                  className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                  value={editing.status || 'draft'}
                  onChange={(e) => updateField('status', e.target.value as CoverLetterStatus)}
                >
                  {COVER_LETTER_STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="slug" className="text-sm font-medium">
                  Share slug (unguessable token)
                </label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    placeholder="auto-generated"
                    value={editing.slug || ''}
                    onChange={(e) => updateField('slug', sanitizeSlug(e.target.value))}
                    required
                    className="font-mono text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Regenerate slug"
                    onClick={() => updateField('slug', generateSlug(editing.company || editing.recipient || 'cl'))}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="applied_at" className="text-sm font-medium">
                  Applied date
                </label>
                <Input
                  id="applied_at"
                  type="date"
                  value={editing.applied_at?.slice(0, 10) || ''}
                  onChange={(e) => updateField('applied_at', e.target.value || null)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject line
              </label>
              <Input
                id="subject"
                placeholder="e.g., Application for Principal Engineer"
                value={editing.subject || ''}
                onChange={(e) => updateField('subject', e.target.value)}
              />
            </div>

            <MarkdownEditor
              id="letter-content"
              value={editing.content || ''}
              onChange={(value) => updateField('content', value)}
              placeholder="# Dear Team..."
              required
            />

            <div className="border-border/50 flex flex-wrap justify-end gap-3 border-t pt-4">
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
              {editing.slug && (
                <Button type="button" variant="outline" asChild>
                  <a href={`/cover-letter?slug=${editing.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Preview live
                  </a>
                </Button>
              )}
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save cover letter'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-outfit text-xl font-bold">Hosted cover letters</h2>
          <p className="text-muted-foreground text-sm">Secure slug links, templates, and application tracking.</p>
        </div>
        <Button onClick={startCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create letter
        </Button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          <Input
            placeholder="Search recipient, company, role, slug, content…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="border-input bg-background h-9 rounded-md border px-3 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | CoverLetterStatus)}
          >
            <option value="all">All statuses</option>
            {COVER_LETTER_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <select
            className="border-input bg-background h-9 rounded-md border px-3 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          >
            <option value="updated">Sort: updated</option>
            <option value="created">Sort: created</option>
            <option value="recipient">Sort: recipient</option>
          </select>
        </div>
      </div>

      {listError && (
        <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3 text-sm">
          Failed to load cover letters: {listError}
          <Button variant="link" className="ml-2 h-auto p-0" onClick={fetchLetters}>
            Retry
          </Button>
        </div>
      )}

      {loading ? (
        <div className="text-muted-foreground py-12 text-center text-sm">Loading cover letters…</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <Card className="col-span-full border-dashed py-12 text-center">
              <CardDescription>
                {letters.length === 0
                  ? 'No cover letters yet. Create one or start from a template.'
                  : 'No letters match your filters.'}
              </CardDescription>
            </Card>
          ) : (
            filtered.map((letter, index) => {
              const status = (letter.status || 'active') as CoverLetterStatus;
              return (
                <Card
                  key={letter.id}
                  className={`border-border flex flex-col justify-between transition-shadow ${index === selectedIndex ? 'ring-primary ring-2' : ''}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="font-outfit text-lg">
                        {letter.company || letter.recipient || 'Untitled'}
                      </CardTitle>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${STATUS_STYLES[status]}`}
                      >
                        {status}
                      </span>
                    </div>
                    <CardDescription className="space-y-1">
                      {letter.role_title && <span className="block">{letter.role_title}</span>}
                      <span className="font-mono text-xs">{letter.slug}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-muted-foreground mb-2 line-clamp-2 text-sm font-medium">
                      {letter.subject || 'No subject'}
                    </p>
                    <p className="text-muted-foreground line-clamp-2 text-xs">{stripMarkdown(letter.content)}</p>
                    <p className="text-muted-foreground mt-3 text-xs">
                      Updated {formatDate(letter.updated_at || letter.created_at)}
                      {letter.applied_at ? ` · Applied ${formatDate(letter.applied_at)}` : ''}
                    </p>
                  </CardContent>
                  <CardFooter className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                    <div className="flex items-center gap-1">
                      <Button
                        onClick={() => copyLink(letter.slug)}
                        variant="ghost"
                        size="sm"
                        title="Copy share link"
                        className="h-8 w-8 p-0"
                      >
                        {copiedId === letter.slug ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <a
                        href={`/cover-letter?slug=${letter.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-muted text-muted-foreground hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-md"
                        title="Open live view"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <Button
                        onClick={() => duplicateLetter(letter)}
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        title="Duplicate"
                      >
                        Duplicate
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => startEdit(letter)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Edit2 className="h-3.5 w-3.5" /> Edit
                      </Button>
                      <Button
                        onClick={() => deleteLetter(letter.id)}
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
      )}

      {!loading && letters.length > 0 && (
        <div className="text-muted-foreground flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{letters.length} total</Badge>
          <Badge variant="outline">{filtered.length} shown</Badge>
        </div>
      )}
    </div>
  );
}
