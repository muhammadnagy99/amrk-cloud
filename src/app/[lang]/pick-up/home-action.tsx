'use client'
import BasketCTAHome from "@/src/components/user-overlay/basket-home-pickup";
import { useState } from "react";
import OrderPlacedClient from "./order-placed/order-client";
import BringOrder from "@/src/components/user-overlay/bring-order";

export default function HomeActions({ lang, type }: { lang: string; type: number }) {
    const [showOrderPlaced, setshowOrderPlaced] = useState(false);
    const [closingAnimation, setClosingAnimation] = useState(false);
    const [showClosingAnimation, setShowClosingAnimation] = useState(false);
    const toggleOrderPlaced = () => {
        setshowOrderPlaced(!showOrderPlaced);
    };

    const CloseOrderPlaced = () => {
        if (showOrderPlaced && !closingAnimation) {
            setClosingAnimation(true);
            setShowClosingAnimation(true);
            setTimeout(() => {
                setshowOrderPlaced(false);
                setClosingAnimation(false);
                setShowClosingAnimation(false);
            }, 300); // Match this with animation duration
        }
    };
    return (
        <>
            <BasketCTAHome lang={lang} type={type} onPlaceOrder={toggleOrderPlaced} />
            <BringOrder lang={lang} type={type} />
            {/* Basket Overlay */}
            {(showOrderPlaced || showClosingAnimation) && (
                <div className="fixed inset-0 bg-transparent z-50 flex flex-col justify-end">
                    <div
                        className="bg-white w-full shadow-lg overflow-hidden transition-transform duration-300 ease-out transform"
                        style={{
                            transform: closingAnimation ? 'translateY(100%)' : 'translateY(0)',
                            height: '100vh',
                            animation: showOrderPlaced && !closingAnimation
                                ? 'slide-up 0.3s ease-out'
                                : closingAnimation
                                    ? 'slide-down 0.3s ease-out'
                                    : 'none'
                        }}
                        onAnimationEnd={() => {
                            if (closingAnimation) {
                                setShowClosingAnimation(false);
                                setClosingAnimation(false);
                            }
                        }}
                    >
                        {/* Basket Page Component */}
                        <div className="h-full overflow-auto">
                            <OrderPlacedClient lang={lang} onToggle={CloseOrderPlaced} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}