'use client'; // Necessario per useTranslation, LanguageChanger, ThemeToggle

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation'; // Per ottenere il locale corrente dall'URL
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import LanguageToggle from '@/components/LanguageToggle';
import { ThemeButtons } from '@/components/ThemeButtons';

const navigation = [
    { name: 'solutions', href: '#' },
    { name: 'features', href: '#' },
    { name: 'prices', href: '#' },
    { name: 'about_me', href: '#' },
]

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { t, i18n } = useTranslation(['menu', 'common']); // Richiede i namespace 'menu' e 'common' dal provider a monte
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || i18n.language; // Estrai locale dall'URL o usa quello di i18n

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Home</span>
                        <img
                            alt=""
                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
                    >
                        <span className="sr-only">Menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-foreground">
                            {t(`menu:${item.name}`)}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4 h-full">
                    <LanguageToggle />
                    <ThemeButtons />
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-foreground"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-border">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-foreground hover:bg-muted"
                                    >
                                        {t(`menu:${item.name}`)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
