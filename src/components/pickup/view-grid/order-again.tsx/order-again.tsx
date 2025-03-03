import ProductCard from "./assets/product-card";

export default function OrderAgain() {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h2 className="text-black font-medium text-base">اطلب مجدداً</h2>
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory w-full flex-nowrap">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
