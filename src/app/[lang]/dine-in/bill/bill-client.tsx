"use client";

import CleintNavBar from "@/src/components/navigation-bar/custom-navbar";
import { Locale } from "@/src/i18n-config";
import { useState } from "react";
import MobileWrapper from "../../mobile-wrapper";

const TEXTS: Record<Locale, any> = {
    ar: {
        title: "الفاتورة",
        emptyMessage: "سلتك فارغة، أضف بعض العناصر!",
        goBack: "العودة إلى القائمة",
        orderSuccess: "تم تقديم الطلب بنجاح!",
        orderError: "حدث خطأ في تقديم الطلب، يرجى المحاولة مرة أخرى.",
        loading: "جاري التحميل..."
    },
    en: {
        title: "Your Bill",
        emptyMessage: "Your basket is empty. Add some items!",
        goBack: "Back to menu",
        orderSuccess: "Order submitted successfully!",
        orderError: "There was an error submitting your order. Please try again.",
        loading: "Loading..."
    },
};

export interface BasketItem {
    id: string;
    quantity: number;
    required: { name: string; value: string; extraPrice?: number }[];
    optional: { name: string; value: string; extraPrice?: number }[];
    totalPrice: number;
}

const LoadingOverlay = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
    </div>
);

export default function BillClient({ props, onToggle, type }: { props: string, onToggle: () => void, type:number }) {
    const [isLoading, setIsLoading] = useState(false);

    const lang = props || "ar";
    const t = TEXTS[lang];

  

    return (
            <MobileWrapper>
                <div className="flex flex-col gap-5 w-[88%] overflow-y-auto pt-10 mb-18">
                    <CleintNavBar text={t.title} lang={lang} onClose={onToggle} />

                    {/* {
                        isLoading ? (
                            <LoadingOverlay />
                        ) : true ? (
                            <div className="flex flex-col items-center justify-center text-center gap-4 mt-20">
                                <p className="text-gray-500 text-sm">{t.emptyMessage}</p>
                                <button
                                    onClick={onToggle}
                                    className="text-[#B0438A] underline text-sm font-medium"
                                >
                                    {t.goBack}
                                </button>
                            </div>
                        ) : (
                            <>
                                           
                            </>
                        )} */}
                        
                </div>
            </MobileWrapper>
    );
}