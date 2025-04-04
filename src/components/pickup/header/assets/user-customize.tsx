'use client';

import { useState, useEffect, useRef } from "react";
import LoginForm from "../../user-overlay/login-form";
import OTPInput from "../../user-overlay/otp-input";
import ProfileMenu from "../../user-overlay/profile-menu";
import Wrapper from "../../user-overlay/wrapper";
import { ELnag, User } from "./icons";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);
    return { isLoggedIn, login, logout };
};

export default function UserCustomize({lang}: {lang: string}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOTPRequested, setIsOTPRequested] = useState(true);
    const { isLoggedIn, login } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleUserClick = () => {
        setIsOpen((prev) => !prev);
        setIsOTPRequested(false);
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

    return (
        <div className="relative" ref={containerRef}>
            <div className="flex flex-row justify-between h-full gap-2">
                <p className="w-9 h-9 flex justify-center items-center bg-white rounded-lg border-widget">
                    <ELnag />
                </p>
                <p
                    onClick={handleUserClick}
                    className="cursor-pointer w-9 h-9 flex justify-center items-center bg-white rounded-lg border-widget"
                >
                    <User />
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
                        <OTPInput lang={lang} />
                    </div>

                    <div className={`${isLoggedIn ? 'block' : 'hidden'} w-full`}>
                        <ProfileMenu lang={lang} />
                    </div>
                </Wrapper>
            </div>
        </div>
    );
}
