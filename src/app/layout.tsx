
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import { Home, HelpCircle, FileText, Settings, Upload, FileWarning, BarChart2, Search, Copy, Bell, AlertTriangle, BookOpen } from 'lucide-react';


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
            <aside className="w-64 p-6 bg-black/30 backdrop-blur-lg border-r border-gray-700 flex flex-col shadow-lg">
                <div className="p-6 text-2xl font-bold border-b border-gray-700 -mx-6 -mt-6 mb-6">
                    ⚖️ LegiFlow
                </div>
                <nav className="flex-1 space-y-3">
                  <Link href="/dashboard" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <BarChart2 className="w-5 h-5" /> Dashboard
                  </Link>
                  <Link href="/" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <Home className="w-5 h-5" /> Upload Docs
                  </Link>
                  <Link href="/search" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <Search className="w-5 h-5" /> Clause Search
                  </Link>
                   <Link href="/reference" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <BookOpen className="w-5 h-5" /> Legal Reference
                  </Link>
                  <Link href="/compare" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <Copy className="w-5 h-5" /> Compare Agreements
                  </Link>
                  <Link href="/notifications" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <Bell className="w-5 h-5" /> Notifications
                  </Link>
                  <Link href="/samples" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <FileText className="w-5 h-5" /> Sample Agreements
                  </Link>
                  <Link href="/risk" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <AlertTriangle className="w-5 h-5 text-red-400" /> High-Risk Agreements
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 hover:text-blue-400 transition">
                    <Settings className="w-5 h-5" /> Settings
                  </Link>
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
