'use client';

import { useEffect, useState } from "react";
import { BasketIcon } from "../product-page/icons";
import { RiyalCurrency } from "../basket-page/icons";
import BasketPageClient from "@/src/app/[lang]/pick-up/basket/basket-client";

interface BasketCTAHomeProps {
  lang: string; // e.g. "en" or "ar"
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

export default function BasketCTAHome({ lang }: BasketCTAHomeProps) {
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBasketOverlay, setShowBasketOverlay] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [showClosingAnimation, setShowClosingAnimation] = useState(false);

  // Function to update state from localStorage
  const updateFromLocalStorage = () => {
    const storedItems = localStorage.getItem("basket_items");
    if (storedItems) {
      try {
        const parsedItems: BasketItem[] = JSON.parse(storedItems);
        const totalCount = parsedItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalAmount = parsedItems.reduce((acc, item) => acc + item.totalPrice, 0);
        setItemsCount(totalCount);
        setTotalPrice(totalAmount);
      } catch (error) {
        console.error("Error parsing basket items:", error);
      }
    } else {
      // Reset counts if basket is empty
      setItemsCount(0);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    // Initial load from localStorage
    updateFromLocalStorage();

    // Listen for storage events (for changes from other tabs)
    window.addEventListener('storage', updateFromLocalStorage);
    
    // Listen for custom event (for same-window updates)
    window.addEventListener('basketUpdated', updateFromLocalStorage);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateFromLocalStorage);
      window.removeEventListener('basketUpdated', updateFromLocalStorage);
    };
  }, [showBasketOverlay]);

  if (itemsCount === 0) return <div />; 

  const buttonLabel = lang === "ar" ? "عرض السلة" : "View Basket";

  const toggleBasketOverlay = () => {
    setShowBasketOverlay(!showBasketOverlay);
  };

  const closeBasketOverlay = () => {
    if (showBasketOverlay && !closingAnimation) {
      setClosingAnimation(true);
      setShowClosingAnimation(true);
      setTimeout(() => {
        setShowBasketOverlay(false);
      }, 300); // Match this with animation duration
    }
  };

  return (
    <>
      {/* Basket Overlay */}
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
            {/* Basket Page Component */}
            <div className="h-full overflow-auto">
              <BasketPageClient props={lang} onToggle={closeBasketOverlay} />
            </div>
          </div>
        </div>
      )}
      
      {/* Bottom CTA Button */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-40 rounded-lg gap-3 h-24">
        <button
          onClick={toggleBasketOverlay}
          className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1"
        >
          <p className="h-6 w-6 bg-[#922b6e] rounded-full text-white text-xs font-medium flex justify-center items-center">
            {itemsCount}
          </p>
          <p className="flex flex-row items-center gap-2">
            <BasketIcon />
            <span className="text-sm font-medium">{buttonLabel}</span>
          </p>
          <span className="flex flex-row gap-1 text-sm font-light items-center">
            {totalPrice.toFixed(2)} {<RiyalCurrency color="white" />}
          </span>
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