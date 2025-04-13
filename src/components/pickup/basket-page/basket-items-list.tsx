"use client";

import CartItem from "@/src/components/pickup/basket-page/item-row";
import CartItemSkeleton from "./item-skelton";
import { useEffect, useState } from "react";
import { BasketItem } from "@/src/app/[lang]/pick-up/basket/basket-client";

interface ProductInfo {
  product_id: string;
  item_name: string;
  item_name_ar: string;
  item_price: number;
}

interface Props {
  lang: string;
  items: BasketItem[];
  onDeleteItem: (itemId: string) => void;
  mode: string;
}

export default function BasketItemsList({ lang, items, onDeleteItem, mode }: Props) {
  const [products, setProducts] = useState<Record<string, ProductInfo>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const productIds = [...new Set(items.map((item) => item.id))];

    fetch("/api/fetch-basket-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: productIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        const map = Object.fromEntries(
          data.products.map((p: ProductInfo) => [p.product_id, p])
        );
        setProducts(map);
        setLoading(false);
      });
  }, [items]);
  return (
    <div className="flex flex-col gap-3">
      {loading
        ? Array.from({ length: items.length || 2 }).map((_, idx) => (
            <CartItemSkeleton key={idx} />
          ))
        : items.map((item, index) => {
            const product = products[item.id];
            if (!product) return null;
            return (
              <CartItem
                key={index}
                lang={lang}
                quantity={item.quantity}
                name={lang === "ar" ? product.item_name_ar : product.item_name}
                basePrice={product.item_price}
                options={[
                  ...item.required.map((opt) => ({
                    name: opt.value,
                    price: opt.extraPrice || 0,
                  })),
                  ...item.optional.map((opt) => ({
                    name: opt.value,
                    price: opt.extraPrice || 0,
                  })),
                ]}                
                totalPrice={item.totalPrice}
                onDelete={() => onDeleteItem(item.id)}
                onEdit={() => {
                  window.location.href = `/pick-up/product/${item.id}`;
                }}
                mode={mode}
              />
            );
          })}
    </div>
  );
}
