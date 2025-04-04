type PaymentSummeryProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: "ملخص الدفع",
    subtotal: "المجموع الفرعي",
    tax: "ضريبة المبيعات (15%)",
    total: "المبلغ الإجمالي",
    currency: "ر.س",
  },
  en: {
    title: "Payment Summary",
    subtotal: "Subtotal",
    tax: "Sales Tax (15%)",
    total: "Total Amount",
    currency: "SAR",
  },
};

export default function PaymentSummery({ lang }: PaymentSummeryProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="bg-white flex flex-col gap-4">
      <h3 className="text-black font-medium text-base">{t.title}</h3>

      <div className="grid grid-cols-2 text-black text-xs font-light gap-3">
        <span className="rtl:text-right ltr:text-left">{t.subtotal}</span>
        <span className="rtl:text-left ltr:text-right">{t.currency} 135.00</span>

        <span className="rtl:text-right ltr:text-left">{t.tax}</span>
        <span className="rtl:text-left ltr:text-right">{t.currency} 20.25</span>
      </div>

      <div className="flex justify-between items-center font-medium text-base">
        <span className="text-black">{t.total}</span>
        <span className="text-black">{t.currency} 178.50</span>
      </div>
    </div>
  );
}
