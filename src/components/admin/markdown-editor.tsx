'use client';

import { MarkdownContent } from '@/components/markdown-content';
import { cn } from '@/lib/utils';
import { Textarea } from '@gv-tech/ui-web';
import { useEffect, useRef, useState } from 'react';

export type EditorMode = 'edit' | 'preview' | 'split';

type MarkdownEditorProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  minHeightClassName?: string;
};

export function MarkdownEditor({
  id = 'markdown-content',
  label = 'Body Content (Markdown)',
  value,
  onChange,
  placeholder = '# Heading…',
  required,
  minHeightClassName = 'min-h-[320px]',
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<EditorMode>('edit');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea || mode === 'preview') {
      return;
    }
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.max(textarea.scrollHeight, 320)}px`;
  };

  useEffect(() => {
    const timer = setTimeout(adjustHeight, 0);
    return () => clearTimeout(timer);
  }, [value, mode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const next = value.substring(0, start) + '  ' + value.substring(end);
      onChange(next);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-border/50 flex items-center justify-between border-b pb-2">
        <label htmlFor={id} className="text-sm font-semibold tracking-wider uppercase">
          {label}
        </label>
        <div className="border-border bg-muted/50 flex gap-0.5 rounded-lg border p-0.5">
          {(['edit', 'preview', 'split'] as EditorMode[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors',
                item === 'split' && 'hidden md:inline-flex',
                mode === item
                  ? 'bg-background text-foreground font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={cn('grid items-stretch gap-4', mode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1')}>
        {(mode === 'edit' || mode === 'split') && (
          <div className="h-full">
            <Textarea
              ref={textareaRef}
              id={id}
              placeholder={placeholder}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              required={required}
              className={cn(
                'h-full w-full resize-none overflow-hidden font-mono text-sm leading-relaxed',
                minHeightClassName,
              )}
            />
          </div>
        )}

        {(mode === 'preview' || mode === 'split') && (
          <div className={cn('border-border bg-card/30 h-full max-w-none rounded-lg border p-6', minHeightClassName)}>
            <MarkdownContent content={value} />
          </div>
        )}
      </div>
    </div>
  );
}
