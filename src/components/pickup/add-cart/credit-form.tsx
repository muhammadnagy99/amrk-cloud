import { CreditCard } from "./icons";

type CardInputFormProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    cardNumberPlaceholder: "ادخل رقم البطاقة",
    expiryPlaceholder: "تاريخ الإنتهاء MM/YY",
    cvvPlaceholder: "ادخل رقم CVV",
    cardNumberLabel: "رقم البطاقة",
    expiryLabel: "تاريخ الإنتهاء",
    cvvLabel: "رمز CVV",
  },
  en: {
    cardNumberPlaceholder: "Enter card number",
    expiryPlaceholder: "Expiry date MM/YY",
    cvvPlaceholder: "Enter CVV",
    cardNumberLabel: "Card Number",
    expiryLabel: "Expiry Date",
    cvvLabel: "CVV Code",
  },
};

export default function CardInputForm({ lang }: CardInputFormProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <form className="flex flex-col w-full gap-3">
      {/* Card Number Input */}
      <label>
        <div className="border border-[#00000080] rounded-lg flex items-center p-4 gap-4">
          <CreditCard />
          <input
            type="text"
            name="cardNumber"
            placeholder={t.cardNumberPlaceholder}
            className="bg-transparent outline-none text-sm font-light"
            required
            aria-label={t.cardNumberLabel}
          />
        </div>
      </label>

      {/* Expiry Date & CVV Inputs */}
      <div className="flex justify-between w-full">
        <label className="w-[48%]">
          <div className="border border-[#00000080] rounded-lg flex items-center p-4">
            <input
              type="text"
              name="expiryDate"
              placeholder={t.expiryPlaceholder}
              className="bg-transparent outline-none text-sm font-light w-full"
              required
              aria-label={t.expiryLabel}
            />
          </div>
        </label>
        <label className="w-[48%]">
          <div className="border border-[#00000080] rounded-lg flex items-center p-4 gap-4">
            <CreditCard />
            <input
              type="text"
              name="cvv"
              placeholder={t.cvvPlaceholder}
              className="bg-transparent outline-none text-sm font-light w-[70%]"
              required
              aria-label={t.cvvLabel}
            />
          </div>
        </label>
      </div>
    </form>
  );
}
