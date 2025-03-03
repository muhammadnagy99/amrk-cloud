import { BasketIcon, MinusIcon, PlusIcon } from "./icons";

export default function AddCart() {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
      <div className="flex items-center bg-[#f9f9f9] px-4 py-2 rounded-lg gap-3">
        <button className="text-gray-600 text-lg">
          <MinusIcon />
        </button>
        <span className="mx-4 text-lg font-medium">1</span>
        <button className="text-[#b0438a] text-lg">
          <PlusIcon />
        </button>
      </div>

      <button className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-[217px] h-12 rounded-lg flex-1">
        <p className="flex flex-row items-center">
          <span className="ml-2">
            <BasketIcon />
          </span>
          <span>أضف للسلة</span>
        </p>
        <span className="text-xs font-semibold">21.00 ر.س</span>
      </button>
    </div>
  );
}
