'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { supabase } from '@/lib/supabase';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@gv-tech/ui-web';
import { Check, Copy, Edit2, ExternalLink, Key, Lock, LogOut, Mail, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

interface CoverLetter {
  id: string;
  slug: string;
  recipient: string;
  subject: string;
  content: string;
  created_at?: string;
}

interface PrivateNote {
  id: string;
  title: string;
  category: string;
  content: string;
  created_at?: string;
}

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [loginMsg, setLoginMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState('cover-letters');

  // Cover Letters State
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [editingLetter, setEditingLetter] = useState<Partial<CoverLetter> | null>(null);
  const [letterError, setLetterError] = useState<string | null>(null);

  // Private Notes State
  const [privateNotes, setPrivateNotes] = useState<PrivateNote[]>([]);
  const [editingNote, setEditingNote] = useState<Partial<PrivateNote> | null>(null);
  const [noteError, setNoteError] = useState<string | null>(null);

  // Copied slug state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen to changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch letters & notes when logged in as admin
  useEffect(() => {
    if (session && session.user.email === ADMIN_EMAIL) {
      fetchCoverLetters();
      fetchPrivateNotes();
    }
  }, [session]);

  const fetchCoverLetters = async () => {
    const { data, error } = await supabase.from('cover_letters').select('*').order('created_at', { ascending: false });

    if (!error && data) {
      setCoverLetters(data);
    }
  };

  const fetchPrivateNotes = async () => {
    const { data, error } = await supabase.from('private_notes').select('*').order('created_at', { ascending: false });

    if (!error && data) {
      setPrivateNotes(data);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    setLoading(true);
    setLoginMsg(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/admin',
      },
    });

    setLoading(false);
    if (error) {
      setLoginMsg({ type: 'error', text: error.message });
    } else {
      setLoginMsg({ type: 'success', text: 'Magic link sent! Check your email inbox.' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const saveCoverLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLetter?.slug || !editingLetter?.content) {
      setLetterError('Slug and Content are required fields.');
      return;
    }

    setLetterError(null);
    const payload = {
      slug: editingLetter.slug,
      recipient: editingLetter.recipient || '',
      subject: editingLetter.subject || '',
      content: editingLetter.content,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (editingLetter.id) {
      result = await supabase.from('cover_letters').update(payload).eq('id', editingLetter.id);
    } else {
      result = await supabase.from('cover_letters').insert([payload]);
    }

    if (result.error) {
      setLetterError(result.error.message);
    } else {
      setEditingLetter(null);
      fetchCoverLetters();
    }
  };

  const deleteCoverLetter = async (id: string) => {
    if (confirm('Are you sure you want to delete this cover letter?')) {
      const { error } = await supabase.from('cover_letters').delete().eq('id', id);
      if (!error) {
        fetchCoverLetters();
      }
    }
  };

  const savePrivateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNote?.title || !editingNote?.content) {
      setNoteError('Title and Content are required fields.');
      return;
    }

    setNoteError(null);
    const payload = {
      title: editingNote.title,
      category: editingNote.category || 'General',
      content: editingNote.content,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (editingNote.id) {
      result = await supabase.from('private_notes').update(payload).eq('id', editingNote.id);
    } else {
      result = await supabase.from('private_notes').insert([payload]);
    }

    if (result.error) {
      setNoteError(result.error.message);
    } else {
      setEditingNote(null);
      fetchPrivateNotes();
    }
  };

  const deletePrivateNote = async (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      const { error } = await supabase.from('private_notes').delete().eq('id', id);
      if (!error) {
        fetchPrivateNotes();
      }
    }
  };

  const copySharingLink = (slug: string) => {
    const link = `${window.location.origin}/cover-letter/${slug}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiedId(slug);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="bg-background flex flex-grow items-center justify-center">
          <div className="text-center">
            <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            <p className="text-muted-foreground font-outfit mt-4">Verifying session...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not Logged In screen
  if (!session) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="bg-background flex flex-grow items-center justify-center px-4 py-20">
          <Card className="border-border w-full max-w-md shadow-2xl backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Lock className="h-6 w-6" />
              </div>
              <CardTitle className="font-outfit text-2xl font-bold">Admin Portal</CardTitle>
              <CardDescription>
                Authenticate using email magic link to manage secure notes and cover letters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm leading-none font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {loginMsg && (
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      loginMsg.type === 'success'
                        ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                        : 'bg-destructive/10 text-destructive border-destructive/20 border'
                    }`}
                  >
                    {loginMsg.text}
                  </div>
                )}

                <Button type="submit" className="w-full font-semibold">
                  Send Magic Link
                </Button>
              </form>
            </CardContent>
            <CardFooter className="border-border/50 justify-center border-t py-4">
              <p className="text-muted-foreground text-xs">
                Only authorized administrator accounts can access backend resources.
              </p>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Logged in but not Admin Email
  if (session.user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="bg-background flex flex-grow items-center justify-center px-4 py-20">
          <Card className="border-border w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Key className="h-6 w-6" />
              </div>
              <CardTitle className="font-outfit text-2xl font-bold">Access Denied</CardTitle>
              <CardDescription>
                Your account ({session.user.email}) is not authorized to access this administration page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Authorized Admin Dashboard
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow py-12">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          {/* Header Row */}
          <div className="border-border/50 mb-8 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-outfit text-3xl font-extrabold tracking-tight lg:text-4xl">Admin Control Panel</h1>
              <p className="text-muted-foreground mt-1">Logged in as {session.user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="/notes/private"
                className="border-border hover:bg-muted inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors"
              >
                View Private Notes
              </a>
              <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Log Out
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="cover-letters">Cover Letters</TabsTrigger>
              <TabsTrigger value="private-notes">Private Notes</TabsTrigger>
            </TabsList>

            {/* COVER LETTERS TAB */}
            <TabsContent value="cover-letters" className="space-y-6">
              {!editingLetter ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-outfit text-xl font-bold">Hosted Cover Letters</h2>
                      <p className="text-muted-foreground text-sm">
                        Cover letters securely served via API with custom slugs.
                      </p>
                    </div>
                    <Button onClick={() => setEditingLetter({})} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Create Letter
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {coverLetters.length === 0 ? (
                      <Card className="col-span-full border-dashed py-12 text-center">
                        <CardDescription>
                          No cover letters created yet. Click "Create Letter" to get started.
                        </CardDescription>
                      </Card>
                    ) : (
                      coverLetters.map((letter) => (
                        <Card key={letter.id} className="border-border flex flex-col justify-between">
                          <CardHeader className="pb-3">
                            <CardTitle className="font-outfit text-lg">{letter.recipient || 'No Recipient'}</CardTitle>
                            <CardDescription className="font-mono text-xs">{letter.slug}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-3">
                            <p className="text-muted-foreground line-clamp-3 text-sm">
                              {letter.subject || 'No Subject'}
                            </p>
                          </CardContent>
                          <CardFooter className="border-border/40 flex items-center justify-between border-t pt-3">
                            <div className="flex items-center gap-1">
                              <Button
                                onClick={() => copySharingLink(letter.slug)}
                                variant="ghost"
                                size="sm"
                                title="Copy Sharing Link"
                                className="h-8 w-8 p-0"
                              >
                                {copiedId === letter.slug ? (
                                  <Check className="h-4 w-4 text-emerald-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <a
                                href={`/cover-letter/${letter.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:bg-muted text-muted-foreground hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-md"
                                title="Open Live View"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => setEditingLetter(letter)}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Edit2 className="h-3.5 w-3.5" /> Edit
                              </Button>
                              <Button
                                onClick={() => deleteCoverLetter(letter.id)}
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Trash2 className="h-3.5 w-3.5" /> Delete
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-outfit">
                      {editingLetter.id ? 'Edit Cover Letter' : 'Create Cover Letter'}
                    </CardTitle>
                    <CardDescription>Fill out the fields below. Content supports full Markdown.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={saveCoverLetter} className="space-y-4">
                      {letterError && (
                        <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3 text-sm">
                          {letterError}
                        </div>
                      )}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="recipient" className="text-sm leading-none font-medium">
                            Recipient Organization / Team
                          </label>
                          <Input
                            id="recipient"
                            placeholder="e.g., Cloud Engineering Team"
                            value={editingLetter.recipient || ''}
                            onChange={(e) => setEditingLetter({ ...editingLetter, recipient: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="slug" className="text-sm leading-none font-medium">
                            Unguessable Slug (Sharing Token)
                          </label>
                          <Input
                            id="slug"
                            placeholder="e.g., engineering-manager"
                            value={editingLetter.slug || ''}
                            onChange={(e) =>
                              setEditingLetter({
                                ...editingLetter,
                                slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''),
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm leading-none font-medium">
                          Subject Line
                        </label>
                        <Input
                          id="subject"
                          placeholder="e.g., Application for Engineering Manager, Cloud Engineering"
                          value={editingLetter.subject || ''}
                          onChange={(e) => setEditingLetter({ ...editingLetter, subject: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="content" className="text-sm leading-none font-medium">
                          Body Content (Markdown)
                        </label>
                        <Textarea
                          id="content"
                          rows={14}
                          placeholder="# Dear Team..."
                          value={editingLetter.content || ''}
                          onChange={(e) => setEditingLetter({ ...editingLetter, content: e.target.value })}
                          required
                          className="font-mono text-sm leading-relaxed"
                        />
                      </div>

                      <div className="border-border/50 flex justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={() => setEditingLetter(null)}>
                          Cancel
                        </Button>
                        <Button type="submit">Save Cover Letter</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* PRIVATE NOTES TAB */}
            <TabsContent value="private-notes" className="space-y-6">
              {!editingNote ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-outfit text-xl font-bold">Private Work Notes</h2>
                      <p className="text-muted-foreground text-sm">
                        Strictly private notes stored in the database, protected by Row-Level Security.
                      </p>
                    </div>
                    <Button onClick={() => setEditingNote({})} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Create Note
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {privateNotes.length === 0 ? (
                      <Card className="col-span-full border-dashed py-12 text-center">
                        <CardDescription>
                          No private notes created yet. Click "Create Note" to get started.
                        </CardDescription>
                      </Card>
                    ) : (
                      privateNotes.map((note) => (
                        <Card key={note.id} className="border-border flex flex-col justify-between">
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="font-outfit text-lg">{note.title}</CardTitle>
                              <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap">
                                {note.category}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-3">
                            <p className="text-muted-foreground line-clamp-3 text-sm">{note.content}</p>
                          </CardContent>
                          <CardFooter className="border-border/40 flex items-center justify-end gap-2 border-t pt-3">
                            <Button
                              onClick={() => setEditingNote(note)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Edit2 className="h-3.5 w-3.5" /> Edit
                            </Button>
                            <Button
                              onClick={() => deletePrivateNote(note.id)}
                              variant="destructive"
                              size="sm"
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-outfit">
                      {editingNote.id ? 'Edit Private Note' : 'Create Private Note'}
                    </CardTitle>
                    <CardDescription>Fill out the fields below. Content supports Markdown.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={savePrivateNote} className="space-y-4">
                      {noteError && (
                        <div className="bg-destructive/10 text-destructive border-destructive/20 rounded-lg border p-3 text-sm">
                          {noteError}
                        </div>
                      )}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="title" className="text-sm leading-none font-medium">
                            Note Title
                          </label>
                          <Input
                            id="title"
                            placeholder="e.g., Verizon Security Escalation Meeting"
                            value={editingNote.title || ''}
                            onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="category" className="text-sm leading-none font-medium">
                            Category
                          </label>
                          <Input
                            id="category"
                            placeholder="e.g., Verizon, IBM, Personal"
                            value={editingNote.category || ''}
                            onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="noteContent" className="text-sm leading-none font-medium">
                          Body Content (Markdown)
                        </label>
                        <Textarea
                          id="noteContent"
                          rows={14}
                          placeholder="# Meeting notes..."
                          value={editingNote.content || ''}
                          onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                          required
                          className="font-mono text-sm leading-relaxed"
                        />
                      </div>

                      <div className="border-border/50 flex justify-end gap-3 border-t pt-4">
                        <Button type="button" variant="outline" onClick={() => setEditingNote(null)}>
                          Cancel
                        </Button>
                        <Button type="submit">Save Note</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
