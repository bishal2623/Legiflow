
'use client';

import React from 'react';
import { 
    LogOut, 
    User as UserIcon, 
    Moon, 
    Sun,
    Settings,
    Shield
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function UserProfileDropdown() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    if (!user) return null;

    const initials = user.displayName 
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
        : user.email?.[0].toUpperCase() || 'U';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-border/50 hover:border-primary/50 transition-all shadow-sm">
                    <Avatar className="h-9 w-9 ring-2 ring-background">
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-black font-black text-xs shadow-inner uppercase flex items-center justify-center">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" sideOffset={10}>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1 py-1">
                        <p className="text-sm font-semibold leading-none">{user.displayName || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2.5">
                    <UserIcon className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2.5">
                    <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="flex items-center justify-between px-2 py-2">
                    <div className="flex items-center">
                        {theme === 'dark' ? (
                            <Moon className="mr-3 h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Sun className="mr-3 h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm">Dark Mode</span>
                    </div>
                    <Switch 
                        checked={theme === 'dark'} 
                        onCheckedChange={toggleTheme}
                    />
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className="cursor-pointer py-2.5 text-destructive focus:text-destructive focus:bg-destructive/10" 
                    onClick={logout}
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>Sign Out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
