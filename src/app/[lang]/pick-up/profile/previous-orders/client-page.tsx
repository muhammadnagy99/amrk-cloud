'use client';

import NavBar from "@/src/components/navigation-bar/navigation-bar";
import OrderItemsDropdown from "@/src/components/order-placed/order-items";
import { useEffect, useState } from "react";
import MobileWrapper from "../../../mobile-wrapper";

type Props = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: { title: "الطلبات السابقة", empty: "يرجى تسجيل الدخول للاطلاع على الطلبات" },
  en: { title: "Previous Orders", empty: "Please sign in to view your orders" },
};

export default function PreviousOrdersClient({ lang }: Props) {
  const t = TEXTS[lang];
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/orders/history", {
      method: "POST", // Changed from GET to POST to match the API implementation
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
      // No need to include a body as the API will extract the info from cookies
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data.order_lists || []);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setError(true);
      });
  }, []);
  if (error) {
    return (
      <MobileWrapper>
        <div className="flex flex-col items-center justify-center text-center gap-4 mt-20">
          <p className="text-gray-500 text-sm">{t.empty}</p>
          <a href="/pick-up" className="text-[#B0438A] underline text-sm font-medium">
            {lang === "ar" ? "العودة" : "Go Back"}
          </a>
        </div>
      </MobileWrapper>
    );
  }

  return (
    <MobileWrapper>
      <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
        <NavBar text={t.title} lang={lang} type={2}/>
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <OrderItemsDropdown
              key={index}
              orderId={order.order_id}
              orderNum={order.order_items[0]?.order_num}
              totalPrice={order.total_price}
              items={order.order_items.map((item: any) => ({
                name: lang === "ar" ? item.name_ar : item.name,
                price: item.total_price || 0,
                number: item.qty,
                addons: item.addons.map((addon: any) => ({
                  name: lang === "ar" ? addon.addon_name_ar : addon.addon_name,
                  price: addon.Price,
                  number: 1,
                })),
              }))}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </MobileWrapper>
  );
}
