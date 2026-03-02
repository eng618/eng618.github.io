'use client';

import { useActiveHeading } from '@/hooks/use-active-heading';
import type { NoteMetadata } from '@/lib/notes';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, ScrollArea } from '@gv-tech/ui-web';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { MobileNotesSidebar } from './notes-sidebar';
import { TableOfContentsList } from './table-of-contents';

interface MobileSubHeaderProps {
  notes: NoteMetadata[];
  basePath: string;
  showToc?: boolean;
  className?: string;
}

export function MobileSubHeader({ notes, basePath, showToc = true, className }: MobileSubHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openItem, setOpenItem] = useState<string>('');
  const { activeText } = useActiveHeading();

  // Close the accordion when a link is clicked
  const handleContentClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) {
      setOpenItem('');
    }
  };

  return (
    <div
      className={`border-border bg-background/95 sticky top-16 z-20 flex w-full flex-col border-b backdrop-blur lg:hidden ${className || ''}`}
    >
      {showToc ? (
        <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="w-full">
          <AccordionItem value="toc" className="relative border-none">
            <div className="flex w-full items-center justify-between p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsSidebarOpen(true)}>
                  <Menu className="h-4 w-4" />
                  <span className="hidden sm:inline">Browse Notes</span>
                  <span className="sm:hidden">Browse</span>
                </Button>
              </div>

              <div className="flex items-center gap-2 overflow-hidden">
                <div className="bg-border h-4 w-[1px]" />
                <AccordionTrigger className="hover:bg-accent h-9 w-auto max-w-[200px] flex-initial gap-2 rounded-md border-none px-2 py-0 transition-colors hover:no-underline sm:max-w-none">
                  <span className="truncate text-sm font-medium">{activeText || 'On this page'}</span>
                </AccordionTrigger>
              </div>
            </div>

            <AccordionContent className="border-border bg-background/95 absolute top-full left-0 z-50 w-full border-b shadow-lg backdrop-blur">
              <ScrollArea className="max-h-[60vh]">
                <div onClick={handleContentClick} className="p-4 pt-2">
                  <div className="[&>div]:hidden [&>nav]:!block">
                    <TableOfContentsList className="text-sm" />
                  </div>
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <div className="flex w-full items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
              <span className="hidden sm:inline">Browse Notes</span>
              <span className="sm:hidden">Browse</span>
            </Button>
          </div>
        </div>
      )}

      <MobileNotesSidebar notes={notes} basePath={basePath} open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
    </div>
  );
}
