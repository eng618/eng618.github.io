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
} from '@gv-tech/ui-web';
import { Download, Edit2, ExternalLink, Pin, PinOff, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { useCrudPanel, type CrudConfig } from '@/hooks/use-crud-panel';
import { formatDate, stripMarkdown, trackAdminEvent, type PrivateNote } from '@/lib/admin';

type PrivateNotesPanelProps = {
  initialEditId?: string | null;
  onClearEditId?: () => void;
};

function parseTags(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function PrivateNotesPanel({ initialEditId, onClearEditId }: PrivateNotesPanelProps) {
  const [tagsInput, setTagsInput] = useState('');

  const config = useMemo<CrudConfig<PrivateNote, string>>(
    () => ({
      table: 'private_notes',
      emptyItem: () => ({
        title: '',
        category: 'General',
        content: '',
        tags: [],
        pinned: false,
      }),
      toPayload: (editing) => ({
        title: editing.title,
        category: editing.category?.trim() || 'General',
        content: editing.content,
        tags: Array.isArray(editing.tags) ? editing.tags : [],
        updated_at: new Date().toISOString(),
      }),
      validate: (editing) => {
        if (!editing.title || !editing.content) {
          return 'Title and content are required.';
        }
        return null;
      },
      deleteMessage: () => 'Delete this note? This cannot be undone.',
      savedMessage: 'Note saved',
      deletedMessage: 'Note deleted',
      trackSave: ({ isNew, payload }) => {
        trackAdminEvent('Admin Private Note Saved', {
          is_new: isNew,
          category: typeof payload.category === 'string' ? payload.category : 'General',
          tag_count: Array.isArray(payload.tags) ? payload.tags.length : 0,
        });
      },
      trackDelete: ({ id }) => {
        trackAdminEvent('Admin Private Note Deleted', { id });
      },
      trackPin: ({ pinned }) => {
        trackAdminEvent('Admin Private Note Pin Toggled', { pinned });
      },
      allFilterValue: 'all',
      filterMatches: (note, filterValue) => filterValue === 'all' || note.category === filterValue,
      sortText: (note, sortBy) => (sortBy === 'title' ? note.title || '' : null),
    }),
    [],
  );

  const {
    items: notes,
    loading,
    listError,
    editing,
    formError,
    saving,
    dirty,
    search,
    setSearch,
    filter: categoryFilter,
    setFilter: setCategoryFilter,
    sortBy,
    setSortBy,
    categories,
    filtered,
    selectedIndex,
    fetchItems: fetchNotes,
    startCreate,
    startEdit,
    cancelEdit,
    saveItem: saveNote,
    deleteItem: deleteNote,
    togglePin,
    updateField,
  } = useCrudPanel<PrivateNote, string>(config, initialEditId, onClearEditId);

  // Fill the tags box when the edited record changes. Later keystrokes stay in
  // local state so joining the parsed tags does not rewrite the input.
  const editSession = editing ? (editing.id ?? '__new__') : null;
  const [syncedSession, setSyncedSession] = useState<string | null>(null);
  if (editSession !== syncedSession) {
    setSyncedSession(editSession);
    setTagsInput((editing?.tags ?? []).join(', '));
  }

  const exportNote = useCallback((note: PrivateNote) => {
    const content = `# ${note.title}\n\nCategory: ${note.category}\nTags: ${(note.tags || []).join(', ')}\nDate: ${formatDate(note.updated_at || note.created_at)}\n\n---\n\n${note.content}`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackAdminEvent('Admin Private Note Exported', { category: note.category });
  }, []);

  if (editing) {
    return (
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="font-outfit">{editing.id ? 'Edit private note' : 'Create private note'}</CardTitle>
          <CardDescription>
            Markdown with live preview. Cmd/Ctrl+S to save.
            {dirty ? ' · Unsaved changes' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="private_notes-form" onSubmit={saveNote} className="space-y-4">
            {formError && (
              <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3 text-sm">
                {formError}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Note title
                </label>
                <Input
                  id="title"
                  placeholder="e.g., Verizon security escalation"
                  value={editing.title || ''}
                  onChange={(e) => updateField('title', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Input
                  id="category"
                  list="note-categories"
                  placeholder="e.g., Verizon, IBM, Personal"
                  value={editing.category || ''}
                  onChange={(e) => updateField('category', e.target.value)}
                />
                <datalist id="note-categories">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="General">General</option>
                  <option value="Verizon">Verizon</option>
                  <option value="IBM">IBM</option>
                  <option value="Personal">Personal</option>
                  <option value="Career">Career</option>
                </datalist>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma-separated)
              </label>
              <Input
                id="tags"
                placeholder="e.g., meeting, follow-up, architecture"
                value={tagsInput}
                onChange={(e) => {
                  setTagsInput(e.target.value);
                  updateField('tags', parseTags(e.target.value));
                }}
              />
            </div>

            <MarkdownEditor
              id="note-content"
              value={editing.content || ''}
              onChange={(value) => updateField('content', value)}
              placeholder="# Meeting notes..."
              required
            />

            <div className="border-border/50 flex flex-wrap justify-end gap-3 border-t pt-4">
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
              {editing.id && (
                <Button type="button" variant="outline" asChild>
                  <Link href={`/notes/private?id=${editing.id}`} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Open in notes
                  </Link>
                </Button>
              )}
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save note'}
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
          <h2 className="font-outfit text-xl font-bold">Private work notes</h2>
          <p className="text-muted-foreground text-sm">Strictly private notes protected by Row-Level Security.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href="/notes/private">View notes workspace</Link>
          </Button>
          <Button onClick={startCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create note
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          <Input
            placeholder="Search title, category, tags, content…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="border-input bg-background h-9 rounded-md border px-3 text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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
            <option value="title">Sort: title</option>
          </select>
        </div>
      </div>

      {listError && (
        <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3 text-sm">
          Failed to load notes: {listError}
          <Button variant="link" className="ml-2 h-auto p-0" onClick={fetchNotes}>
            Retry
          </Button>
        </div>
      )}

      {loading ? (
        <div className="text-muted-foreground py-12 text-center text-sm">Loading notes…</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <Card className="col-span-full border-dashed py-12 text-center">
              <CardDescription>
                {notes.length === 0 ? 'No private notes yet. Create your first note.' : 'No notes match your filters.'}
              </CardDescription>
            </Card>
          ) : (
            filtered.map((note, index) => (
              <Card
                key={note.id}
                className={`border-border flex flex-col justify-between transition-shadow ${index === selectedIndex ? 'ring-primary ring-2' : ''}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {note.pinned && <Pin className="h-4 w-4 shrink-0 text-amber-500" />}
                      <CardTitle className="font-outfit text-lg">{note.title}</CardTitle>
                    </div>
                    <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap">
                      {note.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-muted-foreground line-clamp-3 text-sm">{stripMarkdown(note.content)}</p>
                  {(note.tags || []).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {(note.tags || []).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-muted-foreground mt-3 text-xs">
                    Updated {formatDate(note.updated_at || note.created_at)}
                  </p>
                </CardContent>
                <CardFooter className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                      <Link href={`/notes/private?id=${note.id}`} target="_blank">
                        <ExternalLink className="mr-1 h-3.5 w-3.5" /> View
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => togglePin(note.id, !!note.pinned)}
                      title={note.pinned ? 'Unpin' : 'Pin'}
                    >
                      {note.pinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => exportNote(note)}
                      title="Export Markdown"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => startEdit(note)}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Edit2 className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button
                      onClick={() => deleteNote(note.id)}
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}

      {!loading && notes.length > 0 && (
        <div className="text-muted-foreground flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{notes.length} total</Badge>
          <Badge variant="outline">{filtered.length} shown</Badge>
          <Badge variant="outline">{categories.length} categories</Badge>
        </div>
      )}
    </div>
  );
}
