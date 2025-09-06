
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { AppHeader } from '@/components/legiflow/header';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Home, HelpCircle, FileText, FileCheck, Settings, MessageSquare, AlertTriangle, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/legiflow/theme-toggle';


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
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <SidebarProvider>
            <Sidebar useGlassmorphism={true} collapsible='icon' variant='floating'>
                <AppHeader />
                <SidebarContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/">
                          <Home />
                          Home (Upload Docs)
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/agreements">
                          <FileCheck />
                          Agreements Section
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/samples">
                          <FileText />
                          Sample Agreements
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/risk">
                           <AlertTriangle />
                           High-Risk Agreements
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/settings">
                          <Settings />
                          Settings
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/help">
                          <HelpCircle />
                          Help Section
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarContent>
                <div className="p-2 mt-auto">
                    <ThemeToggle />
                </div>
            </Sidebar>
            <SidebarInset>
                <div className="relative flex flex-col min-h-screen bg-background text-foreground">
                    {children}
                     <div className="fixed bottom-5 right-5 z-50">
                        <Button
                            isIconOnly
                            className="rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90"
                        >
                            <MessageSquare className="h-8 w-8" />
                            <span className="sr-only">Ask AI</span>
                        </Button>
                    </div>
                    <footer className="py-4 text-center text-sm text-muted-foreground">
                        <p>Powered by LegiFlow AI. For informational purposes only.</p>
                    </footer>
                </div>
            </SidebarInset>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
