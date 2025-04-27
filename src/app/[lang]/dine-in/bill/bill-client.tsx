"use client";

import CleintNavBar from "@/src/components/navigation-bar/custom-navbar";
import { Locale } from "@/src/i18n-config";
import { useState } from "react";
import MobileWrapper from "../../mobile-wrapper";
import CartItem from "@/src/components/dine-in/bill-row";
import BillPay from "@/src/components/user-overlay/bill-pay";

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

export default function BillClient({ props, onToggle, type }: { props: string, onToggle: () => void, type: number }) {
    const [isLoading, setIsLoading] = useState(false);

    const lang = props || "ar";
    const t = TEXTS[lang];

    const testItems = [
        {
            user: 'current',
            quantity: 2,
            name: "Double Cheeseburger",
            basePrice: 25.00,
            options: [
                { name: "Extra cheese", price: 5.00 },
                { name: "No onions", price: 0.00 },
                { name: "Special sauce", price: 3.00 }
            ],
            totalPrice: 58.00,
            mode: "regular"
        },
        {
            user: 'Ali',
            quantity: 1,
            name: "French Fries",
            basePrice: 12.00,
            options: [],
            totalPrice: 12.00,
            mode: "regular"
        },
        {
            user: 'Ahmed',
            quantity: 1,
            name: "Ice Cream Sundae",
            basePrice: 18.00,
            options: [
                { name: "Extra chocolate", price: 3.00 },
                { name: "Nuts", price: 2.00 }
            ],
            totalPrice: 23.00,
            mode: "regular"
        }
    ];


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

                <div className="flex flex-col">
                    {testItems.map((item, index) => (
                        <CartItem
                            user={item.user}
                            quantity={item.quantity}
                            name={item.name}
                            basePrice={item.basePrice}
                            options={item.options}
                            totalPrice={item.totalPrice}
                            onDelete={() => { }}
                            onClick={() => { }}
                            lang={lang}
                            mode={item.mode}
                        />
                    ))}
                </div>

                <BillPay lang={lang} />
            </div>
        </MobileWrapper>
    );
}