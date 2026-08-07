'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@gv-tech/ui-web';
import { ExternalLink, FileText, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface CertProps {
  title: string;
  image: string;
  url: string;
  authority: string;
  completed: string;
  description: string;
}

interface CertCardProps {
  cert: CertProps;
  onOpenLightbox?: () => void;
}

export function CertCard({ cert, onOpenLightbox }: CertCardProps) {
  const isCoursera =
    cert.url.includes('coursera') ||
    cert.authority.toLowerCase().includes('coursera') ||
    cert.authority.toLowerCase().includes('google');
  const codeMatch = cert.url.match(/Coursera\s+([A-Z0-9]+)\.pdf/i);
  const certCode = codeMatch ? codeMatch[1] : null;
  const verifyUrl = certCode && isCoursera ? `https://coursera.org/verify/specialization/${certCode}` : cert.url;

  return (
    <Card className="hover:bg-accent/30 group h-full cursor-pointer transition-all hover:shadow-lg">
      <div
        onClick={onOpenLightbox}
        className="bg-muted/20 relative flex aspect-[4/3] items-center justify-center overflow-hidden p-6"
      >
        <Image
          src={cert.image}
          alt={cert.title}
          width={280}
          height={210}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gallery Hover Hint Overlay */}
        <div className="bg-background/40 absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="bg-background/90 text-foreground border-border flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold shadow-md backdrop-blur-md">
            <Maximize2 className="h-3.5 w-3.5" />
            View Fullscreen
          </span>
        </div>

        {/* Quick External Actions */}
        <div className="absolute top-4 right-4 z-10 flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Link
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            title="View PDF Certificate"
            className="bg-background/80 hover:bg-background border-border text-muted-foreground hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
          >
            <FileText className="h-4 w-4" />
          </Link>
          <Link
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Verify Certificate"
            className="bg-background/80 hover:bg-background border-border text-muted-foreground hover:text-primary flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <CardHeader className="pb-2" onClick={onOpenLightbox}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="font-outfit group-hover:text-primary line-clamp-2 text-lg font-bold transition-colors">
              {cert.title}
            </CardTitle>
            <CardDescription className="mt-1">{cert.authority}</CardDescription>
          </div>
          <span className="text-muted-foreground bg-muted/50 rounded px-2 py-0.5 text-xs font-semibold whitespace-nowrap">
            {cert.completed}
          </span>
        </div>
      </CardHeader>
      <CardContent className="mt-auto" onClick={onOpenLightbox}>
        <p className="text-muted-foreground line-clamp-3 text-sm">{cert.description}</p>
      </CardContent>
    </Card>
  );
}
