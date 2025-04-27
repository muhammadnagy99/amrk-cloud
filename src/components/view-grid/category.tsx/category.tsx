'use client';

import { CategoryRowProps } from "@/src/interfaces/interfaces";
import CategoryCard from "./assets/category-card";
import { useProductOverlay } from "./product-overlay";

// Category component that uses the overlay system
export function CategoryWithOverlay({ lang, categoryId, categoryName, products, view }: CategoryRowProps) {
  const isListView = view === "list";
  const { openProductOverlay } = useProductOverlay();

  return (
    <section className="flex flex-col items-start gap-3 w-full" id={categoryId}>
      <h2 className="text-black font-medium text-base">{categoryName}</h2>
      <div className={`${isListView ? "grid grid-cols-1 gap-2 w-full" : "grid grid-cols-3 gap-2 w-full"}`}>
        {products.map((product, index) => (
          <div 
            key={index} 
            onClick={() => openProductOverlay(product.id)}
            className="cursor-pointer"
          >
            <CategoryCard
              id={product.id}
              lang={lang}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              description={product.description}
              view={view}
            />
          </div>
        ))}
      </div>
    </section>
  );
}