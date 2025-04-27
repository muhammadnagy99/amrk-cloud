"use client";

import { useEffect, useState } from "react";
import { ViewGridProps } from "@/src/interfaces/interfaces";
import Offers from "./offers/offers";
import OrderAgain from "./order-again.tsx/order-again";
import { CategoryWithOverlay } from "./category.tsx/category";
import { ProductOverlayProvider } from "./category.tsx/product-overlay";

type EnhancedProps = {
  lang: string;
  orderAgainData?: any;
  offersData?: any;
  categoriesData: NonNullable<ViewGridProps["categoriesData"]>;
  remainingCategories?: ViewGridProps["categoriesData"];
  view: 'grid' | 'list';
  type: number
};

export default function ViewGrid({
  lang,
  orderAgainData,
  offersData,
  categoriesData,
  remainingCategories = [],
  view,
  type
}: EnhancedProps) {
  const [showRemaining, setShowRemaining] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowRemaining(true);
    }, 0); // render on next tick, or you can delay with 100ms+
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <ProductOverlayProvider lang={lang} type={type}>
      <div className="flex flex-col gap-5 w-full">
        {orderAgainData && <OrderAgain lang={lang} products={orderAgainData.products} />}
        {offersData && <Offers lang={lang} products={offersData.products} view={view} />}
        
        {/* First (server-rendered) category */}
        {categoriesData.map((category, index) => (
          <CategoryWithOverlay
            key={`server-${index}`}
            lang={lang}
            categoryId={category.categoryId}
            categoryName={category.categoryName}
            products={category.products}
            view={view}
          />
        ))}

        {/* Remaining (client-rendered) categories */}
        {showRemaining &&
          remainingCategories.map((category, index) => (
            <CategoryWithOverlay
              key={`client-${index}`}
              lang={lang}
              categoryId={category.categoryId}
              categoryName={category.categoryName}
              products={category.products}
              view={view}
            />
          ))}
      </div>
    </ProductOverlayProvider>
  );
}