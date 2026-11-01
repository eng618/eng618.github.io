import { TableOfContentsList } from '@/components/table-of-contents';

/**
 * Sticky "On this page" column. The list scrolls inside the viewport instead of
 * painting past the article and over the footer.
 */
export function OnThisPage() {
  return (
    <aside className="sticky top-16 hidden max-h-[calc(100vh-4rem)] w-60 shrink-0 self-start overflow-y-auto overscroll-y-contain py-12 lg:block xl:w-64">
      <div className="flex flex-col gap-4">
        <h2 className="font-outfit text-sm font-semibold tracking-wider uppercase">On this page</h2>
        <TableOfContentsList className="text-sm" />
      </div>
    </aside>
  );
}
