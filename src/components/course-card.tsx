import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface CourseProps {
  course: string;
  url: string;
  completed: string;
  authority: string;
  length: string | null;
  category: string;
}

export function CourseCard({ course }: { course: CourseProps }) {
  return (
    <Card className="hover:bg-accent/50 h-full transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="outline" className="text-muted-foreground/70 mb-2 text-[10px] tracking-wider uppercase">
              {course.category}
            </Badge>
            <CardTitle className="font-outfit line-clamp-2 text-lg font-bold">{course.course}</CardTitle>
          </div>
          <Link
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent-foreground"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
        <CardDescription>{course.authority}</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground mt-auto flex flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          <span>{course.completed}</span>
        </div>
        {course.length && (
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{course.length}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
