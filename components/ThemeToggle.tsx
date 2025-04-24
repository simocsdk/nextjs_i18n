'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Aggiungiamo le traduzioni anche qui se vogliamo i testi del dropdown tradotti
// import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
    const { setTheme } = useTheme();
    // const { t } = useTranslation('common'); // Namespace 'common' per i temi

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span> {/* Potremmo tradurre anche questo: t('toggleTheme') */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    {/* t('themeLight', 'Light') */} Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    {/* t('themeDark', 'Dark') */} Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    {/* t('themeSystem', 'System') */} System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
