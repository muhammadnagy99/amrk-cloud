"use client";

import { useEffect, useState } from "react";
import MobileWrapper from "../../mobile-wrapper";
import BasketCTA from "@/src/components/pickup/basket-page/basket-CTA";
import UserDiscount from "@/src/components/pickup/basket-page/discount";
import OrderSummary from "@/src/components/pickup/basket-page/order-summery";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import BasketItemsList from "@/src/components/pickup/basket-page/basket-items-list";
import { Locale } from "@/src/i18n-config";
import PaymentMethod from "@/src/components/pickup/checkout/payment-method";
import CarPickUp from "@/src/components/pickup/checkout/car-pickup";
import CleintNavBar from "@/src/components/pickup/navigation-bar/custom-navbar";
import { ProductOverlayProvider } from "@/src/components/pickup/view-grid/category.tsx/product-overlay";

const TEXTS: Record<Locale, any> = {
    ar: {
        title: "سلة المشتريات",
        emptyMessage: "سلتك فارغة، أضف بعض العناصر!",
        goBack: "العودة إلى القائمة",
    },
    en: {
        title: "Basket",
        emptyMessage: "Your basket is empty. Add some items!",
        goBack: "Back to menu",
    },
};

export interface BasketItem {
    id: string;
    quantity: number;
    required: { name: string; value: string; extraPrice?: number }[];
    optional: { name: string; value: string; extraPrice?: number }[];
    totalPrice: number;
}

const BASKET_KEY = "basket_items";

const LoadingOverlay = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
    </div>
);


export default function BasketPageClient({ props, onToggle }: { props: string, onToggle: () => void }) {
    const [redeem, setRedeem] = useState(false);
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const points = 1203;
    const pointsValue = 12.03;
    const [summaryTotal, setSummaryTotal] = useState(0);

    const lang = props || "ar";
    const t = TEXTS[lang];

    // Load basket from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(BASKET_KEY);
        if (stored) setBasket(JSON.parse(stored));
        setIsLoading(false);
    }, []);

    // Update localStorage when basket changes
    const updateBasket = (updated: BasketItem[]) => {
        setBasket(updated);
        localStorage.setItem(BASKET_KEY, JSON.stringify(updated));
    };

    const handleDeleteItem = (itemId: string) => {
        const filtered = basket.filter((item) => item.id !== itemId);
        updateBasket(filtered);
    };

    const handleToggle = (checked: boolean) => {
        setRedeem(checked);
        document.cookie = `use_point=${checked}; path=/`;
    };


    return (
        <MobileWrapper>
            <div className="flex flex-col gap-6 w-[88%] overflow-y-auto pt-10 mb-18">
                <CleintNavBar text={t.title} lang={lang} onClose={onToggle} />

                {
                    isLoading ? (
                        <LoadingOverlay />
                    ) : basket.length === 0 ? (
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
                            <ProductOverlayProvider lang={lang}>
                                <BasketItemsList
                                    lang={lang}
                                    items={basket}
                                    onDeleteItem={handleDeleteItem}
                                    mode={`BA`}
                                />
                            </ProductOverlayProvider >
                            <CarPickUp lang={lang} />
                            <UserDiscount
                                lang={lang}
                                points={points}
                                onToggle={handleToggle}
                            />
                            <OrderSummary
                                lang={lang}
                                redeemPoints={redeem}
                                pointsValue={redeem ? pointsValue : 0}
                                items={basket}
                                onTotalChange={(val) => setSummaryTotal(val)}
                            />

                            <PaymentMethod lang={lang} />
                        </>
                    )}

            </div>
        </MobileWrapper >
    );
}
