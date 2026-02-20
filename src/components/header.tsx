'use client';

import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ThemeToggle,
} from '@/components/ui-wrapper';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Github, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tighter font-outfit">
          {siteConfig.author.toUpperCase()}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          {mounted ? (
            <ThemeToggle variant="ternary" className="text-muted-foreground hover:text-accent-foreground" />
          ) : (
            <div className="h-9 w-9" />
          )}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-muted-foreground hover:text-accent-foreground"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </Link>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-border bg-background/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle className="text-left font-outfit text-foreground">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {siteConfig.navItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-accent-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
                <hr className="my-4 border-border" />
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-accent-foreground"
                >
                  <Github className="h-5 w-5" /> GitHub
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
