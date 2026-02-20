import { Breadcrumb } from '@/components/breadcrumb';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { getAllContent, getContentBySlug } from '@/lib/notes';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { rehypePrettyCode } from 'rehype-pretty-code';

import { EditOnGithub } from '@/components/edit-on-github';
import { mdxComponents } from '@/components/mdx-components';

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
  const note = getContentBySlug('code-notes', resolvedParams.slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow bg-background py-20">
        <article className="container mx-auto px-4 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Code Notes', href: '/code-notes' },
              {
                label: note.metadata.title || resolvedParams.slug[resolvedParams.slug.length - 1],
                href: '#',
                current: true,
              },
            ]}
            className="mb-8 justify-center"
          />
          <div className="mb-12 border-b border-border pb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold font-outfit lg:text-5xl uppercase tracking-widest">
              {note.metadata.title || resolvedParams.slug[resolvedParams.slug.length - 1]}
            </h1>
            {note.metadata.description && <p className="text-xl text-muted-foreground">{note.metadata.description}</p>}
          </div>

          <div className="prose dark:prose-invert prose-zinc mx-auto max-w-4xl">
            <MDXRemote
              source={note.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
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

          <div className="mt-16 flex justify-center border-t border-border pt-8">
            <EditOnGithub relativePath={note.filePath} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
