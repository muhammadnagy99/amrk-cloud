import ContentProvider from "@/src/content-provider";
import OfferCard from "./assets/offer-card";
import SkeletonCard from "../../assets/skeleton-card";
import { OffersRowProps } from "@/src/interfaces/interfaces";


export default function Offers({ lang, products, loading = false, view }: OffersRowProps) {
  const TYPE = 'offers';
  const TEXTS = ContentProvider({ type: TYPE, lang });

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h2 className="text-black font-medium text-base">{TEXTS}</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {loading
          ? Array(5).fill(null).map((_, i) => <SkeletonCard view={view} key={i} />)
          : products.map((product, index) => (
            <OfferCard
              id={product.id}
              lang={lang}
              key={index}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              description={product.description}
              view={view}
            />
          ))}
      </div>
    </div>
  );
}
