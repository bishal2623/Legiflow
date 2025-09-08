
'use client';

import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { FileSignature, Home, Library, Upload } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/hooks/use-auth';

const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/analyze', icon: Upload, label: 'Upload Documents' },
    { href: '/reference', icon: Library, label: 'IPC Sections' },
    { href: '/reference', icon: Library, label: 'Constitution' },
    { href: '/reference', icon: Library, label: 'Schedules' },
    { href: '/reference', icon: Library, label: 'Amendments' },
];


function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
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
            <div className="p-4 border-b border-primary-foreground/20 text-center">
                <Link href="/dashboard" className="text-2xl font-bold">
                    Law Portal
                </Link>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            pathname === item.href
                                ? 'bg-primary-foreground/10 text-white'
                                : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-white'
                        }`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
        <main className="flex-1 ml-64 p-6">
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
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
