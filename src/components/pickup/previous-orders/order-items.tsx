'use client';

import { FC, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../order-placed/icons";

type Addon = {
  name: string;
  price: number;
  number: number;
};

type OrderItem = {
  name: string;
  price: number;
  number: number;
  addons: Addon[];
};

interface Props {
  orderId: string;
  orderNum: number;
  totalPrice: number;
  items: OrderItem[];
}

const OrderItemsDropdown: FC<Props> = ({ items, orderId, orderNum, totalPrice }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [reorderSuccess, setReorderSuccess] = useState(false);
  const [reorderError, setReorderError] = useState(false);

  const handleReorder = async () => {
    try {
      setIsReordering(true);
      setReorderSuccess(false);
      setReorderError(false);

      // Call the server-side API endpoint
      const response = await fetch("/api/orders/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
        credentials: "include", // Important: sends cookies with the request
      });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setReorderSuccess(true);
        // Optionally redirect to order confirmation page or cart
        // window.location.href = "/order-confirmation";
      } else {
        throw new Error("Reorder response indicated failure");
      }
    } catch (err) {
      console.error("Failed to reorder:", err);
      setReorderError(true);
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-3 gap-4">
      <div
        className="flex justify-between items-center text-[13px] font-light cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="flex flex-row gap-1">
          <strong className="font-light text-[#00000080]">رقم الطلب: {orderNum}</strong>
        </p>
        <p className="flex flex-row gap-4 items-center">
          <strong>{items.length} صنف</strong>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </p>
      </div>

      {isOpen && (
        <ul className="px-1 py-3 text-[#00000080] font-normal gap-1 border-t">
          {items.map((item, index) => (
            <li key={index} className="flex justify-between flex-col text-[12px]">
              <section className="flex flex-row justify-between px-1">
                <p className="flex flex-row gap-2">
                  <span>X{item.number}</span>
                  <span>{item.name}</span>
                </p>
                <p className="flex flex-row gap-1">
                  <strong className="font-medium">{item.price.toFixed(2)}</strong> رس
                </p>
              </section>

              <ul className="flex flex-col px-6 justify-between font-light gap-[2px]">
                {item.addons.map((addon, i) => (
                  <li key={i} className="flex flex-row justify-between w-full">
                    <p className="flex flex-row gap-2">
                      <span>X{addon.number}</span>
                      <span>{addon.name}</span>
                    </p>
                    <p className="flex flex-row gap-1">
                      <strong className="font-medium">{addon.price.toFixed(2)}</strong> رس
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-row justify-between items-center">
        <button 
          className={`px-4 py-2 border border-[#b0438a] rounded-4xl text-[13px] cursor-pointer ${
            isReordering ? 'opacity-50 cursor-not-allowed' : ''
          } ${reorderSuccess ? 'bg-green-500 text-white border-green-500' : 'text-primaryColor'}`}
          onClick={handleReorder}
          disabled={isReordering}
        >
          {isReordering ? 'جاري الطلب...' : reorderSuccess ? 'تم إعادة الطلب' : 'إعادة الطلب'}
        </button>
        {reorderError && <span className="text-red-500 text-xs">فشل إعادة الطلب</span>}
        <p className="flex flex-row gap-1 font-medium text-[13px]">
          <strong>{totalPrice.toFixed(2)}</strong> رس
        </p>
      </div>
    </div>
  );
};

export default OrderItemsDropdown;