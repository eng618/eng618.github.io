'use client';

import { cn } from '@/lib/utils';
import { Button } from '@gv-tech/ui-web';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'text-muted-foreground hover:bg-accent hover:text-accent-foreground h-8 w-8 transition-all',
        isCopied && 'text-primary hover:text-primary/80',
        className,
      )}
      onClick={copy}
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span className="sr-only">Copy code</span>
    </Button>
  );
}
