import ContentProvider from "@/src/content-provider";
import ProductCard from "./assets/product-card";
import { OrderAgainRowProps, Product } from "@/src/interfaces/interfaces";


export default function OrderAgain({ lang, products }: OrderAgainRowProps) {
  const TYPE = 'order_again';
  const TEXTS = ContentProvider({ type: TYPE, lang });

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h2 className="text-black font-medium text-base">{TEXTS}</h2>
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory w-full flex-nowrap">
        {products.map((product, index) => (
          <ProductCard
            lang={lang}
            id={product.id}
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
}
