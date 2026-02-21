import { Breadcrumb } from '@/components/breadcrumb';
import { EditOnGithub } from '@/components/edit-on-github';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { mdxComponents } from '@/components/mdx-components';
import { getAllContent, getContentBySlug } from '@/lib/notes';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { rehypePrettyCode } from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

interface AppPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const apps = getAllContent('apps');
  return apps.map((app) => ({
    slug: app.slug.split('/'),
  }));
}

export default async function AppPage({ params }: AppPageProps) {
  const resolvedParams = await params;
  const app = getContentBySlug('apps', resolvedParams.slug);

  if (!app) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-background flex-grow py-20">
        <article className="container mx-auto max-w-4xl px-4 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Apps', href: '/apps' },
              {
                label: app.metadata.title || resolvedParams.slug[resolvedParams.slug.length - 1],
                href: '#',
                current: true,
              },
            ]}
            className="mb-8 justify-center"
          />
          <div className="border-border mb-12 border-b pb-8 text-center">
            <h1 className="font-outfit mb-4 text-4xl font-bold lg:text-5xl">{app.metadata.title}</h1>
            {app.metadata.description && <p className="text-muted-foreground text-xl">{app.metadata.description}</p>}
          </div>

          <div className="prose dark:prose-invert prose-zinc mx-auto max-w-4xl">
            <MDXRemote
              source={app.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
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

          <div className="border-border mt-16 flex justify-center border-t pt-8">
            <EditOnGithub relativePath={app.filePath} />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
