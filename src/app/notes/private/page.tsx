'use client';

import { Breadcrumb } from '@/components/breadcrumb';
import { MarkdownContent } from '@/components/markdown-content';
import { MobileTOC } from '@/components/mobile-sub-header';
import { TableOfContents, TableOfContentsContent, TableOfContentsList } from '@/components/table-of-contents';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { formatDate, stripMarkdown, type PrivateNote } from '@/lib/admin';
import { supabase } from '@/lib/supabase';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  SidebarTrigger,
} from '@gv-tech/ui-web';
import { Calendar, Edit2, Folder, Lock, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';

function PrivateNotesContent() {
  const { session, loading: authLoading, isAdmin } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<PrivateNote[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const searchParams = useSearchParams();
  const activeId = searchParams?.get('id') || null;

  useEffect(() => {
    if (authLoading) {
      return;
    }
    if (session && isAdmin) {
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, [session, isAdmin, authLoading]);

  const fetchNotes = async () => {
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase.from('private_notes').select('*').order('created_at', { ascending: false });

    if (error) {
      setFetchError(error.message);
      setNotes([]);
    } else {
      setNotes((data as PrivateNote[]) || []);
    }
    setLoading(false);
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    notes.forEach((n) => {
      if (n.category?.trim()) {
        set.add(n.category.trim());
      }
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return notes.filter((n) => {
      if (categoryFilter !== 'all' && n.category !== categoryFilter) {
        return false;
      }
      if (!q) {
        return true;
      }
      const haystack = [n.title, n.category, n.content, ...(n.tags || [])].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [notes, search, categoryFilter]);

  if (authLoading || loading) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center">
        <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground font-outfit mt-4">Loading private notes…</p>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return (
      <div className="flex w-full max-w-4xl justify-center px-4 py-16">
        <Card className="border-border w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="font-outfit text-2xl font-bold">Access restricted</CardTitle>
            <CardDescription>
              This is a private area for administrative notes only. Please log in first.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Link href="/admin">
              <Button className="font-semibold">Go to admin login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedNote = notes.find((n) => n.id === activeId) || null;

  const breadcrumbs: { label: string; href: string; current?: boolean }[] = [
    { label: 'Notes', href: '/notes' },
    { label: 'Private Notes', href: '/notes/private' },
  ];
  if (selectedNote) {
    breadcrumbs.push({ label: selectedNote.title, href: '#', current: true });
  }

  if (selectedNote) {
    return (
      <TableOfContents minLevel={1} maxLevel={4}>
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
            <article className="w-full min-w-0 flex-1 py-8 lg:py-12">
              <div className="bg-background/95 border-border no-print sticky top-16 z-30 -mx-4 mb-8 flex items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <SidebarTrigger />
                  <Breadcrumb items={breadcrumbs} className="mb-0" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin?tab=private-notes&id=${selectedNote.id}`}>
                      <Edit2 className="mr-1.5 h-3.5 w-3.5" /> Edit
                    </Link>
                  </Button>
                  <MobileTOC />
                </div>
              </div>

              <div className="border-border mb-8 border-b pb-6">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                    <Folder className="h-3 w-3" /> {selectedNote.category}
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Calendar className="h-3 w-3" /> {formatDate(selectedNote.updated_at || selectedNote.created_at)}
                  </span>
                </div>
                <h1 className="font-outfit text-3xl font-extrabold tracking-tight lg:text-4xl">{selectedNote.title}</h1>
                {(selectedNote.tags || []).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(selectedNote.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="border-border text-muted-foreground rounded-full border px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <TableOfContentsContent className="bg-card/30 border-border/50 rounded-2xl border p-6 backdrop-blur-sm lg:p-8">
                <MarkdownContent content={selectedNote.content} headingIds />
              </TableOfContentsContent>
            </article>

            <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 py-12 lg:block xl:w-64">
              <div className="flex flex-col gap-4">
                <h2 className="font-outfit text-sm font-semibold tracking-wider uppercase">On this page</h2>
                <TableOfContentsList className="text-sm" />
              </div>
            </aside>
          </div>
        </div>
      </TableOfContents>
    );
  }

  return (
    <div className="w-full">
      <div className="no-print mb-8 flex items-center gap-4">
        <SidebarTrigger />
        <Breadcrumb items={breadcrumbs} className="mb-0" />
      </div>

      <div className="border-border/50 mb-8 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-outfit text-3xl font-extrabold tracking-tight lg:text-4xl">Private workspace notes</h1>
          <p className="text-muted-foreground mt-1">Secure administrative notes</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin?tab=private-notes">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> New note
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin?tab=private-notes">Manage in admin</Link>
          </Button>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          <Input
            placeholder="Search notes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
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
      </div>

      {fetchError && (
        <div className="bg-destructive/10 text-destructive border-destructive/20 mb-6 rounded-lg border p-3 text-sm">
          Failed to load notes: {fetchError}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {filteredNotes.length === 0 ? (
          <Card className="col-span-full border-dashed py-12 text-center">
            <CardHeader>
              <CardDescription>
                {notes.length === 0 ? 'No private notes found in Supabase.' : 'No notes match your filters.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin?tab=private-notes">
                <Button variant="outline">Create a note</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredNotes.map((note) => (
            <Link key={note.id} href={`/notes/private?id=${note.id}`}>
              <Card className="border-border/50 bg-card/50 hover:bg-card/80 h-full cursor-pointer transition-colors duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-outfit line-clamp-1 text-xl font-bold">{note.title}</CardTitle>
                    <span className="bg-primary/10 text-primary shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold">
                      {note.category}
                    </span>
                  </div>
                  <CardDescription className="flex items-center gap-1 pt-1 text-xs">
                    <Calendar className="h-3 w-3" /> {formatDate(note.updated_at || note.created_at)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3 text-sm">{stripMarkdown(note.content)}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default function PrivateNotesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-4xl px-4 py-16 text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-muted-foreground font-outfit mt-4">Loading private notes…</p>
        </div>
      }
    >
      <PrivateNotesContent />
    </Suspense>
  );
}
