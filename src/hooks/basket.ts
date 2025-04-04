'use client'
import { useState, useEffect } from "react";

export interface BasketItem {
  id: string;
  quantity: number;
  required: { name: string; value: string; extraPrice?: number };
  optional: { name: string; value: string; extraPrice?: number }[];
  totalPrice: number;
}

const BASKET_KEY = "basket_items";

export default function useBasket() {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(BASKET_KEY);
    if (data) {
      setBasket(JSON.parse(data));
    }
  }, []);

  const addToBasket = (item: BasketItem) => {
    const updated = [...basket.filter((b) => b.id !== item.id), item];
    localStorage.setItem(BASKET_KEY, JSON.stringify(updated));
    setBasket(updated);
  };

  return { basket, addToBasket };
}
