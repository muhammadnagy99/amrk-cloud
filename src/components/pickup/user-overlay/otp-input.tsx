'use client';

import { FC } from "react";

type OTPInputProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: "ادخل رمز OTP المرسل إلى جوالك",
    noCode: "لم تستلم الرمز؟",
    resend: "إعادة الإرسال",
    confirm: "تأكيد",
    timer: "00:30"
  },
  en: {
    title: "Enter the OTP sent to your phone",
    noCode: "Didn't receive the code?",
    resend: "Resend",
    confirm: "Confirm",
    timer: "00:30"
  }
};

const OTPInput: FC<OTPInputProps> = ({ lang }) => {
  const t = TEXTS[lang] || TEXTS.en;

  return (
    <div className="flex flex-col items-center justify-center gap-5 pb-7 w-full">
      {/* Title */}
      <h2 className={`text-base font-normal w-full ${lang === 'ar' ? "text-right" : ''}`}>{t.title}</h2>

      {/* OTP Input Boxes */}
      <div className="flex flex-row gap-2.5">
        {[...Array(4)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:text-[#b0438a] focus:border-transparent text-xl"
          />
        ))}
      </div>

      {/* Resend OTP */}
      <div className="text-sm text-[#b0438a] flex flex-row gap-4">
        <p className="flex flex-row gap-1">
          <span>{t.noCode}</span>{" "}
          <span className="text-[#b0438a] font-medium cursor-pointer underline">
            {t.resend}
          </span>
        </p>
        <span className="ml-2 text-[#b0438a] font-medium">{t.timer}</span>
      </div>

      {/* Submit Button */}
      <button className="w-full bg-[#b0438a] text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-all duration-300">
        {t.confirm}
      </button>
    </div>
  );
};

export default OTPInput;
