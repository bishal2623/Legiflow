
'use client';

import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { LayoutDashboard, FileText, AlertTriangle, MessageSquare, Settings, LogOut, BookOpen, Search, Copy, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">Loading...</div>;
  }
  
  if (!user) {
     if (pathname === '/login') {
       return <>{children}</>;
     }
     return null;
  }
  
  return (
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <header className="flex justify-between items-center bg-primary text-primary-foreground px-6 py-3 shadow-md">
            <Link href="/dashboard" className="text-xl font-bold">
                ⚖️ LegiFlow
            </Link>
            <nav className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/agreements" className="hover:underline">Agreements</Link>
                <Link href="/risk" className="hover:underline">Risk Analysis</Link>
                <Link href="/reference" className="hover:underline">Legal Reference</Link>
                <Link href="/settings" className="hover:underline">Settings</Link>
            </nav>
            <div>
                <Button onClick={logout} variant="ghost" size="sm" className="hover:bg-primary/80">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
            </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <ThemeProvider defaultTheme='light'>
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
