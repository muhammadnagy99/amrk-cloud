"use client";

import { useEffect, useState } from "react";
import { ViewGridProps } from "@/src/interfaces/interfaces";
import Category from "./category.tsx/category";
import Offers from "./offers/offers";
import OrderAgain from "./order-again.tsx/order-again";

type EnhancedProps = {
  lang: string;
  orderAgainData?: any;
  offersData?: any;
  categoriesData: NonNullable<ViewGridProps["categoriesData"]>;
  remainingCategories?: ViewGridProps["categoriesData"];
};


export default function ViewGrid({
  lang,
  orderAgainData,
  offersData,
  categoriesData,
  remainingCategories = [],
}: EnhancedProps) {
  const [showRemaining, setShowRemaining] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowRemaining(true);
    }, 0); // render on next tick, or you can delay with 100ms+

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      {orderAgainData && <OrderAgain lang={lang} products={orderAgainData.products} />}
      {offersData && <Offers lang={lang} products={offersData.products} />}
      
      {/* First (server-rendered) category */}
      {categoriesData.map((category, index) => (
        <Category
          key={`server-${index}`}
          lang={lang}
          categoryId={category.categoryId}
          categoryName={category.categoryName}
          products={category.products}
        />
      ))}

      {/* Remaining (client-rendered) categories */}
      {showRemaining &&
        remainingCategories.map((category, index) => (
          <Category
            key={`client-${index}`}
            lang={lang}
            categoryId={category.categoryId}
            categoryName={category.categoryName}
            products={category.products}
          />
        ))}
    </div>
  );
}
