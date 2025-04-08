"use client";

import { useEffect, useState } from "react";
import MobileWrapper from "../../mobile-wrapper";
import BasketCTA from "@/src/components/pickup/basket-page/basket-CTA";
import UserDiscount from "@/src/components/pickup/basket-page/discount";
import OrderSummary from "@/src/components/pickup/basket-page/order-summery";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import BasketItemsList from "@/src/components/pickup/basket-page/basket-items-list";
import { Locale } from "@/src/i18n-config";

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

export default function BasketPageClient({ props }: { props: string }) {
    const [redeem, setRedeem] = useState(false);
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const points = 1203;
    const pointsValue = 12.03;
    const [summaryTotal, setSummaryTotal] = useState(0);

    const lang = props || "ar";
    const t = TEXTS[lang];

    // Load basket from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(BASKET_KEY);
        if (stored) setBasket(JSON.parse(stored));
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
            <div className="flex flex-col gap-6 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
                <NavBar text={t.title} />

                {basket.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center gap-4 mt-20">
                        <p className="text-gray-500 text-sm">{t.emptyMessage}</p>
                        <a
                            href="/pick-up"
                            className="text-[#B0438A] underline text-sm font-medium"
                        >
                            {t.goBack}
                        </a>
                    </div>
                ) : (
                    <>
                        <BasketItemsList
                            lang={lang}
                            items={basket}
                            onDeleteItem={handleDeleteItem}
                        />

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
                    </>
                )}
            </div>

            {basket.length > 0 && (
                <BasketCTA
                    lang={lang}
                    itemsCount={basket.reduce((sum, i) => sum + i.quantity, 0)}
                    total={summaryTotal}
                />
            )}
        </MobileWrapper>
    );
}
