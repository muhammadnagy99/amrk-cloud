import ActiveStatus from "./active-status";

export default function BranchInfo() {
  return (
    <div className="flex flex-col justify-between">
      <article className="flex flex-col gap-1">
        <h2 className="text-sm font-medium text-black">
          أمرك كافيه - طلبات استلام
        </h2>
        <p className="text-xs font-light text-black">تجربة طازجة وممتعة</p>
      </article>
      <ActiveStatus />
    </div>
  );
}
