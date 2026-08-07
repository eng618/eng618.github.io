'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { ExternalLink, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface BadgeProps {
  title: string;
  image: string;
  url: string;
  authority: string;
  description: string;
}

interface BadgeCardProps {
  badge: BadgeProps;
  onOpenLightbox?: () => void;
}

export function BadgeCard({ badge, onOpenLightbox }: BadgeCardProps) {
  return (
    <Card className="hover:bg-accent/30 group h-full cursor-pointer transition-all hover:shadow-lg">
      <div
        onClick={onOpenLightbox}
        className="bg-muted/20 relative flex aspect-square items-center justify-center overflow-hidden p-6"
      >
        <Image
          src={badge.image}
          alt={badge.title}
          width={160}
          height={160}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gallery Hover Hint Overlay */}
        <div className="bg-background/40 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="bg-background/90 text-foreground border-border flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur-md">
            <Maximize2 className="h-3.5 w-3.5" />
            Expand
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10" onClick={(e) => e.stopPropagation()}>
          <Link
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View Credly Badge"
            className="bg-background/80 hover:bg-background border-border text-muted-foreground hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <CardHeader className="pb-2" onClick={onOpenLightbox}>
        <CardTitle className="font-outfit group-hover:text-primary line-clamp-2 text-lg font-bold transition-colors">
          {badge.title}
        </CardTitle>
        <CardDescription>{badge.authority}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto" onClick={onOpenLightbox}>
        <p className="text-muted-foreground line-clamp-3 text-sm">{badge.description}</p>
      </CardContent>
    </Card>
  );
}
