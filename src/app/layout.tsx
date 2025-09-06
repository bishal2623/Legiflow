
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { AppHeader } from '@/components/legiflow/header';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Home, HelpCircle, FileText, Settings, Upload, FileWarning, BarChart2, Search, Copy, Bell } from 'lucide-react';
import { ThemeToggle } from '@/components/legiflow/theme-toggle';
import { Button } from '@/components/ui/button';


export const metadata: Metadata = {
  title: 'LegiFlow',
  description: 'Demystify Legal Docs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider defaultTheme='dark'>
           <div className="min-h-screen flex font-poppins bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <aside className="w-64 p-6 bg-black/30 backdrop-blur-lg border-r border-gray-700">
                <h1 className="text-2xl font-bold mb-6 tracking-wide">⚖️ LegiFlow</h1>
                <nav className="space-y-4">
                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">🏠 Home</Button>
                  </Link>
                  <Link href="/agreements">
                    <Button variant="ghost" className="w-full justify-start">📂 Agreements</Button>
                  </Link>
                  <Link href="/samples">
                    <Button variant="ghost" className="w-full justify-start">📑 Samples</Button>
                  </Link>
                  <Link href="/help">
                    <Button variant="ghost" className="w-full justify-start">❓ Help</Button>
                  </Link>
                </nav>
            </aside>
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
