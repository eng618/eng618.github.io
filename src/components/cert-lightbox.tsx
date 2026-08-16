'use client';

import { trackEvent } from '@/lib/analytics';
import { Badge, Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@gv-tech/ui-web';
import { ChevronLeft, ChevronRight, ExternalLink, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';

export interface CredentialItem {
  title: string;
  image: string;
  url: string;
  authority: string;
  completed?: string;
  description: string;
  type?: string;
}

interface CertLightboxProps {
  items: CredentialItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function CertLightbox({ items, currentIndex, onClose, onSelectIndex }: CertLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) {
      return;
    }
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelectIndex(prevIndex);
  }, [currentIndex, items.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) {
      return;
    }
    const nextIndex = (currentIndex + 1) % items.length;
    onSelectIndex(nextIndex);
  }, [currentIndex, items.length, onSelectIndex]);

  useEffect(() => {
    if (isOpen && currentItem) {
      trackEvent('Credential Lightbox Opened', {
        title: currentItem.title,
        authority: currentItem.authority,
        type: currentItem.type || 'credential',
      });
    }
  }, [isOpen, currentItem]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext]);

  if (!isOpen || !currentItem) {
    return null;
  }

  const isCoursera =
    currentItem.url.includes('coursera') ||
    currentItem.authority.toLowerCase().includes('coursera') ||
    currentItem.authority.toLowerCase().includes('google');
  const codeMatch = currentItem.url.match(/Coursera\s+([A-Z0-9]+)\.pdf/i);
  const certCode = codeMatch ? codeMatch[1] : null;
  const verifyUrl = certCode && isCoursera ? `https://coursera.org/verify/specialization/${certCode}` : currentItem.url;
  const isPdf = currentItem.url.toLowerCase().endsWith('.pdf');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-background/95 border-border max-h-[92vh] w-[95vw] !max-w-5xl overflow-hidden p-0 backdrop-blur-xl md:w-[90vw]">
        <div className="flex min-h-[400px] w-full flex-col md:h-[600px] md:flex-row">
          {/* Main Preview / Image Container */}
          <div className="bg-muted/30 relative flex min-w-0 flex-1 flex-col items-center justify-center p-4 sm:p-8">
            {/* Gallery Navigation Prev / Next */}
            {items.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrev}
                  className="bg-background/80 hover:bg-background border-border absolute top-1/2 left-3 z-20 h-10 w-10 -translate-y-1/2 rounded-full shadow-md backdrop-blur-md transition-transform active:scale-95"
                  aria-label="Previous credential"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  className="bg-background/80 hover:bg-background border-border absolute top-1/2 right-3 z-20 h-10 w-10 -translate-y-1/2 rounded-full shadow-md backdrop-blur-md transition-transform active:scale-95"
                  aria-label="Next credential"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Main Image View */}
            <div className="relative flex h-[280px] w-full items-center justify-center sm:h-[400px] md:h-[480px]">
              <Image
                src={currentItem.image}
                alt={currentItem.title}
                fill
                sizes="(max-width: 768px) 90vw, 60vw"
                priority
                className="object-contain p-2 drop-shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Gallery Thumbnails Strip */}
            {items.length > 1 && (
              <div className="mt-4 flex max-w-full scrollbar-none items-center gap-2 overflow-x-auto px-2 py-1">
                {items.map((item, idx) => (
                  <button
                    key={item.title + idx}
                    onClick={() => onSelectIndex(idx)}
                    className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      idx === currentIndex
                        ? 'border-primary ring-primary/30 scale-105 ring-2'
                        : 'border-border/50 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image src={item.image} alt={item.title} fill sizes="48px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metadata & Details Sidebar */}
          <div className="border-border bg-card/60 flex w-full flex-shrink-0 flex-col justify-between overflow-y-auto border-t p-6 md:w-88 md:border-t-0 md:border-l">
            <div>
              <DialogHeader className="space-y-3 text-left">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="secondary" className="px-2.5 py-1 font-semibold">
                    {currentItem.authority}
                  </Badge>
                  {currentItem.completed && (
                    <span className="text-muted-foreground text-xs font-semibold">{currentItem.completed}</span>
                  )}
                </div>
                <DialogTitle className="font-outfit text-xl leading-snug font-bold">{currentItem.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground pt-2 text-sm leading-relaxed">
                  {currentItem.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="border-border mt-6 flex flex-col gap-3 border-t pt-4">
              {isPdf && (
                <Button asChild variant="default" className="w-full font-medium">
                  <Link
                    href={currentItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('Credential External Verify Click', {
                        title: currentItem.title,
                        authority: currentItem.authority,
                        action: 'open_pdf',
                      })
                    }
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Open PDF Certificate
                  </Link>
                </Button>
              )}

              <Button asChild variant={isPdf ? 'outline' : 'default'} className="w-full font-medium">
                <Link
                  href={verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('Credential External Verify Click', {
                      title: currentItem.title,
                      authority: currentItem.authority,
                      action: 'verify_url',
                    })
                  }
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Verify Credential
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
