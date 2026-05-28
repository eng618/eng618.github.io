import coursesData from '@/data/courses.json';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge } from '@gv-tech/ui-web';
import { Calendar, Clock, ExternalLink } from 'lucide-react';

interface Course {
  category: string;
  certificateNumber?: string;
  course: string;
  url: string;
  completed: string;
  authority: string;
  length: string | null;
}

function CoursesTimeline() {
  // Sort courses by completion date (newest first)
  const sortedCourses = [...coursesData].sort((a, b) => {
    const dateA = new Date(a.completed + '-01');
    const dateB = new Date(b.completed + '-01');
    return dateB.getTime() - dateA.getTime();
  });

  // Group by year
  const coursesByYear = sortedCourses.reduce((acc: Record<string, Course[]>, course) => {
    const year = course.completed.split('-')[0];
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(course);
    return acc;
  }, {});

  const years = Object.keys(coursesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="space-y-8">
      {years.map((year) => (
        <div key={year} className="relative">
          {/* Year header */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-5 w-5" />
              <h3 className="text-primary text-2xl font-bold">{year}</h3>
            </div>
            <div className="bg-border h-px flex-grow" />
            <Badge variant="secondary" className="text-sm">
              {coursesByYear[year].length} course{coursesByYear[year].length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {/* Courses for this year */}
          <div className="ml-8 space-y-4">
            {coursesByYear[year].map((course) => (
              <div
                key={course.certificateNumber || course.course}
                className="group border-border bg-card hover:bg-accent/50 relative flex items-start gap-4 rounded-lg border p-4 transition-colors"
              >
                {/* Timeline connector */}
                <div className="bg-primary border-background absolute top-6 -left-8 h-3 w-3 rounded-full border-2" />

                {/* Content */}
                <div className="min-w-0 flex-grow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-grow">
                      <h4 className="text-foreground group-hover:text-primary leading-tight font-semibold transition-colors">
                        {course.course}
                      </h4>
                      <div className="text-muted-foreground mt-2 flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">{course.authority}</span>
                        </span>
                        {course.length && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.length}
                          </span>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {course.category}
                        </Badge>
                      </div>
                    </div>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-accent group flex-shrink-0 rounded-md p-2 transition-colors"
                      aria-label={`View certificate for ${course.course}`}
                    >
                      <ExternalLink className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CoursesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-outfit mb-4 text-3xl font-bold">Completed Courses</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Professional development through {coursesData.length} completed courses across web development, mobile
            development, and computer science fundamentals.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="courses" className="border-border border-b">
            <AccordionTrigger className="hover:bg-accent/50 px-4 py-4 text-left hover:no-underline">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">View all completed courses</span>
                <Badge variant="secondary" className="text-xs">
                  {coursesData.length} courses
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <CoursesTimeline />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
