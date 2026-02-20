import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { NotesSidebar } from '@/components/notes-sidebar';
import { getAllContent } from '@/lib/notes';
import { ReactNode } from 'react';

export default function NotesLayout({ children }: { children: ReactNode }) {
  const notes = getAllContent('notes');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <NotesSidebar notes={notes} basePath="/notes" />
        <main className="flex-1 w-full flex flex-col items-center">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
