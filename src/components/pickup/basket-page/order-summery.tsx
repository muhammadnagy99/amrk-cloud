"use client";
import { BasketItem } from "@/src/app/[lang]/pick-up/basket/basket-client";
import { useEffect, useState } from "react";
import { RiyalCurrency } from "./icons";

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
    
    // Calculate summary on client side
    try {
      const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const vatPercent = 15;
      const vatAmount = subtotal * (vatPercent / 100);
      const discount = redeemPoints ? pointsValue : 0;
      const total = subtotal + vatAmount - discount;
      const calculatedSummary = {
        subtotal,
        vatAmount,
        vatPercent,
        discount,
        total
      };
      
      setSummary(calculatedSummary);
      setLoading(false);
      
      if (onTotalChange) {
        onTotalChange(total);
      }
    } catch (error) {
      console.error("Error calculating order summary:", error);
      setLoading(false);
    }
  }, [items, redeemPoints, pointsValue, onTotalChange]);

  if (loading || !summary) return <p>{t.loading}</p>;

  return (
    <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-4">
      <div className="grid grid-cols-2 text-black text-xs font-light gap-3">
        <span className="justify-self-start rtl:text-right ltr:text-left">{t.subtotal}</span>
        <span className="justify-self-end flex flex-row gap-1">
          {summary.subtotal.toFixed(2)} {<RiyalCurrency color="gray" />}
        </span>
        <span className="justify-self-start rtl:text-right ltr:text-left">
          {t.vat} ({summary.vatPercent}%)
        </span>
        <span className="justify-self-end flex flex-row gap-1">
          {summary.vatAmount.toFixed(2)} {<RiyalCurrency color="gray" />}
        </span>
        {summary.discount > 0 && (
          <>
            <span className="justify-self-start rtl:text-right ltr:text-left text-primaryColor">{t.discount}</span>
            <span className="justify-self-end flex flex-row gap-1 text-primaryColor">
              - {summary.discount.toFixed(2)} {<RiyalCurrency color="#b0438a" />}
            </span>
          </>
        )}
      </div>
      <div className="flex justify-between items-center font-medium text-base">
        <span className="text-black">{t.total}</span>
        <span className="text-black flex flex-row gap-1 items-center">
          {summary.total.toFixed(2)} {<RiyalCurrency color="black" />}
        </span>
      </div>
    </div>
  );
}