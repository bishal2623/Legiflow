
'use client';

import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { LoaderCircle } from 'lucide-react';
import { SmartAssistant } from '@/components/legiflow/smart-assistant';
import { Navbar } from '@/components/legiflow/Navbar';
import { Sidebar } from '@/components/legiflow/Sidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();

    if (loading) {
        return <div className="flex h-screen w-full items-center justify-center bg-background text-foreground"><LoaderCircle className="h-8 w-8 animate-spin" /></div>;
    }
  
    if (!user) {
       return <>{pathname === '/login' && children}</>;
    }
  
    return (
        <div className="min-h-screen flex text-foreground relative">
            <Navbar />
            <Sidebar />
            <main
                style={{
                    marginTop: '52px',
                    marginLeft: '220px',
                    flex: 1,
                    padding: 'var(--space-xl)',
                    overflowY: 'auto',
                    minHeight: 'calc(100vh - 52px)',
                }}
            >
                {children}
            </main>
            <SmartAssistant />
        </div>
    );
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased">
                <AuthProvider>
                    <ThemeProvider defaultTheme='dark'>
                        <AppLayout>{children}</AppLayout>
                        <Toaster />
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}

