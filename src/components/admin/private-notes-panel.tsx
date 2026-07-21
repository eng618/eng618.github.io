'use client';

import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { formatDate, stripMarkdown, type PrivateNote } from '@/lib/admin';
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
import { Download, Edit2, ExternalLink, Pin, PinOff, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

type PrivateNotesPanelProps = {
  initialEditId?: string | null;
  onClearEditId?: () => void;
};

export function PrivateNotesPanel({ initialEditId, onClearEditId }: PrivateNotesPanelProps) {
  const [notes, setNotes] = useState<PrivateNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partial<PrivateNote> | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title'>('updated');
  const [tagsInput, setTagsInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setListError(null);
    const { data, error } = await supabase.from('private_notes').select('*').order('created_at', { ascending: false });

    if (error) {
      setListError(error.message);
      setNotes([]);
    } else {
      setNotes((data as PrivateNote[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (!initialEditId || notes.length === 0) {
      return;
    }
    const match = notes.find((n) => n.id === initialEditId);
    if (match) {
      setEditing(match);
      setTagsInput((match.tags || []).join(', '));
      setDirty(false);
      onClearEditId?.();
    }
  }, [initialEditId, notes, onClearEditId]);

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
        const form = document.getElementById('private-note-form') as HTMLFormElement | null;
        form?.requestSubmit();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [editing]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => {
      if (n.category?.trim()) {
        set.add(n.category.trim());
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let items = [...notes];

    if (categoryFilter !== 'all') {
      items = items.filter((n) => n.category === categoryFilter);
    }

    if (q) {
      items = items.filter((n) => {
        const tagText = (n.tags || []).join(' ');
        const haystack = [n.title, n.category, n.content, tagText].join(' ').toLowerCase();
        return haystack.includes(q);
      });
    }

    items.sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return -1;
      }
      if (!a.pinned && b.pinned) {
        return 1;
      }

      if (sortBy === 'title') {
        return (a.title || '').localeCompare(b.title || '');
      }
      const aDate = sortBy === 'created' ? a.created_at : a.updated_at || a.created_at;
      const bDate = sortBy === 'created' ? b.created_at : b.updated_at || b.created_at;
      return new Date(bDate || 0).getTime() - new Date(aDate || 0).getTime();
    });

    return items;
  }, [notes, search, categoryFilter, sortBy]);

  const updateField = <K extends keyof PrivateNote>(key: K, value: PrivateNote[K]) => {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : null));
    setDirty(true);
  };

  const startCreate = () => {
    setEditing({
      title: '',
      category: categories[0] || 'General',
      content: '',
      tags: [],
    });
    setTagsInput('');
    setFormError(null);
    setDirty(false);
  };

  const startEdit = (note: PrivateNote) => {
    setEditing({ ...note });
    setTagsInput((note.tags || []).join(', '));
    setFormError(null);
    setDirty(false);
  };

  const parseTags = (value: string): string[] =>
    value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

  const saveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.content) {
      setFormError('Title and content are required.');
      return;
    }

    setSaving(true);
    setFormError(null);

    const tags = parseTags(tagsInput);
    const payload = {
      title: editing.title,
      category: editing.category?.trim() || 'General',
      content: editing.content,
      tags,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (editing.id) {
      result = await supabase.from('private_notes').update(payload).eq('id', editing.id);
    } else {
      result = await supabase.from('private_notes').insert([payload]);
    }

    if (result.error && /column|schema cache/i.test(result.error.message)) {
      const basePayload = {
        title: payload.title,
        category: payload.category,
        content: payload.content,
        updated_at: payload.updated_at,
      };
      if (editing.id) {
        result = await supabase.from('private_notes').update(basePayload).eq('id', editing.id);
      } else {
        result = await supabase.from('private_notes').insert([basePayload]);
      }
      if (!result.error) {
        toast({
          title: 'Saved (core fields)',
          description: 'Optional tags column missing — run the Supabase migration to enable tags.',
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
    toast({ title: 'Note saved' });
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    if (!confirm('Delete this note? This cannot be undone.')) {
      return;
    }
    const { error } = await supabase.from('private_notes').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Note deleted' });
    if (editing?.id === id) {
      setEditing(null);
    }
    fetchNotes();
  };

  const cancelEdit = () => {
    if (dirty && !confirm('Discard unsaved changes?')) {
      return;
    }
    setEditing(null);
    setFormError(null);
    setDirty(false);
  };

  const togglePin = async (id: string, currentPinned: boolean) => {
    const { error } = await supabase
      .from('private_notes')
      .update({ pinned: !currentPinned, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      toast({ title: 'Failed to update pin', description: error.message, variant: 'destructive' });
      return;
    }
    fetchNotes();
  };

  const exportNote = (note: PrivateNote) => {
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
  };

  useEffect(() => {
    if (editing || loading || filtered.length === 0) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
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
          <CardTitle className="font-outfit">{editing.id ? 'Edit private note' : 'Create private note'}</CardTitle>
          <CardDescription>
            Markdown with live preview. Cmd/Ctrl+S to save.
            {dirty ? ' · Unsaved changes' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="private-note-form" onSubmit={saveNote} className="space-y-4">
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
                    <option key={cat} value={cat} />
                  ))}
                  <option value="General" />
                  <option value="Verizon" />
                  <option value="IBM" />
                  <option value="Personal" />
                  <option value="Career" />
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
                  setDirty(true);
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
