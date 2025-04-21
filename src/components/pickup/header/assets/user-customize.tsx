'use client';

import { useState, useEffect, useRef } from "react";
import LoginForm from "../../user-overlay/login-form";
import OTPInput from "../../user-overlay/otp-input";
import ProfileMenu from "../../user-overlay/profile-menu";
import Wrapper from "../../user-overlay/wrapper";
import { ArLangSwitcher, ELnag, EnLangSwitcher, User } from "./icons";
import LanguageSwitcher from "./language-switcher";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);
    return { isLoggedIn, login, logout };
};

const LANGUAGE_OPTIONS = {
    en: {
        url: '/en',
        source: <EnLangSwitcher />,
        label: 'English',
        ariaLabel: 'Switch to English'
    },
    ar: {
        url: '/ar',
        source: <ArLangSwitcher />,
        label: 'العربية',
        ariaLabel: 'التغيير إلى العربية'
    }
};

export default function UserCustomize({ lang }: { lang: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOTPRequested, setIsOTPRequested] = useState(false);
    const { isLoggedIn, login } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleUserClick = () => {
        const cookies = document.cookie.split("; ").reduce((acc: Record<string, string>, cookie) => {
            const [name, value] = cookie.split("=");
            acc[name] = value;
            return acc;
        }, {});

        const token = cookies["userToken"];
        const userId = cookies["user_id"];

        if (token && userId) {
            login(); // user is already logged in
        } else {
            setIsOTPRequested(false); // show login form
        }

        setIsOpen((prev) => !prev);
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsOTPRequested(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    const oppositeLang = lang === 'en' ? 'ar' : 'en';
    const switchOption = LANGUAGE_OPTIONS[oppositeLang];

    return (
        <div className="relative" ref={containerRef}>
            <div className="flex flex-row justify-between h-full gap-2">
                <p
                    onClick={handleUserClick}
                    className="cursor-pointer w-9 h-9 flex justify-center items-center bg-white rounded-lg border-widget"
                >
                    <User />
                </p>
                <p className="w-9 h-9 flex justify-center items-center bg-white rounded-lg border-widget">
                    <LanguageSwitcher
                        icon={{
                            url: switchOption.url,
                            source: switchOption.source
                        }}
                        ariaLabel={switchOption.ariaLabel}
                    />
                </p>
            </div>

            <div className={isOpen ? "block" : "hidden"}>
                <Wrapper onClose={() => {
                    setIsOpen(false);
                    setIsOTPRequested(false);
                }}>
                    <div className={`${!isLoggedIn && !isOTPRequested ? 'block' : 'hidden'} w-full`}>
                        <LoginForm
                            lang={lang}
                            onRequestOTP={() => setIsOTPRequested(true)}
                            onLoginSuccess={login}
                        />
                    </div>

                    <div className={`${!isLoggedIn && isOTPRequested ? 'block' : 'hidden'} w-full`}>
                        <OTPInput lang={lang} onLoginSuccess={login} />
                    </div>

                    <div className={`${isLoggedIn ? 'block' : 'hidden'} w-full`}>
                        <ProfileMenu lang={lang} />
                    </div>
                </Wrapper>
            </div>
        </div>
    );
}
