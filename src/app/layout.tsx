
'use client';

import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { LayoutDashboard, FileText, ShieldAlert, BookOpen, Search, Settings, LogOut, Home, FileQuestion, Upload, Book, FileSignature } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/agreements', icon: Upload, label: 'Upload Documents' },
    { href: '/analyze', icon: FileSignature, label: 'Analyze' },
    { href: '/risk', icon: ShieldAlert, label: 'High Risk Agreements' },
    { href: '/reference', icon: Book, label: 'IPC Sections' },
    { href: '/reference', icon: BookOpen, label: 'Constitution' },
    { href: '/reference', icon: FileText, label: 'Schedules' },
    { href: '/reference', icon: FileQuestion, label: 'Amendments' },
];


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
     // Don't render anything if not logged in and not on login page
     // The AuthProvider will handle the redirect
     return null; 
  }
  
  return (
      <div className="min-h-screen flex bg-background text-foreground">
        <aside className="w-64 bg-primary text-primary-foreground flex flex-col fixed h-full">
            <div className="p-4 border-b border-primary-foreground/20">
                <Link href="/dashboard" className="text-2xl font-bold">
                    ⚖️ LegiFlow
                </Link>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            pathname === item.href && item.href !== '/reference' // handle multiple links to same page
                                ? 'bg-primary-foreground/10 text-white'
                                : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-white'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t border-primary-foreground/20 space-y-2">
                 <Link
                    href="/settings"
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === '/settings'
                            ? 'bg-primary-foreground/10 text-white'
                            : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-white'
                    }`}
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
                <Button onClick={logout} variant="ghost" size="sm" className="w-full justify-start text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-white">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
            </div>
        </aside>
        <main className="flex-1 ml-64">
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
