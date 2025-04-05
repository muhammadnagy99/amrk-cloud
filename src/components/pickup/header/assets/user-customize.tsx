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
    const [isOTPRequested, setIsOTPRequested] = useState(false);
    const { isLoggedIn, login } = useAuth();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.cookie = "userToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTc0MzcxODA5MSwiZXhwIjoxNzQzNzIxNjkxLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay01aXZ6bkBhbXJrLWRldmVsb3BtZW50LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstNWl2em5AYW1yay1kZXZlbG9wbWVudC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6IlpQM0VWU1lzWEpXN3R3OVpxengzS1h3V3JMaDEiLCJjbGFpbXMiOnsicHJlbWl1bUFjY291bnQiOnRydWUsInBob25lTnVtYmVyIjoiKzk2Njk5Njk1OTk5OSJ9fQ.xl4mVo0_sUzQTiG6Vd7IrGtg54IeQM2QVMYVUFX8b-7Lz-W8Z5cz9x71cc2v6-238qXtriRabq7EYN2GQdTaSMUeOrMkXpPMa_OfAZCX1VXfUrXM5WNyFQD28tDnZ-cpDyD3MfOcG0fuURzS2xPmntxPk8UhTp59_zv1sfAM2x_raUrrfH_Q3_8HCgCO3jHvLbVJyu_37g62J52UBAJWRk8mu3UsX7Azrj2gMxDub5pzWIX-JttrqWAsmjLM8A0S9C_AgTq1Ddn2FZ3pFpRxQKtU5pfCLOtka5x_02j9ztcTlBDjAPqmhUTTGu3nZ39X-FGhSMUXsGaEsfjuSVAKdg; path=/; max-age=3600";
        document.cookie = "user_id=ZP3EVSYsXJW7tw9Zqzx3KXwWrLh1; path=/; max-age=3600";
      }, []);

      
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
