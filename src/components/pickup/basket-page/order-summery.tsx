"use client";

import { BasketItem } from "@/src/app/[lang]/pick-up/basket/basket-client";
import { useEffect, useState } from "react";

interface Props {
  lang: string;
  redeemPoints: boolean;
  pointsValue: number;
  items: BasketItem[]; 
  onTotalChange?: (val: number) => void;

}

const TEXTS: Record<string, any> = {
  ar: {
    subtotal: "المجموع الفرعي",
    vat: "ضريبة القيمة المضافة",
    discount: "استبدال نقاط الولاء",
    total: "المبلغ الإجمالي",
    currency: "ر.س",
    loading: "جاري تحميل الملخص...",
  },
  en: {
    subtotal: "Subtotal",
    vat: "VAT",
    discount: "Points Redeemed",
    total: "Total",
    currency: "SAR",
    loading: "Loading summary...",
  },
};

export default function OrderSummary({
  lang,
  redeemPoints,
  pointsValue,
  items,
  onTotalChange
}: Props) {
  const t = TEXTS[lang];
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<null | {
    subtotal: number;
    vatAmount: number;
    vatPercent: number;
    discount: number;
    total: number;
  }>(null);
  
  useEffect(() => {
    if (!items.length) return;

    setLoading(true);
    fetch("/api/checkout-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, redeemPoints, pointsValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
        onTotalChange?.(data.total)
      });
  }, [items, redeemPoints, pointsValue]);

  if (loading || !summary) return <p>{t.loading}</p>;

  return (
    <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-4">
      <div className="grid grid-cols-2 text-black text-xs font-light gap-3">
        <span className="rtl:text-right ltr:text-left">{t.subtotal}</span>
        <span className="rtl:text-left ltr:text-right">
          {t.currency} {summary.subtotal.toFixed(2)}
        </span>

        <span className="rtl:text-right ltr:text-left">
          {t.vat} ({summary.vatPercent}%)
        </span>
        <span className="rtl:text-left ltr:text-right">
          {t.currency} {summary.vatAmount.toFixed(2)}
        </span>

        {summary.discount > 0 && (
          <>
            <span className="rtl:text-right ltr:text-left text-primaryColor">{t.discount}</span>
            <span className="rtl:text-left ltr:text-right text-primaryColor">
              - {t.currency} {summary.discount.toFixed(2)}
            </span>
          </>
        )}
      </div>

      <div className="flex justify-between items-center font-medium text-base">
        <span className="text-black">{t.total}</span>
        <span className="text-black">
          {t.currency} {summary.total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
