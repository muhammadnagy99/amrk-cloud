import { RiyalCurrency } from "../../basket-page/icons";

interface props{
    table: string;
    total: number;
}
export default function TableInfo({table, total}: props) {
    return (
        <div className="flex flex-row border-widget w-full rounded-lg justify-start items-center gap-2 p-3">
            <article className="flex flex-col gap-1 h-full justify-start p-1">
                <p className="flex flex-row text-[10px] font-medium text-black gap-1 items-center">
                    طاولة
                    <span className="text-[#B0438A]">
                        {table}
                    </span>
                </p>
                <p className="flex flex-row text-[10px] font-medium text-black gap-1 items-center">
                    الإجمالي الحالي
                    <span className="text-[#B0438A] flex gap-0.5" dir="ltr">
                        <RiyalCurrency color="#B0438A" />
                        {total}
                    </span>
                </p>
            </article>
        </div>
    );
}
