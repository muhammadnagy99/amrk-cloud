'use client'
import { FC, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const t = TEXTS[lang] || TEXTS["en"]; // fallback to English if unsupported
  
  useEffect(() => {
    if (lang === 'en') {
      // Find and modify all country selector dropdowns
      const dropdowns = document.querySelectorAll('.react-international-phone-country-selector-dropdown');
      
      dropdowns.forEach(dropdown => {
        const element = dropdown as HTMLElement;
        element.style.right = '0px';
        element.style.left = 'unset';
      });
    }
  }, [lang]);
  
  const handleLoginClick = async () => {
    if (!phone) {
      alert(t.phoneAlert);
      return;
    }
    
    setLoading(true);
    
    try {
      // Call our Next.js API route instead of the external API directly
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PhoneNumber: phone }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // No need to set cookies here as that's handled by the API route
        onRequestOTP(); // Navigate to OTP verification
      } else {
        alert(data.error || "Login failed. Please check your phone number.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handlePhoneChange = (phone: string) => {
    setPhone(phone);
  }
  
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
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          
          <button
            onClick={handleLoginClick}
            disabled={loading}
            className="w-full bg-[#b0438a] text-base text-white font-medium py-3 rounded-lg"
          >
            {loading ? "Loading..." : t.loginButton}
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