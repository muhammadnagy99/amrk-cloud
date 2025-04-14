'use client'

import { useState, useEffect } from "react";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import ReturnCTA from "@/src/components/pickup/payment-gateway/return-CTA";

const TEXTS: Record<string, any> = {
  ar: {
    title: "بوابة الدفع",
    loadingMessage: "يرجى الانتظار...",
    errorMessage: "حدث خطأ أثناء تحميل بوابة الدفع. حاول مرة أخرى.",
    retry: "إعادة المحاولة"
  },
  en: {
    title: "Payment Gateway",
    loadingMessage: "Please, wait...",
    errorMessage: "Something went wrong while loading the payment gateway. Please try again.",
    retry: "Retry"
  }
};

const LoadingOverlay = ({ message }: { message: string }) => (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white backdrop-blur-sm">
      <div className="w-16 h-16 mb-4 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
      <p className="text-center text-gray-600 font-medium">{message}</p>
    </div>
  );

export default function PaymentGateWayClient({ props }: { props: string }) {
  const lang = props || "ar";
  const t = TEXTS[lang];

  const [loading, setLoading] = useState(true);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const setCookie = (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=86400`;
  };

  const fetchTelrUrl = async () => {
    try {
      setLoading(true);
      setError(false);

      const basketItems = JSON.parse(localStorage.getItem("basket_items") || "[]");

      const res = await fetch("/api/telr-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: basketItems }),
      });

      const data = await res.json();

      if (data?.url) {
        setIframeUrl(data.url);

        // ✅ Set returned data as cookies
        if (data.order_ref) setCookie("order_id", data.order_ref);
        if (data.payment_session) setCookie("payment_session", data.payment_session);
        setCookie("telr_url", data.url);
      } else {
        setError(true);
      }

    } catch (err) {
      console.error("Error loading Telr iframe:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelrUrl();
  }, []);

  return (
    <MobileWrapper>
      {loading && <LoadingOverlay message={t.loadingMessage} />}

      <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10 relative">
        <NavBar text={t.title} lang={lang} />

        {error && !loading && (
          <div className="flex flex-col items-center justify-center text-center mt-10 text-red-600">
            <p>{t.errorMessage}</p>
            <button
              className="mt-4 px-6 py-2 bg-[#b0438a] text-white rounded"
              onClick={fetchTelrUrl}
            >
              {t.retry}
            </button>
          </div>
        )}

        {!error && iframeUrl && (
          <iframe
            src={iframeUrl}
            className="w-full h-[70vh] rounded-lg border"
            allowFullScreen
          />
        )}
      </div>

      <ReturnCTA lang={lang} />
    </MobileWrapper>
  );
}
