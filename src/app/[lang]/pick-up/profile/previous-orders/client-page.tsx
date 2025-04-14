'use client';

import { useEffect, useState } from "react";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../../mobile-wrapper";
import OrderItemsDropdown from "@/src/components/pickup/previous-orders/order-items";

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
    const cookies = document.cookie.split("; ").reduce((acc: any, c) => {
      const [key, value] = c.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});

    const userId = cookies["user_id"];
    const token = cookies["userToken"];
    const branchId = cookies["branchId"];

    if (!userId || !token || !branchId) {
      setError(true);
      return;
    }

    fetch("https://api.dev.amrk.app/amrkCloudWeb/historyOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, branchId }),
    })
      .then((res) => res.json())
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
        <NavBar text={t.title} lang={lang} />
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
            />
          ))}
        </div>
      </div>
    </MobileWrapper>
  );
}
