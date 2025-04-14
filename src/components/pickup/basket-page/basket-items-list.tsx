"use client";

import CartItem from "@/src/components/pickup/basket-page/item-row";
import CartItemSkeleton from "./item-skelton";
import { useEffect, useState } from "react";
import { BasketItem } from "@/src/app/[lang]/pick-up/basket/basket-client";
import { cacheManager } from "@/src/cacheManager";

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

export type ProductData = {
  product_id: string;
  item_name: string;
  item_name_ar: string;
  item_desc: string;
  item_desc_ar: string;
  item_img?: string;
  item_price: number;
  cusomisation_grouping_list?: any[];
};

type ProductOption = {
  label: string;
  value: string;
  extraPrice: string;
};

type ProductOptionGroup = {
  title: string;
  name: string;
  options: ProductOption[];
};

interface ProcessedProductData {
  productId: string;
  name: string;
  description: string;
  imageSrc: string;
  price: number;
  requiredOptions?: ProductOptionGroup[];
  optionalOptions?: ProductOptionGroup[];
}

const CACHE_TTL = 10 * 60 * 1000; 


async function fetchProductData(slug: string): Promise<ProductData> {
  const cachedData = cacheManager.get<ProductData>(`product-${slug}`, CACHE_TTL);
  if (cachedData) {
      console.log("Using cached product data for:", slug);
      return cachedData;
  }

  try {
      const res = await fetch(`/api/products/${slug}`);

      if (!res.ok) {
          throw new Error("Failed to fetch product info");
      }

      const data: ProductData = await res.json();
      cacheManager.set(`product-${slug}`, data);
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

export default function BasketItemsList({ lang, items, onDeleteItem, mode }: Props) {
  const [products, setProducts] = useState<Record<string, ProductInfo>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBasketProducts = async () => {
      try {
        setLoading(true);
        const productIds = [...new Set(items.map((item) => item.id))];
        
        const productPromises = productIds.map(id => fetchProductData(id));
        const products = await Promise.all(productPromises);
  
        const productsMap = Object.fromEntries(
          products.map(p => [p.product_id, p])
        );
        
        setProducts(productsMap);
      } catch (error) {
        console.error("Error fetching basket products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBasketProducts();
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
