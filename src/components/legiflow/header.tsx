import { Scale } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <Scale className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-primary font-headline">
            LegiFlow
          </h1>
          <p className="text-sm text-muted-foreground">
            Demystify Legal Documents with AI
          </p>
        </div>
      </div>
    </header>
  );
}
