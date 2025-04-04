'use client'

import { FC, useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { AIcon, GIcon } from "./icons";

type LoginFormProps = {
  lang: string;
  onRequestOTP: () => void;
  onLoginSuccess: () => void;
};

const TEXTS: Record<string, any> = {
  ar: {
    headingPart1: "أهلاً وسهلاً !",
    headingPart2: "سجل الدخول للوصول إلى مكافآتك",
    phoneLabel: "ادخل رقم جوالك",
    loginButton: "تسجيل دخول",
    orText: "أو",
    googleLogin: "تسجيل دخول باستخدام Google",
    appleLogin: "تسجيل دخول باستخدام Apple",
    phoneAlert: "يرجى إدخال رقم الهاتف"
  },
  en: {
    headingPart1: "Welcome!",
    headingPart2: "Login to access your rewards",
    phoneLabel: "Enter your phone number",
    loginButton: "Login",
    orText: "OR",
    googleLogin: "Login with Google",
    appleLogin: "Login with Apple",
    phoneAlert: "Please enter your phone number"
  }
};

const LoginForm: FC<LoginFormProps> = ({ lang, onLoginSuccess, onRequestOTP }) => {
  const [phone, setPhone] = useState("");
  const t = TEXTS[lang] || TEXTS["en"]; // fallback to English if unsupported

  const handleLoginClick = () => {
    if (phone) {
      onRequestOTP();
    } else {
      alert(t.phoneAlert);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-t-2xl py-2 px-3 w-full">
      <div className="flex flex-col gap-8">
        <h2 className={`text-xl font-medium text-black leading-9 w-[90%] ${lang === 'ar' ? "text-right" : ''}`}>
          <span className="text-[#b0438a] p-0.5">{t.headingPart1}</span>
          {t.headingPart2}
        </h2>

        <div className="flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <label className={`block text-black text-base ${lang === 'ar' ? "text-right" : ''}`}>
              {t.phoneLabel}
            </label>
            <div className="w-full">
              <PhoneInput
                defaultCountry="sa"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>
          </div>

          <button
            onClick={handleLoginClick}
            className="w-full bg-[#b0438a] text-base text-white font-medium py-3 rounded-lg"
          >
            {t.loginButton}
          </button>

          <div className="flex items-center">
            <hr className="flex-grow border-[#00000080]" />
            <span className="mx-2 text-black text-xs font-medium">{t.orText}</span>
            <hr className="flex-grow border-[#00000080]" />
          </div>

          <div className="flex flex-col gap-2">
            <button className="w-full flex items-center justify-center border border-black py-3 rounded-lg mb-3 gap-3 text-sm">
              <GIcon />
              {t.googleLogin}
            </button>
            <button className="w-full flex items-center justify-center bg-black text-white py-3 rounded-lg gap-3 text-sm">
              <AIcon />
              {t.appleLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
