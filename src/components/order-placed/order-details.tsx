'use client';

import { useState, useEffect } from 'react';
import OrderItemsDropdown from "./order-items";
import { ChevronDownIcon } from "./icons";

type OrderDetailsProps = {
  lang: string;
};

interface OrderItem {
  menu_name: string;
  menu_name_ar: string;
  quantity: number;
  total_price: number;
  list_cusmz: Array<any>;
}

interface OrderDetails {
  total: number;
  tax: number;
  tip: number;
  subtotal: number;
  order_item_list: OrderItem[];
  order_number: string;
  vat_perstg: number;
  order_dt: string;
  taxes_breakdown: any[];
}

interface CurrentOrder {
  refernce: string;
  timestamp: number;
}

const TEXTS: Record<string, any> = {
  ar: {
    title: "تفاصيل الطلب",
    orderNumber: "رقم الطلب",
    estimatedTime: "الوقت المتوقع للاستلام",
    loading: "جاري التحميل...",
    error: "حدث خطأ أثناء تحميل تفاصيل الطلب",
    taxes: "الضرائب وضريبة القيمة المضافة",
    vat: "ضريبة القيمة المضافة"
  },
  en: {
    title: "Order Details",
    orderNumber: "Order Number",
    estimatedTime: "Estimated Pickup Time",
    loading: "Loading...",
    error: "Error loading order details",
    taxes: "Taxes and VAT",
    vat: "VAT"
  },
};

const OrderDetailsSkeleton = () => {
  return (
    <section className="flex flex-col justify-start gap-4 bg-white rounded-lg w-full animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col text-sm gap-2">
          <div className="h-5 bg-gray-200 rounded w-2/3"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        </div>

        <div className="mt-3 border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
            <div className="h-5 bg-gray-200 rounded w-1/5"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function OrderDetails({ lang }: OrderDetailsProps) {
  const t = TEXTS[lang] || TEXTS["en"];
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Get the order reference and timestamp from localStorage
        const currentOrderStr = localStorage.getItem('pick-up-current-order');

        if (!currentOrderStr) {
          setError('No current order found');
          setIsLoading(false);
          return;
        }

        const currentOrderData = JSON.parse(currentOrderStr) as CurrentOrder;

        if (!currentOrderData.refernce) {
          setError('Invalid order reference');
          setIsLoading(false);
          return;
        }

        setCurrentOrder(currentOrderData);

        // Call our API endpoint
        const response = await fetch(`/api/order-details?reference=${currentOrderData.refernce}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch order details: ${response.statusText}`);
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (isLoading) {
    return (
      <OrderDetailsSkeleton />
    );
  }

  if (error || !orderDetails || !currentOrder) {
    return (
      <section className="flex flex-col justify-start gap-4 bg-white rounded-lg w-full p-4">
        <p className="text-red-500">{t.error}: {error}</p>
      </section>
    );
  }

  // Calculate estimated pickup time (30 minutes from local order timestamp)
  const orderTimestamp = currentOrder.timestamp;
  const estimatedPickupTime = new Date(orderTimestamp + 30 * 60000);

  // Format the time based on language
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const formattedPickupTime = timeFormatter.format(estimatedPickupTime);

  // Create a tax item to add to the order items
  const taxItem = {
    name: `${t.vat} (${orderDetails.vat_perstg}%)`,
    price: orderDetails.tax || 0,
    number: 1,
    addons: []
  };

  // Create an augmented items list with taxes included
  const itemsWithTax = orderDetails.order_item_list.map((item: OrderItem) => ({
    name: lang === "ar" ? item.menu_name_ar : item.menu_name,
    price: item.total_price || 0,
    number: item.quantity,
    addons: item.list_cusmz.map((addon: any) => ({
      name: lang === "ar" ? addon.addon_name_ar : addon.addon_name,
      price: addon.Price,
      number: 1,
    })),
  }));

  // Add the tax item to the list
  itemsWithTax.push(taxItem);

  return (
    <section className="flex flex-col justify-start gap-4 bg-white rounded-lg w-full">
      <h2 className="text-base font-medium text-black">{t.title}</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col text-sm font-light text-black">
          <p className='flex flex-row gap-2'>
            <span>{t.orderNumber}:</span>
            <strong dir='ltr'> #{orderDetails.order_number}</strong>
          </p>
          <p className='flex flex-row gap-2'>
            <span>{t.estimatedTime}:</span>
            <strong dir='ltr'> {formattedPickupTime}</strong>
          </p>
        </div>

        <OrderItemsDropdown
          orderId={orderDetails.order_number}
          orderNum={orderDetails.order_number}
          totalPrice={orderDetails.total} // This already includes tax
          items={itemsWithTax}
          lang={lang}
        />
      </div>
    </section>
  );
}