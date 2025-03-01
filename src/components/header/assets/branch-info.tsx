import ActiveStatus from "./active-status";

export default function BranchInfo() {
  return (
    <div className="flex flex-col gap-2">
      <article className="flex flex-col">
        <h2 className="text-[13px] font-semibold text-black">
          أمرك كافيه - طلبات استلام
        </h2>
        <p className="text-[10px] font-light text-black">تجربة طازجة وممتعة</p>
      </article>
      <ActiveStatus />
    </div>
  );
}
