import { ApplePayIcon, CreditCard, PlusCircle } from "./icons";

type PaymentMethodProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: "اختر طريقة الدفع",
    applePay: "الدفع باستخدام Apple Pay",
    savedCard: "xxxx-4382",
    addNew: "إضافة بطاقة دفع جديدة",
  },
  en: {
    title: "Choose a payment method",
    applePay: "Pay with Apple Pay",
    savedCard: "xxxx-4382",
    addNew: "Add a new payment card",
  },
};

export default function PaymentMethod({ lang }: PaymentMethodProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="bg-white flex flex-col gap-4">
      <h3 className="text-black font-medium text-base">{t.title}</h3>
      <div className="flex flex-col gap-3">
        <div className="bg-black text-white rounded-lg p-4 flex items-center justify-center cursor-pointer gap-4 h-16">
          <ApplePayIcon />
          <span className="text-sm font-normal">{t.applePay}</span>
        </div>

        <label className="border border-[#00000033] rounded-lg p-4 flex items-center justify-between cursor-pointer text-sm font-normal">
          <p className="flex items-center gap-4">
            <CreditCard />
            <span>{t.savedCard}</span>
          </p>
          <input type="radio" name="payment" className="w-5 h-5" />
        </label>

        <label className="border border-[#00000033] rounded-lg p-4 flex items-center justify-between cursor-pointer text-sm font-normal">
          <p className="flex items-center gap-4">
            <PlusCircle />
            <span>{t.addNew}</span>
          </p>
          <input type="radio" name="payment" className="w-5 h-5" />
        </label>
      </div>
    </div>
  );
}
