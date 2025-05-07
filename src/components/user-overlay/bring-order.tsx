'use client';

import OrderPlacedClient from "@/src/app/[lang]/pick-up/order-placed/order-client";
import { useState, useEffect } from "react";
import { NotificationIcon } from "./icons";

interface BringOrder {
    lang: string;
    type: number;
}

interface OrderStatus {
    has_order: boolean;
    waiter_call_feature: boolean;
}

export default function BringOrder({ lang, type }: BringOrder) {
    const [showOrderPlaced, setShowOrderPlaced] = useState(false);
    const [closingAnimation, setClosingAnimation] = useState(false);
    const [showClosingAnimation, setShowClosingAnimation] = useState(false);
    const [hasCurrentOrder, setHasCurrentOrder] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const checkCurrentOrder = () => {
        const currentOrder = localStorage.getItem('pick-up-current-order');
        setHasCurrentOrder(!!currentOrder);
    };

    //   const checkCurrentOrder = async () => {
    //     try {
    //       const response = await fetch('/api/current-order');
    //       if (!response.ok) {
    //         throw new Error(`API returned ${response.status}`);
    //       }

    //       const data = await response.json() as OrderStatus;

    //       if (data.has_order) {
    //         const localOrder = localStorage.getItem('pick-up-current-order');
    //         setHasCurrentOrder(!!localOrder);
    //       } else {
    //         setHasCurrentOrder(false);
    //         if (localStorage.getItem('pick-up-current-order')) {
    //           localStorage.removeItem('pick-up-current-order');
    //         }
    //       }
    //     } catch (error) {
    //       console.error('Error checking current order:', error);
    //       const localOrder = localStorage.getItem('pick-up-current-order');
    //       setHasCurrentOrder(!!localOrder);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };

    useEffect(() => {
        checkCurrentOrder();

        const intervalId = setInterval(() => {
            checkCurrentOrder();
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    const toggleOrderPlaced = () => {
        setShowOrderPlaced(!showOrderPlaced);
    };

    const CloseOrderPlaced = () => {
        if (showOrderPlaced && !closingAnimation) {
            setClosingAnimation(true);
            setShowClosingAnimation(true);
            setTimeout(() => {
                setShowOrderPlaced(false);
                setClosingAnimation(false);
                setShowClosingAnimation(false);
            }, 300); // Match this with animation duration
        }
    };

    const label = lang === 'ar' ? 'وصلت؟ اطلب إحضار طلبك' : 'Arrived? Request your order';

    if (!hasCurrentOrder) {
        return <></>;
    }

    return (
        <>
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
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[434px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-40 rounded-lg gap-3 h-24">
                <button
                    onClick={toggleOrderPlaced}
                    className="flex items-center justify-center gap-2 px-4 bg-white border border-[#005ec9] text-[#005ec9] w-full h-12 rounded-lg flex-1"
                >
                    <NotificationIcon />
                    <p className="flex flex-row items-center gap-2">
                        <span className="text-sm font-medium">{label}</span>
                    </p>
                </button>
            </div>
        </>
    );
}