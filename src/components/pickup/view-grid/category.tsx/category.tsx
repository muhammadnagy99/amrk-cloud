import { CategoryRowProps } from "@/src/interfaces/interfaces";
import CategoryCard from "./assets/category-card";
import Link from "next/link";


export default function Category({ lang, categoryId, categoryName, products }: CategoryRowProps) {
  return (
    <section className="flex flex-col items-start gap-3 w-full" id={categoryId}>
      <h2 className="text-black font-medium text-base">{categoryName}</h2>
      <div className="grid grid-cols-3 gap-2 w-full">
        {products.map((product, index) => (
          <Link href={`pick-up/product/${product.id}`} key={index}>
            <CategoryCard
              id={product.id}
              lang={lang}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
