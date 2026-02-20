import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-wrapper';
import { getAllContent } from '@/lib/notes';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

export default function NotesIndexPage() {
  const notes = getAllContent('notes');

  return (
    <div className="w-full pb-8">
      <section className="py-12 lg:py-16 text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-outfit lg:text-5xl">Notes</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            A collection of thoughts, guides, and developmental reflections.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          {notes.length === 0 ? (
            <p className="text-muted-foreground italic text-center">No notes found yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Link key={note.slug} href={`/notes/${note.slug}`} className="block h-full group">
                  <Card className="h-full transition-shadow hover:shadow-md border-border/50 bg-card/50 backdrop-blur-sm flex flex-col">
                    <CardHeader className="flex-grow">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary transition-colors group-hover:bg-primary/30">
                        <FileText className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl font-bold font-outfit">{note.title || note.slug}</CardTitle>
                      {note.description && (
                        <CardDescription className="line-clamp-2 text-base leading-relaxed pt-2">
                          {note.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm font-semibold text-primary">
                        Read more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
