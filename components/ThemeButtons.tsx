'use client';

import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

export function ThemeButtons() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = () => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    };

    if (!mounted) {
        return null; // Or a loading spinner
    }

    return (
        <Button variant="outline" onClick={handleChange}>
            {resolvedTheme === 'light' ? 'Dark' : 'Light'}
        </Button>
    );
}
