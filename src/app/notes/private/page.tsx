'use client';

import { supabase } from '@/lib/supabase';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { ArrowLeft, Calendar, Folder, Lock } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

interface PrivateNote {
  id: string;
  title: string;
  category: string;
  content: string;
  created_at: string;
}

// Simple client-side Markdown parser for safe rendering
function SimpleMarkdown({ content }: { content: string }) {
  if (!content) {
    return null;
  }

  const lines = content.split('\n');
  return (
    <div className="space-y-4">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Headers
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="font-outfit text-foreground mt-6 mb-3 text-3xl font-extrabold">
              {trimmed.slice(2)}
            </h1>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="font-outfit text-foreground mt-5 mb-2 text-2xl font-bold">
              {trimmed.slice(3)}
            </h2>
          );
        }
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="font-outfit text-foreground mt-4 mb-2 text-xl font-semibold">
              {trimmed.slice(4)}
            </h3>
          );
        }

        // Bullet points
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <ul key={idx} className="text-muted-foreground list-outside list-disc space-y-1 pl-5">
              <li>{trimmed.slice(2)}</li>
            </ul>
          );
        }

        // Empty lines
        if (trimmed === '') {
          return <div key={idx} className="h-2" />;
        }

        // Blockquotes
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-primary/40 text-muted-foreground my-2 border-l-4 pl-4 italic">
              {trimmed.slice(2)}
            </blockquote>
          );
        }

        // Standard Paragraph
        return (
          <p key={idx} className="text-muted-foreground text-md leading-relaxed">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

export default function PrivateNotesPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<PrivateNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<PrivateNote | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && session.user.email === ADMIN_EMAIL) {
      fetchNotes();
    }
  }, [session]);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('private_notes').select('*').order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl px-4 py-16 text-center">
        <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-muted-foreground font-outfit mt-4">Loading private notes...</p>
      </div>
    );
  }

  // Not logged in or not admin
  if (!session || session.user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex w-full max-w-4xl justify-center px-4 py-16">
        <Card className="border-border w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Lock className="h-6 w-6" />
            </div>
            <CardTitle className="font-outfit text-2xl font-bold">Access Restricted</CardTitle>
            <CardDescription>
              This is a private area for administrative notes only. Please log in first.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Link href="/admin">
              <Button className="font-semibold">Go to Admin Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Viewing detail view of a single note
  if (selectedNote) {
    return (
      <div className="w-full max-w-4xl px-4 py-12 lg:px-8">
        <button
          onClick={() => setSelectedNote(null)}
          className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Notes List
        </button>

        <div className="border-border mb-8 border-b pb-6">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="bg-primary/10 text-primary flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              <Folder className="h-3 w-3" /> {selectedNote.category}
            </span>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" /> {new Date(selectedNote.created_at).toLocaleDateString()}
            </span>
          </div>
          <h1 className="font-outfit text-3xl font-extrabold tracking-tight lg:text-4xl">{selectedNote.title}</h1>
        </div>

        <div className="bg-card/30 border-border/50 rounded-2xl border p-6 backdrop-blur-sm lg:p-8">
          <SimpleMarkdown content={selectedNote.content} />
        </div>
      </div>
    );
  }

  // Notes List
  return (
    <div className="w-full max-w-4xl px-4 py-12 lg:px-8">
      <div className="border-border/50 mb-12 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-outfit text-3xl font-extrabold tracking-tight lg:text-4xl">Private Workspace Notes</h1>
          <p className="text-muted-foreground mt-1">Accessing secure administrative datastore</p>
        </div>
        <Link href="/admin">
          <Button variant="outline" size="sm">
            Manage Database
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {notes.length === 0 ? (
          <Card className="col-span-full border-dashed py-12 text-center">
            <CardHeader>
              <CardDescription>No private notes found in Supabase.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin">
                <Button variant="outline">Create a Note</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card
              key={note.id}
              className="border-border/50 bg-card/50 hover:bg-card/80 cursor-pointer transition-colors duration-200"
              onClick={() => setSelectedNote(note)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-outfit line-clamp-1 text-xl font-bold">{note.title}</CardTitle>
                  <span className="bg-primary/10 text-primary shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold">
                    {note.category}
                  </span>
                </div>
                <CardDescription className="flex items-center gap-1 pt-1 text-xs">
                  <Calendar className="h-3 w-3" /> {new Date(note.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 text-sm">{note.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
