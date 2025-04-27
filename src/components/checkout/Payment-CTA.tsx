type PaymentCTAProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    backToBasket: "العودة إلى السلة"
  },
  en: {
    backToBasket: "Back to Basket"
  }
};

export default function PaymentCTA({ lang }: PaymentCTAProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
      <a href="/pick-up/basket" className="flex items-center justify-center px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1">
        <span className="text-sm">{t.backToBasket}</span>
      </a>
    </div>
  );
}
