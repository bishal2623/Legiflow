
'use client';

import { Scale, Settings, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { SidebarHeader, SidebarTrigger } from '@/components/ui/sidebar';

export function AppHeader() {

  return (
    <SidebarHeader className="flex items-center justify-between border-b border-b-primary/20">
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
       <div className="md:hidden">
          <SidebarTrigger />
        </div>
    </SidebarHeader>
  );
}
