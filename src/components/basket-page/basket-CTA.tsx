'use client'

import { useRef, useState } from "react";
import { RiyalCurrency } from "./icons";
import { Toast } from "primereact/toast";
import OTPInput from "../user-overlay/otp-input";
import Wrapper from "../user-overlay/wrapper";
import LoginForm from "../user-overlay/login-form";

interface BasketCTAProps {
  lang: string;
  itemsCount: number;
  total: number;
  onLoginEnd: () => void;
}

const TEXTS: Record<string, any> = {
  ar: {
    checkout: "أدخل طلبك",
    currency: "ر.س",
  },
  en: {
    checkout: "Place Order",
    currency: "SAR",
  },
};

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  return { isLoggedIn, login, logout };
};


export default function BasketCTA({ lang, itemsCount, total, onLoginEnd }: BasketCTAProps) {
  const t = TEXTS[lang];
  const toast = useRef<any>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const { isLoggedIn, login } = useAuth();

  const ToestSuccess = () => {
    toast.current!.show({
      severity: 'success',
      summary: t.success,
      life: 2000,
      content: (props: any) => (
        <p>
          {props.message.summary}
        </p>
      )
    });
  };

  const onLoginSuccess = () => {
    setIsOpen(false);
    login();
    ToestSuccess()
    onLoginEnd()
  }

  const handleUserClick = async () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[434px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
        <button
          className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1"
          onClick={handleUserClick}
        >
          <p className="h-6 w-6 bg-[#922b6e] rounded-full text-white text-xs font-medium flex justify-center items-center">
            {itemsCount}
          </p>
          <p className="flex flex-row items-center">
            <span className="text-sm font-medium">{t.checkout}</span>
          </p>
          <span className="text-sm font-light flex flex-row gap-1">
            {total.toFixed(2)} {<RiyalCurrency color="white" />}
          </span>
        </button>
        <Toast ref={toast} position='top-center' />
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
            <OTPInput lang={lang} onLoginSuccess={onLoginSuccess} isVisible={isOTPRequested} />
          </div>
        </Wrapper>
      </div>
    </>
  );
}
