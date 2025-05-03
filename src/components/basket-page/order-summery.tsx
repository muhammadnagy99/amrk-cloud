"use client";
import { useEffect, useState } from "react";
import { RiyalCurrency } from "./icons";
import { BasketItem } from "@/src/interfaces/interfaces";

interface Props {
  lang: string;
  redeemPoints: boolean;
  pointsValue: number;
  items: BasketItem[];
  onTotalChange: (val: number) => void;
  onSummeryChange: (val: Summery) => void;
  couponDiscount?: number;
  couponCode?: string | null;
  couponPercentage?: number;
}

const TEXTS: Record<string, any> = {
  ar: {
    subtotal: "المجموع الفرعي",
    vat: "ضريبة القيمة المضافة",
    discount: "استبدال نقاط الولاء",
    total: "المبلغ الإجمالي",
    currency: "ر.س",
    couponDiscount: 'خصم رمز الكوبون',
    loading: "جاري تحميل الملخص...",
  },
  en: {
    subtotal: "Subtotal",
    vat: "VAT",
    discount: "Points Redeemed",
    total: "Total",
    currency: "SAR",
    couponDiscount: 'Coupon Code Discount',
    loading: "Loading summary...",
  },
};

interface Summery {
  subtotal: number;
  vatAmount: number;
  vatPercent: number;
  discount: number;
  total: number;
}

export default function OrderSummary({
  lang,
  redeemPoints,
  pointsValue,
  items,
  onTotalChange,
  onSummeryChange,
  couponDiscount = 0,
  couponCode = null,
  couponPercentage = 0,
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

  // Price display component with currency always on the left visually
  const PriceDisplay = ({ price, color, isDiscount = false }: { price: number; color: string; isDiscount?: boolean }) => {
    return (
      <div className="flex items-center gap-1" dir="ltr">
        <RiyalCurrency color={color} />
        <span>{isDiscount ? `- ${price.toFixed(2)}` : price.toFixed(2)}</span>
      </div>
    );
  };

  useEffect(() => {
    if (!items.length) return;
  
    // Calculate summary on client side
    try {
      const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const vatPercent = 15;
      const vatAmount = subtotal * (vatPercent / 100);
      const discount = redeemPoints ? pointsValue : 0;
      const total = subtotal + vatAmount - discount - couponDiscount;
      const calculatedSummary = {
        subtotal,
        vatAmount,
        vatPercent,
        discount,
        total
      };
  
      setSummary(calculatedSummary);
      setLoading(false);
  
      // Only call these when the calculation has actually changed
      if (onTotalChange && calculatedSummary.total !== summary?.total) {
        onSummeryChange(calculatedSummary);
        onTotalChange(total);
      }
    } catch (error) {
      console.error("Error calculating order summary:", error);
      setLoading(false);
    }
  }, [items, redeemPoints, couponDiscount, pointsValue]);  // Remove onTotalChange from dependencies


  if (loading || !summary) return <p>{t.loading}</p>;

  return (
    <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-4">
      <div className="grid grid-cols-2 text-black text-xs font-light gap-3">
        <span className="justify-self-start rtl:text-right ltr:text-left">{t.subtotal}</span>
        <span className="justify-self-end">
          <PriceDisplay price={summary.subtotal} color="gray" />
        </span>

        <span className="justify-self-start rtl:text-right ltr:text-left">
          {t.vat} ({summary.vatPercent}%)
        </span>
        <span className="justify-self-end">
          <PriceDisplay price={summary.vatAmount} color="gray" />
        </span>

        {summary.discount > 0 && (
          <>
            <span className="justify-self-start rtl:text-right ltr:text-left text-primaryColor">{t.discount}</span>
            <span className="justify-self-end text-primaryColor">
              <PriceDisplay price={summary.discount} color="#b0438a" isDiscount={true} />
            </span>
          </>
        )}
        {couponCode && couponDiscount > 0 && (
          <>
            <span className="justify-self-start rtl:text-right ltr:text-left text-primaryColor">
              {t.couponDiscount} ({couponPercentage})
            </span>
            <span className="text-[#B0438A]">
              <PriceDisplay price={couponDiscount} color="#b0438a" isDiscount={true} />
            </span>
          </>
        )}
      </div>

      <div className="flex justify-between items-center font-medium text-base">
        <span className="text-black">{t.total}</span>
        <span className="text-black">
          <PriceDisplay price={summary.total} color="black" />
        </span>
      </div>
    </div>
  );
}