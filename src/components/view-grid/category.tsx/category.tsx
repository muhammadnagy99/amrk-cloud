import CategoryCard from "./assets/category-card";

export default function Category() {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h2 className="text-black font-medium text-base">
        مشروبات ساخنة
      </h2>
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory w-full flex-nowrap">
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
}
