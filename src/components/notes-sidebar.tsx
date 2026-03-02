'use client';

import type { NoteMetadata } from '@/lib/notes';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Input,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@gv-tech/ui-web';
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

type TreeNode = {
  name: string;
  path: string;
  isFolder: boolean;
  children?: Record<string, TreeNode>;
  metadata?: NoteMetadata;
};

interface NotesSidebarProps {
  notes: NoteMetadata[];
  basePath: string; // e.g. '/code-notes' or '/notes'
}

function buildTree(notes: NoteMetadata[]): TreeNode {
  const root: TreeNode = { name: 'root', path: '', isFolder: true, children: {} };

  notes.forEach((note) => {
    const parts = note.slug.split('/');
    let current = root;

    parts.forEach((part, index) => {
      if (!current.children) {
        current.children = {};
      }

      if (!current.children[part]) {
        const isLast = index === parts.length - 1;
        current.children[part] = {
          name: part,
          path: parts.slice(0, index + 1).join('/'),
          isFolder: !isLast,
        };
      }

      if (index === parts.length - 1) {
        current.children[part].metadata = note;
      }

      current = current.children[part];
    });
  });

  return root;
}

function filterTree(node: TreeNode, query: string): TreeNode | null {
  if (!query) {
    return node;
  }

  if (!node.isFolder) {
    const matchesTitle = node.metadata?.title?.toLowerCase().includes(query.toLowerCase());
    const matchesSlug = node.path.toLowerCase().includes(query.toLowerCase());
    return matchesTitle || matchesSlug ? node : null;
  }

  if (node.children) {
    const filteredChildren: Record<string, TreeNode> = {};
    let hasMatch = false;

    Object.values(node.children).forEach((child) => {
      const filteredChild = filterTree(child, query);
      if (filteredChild) {
        filteredChildren[child.name] = filteredChild;
        hasMatch = true;
      }
    });

    if (hasMatch) {
      return { ...node, children: filteredChildren };
    }
  }

  return null;
}

function TreeItem({
  node,
  basePath,
  level = 0,
  onSelect,
}: {
  node: TreeNode;
  basePath: string;
  level?: number;
  onSelect?: () => void;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  if (node.isFolder && node.children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium',
              level > 0 && 'ml-4',
            )}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
          >
            {isOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
            <Folder className="text-muted-foreground h-4 w-4 shrink-0" />
            <span className="truncate">{node.name}</span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col">
            {Object.values(node.children).map((child) => (
              <TreeItem key={child.path} node={child} basePath={basePath} level={level + 1} onSelect={onSelect} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  const href = `${basePath}/${node.path}`;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onSelect}
      className={cn(
        'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
        isActive ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground',
        level > 0 && 'ml-4',
      )}
      style={{ paddingLeft: `${level * 12 + 8 + 24}px` }} // +24 to account for the chevron space in folders
    >
      <FileText className="h-4 w-4 shrink-0" />
      <span className="truncate">{node.metadata?.title || node.name}</span>
    </Link>
  );
}

export function NotesSidebar({ notes, basePath }: NotesSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTree = useMemo(() => {
    const tree = buildTree(notes);
    return filterTree(tree, searchQuery) || { name: 'root', path: '', isFolder: true, children: {} };
  }, [notes, searchQuery]);

  const SidebarContent = (onSelect?: () => void) => (
    <>
      <div className="border-border border-b p-4">
        <Input
          type="search"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="bg-background w-full"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {filteredTree.children && Object.keys(filteredTree.children).length > 0 ? (
            Object.values(filteredTree.children).map((child) => (
              <TreeItem key={child.path} node={child} basePath={basePath} onSelect={onSelect} />
            ))
          ) : (
            <p className="text-muted-foreground p-4 text-center text-sm">No notes found.</p>
          )}
        </div>
      </ScrollArea>
    </>
  );

  return (
    <aside className="border-border bg-card/50 sticky top-16 z-20 hidden h-[calc(100vh-4rem)] w-72 flex-shrink-0 flex-col border-r backdrop-blur-sm lg:flex">
      {SidebarContent()}
    </aside>
  );
}

export function MobileNotesSidebar({
  notes,
  basePath,
  open,
  onOpenChange,
}: NotesSidebarProps & { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTree = useMemo(() => {
    const tree = buildTree(notes);
    return filterTree(tree, searchQuery) || { name: 'root', path: '', isFolder: true, children: {} };
  }, [notes, searchQuery]);

  const SidebarContent = (onSelect?: () => void) => (
    <>
      <div className="border-border border-b p-4">
        <Input
          type="search"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="bg-background w-full"
        />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {filteredTree.children && Object.keys(filteredTree.children).length > 0 ? (
            Object.values(filteredTree.children).map((child) => (
              <TreeItem key={child.path} node={child} basePath={basePath} onSelect={onSelect} />
            ))
          ) : (
            <p className="text-muted-foreground p-4 text-center text-sm">No notes found.</p>
          )}
        </div>
      </ScrollArea>
    </>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="border-border bg-background/95 w-80 p-0 backdrop-blur-xl">
        <SheetHeader className="border-border border-b p-4 text-left">
          <SheetTitle className="font-outfit text-sm font-semibold tracking-wider uppercase">
            Browse {basePath.replace('/', '')}
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">{SidebarContent(() => onOpenChange(false))}</div>
      </SheetContent>
    </Sheet>
  );
}
