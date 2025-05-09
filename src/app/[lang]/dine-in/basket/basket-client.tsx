"use client";

import BasketItemsList from "@/src/components/basket-page/basket-items-list";
import CleintNavBar from "@/src/components/navigation-bar/custom-navbar";
import { ProductOverlayProvider } from "@/src/components/view-grid/category.tsx/product-overlay";
import { Locale } from "@/src/i18n-config";
import { useState, useEffect, createContext, useContext } from "react";
import toast from "react-hot-toast";
import MobileWrapper from "../../mobile-wrapper";
import PLaceCTA from "@/src/components/user-overlay/place-order";
import { BasketItem } from "@/src/interfaces/interfaces";

// Create a context for the basket updates
export const BasketContext = createContext({
    basketVersion: 0,
    updateBasketVersion: () => {}
});

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

const LoadingOverlay = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
    </div>
);

export default function BasketPageClient({ props, onToggle, type }: { props: string, onToggle: () => void, type:number }) {
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [basketVersion, setBasketVersion] = useState(0);

    const basketName = 'dine_basket_items';
    const lang = props || "ar";
    const t = TEXTS[lang];

    const [hideCta, setHideCta] = useState(false);
    const [currentEdited, setCurrentEdited] = useState<string| null>(null);
    const [finishEdit, setFinishEdit] = useState(false);

    const updateBasketVersion = () => {
        setBasketVersion(prev => prev + 1);
    };

    useEffect(() => {
        const loadBasketAndPlaceOrder = async () => {
            setIsLoading(true);
            setFinishEdit(false);
            const stored = localStorage.getItem(basketName);
            
            if (stored) {
                const parsedBasket = JSON.parse(stored);
                setBasket(parsedBasket);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        };

        loadBasketAndPlaceOrder();
    }, [finishEdit]);

    const updateBasket = async (updated: BasketItem[]) => {
        setBasket(updated);
        localStorage.setItem(basketName, JSON.stringify(updated));
        // Update the basket version to trigger rerendering in child components
        updateBasketVersion();
    };

    const handleDeleteItem = (itemId: string) => {
        const filtered = basket.filter((item) => item.basket_id !== itemId);
        updateBasket(filtered);
    };

    const toggleHide = () => {
        if(hideCta){
            setFinishEdit(true)
        }
        setHideCta((hide) => (!hide))
    }

    return (
        <BasketContext.Provider value={{ basketVersion, updateBasketVersion }}>
            <MobileWrapper>
                <div className="flex flex-col gap-5 w-[88%] overflow-y-auto pt-10 mb-18">
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
                                <ProductOverlayProvider lang={lang} type={type} onToggle={toggleHide} onEdit={true} basketId={currentEdited}>
                                    <BasketItemsList
                                        lang={lang}
                                        items={basket}
                                        onDeleteItem={handleDeleteItem}
                                        mode={`BA`}
                                        toggle={toggleHide}
                                        chooseEdit={setCurrentEdited}
                                    />
                                </ProductOverlayProvider>              
                            </>
                        )}
                        <PLaceCTA lang={lang} />
                </div>
            </MobileWrapper>
        </BasketContext.Provider>
    );
}