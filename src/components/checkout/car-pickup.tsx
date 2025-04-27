'use client'

import { useState } from "react";

type CarPickUpProps = {
  lang: string;
};

const TEXTS: Record<string, {
  title: string;
  main: string;
  sub: string;
  carDetailsTitle: string;
  carTypeLabel: string;
  carColorLabel: string;
}> = {
  ar: {
    title: "استلام الطلب من السيارة",
    main: "أنا في السيارة، أحتاج توصيل طلبي عند الوصول",
    sub: "استلم طلبك بسهولة دون مغادرة سيارتك",
    carDetailsTitle: "أدخل تفاصيل سيارتك",
    carTypeLabel: "نوع السيارة",
    carColorLabel: "لون السيارة"
  },
  en: {
    title: "Pick up from car",
    main: "I'm in the car, I need delivery when I arrive",
    sub: "Receive your order without leaving your car",
    carDetailsTitle: "Enter your car details",
    carTypeLabel: "Car type",
    carColorLabel: "Car color"
  },
};

export default function CarPickUp({ lang }: CarPickUpProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="bg-white flex flex-col gap-4">
      <h3 className="text-black font-medium text-base">{t.title}</h3>
      <div className="bg-white flex flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-normal text-sm">{t.main}</span>
          <span className="text-xs font-light">{t.sub}</span>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer !hidden"
            disabled={false}
            onChange={() => setIsEnabled(!isEnabled)}
            checked={isEnabled}
          />
          <div className="relative w-11 h-6 bg-[#cecece] peer-focus:outline-none peer-focus:none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#b0438a]" />
        </label>
      </div>
      
      {isEnabled && (
        <div className="flex flex-col gap-4">
          <h3 className="text-black font-medium text-base">{t.carDetailsTitle}</h3>
          <div className="flex flex-row justify-between">
            <input
              type="text"
              className="w-[48%] border border-[#00000099] rounded-lg text-gray-800 h-12 px-3 focus:outline-none "
              placeholder={t.carTypeLabel}
            />
            <input
              type="text"
              className="w-[48%] border border-[#00000099] rounded-lg text-gray-800 h-12 px-3 focus:outline-none "
              placeholder={t.carColorLabel}
            />
          </div>
        </div>
      )}
    </div>
  );
}