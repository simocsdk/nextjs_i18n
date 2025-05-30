'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

export default function LanguageToggle() {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();
    const [newLocale, setNewLocale] = useState(currentLocale === 'it' ? 'en' : 'it');

    useEffect(() => {
        setNewLocale(currentLocale === 'it' ? 'en' : 'it');
    }, [currentLocale]);


    const handleChange = () => {
        // set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

        // redirect to the new locale path
        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
    };

    return (
        <Button variant="outline" onClick={handleChange} >
            {currentLocale === 'it' ? 'EN' : 'IT'}
        </Button>
    );
}
