import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-wrapper';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CertProps {
  course: string;
  url: string;
  completed: string;
  authority: string;
  length: string | null;
  category: string;
}

export function CertCard({ cert }: { cert: CertProps }) {
  return (
    <Card className="flex h-full flex-col border-border bg-card transition-colors hover:bg-accent/50">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="outline" className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {cert.category}
            </Badge>
            <CardTitle className="text-lg font-bold font-outfit line-clamp-2">{cert.course}</CardTitle>
          </div>
          <Link
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <CardDescription>{cert.authority}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-4 flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>{cert.completed}</span>
        </div>
        {cert.length && (
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{cert.length}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
