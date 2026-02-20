import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui-wrapper';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BadgeProps {
  title: string;
  image: string;
  url: string;
  authority: string;
  description: string;
}

export function BadgeCard({ badge }: { badge: BadgeProps }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-border bg-card transition-all hover:bg-accent/30 hover:shadow-md">
      <div className="relative flex aspect-square items-center justify-center bg-muted/20 p-6">
        <Image
          src={badge.image}
          alt={badge.title}
          width={160}
          height={160}
          className="object-contain transition-transform group-hover:scale-105"
        />
        <Link
          href={badge.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-primary"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold font-outfit line-clamp-2">{badge.title}</CardTitle>
        <CardDescription>{badge.authority}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-sm text-muted-foreground line-clamp-3">{badge.description}</p>
      </CardContent>
    </Card>
  );
}
