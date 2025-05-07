'use client'

import BasketItemsList from "@/src/components/basket-page/basket-items-list";
import UserDiscount from "@/src/components/basket-page/discount";
import OrderSummary from "@/src/components/basket-page/order-summery";
import CarPickUp from "@/src/components/checkout/car-pickup";
import PaymentMethod from "@/src/components/checkout/payment-method";
import NavBar from "@/src/components/navigation-bar/navigation-bar";
import { Locale } from "@/src/i18n-config";
import { useState, useEffect } from "react";
import MobileWrapper from "../../mobile-wrapper";
import { BasketItem } from "../basket/basket-client";


const TEXTS: Record<Locale, any> = {
    ar: {
        title: "الدفع",
    },
    en: {
        title: "Payment",
    }
};

const BASKET_KEY = "basket_items";

export default function CheckoutPageCleint({ props }: { props: string }) {
    const lang = props || "ar";
    const t = TEXTS[lang];
    const [redeem, setRedeem] = useState(false);
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const points = 1203;
    const pointsValue = 12.03;
    const [summaryTotal, setSummaryTotal] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem(BASKET_KEY);
        if (stored) setBasket(JSON.parse(stored));
    }, []);

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
            <div className="flex flex-col gap-8 w-[88%] overflow-y-auto pt-10 mb-16">
                <NavBar text={t.title} lang={lang} type={2} />
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
                            mode={`CH`}
                        />

                        <UserDiscount
                            lang={lang}
                            points={points}
                            onToggle={handleToggle}
                        />
                        {/* <OrderSummary
                            lang={lang}
                            redeemPoints={redeem}
                            pointsValue={redeem ? pointsValue : 0}
                            items={basket}
                            onTotalChange={(val) => setSummaryTotal(val)}
                        /> */}
                        <CarPickUp lang={lang} />

                        {/* <PaymentMethod lang={lang} amount={summaryTotal} onPaymentSuccess={(result) => {
                            console.log('Payment successful!', result);
                        }}
                            onPaymentError={(error) => {
                                console.error('Payment failed:', error);
                            }} /> */}
                    </>
                )}
            </div>
        </MobileWrapper>
    );
}
