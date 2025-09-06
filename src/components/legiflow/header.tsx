
'use client';

import { Scale, Settings, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarHeader className="flex items-center justify-between border-b">
        <Link href="/" className="flex items-center gap-3">
          <Scale className="w-8 h-8 text-primary" />
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-2xl font-bold text-primary font-headline">
              LegiFlow
            </h1>
            <p className="text-sm text-muted-foreground">
              Demystify Legal Docs
            </p>
          </div>
        </Link>
      <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
       <div className="md:hidden">
          <SidebarTrigger />
        </div>
    </SidebarHeader>
  );
}
