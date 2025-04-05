'use client';

import { FC, useRef, useState } from "react";

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
    timer: "00:30",
    error: "رمز OTP غير صحيح"
  },
  en: {
    title: "Enter the OTP sent to your phone",
    noCode: "Didn't receive the code?",
    resend: "Resend",
    confirm: "Confirm",
    timer: "00:30",
    error: "Invalid OTP code"
  }
};

const OTPInput: FC<OTPInputProps> = ({ lang, onLoginSuccess }) => {
  const t = TEXTS[lang] || TEXTS.en;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    const phone = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userPhone="))
      ?.split("=")[1];

    if (!phone) {
      setError("Phone number not found");
      return;
    }

    try {
      const response = await fetch("https://api.dev.amrk.app/amrkCloudWeb/validateOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: code, PhoneNumber: decodeURIComponent(phone) }),
      });

      if (response.ok) {
        const data = await response.json();

        document.cookie = `userToken=${data.userToken}; path=/; max-age=3600`;
        document.cookie = `user_id=${data.user_id}; path=/; max-age=3600`;
        
        onLoginSuccess();
      } else {
        setError(t.error);
      }
    } catch (err) {
      console.error("OTP validation failed:", err);
      setError(t.error);
    }
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
            ref={(el) => {
              inputsRef.current[i] = el!;
            }}
          />

        ))}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="text-sm text-[#b0438a] flex flex-row gap-4">
        <p className="flex flex-row gap-1">
          <span>{t.noCode}</span>{" "}
          <span className="text-[#b0438a] font-medium cursor-pointer underline">
            {t.resend}
          </span>
        </p>
        <span className="ml-2 text-[#b0438a] font-medium">{t.timer}</span>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-[#b0438a] text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-all duration-300"
      >
        {t.confirm}
      </button>
    </div>
  );
};

export default OTPInput;
