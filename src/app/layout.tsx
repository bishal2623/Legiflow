
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/hooks/use-theme';
import { AppHeader } from '@/components/legiflow/header';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Home, HelpCircle, FileText, Settings, Upload, FileWarning } from 'lucide-react';
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider defaultTheme='dark'>
          <SidebarProvider>
            <Sidebar>
                <AppHeader />
                <SidebarContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/">
                          <Home size={18} />
                          Home
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/agreements">
                          <Upload size={18}/>
                          Agreements Section
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/samples">
                          <FileText size={18} />
                          Sample Agreements
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/risk">
                           <FileWarning size={18}/>
                           High-Risk Agreements
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/help">
                                <HelpCircle size={18}/>
                                Help Section
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <Link href="/settings">
                          <Settings size={18} />
                          Settings
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
                </div>
            </SidebarInset>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
