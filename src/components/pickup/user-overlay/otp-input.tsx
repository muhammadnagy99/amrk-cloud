'use client';

import { FC, useRef, useState, useEffect } from "react";

type OTPInputProps = {
  lang: string;
  onLoginSuccess: () => void;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: "ادخل رمز OTP المرسل إلى جوالك",
    noCode: "لم تستلم الرمز؟",
    resend: "إعادة الإرسال",
    confirm: "تأكيد",
    timer: "00:",
    error: "رمز OTP غير صحيح"
  },
  en: {
    title: "Enter the OTP sent to your phone",
    noCode: "Didn't receive the code?",
    resend: "Resend",
    confirm: "Confirm",
    timer: "00:",
    error: "Invalid OTP code"
  }
};

const OTPInput: FC<OTPInputProps> = ({ lang, onLoginSuccess }) => {
  const t = TEXTS[lang] || TEXTS.en;
  
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  
  // Timer functionality
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timerId);
  }, [timeLeft]);
  
  // Format the timer display: pad with leading zeros
  const formatTime = (seconds: number) => {
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  };
  
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 4).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 4) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the appropriate input based on how many digits were pasted
    if (digits.length < 4) {
      inputsRef.current[digits.length]?.focus();
    }
  };
  
  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }
    
    // Get the phone number from cookies
    const phone = getCookie("user_phone");
    
    if (!phone) {
      setError("Phone number not found");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Call our Next.js API route instead of the external API directly
      const response = await fetch("/api/validate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          otp: code, 
          PhoneNumber: decodeURIComponent(phone) 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // No need to set cookies here as that's handled by the API route
        onLoginSuccess();
      } else {
        setError(data.error || t.error);
      }
    } catch (err) {
      console.error("OTP validation failed:", err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResendOTP = async () => {
    if (!canResend) return;
    
    // Get the phone number from cookies
    const phone = getCookie("user_phone");
    
    if (!phone) {
      setError("Phone number not found");
      return;
    }
    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PhoneNumber: decodeURIComponent(phone) }),
      });
      
      if (response.ok) {
        // Reset timer and disable resend button
        setTimeLeft(30);
        setCanResend(false);
        setError("");
      } else {
        setError("Failed to resend OTP");
      }
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      setError("Failed to resend OTP");
    }
  };
  
  // Helper function to get cookies
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  };
  
  return (
    <div className="flex flex-col items-center justify-center gap-5 pb-7 w-full">
      <h2 className={`text-base font-normal w-full ${lang === 'ar' ? "text-right" : ''}`}>{t.title}</h2>
      
      <div className="flex flex-row gap-2.5">
        {otp.map((digit, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:text-[#b0438a] text-xl"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
          />
        ))}
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="text-sm text-[#b0438a] flex flex-row gap-4">
        <p className="flex flex-row gap-1">
          <span>{t.noCode}</span>{" "}
          <span 
            className={`font-medium cursor-pointer ${canResend ? 'text-[#b0438a] underline' : 'text-gray-400'}`}
            onClick={canResend ? handleResendOTP : undefined}
          >
            {t.resend}
          </span>
        </p>
        <span className="ml-2 text-[#b0438a] font-medium">
          {t.timer}{formatTime(timeLeft)}
        </span>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#b0438a] text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-all duration-300 disabled:bg-purple-300"
      >
        {loading ? "Processing..." : t.confirm}
      </button>
    </div>
  );
};

export default OTPInput;