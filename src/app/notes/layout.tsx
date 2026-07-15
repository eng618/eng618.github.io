import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { NotesSidebar } from '@/components/notes-sidebar';
import { getAllContent } from '@/lib/notes';
import { SidebarInset, SidebarProvider } from '@gv-tech/ui-web';
import { ReactNode } from 'react';

export default function NotesLayout({ children }: { children: ReactNode }) {
  const notes = getAllContent('notes');

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header />
      <SidebarProvider>
        <NotesSidebar notes={notes} basePath="/notes" />
        <SidebarInset className="bg-background flex min-w-0 flex-1 flex-col">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="flex w-full max-w-7xl flex-col items-stretch px-4 py-8 lg:px-8 lg:py-12">{children}</div>
          </div>
          <Footer className="w-full" />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
