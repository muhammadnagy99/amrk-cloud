'use client';

import { useEffect, useState } from "react";
import { BasketIcon } from "../product-page/icons";
import { RiyalCurrency } from "../basket-page/icons";
import { TOGGLE_BASKET_OVERLAY, CLOSE_BASKET_OVERLAY } from "@/src/lib/basket-event";
import BasketPageClient from "@/src/app/[lang]/dine-in/basket/basket-client";
import { BillIcon, NotificationIcon } from "./icons";
import BillClient from "@/src/app/[lang]/dine-in/bill/bill-client";

interface BasketCTAHomeProps {
  lang: string; // e.g. "en" or "ar"
  type: number;
}

interface BasketItem {
  id: string;
  quantity: number;
  required: {
    name: string;
    value: string;
    extraPrice: number;
  };
  optional: any[];
  totalPrice: number;
}

const BASKET_NAME: Record<number, string> = { 1: "dine_basket_items", 2: "basket_items" };


export default function BasketCTAHome({ lang, type }: BasketCTAHomeProps) {
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBasketOverlay, setShowBasketOverlay] = useState(false);
  const [showBillOverlay, setShowBillOverlay] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [showClosingAnimation, setShowClosingAnimation] = useState(false);

  const basketName = BASKET_NAME[type];

  const updateFromLocalStorage = () => {
    const storedItems = localStorage.getItem(basketName);
    if (storedItems) {
      try {
        const parsedItems: BasketItem[] = JSON.parse(storedItems);
        const totalCount = parsedItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalAmount = parsedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        setItemsCount(totalCount);
        setTotalPrice(totalAmount);
        // setShowBasket(true)
      } catch (error) {
        console.error("Error parsing basket items:", error);
      }
    } else {
      // Reset counts if basket is empty
      setItemsCount(0);
      // setShowBasket(false)
      setTotalPrice(0);
    }
  };

  // Function to handle toggle event from other components
  const handleToggleEvent = () => {
    setShowBasketOverlay(!showBasketOverlay);
  };

  // Function to handle close event from other components
  const handleCloseEvent = () => {
    closeBasketOverlay();
  };

  useEffect(() => {
    // Initial load from localStorage
    updateFromLocalStorage();

    // Listen for storage events (for changes from other tabs)
    window.addEventListener('storage', updateFromLocalStorage);

    // Listen for custom event (for same-window updates)
    window.addEventListener('basketUpdated', updateFromLocalStorage);

    // Listen for toggle basket overlay events
    window.addEventListener(TOGGLE_BASKET_OVERLAY, handleToggleEvent);

    // Listen for close basket overlay events
    window.addEventListener(CLOSE_BASKET_OVERLAY, handleCloseEvent);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateFromLocalStorage);
      window.removeEventListener('basketUpdated', updateFromLocalStorage);
      window.removeEventListener(TOGGLE_BASKET_OVERLAY, handleToggleEvent);
      window.removeEventListener(CLOSE_BASKET_OVERLAY, handleCloseEvent);
    };
  }, [showBasketOverlay]);

  // if (itemsCount === 0) return <div />;

  const buttonLabel = lang === "ar" ? "عرض السلة" : "View Basket";

  const toggleBasketOverlay = () => {
    setShowBasketOverlay(!showBasketOverlay);
  };
  const toggleBillOverlay = () => {
    setShowBillOverlay(!showBillOverlay);
  };

  const closeBasketOverlay = () => {
    if (showBasketOverlay && !closingAnimation) {
      setClosingAnimation(true);
      setShowClosingAnimation(true);
      setTimeout(() => {
        setShowBasketOverlay(false);
        setClosingAnimation(false);
        setShowClosingAnimation(false);
      }, 300); 
    }
  };

  const closeBillOverlay = () => {
    if (showBillOverlay && !closingAnimation) {
      setClosingAnimation(true);
      setShowClosingAnimation(true);
      setTimeout(() => {
        setShowBillOverlay(false);
        setClosingAnimation(false);
        setShowClosingAnimation(false);
      }, 300);
    }
  };

  return (
    <>
      {(showBasketOverlay || showClosingAnimation) && (
        <div className="fixed inset-0 bg-transparent z-50 flex flex-col justify-end">
          <div
            className="bg-white w-full shadow-lg overflow-hidden transition-transform duration-300 ease-out transform"
            style={{
              transform: closingAnimation ? 'translateY(100%)' : 'translateY(0)',
              height: '100vh',
              animation: showBasketOverlay && !closingAnimation
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
            <div className="h-full overflow-auto">
              <BasketPageClient props={lang} onToggle={closeBasketOverlay} type={type} />
            </div>
          </div>
        </div>
      )}

      {(showBillOverlay || showClosingAnimation) && (
        <div className="fixed inset-0 bg-transparent z-50 flex flex-col justify-end">
          <div
            className="bg-white w-full shadow-lg overflow-hidden transition-transform duration-300 ease-out transform"
            style={{
              transform: closingAnimation ? 'translateY(100%)' : 'translateY(0)',
              height: '100vh',
              animation: showBillOverlay && !closingAnimation
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
            <div className="h-full overflow-auto">
             <BillClient props={lang} onToggle={closeBillOverlay} type={type} />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-40 rounded-lg gap-3 h-24">

        {!(itemsCount === 0) && (
          <button
            onClick={toggleBasketOverlay}
            className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-[60%] min-w-[220px] h-12 rounded-lg flex-1"
          >

            <p className="flex flex-row items-center gap-2">
              <BasketIcon />
              <span className="text-sm font-medium">{buttonLabel}</span>
            </p>
            <div className="flex items-center gap-1 text-sm font-light" dir="ltr">
              <RiyalCurrency color="white" />
              <span>{totalPrice.toFixed(2)}</span>
            </div>
          </button>
        )}

        <button
          onClick={toggleBillOverlay}
          className="flex items-center justify-center gap-2 px-4 bg-[#005ec9] text-white w-[48px] h-12 rounded-lg flex-1"
        >
          <BillIcon />

          {(itemsCount === 0) && (
            <p className="flex flex-row items-center gap-2">
              <span className="text-sm font-medium">فاتورتك</span>
            </p>
          )}
        </button>

        <button
          onClick={() => { }}
          className="flex items-center justify-center gap-2 px-4 bg-white border border-[#005ec9] text-[#005ec9] w-[48px] h-12 rounded-lg flex-1"
        >
          <NotificationIcon />

          {(itemsCount === 0) && (
            <p className="flex flex-row items-center gap-2">
              <span className="text-sm font-medium">الاتصال بالنادل</span>
            </p>
          )}
        </button>
      </div>
      {/* Animation styles */}
      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  );
}

{/* <p className="h-6 w-6 bg-[#922b6e] rounded-full text-white text-xs font-medium flex justify-center items-center">
            {itemsCount}
          </p> */}