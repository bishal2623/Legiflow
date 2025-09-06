'use client';

import { Scale, Settings, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Scale className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-primary font-headline">
              LegiFlow
            </h1>
            <p className="text-sm text-muted-foreground">
              Demystify Legal Documents with AI
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
