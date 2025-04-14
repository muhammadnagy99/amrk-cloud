'use client';

import { useEffect, useState } from "react";
import { BasketIcon } from "../product-page/icons";
import Link from "next/link";
import { RiyalCurrency } from "../basket-page/icons";

interface BasketCTAHomeProps {
  lang: string; // e.g. "en" or "ar"
}

interface BasketItem {
  id: string;
  quantity: number;
  required: {
    name: string;
    value: string;
    extraPrice: number;
  };
  optional: any[];
  totalPrice: number;
}

export default function BasketCTAHome({ lang }: BasketCTAHomeProps) {
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("basket_items");
    if (storedItems) {
      try {
        const parsedItems: BasketItem[] = JSON.parse(storedItems);
        const totalCount = parsedItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalAmount = parsedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        setItemsCount(totalCount);
        setTotalPrice(totalAmount);
      } catch (error) {
        console.error("Error parsing basket items:", error);
      }
    }
  }, []);

  if (itemsCount === 0) return <div />; // 👈 don't render anything if no items

  const buttonLabel = lang === "ar" ? "عرض السلة" : "View Basket";
  const currencyLabel = lang === "ar" ? "ر.س" : "SAR";

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
      <Link
        href={`/pick-up/basket/`}
        className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1"
      >
        <p className="h-6 w-6 bg-[#922b6e] rounded-full text-white text-xs font-medium flex justify-center items-center">
          {itemsCount}
        </p>
        <p className="flex flex-row items-center gap-2">
          <BasketIcon />
          <span className="text-sm font-medium">{buttonLabel}</span>
        </p>
        <span className="flex flex-row gap-1 text-sm font-light items-center">
          {totalPrice.toFixed(2)} {<RiyalCurrency color="white" /> }
        </span>
      </Link>
    </div>
  );
}
