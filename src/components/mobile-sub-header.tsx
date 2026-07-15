'use client';

import { useActiveHeading } from '@/hooks/use-active-heading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, ScrollArea } from '@gv-tech/ui-web';
import { useState } from 'react';
import { TableOfContentsList } from './table-of-contents';

export function MobileTOC() {
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
    <div className="no-print flex-shrink-0 lg:hidden">
      <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
        <AccordionItem value="toc" className="relative border-none">
          <AccordionTrigger className="hover:bg-accent h-9 w-auto max-w-[120px] flex-initial gap-2 rounded-md border-none px-2 py-0 transition-colors hover:no-underline sm:max-w-none">
            <span className="truncate text-xs font-medium sm:text-sm">{activeText || 'On this page'}</span>
          </AccordionTrigger>

          <AccordionContent className="border-border bg-background/95 absolute top-full right-0 z-50 w-64 rounded-b-md border-r border-b border-l shadow-lg backdrop-blur">
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
    </div>
  );
}
