'use client';

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
import { useCallback, useMemo, useState } from 'react';

import {
  applyTemplate,
  COVER_LETTER_TEMPLATES,
  type CoverLetterTemplate,
} from '@/components/admin/cover-letter-templates';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { useCrudPanel, type CrudConfig } from '@/hooks/use-crud-panel';
import {
  COVER_LETTER_STATUSES,
  formatDate,
  generateSlug,
  getCoverLetterShareUrl,
  sanitizeSlug,
  stripMarkdown,
  trackAdminEvent,
  type CoverLetter,
  type CoverLetterStatus,
} from '@/lib/admin';

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const config = useMemo<CrudConfig<CoverLetter, CoverLetterStatus | 'all'>>(
    () => ({
      table: 'cover_letters',
      emptyItem: () => ({
        slug: generateSlug('cl'),
        recipient: '',
        subject: '',
        content: '',
        company: '',
        role_title: '',
        status: 'draft' as CoverLetterStatus,
        applied_at: '',
      }),
      toPayload: (editing) => ({
        slug: sanitizeSlug(editing.slug || ''),
        recipient: editing.recipient || '',
        subject: editing.subject || '',
        content: editing.content,
        company: editing.company || null,
        role_title: editing.role_title || null,
        status: editing.status || 'active',
        applied_at: editing.applied_at || null,
        updated_at: new Date().toISOString(),
      }),
      validate: (editing) => {
        if (!editing.slug || !editing.content) {
          return 'Slug and content are required.';
        }
        return null;
      },
      deleteMessage: () => 'Delete this cover letter? This cannot be undone.',
      savedMessage: 'Cover letter saved',
      deletedMessage: 'Cover letter deleted',
      trackSave: ({ isNew, payload }) => {
        trackAdminEvent('Admin Cover Letter Saved', {
          is_new: isNew,
          has_company: Boolean(payload.company),
          status: typeof payload.status === 'string' ? payload.status : 'active',
        });
      },
      trackDelete: ({ id }) => {
        trackAdminEvent('Admin Cover Letter Deleted', { id });
      },
      allFilterValue: 'all',
      filterMatches: (letter, filterValue) => filterValue === 'all' || (letter.status || 'active') === filterValue,
      sortText: (letter, sortBy) => (sortBy === 'recipient' ? letter.recipient || '' : null),
    }),
    [],
  );

  const {
    items: letters,
    loading,
    listError,
    editing,
    formError,
    saving,
    dirty,
    search,
    setSearch,
    filter: statusFilter,
    setFilter: setStatusFilter,
    sortBy,
    setSortBy,
    filtered,
    selectedIndex,
    fetchItems: fetchLetters,
    startCreate,
    startEdit,
    cancelEdit,
    saveItem: saveLetter,
    deleteItem: deleteLetter,
    updateField,
    setEditing,
    setDirty,
    setFormError,
  } = useCrudPanel<CoverLetter, CoverLetterStatus | 'all'>(config, initialEditId, onClearEditId);

  const duplicateLetter = useCallback(
    (letter: CoverLetter) => {
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
    },
    [setEditing, setFormError, setDirty],
  );

  const applyTemplateToEditor = useCallback(
    (template: CoverLetterTemplate) => {
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
      trackAdminEvent('Admin Template Applied', { template: template.id });
      toast({ title: 'Template applied', description: template.name });
    },
    [editing, setEditing, setDirty],
  );

  const copyLink = useCallback(async (slug: string) => {
    try {
      await navigator.clipboard.writeText(getCoverLetterShareUrl(slug));
      setCopiedId(slug);
      trackAdminEvent('Admin Cover Letter Link Copied', { slug });
      toast({ title: 'Share link copied' });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast({ title: 'Could not copy link', variant: 'destructive' });
    }
  }, []);

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
          <form id="cover_letters-form" onSubmit={saveLetter} className="space-y-4">
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
            onChange={(e) => setStatusFilter(e.target.value as CoverLetterStatus | 'all')}
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
