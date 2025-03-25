import { ViewGridProps } from "@/src/interfaces/interfaces";
import Category from "./category.tsx/category";
import Offers from "./offers/offers";
import OrderAgain from "./order-again.tsx/order-again";

export default function ViewGrid({
  lang,
  orderAgainData,
  offersData,
  categoriesData,
}: ViewGridProps) {
  return (
    <div className="flex flex-col gap-5 w-full">
      {orderAgainData && <OrderAgain lang={lang} products={orderAgainData.products} />}
      {offersData && <Offers lang={lang} products={offersData.products} />}
      {categoriesData &&
        categoriesData.map((category, index) => (
          <Category
            key={index}
            lang={lang}
            categoryId={category.categoryId}
            categoryName={category.categoryName}
            products={category.products}
          />
        ))}
    </div>
  );
}
