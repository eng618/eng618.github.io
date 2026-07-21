'use client';

import { CoverLettersPanel } from '@/components/admin/cover-letters-panel';
import { PrivateNotesPanel } from '@/components/admin/private-notes-panel';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { useAdminAuth } from '@/hooks/use-admin-auth';
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
} from '@gv-tech/ui-web';
import { Key, Lock, LogOut, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

function AdminDashboard() {
  const { session, loading, isAdmin, email, login, logout } = useAdminAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams?.get('tab');
  const editId = searchParams?.get('id');

  const [activeTab, setActiveTab] = useState(tabParam === 'private-notes' ? 'private-notes' : 'cover-letters');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginMsg, setLoginMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [editLetterId, setEditLetterId] = useState<string | null>(null);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  useEffect(() => {
    if (tabParam === 'private-notes' || tabParam === 'cover-letters') {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    if (!editId) {
      return;
    }
    if (activeTab === 'private-notes') {
      setEditNoteId(editId);
    } else {
      setEditLetterId(editId);
    }
  }, [editId, activeTab]);

  const clearEditFromUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('id');
    const qs = params.toString();
    router.replace(qs ? `/admin?${qs}` : '/admin', { scroll: false });
  }, [router, searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('tab', value);
    params.delete('id');
    router.replace(`/admin?${params.toString()}`, { scroll: false });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) {
      return;
    }
    setLoginLoading(true);
    setLoginMsg(null);
    const result = await login(loginEmail);
    setLoginLoading(false);
    setLoginMsg({ type: result.ok ? 'success' : 'error', text: result.message });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="bg-background flex flex-grow items-center justify-center">
          <div className="text-center">
            <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
            <p className="text-muted-foreground font-outfit mt-4">Verifying session…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <CardTitle className="font-outfit text-2xl font-bold">Admin portal</CardTitle>
              <CardDescription>
                Authenticate with an email magic link to manage private notes and cover letters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
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

                <Button type="submit" className="w-full font-semibold" disabled={loginLoading}>
                  {loginLoading ? 'Sending…' : 'Send magic link'}
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

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="bg-background flex flex-grow items-center justify-center px-4 py-20">
          <Card className="border-border w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
              <div className="bg-destructive/10 text-destructive mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Key className="h-6 w-6" />
              </div>
              <CardTitle className="font-outfit text-2xl font-bold">Access denied</CardTitle>
              <CardDescription>
                Your account ({email}) is not authorized to access this administration page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={logout} variant="destructive" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow py-12">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8">
          <div className="border-border/50 mb-8 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-outfit text-3xl font-extrabold tracking-tight lg:text-4xl">Admin control panel</h1>
              <p className="text-muted-foreground mt-1">Logged in as {email}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/notes/private"
                className="border-border hover:bg-muted inline-flex h-9 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors"
              >
                Private notes workspace
              </Link>
              <Button onClick={logout} variant="outline" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Log out
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="cover-letters">Cover letters</TabsTrigger>
              <TabsTrigger value="private-notes">Private notes</TabsTrigger>
            </TabsList>

            <TabsContent value="cover-letters" className="space-y-6">
              <CoverLettersPanel
                initialEditId={editLetterId}
                onClearEditId={() => {
                  setEditLetterId(null);
                  clearEditFromUrl();
                }}
              />
            </TabsContent>

            <TabsContent value="private-notes" className="space-y-6">
              <PrivateNotesPanel
                initialEditId={editNoteId}
                onClearEditId={() => {
                  setEditNoteId(null);
                  clearEditFromUrl();
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="bg-background flex flex-grow items-center justify-center">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          </main>
          <Footer />
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
