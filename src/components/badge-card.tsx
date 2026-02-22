import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
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
    <Card className="border-border bg-card hover:bg-accent/30 flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="bg-muted/20 relative flex aspect-square items-center justify-center p-6">
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
          className="text-muted-foreground hover:text-primary absolute top-4 right-4 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-outfit line-clamp-2 text-lg font-bold">{badge.title}</CardTitle>
        <CardDescription>{badge.authority}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <p className="text-muted-foreground line-clamp-3 text-sm">{badge.description}</p>
      </CardContent>
    </Card>
  );
}
