import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-wrapper';
import { getAllContent } from '@/lib/notes';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function CodeNotesIndexPage() {
  const notes = getAllContent('code-notes');

  return (
    <div className="w-full pb-8">
      <section className="py-12 text-center lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-outfit mb-4 text-4xl font-bold tracking-widest uppercase lg:text-5xl">Code Notes</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Cheat sheets, technical deep dives, and language-specific snippets.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {notes.length === 0 ? (
            <p className="text-muted-foreground text-center italic">No code notes found yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Link key={note.slug} href={`/code-notes/${note.slug}`} className="group block h-full">
                  <Card className="border-border/50 bg-card/50 flex h-full flex-col backdrop-blur-sm transition-shadow hover:shadow-md">
                    <CardHeader className="flex-grow">
                      <div className="bg-accent/20 text-accent group-hover:bg-accent/30 mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
                        <Terminal className="h-5 w-5" />
                      </div>
                      <CardTitle className="font-outfit text-xl font-bold tracking-tight uppercase">
                        {note.title || note.slug.split('/').pop()}
                      </CardTitle>
                      {note.description && (
                        <CardDescription className="line-clamp-2 pt-2 text-base leading-relaxed">
                          {note.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-primary flex items-center text-sm font-semibold">
                        Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
