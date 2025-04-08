'use client'
import { useState, useEffect } from "react";
import { RiyalCurrency } from "../basket-page/icons";

type PaymentCTAProps = {
  lang: string;
  total: number;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: "المتابعة إلى الدفع",
    currency: 'ر.س',
    loadingMessage: "نقوم بمعالجة طلبك، الرجاء الانتظار..."
  },
  en: {
    title: "Proceed to Payment",
    currency: 'SAR',
    loadingMessage: "Processing your order. Please wait..."
  }
};


const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white backdrop-blur-sm">
    <div className="w-16 h-16 mb-4 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
    <p className="text-center text-gray-600 font-medium">{message}</p>
  </div>
);


export default function PaymentCTA({ lang, total }: PaymentCTAProps) {
  const t = TEXTS[lang];
  const [basketId, setBasketId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const placePickupOrder = async () => {
      try {
        setLoading(true);
        const basketItems = JSON.parse(localStorage.getItem("basket_items") || "[]");

        const res = await fetch("/api/place-pickup-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ basketItems }),
        });

        const data = await res.json();
        const id = typeof data === "string" ? data : data.orderId || null;

        if (id) {
          setBasketId(id);
          document.cookie = `basket_id=${id}; path=/; max-age=86400`;
        }

      } catch (err) {
        console.error("Error placing pickup order:", err);
      } finally {
        setLoading(false);
      }
    };

    placePickupOrder();
  }, []);

  console.log(basketId)

  return (
    <>
      {loading && <LoadingOverlay message={t.loadingMessage} />}

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
        <a href="/pick-up/pay-order" className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1">
          <p className="flex flex-row items-center">
            <span className="text-sm">{t.title}</span>
          </p>
          <span className="flex flex-row gap-1 text-sm font-light">{total.toFixed(2)} {lang === 'ar' ? <RiyalCurrency color="white" /> : <p>{t.currency}</p>}</span>
        </a>
      </div>
    </>
  );
}
