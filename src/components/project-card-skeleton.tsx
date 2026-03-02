import { Skeleton } from '@gv-tech/ui-web';

export function ProjectCardSkeleton() {
  return (
    <div className="border-border bg-card rounded-2xl border p-8 backdrop-blur-sm">
      <div className="bg-primary/20 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
        <Skeleton className="h-6 w-6" />
      </div>
      <h2 className="font-outfit mb-4 text-2xl font-bold">
        <Skeleton className="h-8 w-32" />
      </h2>
      <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </p>

      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
