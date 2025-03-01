import { GiftPointsIcon } from "./icons";

export default function LoyaltyCard() {
  return (
    <div className="flex border-widget w-[48%] rounded-lg justify-start items-start py-2 px-4">
      <article className="flex flex-col gap-1 h-full">
        <h2 className="flex flex-row text-[11px] font-semibold text-black  gap-2 items-center">
          <GiftPointsIcon />
          مكافآت برنامج الولاء
        </h2>
        <p className="text-[10px] font-light text-black px-[20px]">
          نقاط وعروض خاصة
        </p>
      </article>
    </div>
  );
}
