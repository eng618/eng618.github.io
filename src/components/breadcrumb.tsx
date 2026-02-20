import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from '@/components/ui-wrapper';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

interface BreadcrumbItemType {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <BreadcrumbRoot className={cn('uppercase tracking-wider', className)}>
      <BreadcrumbList className="gap-1.5 sm:gap-1.5">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center transition-colors hover:text-accent-foreground">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item) => (
          <React.Fragment key={item.href}>
            <BreadcrumbSeparator className="opacity-50" />
            <BreadcrumbItem>
              {item.current ? (
                <BreadcrumbPage className="font-semibold text-foreground">{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className="transition-colors hover:text-accent-foreground">
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
}
