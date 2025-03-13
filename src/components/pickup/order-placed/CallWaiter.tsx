import { BellIcon } from "./icons";

export default function CallWaiter() {
    return (
        <div className="flex flex-col gap-4 text-black">
            <p className="text-base font-medium">
                وصلت؟ اطلب إحضار طلبك
            </p>

            <button className="flex justify-start items-center w-full gap-4 px-4 py-3 bg-white border border-[#00000033] rounded-lg ">
                <BellIcon />
                <span className="text-sm font-normal">الاتصال بالنادل</span>
            </button>
        </div>
    )
}
