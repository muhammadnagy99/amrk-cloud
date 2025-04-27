import { RiyalCurrency } from "../../basket-page/icons";

interface props {
    table: string;
    total: number;
    lang: string;
}

export default function TableInfo({table, total, lang}: props) {
    const isArabic = lang === 'ar';
    
    const translations = {
        table: {
            ar: 'طاولة',
            en: 'Table'
        },
        currentTotal: {
            ar: 'الإجمالي الحالي',
            en: 'Current Total'
        }
    };

    return (
        <div className="flex flex-row border-widget w-full rounded-lg justify-start items-center gap-2 p-3">
            <article className="flex flex-col gap-1 h-full justify-start p-1">
                <p className="flex flex-row text-[10px] font-medium text-black gap-1 items-center" dir={isArabic ? "rtl" : "ltr"}>
                    {translations.table[isArabic ? 'ar' : 'en']}
                    <span className="text-[#B0438A]">
                        {table}
                    </span>
                </p>
                <p className="flex flex-row text-[10px] font-medium text-black gap-1 items-center" dir={isArabic ? "rtl" : "ltr"}>
                    {translations.currentTotal[isArabic ? 'ar' : 'en']}
                    <span className="text-[#B0438A] flex gap-0.5" dir="ltr">
                        <RiyalCurrency color="#B0438A" />
                        {total}
                    </span>
                </p>
            </article>
        </div>
    );
}