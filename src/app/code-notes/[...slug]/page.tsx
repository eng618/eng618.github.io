import { Breadcrumb } from '@/components/breadcrumb';
import { EditOnGithub } from '@/components/edit-on-github';
import { mdxComponents } from '@/components/mdx-components';
import { MobileTOC } from '@/components/mobile-sub-header';
import { TableOfContents, TableOfContentsContent, TableOfContentsList } from '@/components/table-of-contents';
import { getAllContent, getContentBySlug } from '@/lib/notes';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { rehypePrettyCode } from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { SidebarTrigger } from '@gv-tech/ui-web';

interface CodeNotePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const notes = getAllContent('code-notes');
  return notes.map((note) => ({
    slug: note.slug.split('/'),
  }));
}

export default async function CodeNotePage({ params }: CodeNotePageProps) {
  const resolvedParams = await params;
  const notes = getAllContent('code-notes');
  const note = getContentBySlug('code-notes', resolvedParams.slug);

  if (!note) {
    notFound();
  }

  const title = note.metadata.title || resolvedParams.slug[resolvedParams.slug.length - 1];

  return (
    <TableOfContents minLevel={2} maxLevel={4}>
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
          <article className="w-full min-w-0 flex-1 py-8 lg:py-12">
            <div className="bg-background/95 border-border no-print sticky top-16 z-30 -mx-4 mb-8 flex items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur lg:-mx-8 lg:px-8">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <SidebarTrigger />
                <Breadcrumb
                  items={[
                    { label: 'Code Notes', href: '/code-notes' },
                    {
                      label: title,
                      href: '#',
                      current: true,
                    },
                  ]}
                  className="mb-0"
                />
              </div>
              <MobileTOC />
            </div>
            <div className="border-border mb-12 border-b pb-8">
              <h1 className="font-outfit mb-4 text-4xl font-bold tracking-widest uppercase lg:text-5xl">{title}</h1>
              {note.metadata.description && (
                <p className="text-muted-foreground text-xl">{note.metadata.description}</p>
              )}
            </div>

            <TableOfContentsContent>
              <div className="prose dark:prose-invert prose-zinc max-w-none">
                <MDXRemote
                  source={note.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [
                          rehypePrettyCode,
                          {
                            theme: {
                              dark: 'everforest-dark',
                              light: 'everforest-light',
                            },
                            defaultColor: false,
                          },
                        ],
                      ],
                    },
                  }}
                />
              </div>
            </TableOfContentsContent>

            <div className="border-border mt-16 flex border-t pt-8">
              <EditOnGithub relativePath={note.filePath} />
            </div>
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
