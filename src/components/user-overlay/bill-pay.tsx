import { SplitIconLight } from "./icons";

export default function BillPay({ lang }: { lang: string }) {
  // Text translations for Arabic and English only
  const translations = {
    en: {
      totalBill: "Total Bill",
      splitBill: "Split Bill"
    },
    ar: {
      totalBill: "دفع إجمالي الفاتورة",
      splitBill: "تقسيم الفاتورة"
    }
  };

  const text = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-40 rounded-lg gap-3 h-24">
      <button
        onClick={() => {}}
        className="flex items-center justify-center px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1"
      >
        <p className="">
          {text.totalBill}
        </p>
      </button>
      <button
        onClick={() => {}}
        className="flex items-center justify-center px-4 bg-[#005ec9] text-white w-full h-12 rounded-lg flex-1 gap-2"
      >
        <SplitIconLight />
        <p className="text-center">
          {text.splitBill}
        </p>
      </button>
    </div>
  );
}