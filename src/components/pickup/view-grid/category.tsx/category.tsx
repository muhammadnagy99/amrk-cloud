import CategoryCard from "./assets/category-card";

export default function Category() {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h2 className="text-black font-medium text-base">مشروبات ساخنة</h2>
      <div className="grid grid-cols-3 gap-2 w-full">
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
