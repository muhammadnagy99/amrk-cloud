import { GiftCardIcon, GiftPointsIcon } from "./icons";

export default function PointsCard() {
  return (
    <div className="flex flex-row border-widget w-[48%] rounded-lg justify-start items-center gap-2 p-3">
      <div className="flex flex-col justify-start items-center w-[15%] h-full pt-0.5">
      <GiftCardIcon />
      </div>
      <article className="flex flex-col gap-1 h-full justify-start w-[80%]">
        <h2 className="flex flex-row text-[11px] font-medium text-black gap-2 items-center">
          بطاقات هدايا إلكترونية
        </h2>
        <p className="text-[10px] font-light text-black">
          بطاقات لعروض مميزة
        </p>
      </article>
    </div>
  );
}
