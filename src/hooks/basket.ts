'use client';
import { useEffect, useState } from 'react';

export interface BasketItem {
  id: string;
  quantity: number;
  required: { name: string; value: string; extraPrice?: number }[];
  optional: { name: string; value: string; extraPrice?: number }[];
  totalPrice: number;
}

const BASKET_KEY = 'basket_items';

export default function useBasket() {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(BASKET_KEY);
    if (data) {
      setBasket(JSON.parse(data));
    }
  }, []);

  const isSameCustomization = (a: BasketItem, b: BasketItem) => {
    const requiredMatch =
      JSON.stringify([...a.required].sort()) === JSON.stringify([...b.required].sort());
    const optionalMatch =
      JSON.stringify([...a.optional].sort()) === JSON.stringify([...b.optional].sort());
    return a.id === b.id && requiredMatch && optionalMatch;
  };

  const addToBasket = (item: BasketItem) => {
    const existingIndex = basket.findIndex((b) => isSameCustomization(b, item));

    let updated: BasketItem[];

    if (existingIndex !== -1) {
      // Same customization exists — increase quantity and recalculate total
      const existing = basket[existingIndex];
      const unitPrice = item.totalPrice / item.quantity;
      const newQuantity = existing.quantity + item.quantity;

      const updatedItem: BasketItem = {
        ...existing,
        quantity: newQuantity,
        totalPrice: unitPrice * newQuantity,
      };

      updated = [...basket];
      updated[existingIndex] = updatedItem;
    } else {
      // New customization — add fresh
      updated = [...basket, item];
    }

    localStorage.setItem(BASKET_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('basketUpdated'));
    setBasket(updated);
  };

  const removeFromBasket = (itemIndex: number) => {
    const updated = basket.filter((_, idx) => idx !== itemIndex);
    localStorage.setItem(BASKET_KEY, JSON.stringify(updated));
    setBasket(updated);
  };

  const clearBasket = () => {
    localStorage.removeItem(BASKET_KEY);
    setBasket([]);
  };

  return {
    basket,
    addToBasket,
    removeFromBasket,
    clearBasket,
  };
}
