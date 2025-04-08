import { ApplePayIcon, CreditCard } from "./icons";

type PaymentMethodProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: " طرق الدفع",
    applePay: "الدفع باستخدام Apple Pay",
    cardPay: "الدفع باستخدام بطاقة ائتمان / خصم",
  },
  en: {
    title: "Payment methods",
    applePay: "Pay with Apple Pay",
    cardPay: "Pay with Credit/Debit Card",
  },
};

export default function PaymentMethod({ lang }: PaymentMethodProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="bg-white flex flex-col gap-4">
      <h3 className="text-black font-medium text-base">{t.title}</h3>
      <div className="flex flex-col gap-3">

        {/* Apple Pay */}
        <a href="/pick-up/pay-order" className="bg-black text-white rounded-lg p-4 flex items-center justify-center cursor-pointer gap-4 h-16">
          <ApplePayIcon />
          <span className="text-sm font-normal">{t.applePay}</span>
        </a>

        {/* Card Payment */}
        <a href="/pick-up/pay-order" className="border border-[#00000033] rounded-lg p-4 flex items-center justify-center cursor-pointer text-sm font-normal gap-4 h-16">
          <CreditCard />
          <span>{t.cardPay}</span>
        </a>
      </div>
    </div>
  );
}
