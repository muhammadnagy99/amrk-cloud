'use client'

import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import PaymentMethod from "@/src/components/pickup/checkout/payment-method";
import CarPickUp from "@/src/components/pickup/checkout/car-pickup";
import PaymentCTA from "@/src/components/pickup/checkout/Payment-CTA";
import { Locale } from "@/src/i18n-config";
import OrderSummary from "@/src/components/pickup/basket-page/order-summery";
import { useEffect, useState } from "react";
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


    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
                <NavBar text={t.title} />
                <PaymentMethod lang={lang} />
                <CarPickUp lang={lang} />
                <OrderSummary
                    lang={lang}
                    redeemPoints={redeem}
                    pointsValue={redeem ? pointsValue : 0}
                    items={basket}
                    onTotalChange={(val) => setSummaryTotal(val)}
                />
            </div>
            <PaymentCTA lang={lang} total={summaryTotal} />
        </MobileWrapper>
    );
}
