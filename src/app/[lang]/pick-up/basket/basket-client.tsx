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
import { toast } from "react-hot-toast";

const TEXTS: Record<Locale, any> = {
    ar: {
        title: "سلة المشتريات",
        emptyMessage: "سلتك فارغة، أضف بعض العناصر!",
        goBack: "العودة إلى القائمة",
        orderSuccess: "تم تقديم الطلب بنجاح!",
        orderError: "حدث خطأ في تقديم الطلب، يرجى المحاولة مرة أخرى.",
        loading: "جاري التحميل..."
    },
    en: {
        title: "Basket",
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
    const [basketId, setBasketId] = useState<string | null>(null);
    const points = 1203;
    const pointsValue = 12.03;
    const [summaryTotal, setSummaryTotal] = useState(0);

    const lang = props || "ar";
    const t = TEXTS[lang];

    // Generate basket hash for comparison
    const generateBasketHash = (basketItems: BasketItem[]) => {
        return JSON.stringify(basketItems);
    };

    // Place order and get basket ID
    const placePickupOrder = async (basketItems: BasketItem[]) => {
        if (basketItems.length === 0) {
            setIsLoading(false);
            return;
        }
        
        // Check if basket has changed since last request
        const currentBasketHash = generateBasketHash(basketItems);
        const previousBasketHash = localStorage.getItem('previous_basket_hash');
        
        if (previousBasketHash === currentBasketHash) {
            console.log('Basket unchanged, skipping order request');
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await fetch('/api/place-pickup-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    basketItems: basketItems,
                    usePoints: redeem
                }),
            });

            if (!response.ok) {
                throw new Error('Order submission failed');
            }
            
            const orderResult = await response.json();
            const newBasketId = orderResult;
            
            // Store basket ID in cookie
            document.cookie = `basket_id=${newBasketId}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
            
            // Update the stored hash
            localStorage.setItem('previous_basket_hash', currentBasketHash);
            
            // Set the basket ID in state for potential use in the component
            setBasketId(newBasketId);
            
            console.log('Order request completed, basket ID:', newBasketId);
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error(t.orderError);
        } finally {
            setIsLoading(false);
        }
    };

    // Load basket from localStorage and place order before displaying
    useEffect(() => {
        const loadBasketAndPlaceOrder = async () => {
            setIsLoading(true);
            const stored = localStorage.getItem(BASKET_KEY);
            
            if (stored) {
                const parsedBasket = JSON.parse(stored);
                setBasket(parsedBasket);
                
                if (parsedBasket.length > 0) {
                    await placePickupOrder(parsedBasket);
                } else {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };
        
        loadBasketAndPlaceOrder();
    }, []);

    // Update localStorage when basket changes
    const updateBasket = async (updated: BasketItem[]) => {
        setIsLoading(true);
        setBasket(updated);
        localStorage.setItem(BASKET_KEY, JSON.stringify(updated));
        
        // Place order with updated basket
        if (updated.length > 0) {
            await placePickupOrder(updated);
        } else {
            // If basket is empty, clear the stored hash
            localStorage.removeItem('previous_basket_hash');
            setIsLoading(false);
        }
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
                            </ProductOverlayProvider>
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

                            <PaymentMethod 
                                lang={lang} 
                                amount={summaryTotal} 
                                onPaymentSuccess={(result) => {
                                    console.log('Payment successful!', result);
                                    // After payment, we clear the basket since the order is complete
                                    localStorage.removeItem(BASKET_KEY);
                                    localStorage.removeItem('previous_basket_hash');
                                    setBasket([]);
                                    toast.success(t.orderSuccess);
                                }}
                                onPaymentError={(error) => {
                                    console.error('Payment failed:', error);
                                    toast.error(t.orderError);
                                }} 
                            />
                        </>
                    )}
            </div>
        </MobileWrapper>
    );
}