import { Breadcrumb } from '@/components/breadcrumb';
import { EditOnGithub } from '@/components/edit-on-github';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { mdxComponents } from '@/components/mdx-components';
import { getContentBySlug } from '@/lib/notes';
import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import path from 'path';
import { rehypePrettyCode } from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

interface AppPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  // To compile and render all pages (including privacy docs), we scan the directory directly rather than using filtered list
  const basePath = path.join(process.cwd(), 'content', 'apps');
  if (!fs.existsSync(basePath)) {
    return [];
  }
  const getFilesRecursively = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = entries.flatMap((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getFilesRecursively(res) : res;
    });
    return files.filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
  };

  const files = getFilesRecursively(basePath);
  return files
    .map((filePath) => {
      const relativePath = path.relative(basePath, filePath);
      const slugArray = relativePath
        .replace(/\.mdx?$/, '')
        .replace(/index$/, '')
        .split(path.sep)
        .filter(Boolean);
      return { slug: slugArray };
    })
    .filter((param) => param.slug.length > 0);
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
