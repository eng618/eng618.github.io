import { MobileSubHeader } from '@/components/mobile-sub-header';
import { getAllContent } from '@/lib/notes';
import { Card, CardContent, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { BookOpen, Map, Sparkles } from 'lucide-react';

export default function NotesIndexPage() {
  const notes = getAllContent('notes');
  const count = notes.length;

  return (
    <>
      <MobileSubHeader notes={notes} basePath="/notes" showToc={false} />
      <div className="w-full max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="mb-12">
          <h1 className="font-outfit mb-4 text-4xl font-bold lg:text-5xl">Digital Garden & Notes</h1>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Welcome to my digital garden. This is a space where I cultivate ideas, document my learning journey, and
            share reflections on software engineering, leadership, and personal growth.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="bg-primary/20 text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle className="font-outfit text-xl font-bold">What to expect</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                This collection currently contains <span className="text-foreground font-semibold">{count}</span> notes
                covering a wide range of topics. You'll find long-form articles, quick reflections, and evergreen notes
                that I update over time.
              </p>
              <p>Topics include software architecture, team dynamics, and my experiences as a developer.</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="bg-primary/20 text-primary mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
                <Map className="h-5 w-5" />
              </div>
              <CardTitle className="font-outfit text-xl font-bold">How to navigate</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Use the sidebar to explore the file structure. I've organized these notes hierarchically to make it
                easier to browse by category.
              </p>
              <p>
                Looking for something specific? Use the search bar in the sidebar to quickly find notes by title or
                content.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="border-border/50 mt-12 rounded-2xl border border-dashed p-8 text-center">
          <Sparkles className="text-primary/50 mx-auto mb-4 h-8 w-8" />
          <h2 className="font-outfit mb-2 text-2xl font-bold">Start Exploring</h2>
          <p className="text-muted-foreground mx-auto max-w-lg">
            Pick a topic from the sidebar to begin. These notes are always evolving, reflecting my current understanding
            and experiences.
          </p>
        </div>
      </div>
    </>
  );
}
