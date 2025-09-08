
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";

function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="flex items-center space-x-2">
            <Switch 
                id="theme-mode" 
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
            />
            <Label htmlFor="theme-mode">{theme === 'dark' ? 'Dark' : 'Light'} Mode</Label>
        </div>
    )
}


export default function SettingsPage() {
  const { user } = useAuth();
  
  return (
    <main>
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                <CardTitle className="text-3xl font-bold">Settings</CardTitle>
                <CardDescription>Manage your application settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="name">Profile Name</Label>
                        <Input id="name" readOnly value={user?.displayName || 'No name set'} />
                    </div>
                     <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" readOnly value={user?.email || 'No email set'} />
                    </div>
                    <div>
                        <Label>Theme</Label>
                        <div className="pt-2">
                            <ThemeSwitcher />
                        </div>
                    </div>
                </CardContent>
            </Card>
    </main>
  );
}
