import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from '@gv-tech/ui-web';

export function BadgeSkeleton() {
  return (
    <Card className="border-border bg-card flex h-full flex-col overflow-hidden">
      <div className="bg-muted/20 relative flex aspect-square items-center justify-center p-6">
        <Skeleton className="h-40 w-40 rounded" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-outfit line-clamp-2 text-lg font-bold">
          <Skeleton className="h-6 w-32" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-24" />
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  );
}
