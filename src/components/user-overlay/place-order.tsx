import { useEffect, useState, useContext } from "react";
import { RiyalCurrency } from "../basket-page/icons";
import { BasketItem } from "@/src/interfaces/interfaces";
import { BasketContext } from "@/src/app/[lang]/dine-in/basket/basket-client";

export default function PLaceCTA({ lang }: { lang: string }) {
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { basketVersion } = useContext(BasketContext);
  
  const basketName = 'dine_basket_items';
  
  const updateFromLocalStorage = () => {
    const storedItems = localStorage.getItem(basketName);
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
      setItemsCount(0);
      setTotalPrice(0);
    }
  };
  
  // Update whenever basketVersion changes
  useEffect(() => {
    updateFromLocalStorage();
  }, [basketVersion]);
  
  // Initial update and listen for storage events from other tabs
  useEffect(() => {
    updateFromLocalStorage();
    
    // Listen for storage events (for changes from other tabs/windows)
    window.addEventListener('storage', updateFromLocalStorage);
    
    return () => {
      window.removeEventListener('storage', updateFromLocalStorage);
    };
  }, []);
  
  if (itemsCount === 0) return <div />;
  
  const buttonLabel = lang === "ar" ? "ادخل طلبك" : "Order";
  
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-40 rounded-lg gap-3 h-24">
      <button
        onClick={() => {}}
        className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1"
      >
        <p className="h-6 w-6 bg-[#922b6e] rounded-full text-white text-xs font-medium flex justify-center items-center">
          {itemsCount}
        </p>
        <p className="flex flex-row items-center gap-2 text-sm font-medium">
          {buttonLabel}
        </p>
        <div className="flex items-center gap-1 text-sm font-light" dir="ltr">
          <RiyalCurrency color="white" />
          <span>{totalPrice.toFixed(2)}</span>
        </div>
      </button>
    </div>
  );
}