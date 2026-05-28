import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from '@gv-tech/ui-web';

export function CourseSkeleton() {
  return (
    <Card className="border-border bg-card flex h-full flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-1">
            <Badge variant="outline" className="text-muted-foreground/70 mb-2 text-[10px] tracking-wider uppercase">
              <Skeleton className="h-3 w-16" />
            </Badge>
            <CardTitle className="font-outfit line-clamp-2 text-lg font-bold">
              <Skeleton className="h-6 w-full" />
            </CardTitle>
          </div>
          <Skeleton className="h-4 w-4 rounded" />
        </div>
        <CardDescription>
          <Skeleton className="mt-2 h-4 w-32" />
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground mt-auto flex flex-col gap-2 pt-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}
