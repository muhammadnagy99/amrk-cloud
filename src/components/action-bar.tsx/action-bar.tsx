import { ListViewIcon, SearchIcon } from "./assets/icons";

export default function ActionBar() {
  return (
    <div className="flex flex-row justify-center items-center gap-2 sticky h-15 top-0 z-50 bg-white max-w-[434px] w-full">
      <button className="p-2.5 flex justify-center items-center border-widget rounded-lg w-[10%]">
        <ListViewIcon />
      </button>
      <div className="flex flex-row gap-2 w-[80%] overflow-x-auto whitespace-nowrap">
        <button className="p-2.5 flex justify-center items-center border-widget rounded-lg text-xs font-normal text-primaryColor border-primaryColor">
          اطلب مجدداً
        </button>
        <button className="p-2.5 flex justify-center items-center border-widget rounded-lg text-xs font-normal">
          العروض
        </button>
        <button className="p-2.5 flex justify-center items-center border-widget rounded-lg text-xs font-normal">
          مشروبات ساخنة
        </button>
        <button className="p-2.5 flex justify-center items-center border-widget rounded-lg text-xs font-normal">
          مشروبات ساخنة
        </button>
      </div>
      <button className="p-2.5 flex justify-center items-center border-widget rounded-lg w-[10%]">
        <SearchIcon />
      </button>
    </div>
  );
}
