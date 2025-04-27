type SaveCardProps = {
  lang: string;
};

const TEXTS: Record<string, { main: string; sub: string }> = {
  ar: {
    main: "احفظ بطاقتك لتسريع عمليات الدفع القادمة",
    sub: "تسهيل الدفع مستقبلاً",
  },
  en: {
    main: "Save your card for faster payments",
    sub: "Easier checkout next time",
  },
};

export default function SaveCard({ lang }: SaveCardProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="bg-white flex flex-row items-center justify-between gap-4">
      <div className="flex flex-col gap-2">
        <span className="font-normal text-sm">{t.main}</span>
        <span className="text-xs font-light">{t.sub}</span>
      </div>
      <label className="inline-flex items-center cursor-pointer ">
        <input
          type="checkbox"
          value=""
          className="sr-only peer !hidden"
          disabled={false}
        />
        <div className="relative w-11 h-6 bg-[#cecece] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b0438a]"></div>
      </label>
    </div>
  );
}
