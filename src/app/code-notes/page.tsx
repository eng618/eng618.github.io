import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-wrapper';
import { getAllContent } from '@/lib/notes';
import { Code2, Cpu, Terminal } from 'lucide-react';

export default function CodeNotesIndexPage() {
  const notes = getAllContent('code-notes');
  const count = notes.length;

  return (
    <div className="w-full max-w-4xl px-4 py-12 lg:px-8 lg:py-16">
      <div className="mb-12">
        <h1 className="font-outfit mb-4 text-4xl font-bold tracking-tight uppercase lg:text-5xl">Technical Lab</h1>
        <p className="text-muted-foreground text-xl leading-relaxed">
          A collection of highly technical notes, cheat sheets, and code snippets. This is my personal reference library
          for languages, frameworks, and system design patterns.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="bg-accent/20 text-accent mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
              <Terminal className="h-5 w-5" />
            </div>
            <CardTitle className="font-outfit text-xl font-bold tracking-tight uppercase">Cheat Sheets</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>
              Explore <span className="text-foreground font-semibold">{count}</span> technical documents designed for
              fast lookup. Quick reference for CLI commands, language syntax, and configuration files.
            </p>
            <p>Built for efficiency when working on complex projects across multiple environments.</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="bg-accent/20 text-accent mb-2 flex h-10 w-10 items-center justify-center rounded-lg">
              <Code2 className="h-5 w-5" />
            </div>
            <CardTitle className="font-outfit text-xl font-bold tracking-tight uppercase">
              Technical Deep Dives
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <p>Detailed analysis of specific technologies, performance optimizations, and architectural patterns.</p>
            <p>Focusing on Go, TypeScript, Flutter, and cloud-native development practices.</p>
          </CardContent>
        </Card>
      </div>

      <div className="border-border/50 mt-12 rounded-2xl border border-dashed p-8 text-center">
        <Cpu className="text-accent/50 mx-auto mb-4 h-8 w-8" />
        <h2 className="font-outfit mb-2 text-2xl font-bold tracking-tight uppercase">Explore the Stack</h2>
        <p className="text-muted-foreground mx-auto max-w-lg">
          Browse the technical archive using the sidebar navigation. Each note is focused on practical implementation,
          technical accuracy, and production-ready snippets.
        </p>
      </div>
    </div>
  );
}
