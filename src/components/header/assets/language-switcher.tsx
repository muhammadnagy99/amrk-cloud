'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface IconProps {
    icon: {
        url: string;
        source: React.ReactNode;
    };
    ariaLabel?: string;
}

export default function LanguageSwitcher({ icon, ariaLabel = 'Language Switcher' }: IconProps) {
    const pathname = usePathname();
    const adjustedPathname = pathname.substring(3);

    const handleSwitchLanguage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        const newLocale = icon.url.substring(1);
        document.cookie = `locale=${newLocale}; path=/;`;

        window.location.href = `${icon.url}${adjustedPathname}`;
    };

    return (
        <Link
            href={`${icon.url}${adjustedPathname}`}
            aria-label={ariaLabel}
            onClick={handleSwitchLanguage}
        >
            {icon.source}
        </Link>
    );
}