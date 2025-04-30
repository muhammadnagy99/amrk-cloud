"use client";
import { useEffect, useState } from "react";
import { RiyalCurrency } from "../basket-page/icons";

// Updated interface to match the new array structure
interface ItemOption {
  name: string;
  price: number;
}

interface BasketItem {
  user: string;
  quantity: number;
  name: string;
  basePrice: number;
  options: ItemOption[];
  totalPrice: number;
  mode: string;
}

interface Props {
  lang: string;
  redeemPoints: boolean;
  pointsValue: number;
  items: BasketItem[];
  onTotalChange?: (val: number) => void;
  couponDiscount?: number;
  couponCode?: string | null;
  couponPercentage?: number;
  tipAmount?: number;
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
    userSummary: "ملخص المستخدمين",
    userTotal: "مجموع",
    tip: 'إكرامية'
  },
  en: {
    subtotal: "Subtotal",
    vat: "VAT",
    discount: "Points Redeemed",
    total: "Total",
    currency: "SAR",
    couponDiscount: 'Coupon Code Discount',
    loading: "Loading summary...",
    userSummary: "User Summary",
    userTotal: "Total for",
    tip: 'Tips'
  },
};

export default function OrderSummary({
  lang,
  redeemPoints,
  pointsValue,
  items,
  onTotalChange,
  couponDiscount = 0,
  couponCode = null,
  couponPercentage = 0,
  tipAmount = 0
}: Props) {
  const t = TEXTS[lang];
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<null | {
    subtotal: number;
    vatAmount: number;
    vatPercent: number;
    discount: number;
    total: number;
    userTotals: Record<string, number>;
  }>(null);

  // Price display component with currency always on the left visually
  const PriceDisplay = ({ price, color, isDiscount = false }: { price: number; color: string; isDiscount?: boolean }) => {
    return (
      <div className="flex items-center gap-1" dir="ltr">
        <RiyalCurrency color={color} />
        <span>{isDiscount ? `${price.toFixed(2)} -` : price.toFixed(2)}</span>
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
      const total = subtotal + vatAmount + tipAmount - discount - couponDiscount;

      // Calculate totals by user
      const userTotals: Record<string, number> = {};
      items.forEach(item => {
        const user = item.user;
        if (!userTotals[user]) {
          userTotals[user] = 0;
        }
        userTotals[user] += item.totalPrice;
      });

      const calculatedSummary = {
        subtotal,
        vatAmount,
        vatPercent,
        discount,
        total,
        userTotals
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
  }, [items, redeemPoints, couponDiscount, pointsValue, onTotalChange, tipAmount]);

  if (loading || !summary) return <p>{t.loading}</p>;

  return (
    <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-4">
      {/* User breakdown section */}
      {/* <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">{t.userSummary}</h3>
        <div className="grid grid-cols-2 text-black text-xs font-light gap-2">
          {Object.entries(summary.userTotals).map(([user, total]) => (
            <>
              <span key={`user-${user}`} className="justify-self-start rtl:text-right ltr:text-left">
                {t.userTotal} {user === 'current' ? 'You' : user}
              </span>
              <span key={`total-${user}`} className="justify-self-end">
                <PriceDisplay price={total} color="gray" />
              </span>
            </>
          ))}
        </div>
      </div> */}

      {/* Order summary section */}
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

        {tipAmount > 0 && (
          <>
            <span className="justify-self-start rtl:text-right ltr:text-left">
              {t.tip}
            </span>
            <span className="justify-self-end">
              <PriceDisplay price={tipAmount} color="gray" isDiscount={false} />
            </span>
          </>
        )}

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
            <span className="justify-self-end text-primaryColor">
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