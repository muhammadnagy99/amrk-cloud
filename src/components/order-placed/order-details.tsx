import { ChevronDownIcon } from "./icons";
import OrderItemsDropdown from "./order-items";

type OrderDetailsProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: "تفاصيل الطلب",
    orderNumber: "رقم الطلب",
    estimatedTime: "الوقت المتوقع للاستلام",
  },
  en: {
    title: "Order Details",
    orderNumber: "Order Number",
    estimatedTime: "Estimated Pickup Time",
  },
};

const orderItems = [
  { name: "بيتزا مارغريتا", price: 50 },
  { name: "برجر دجاج", price: 40 },
  { name: "سلطة سيزر", price: 30 },
  { name: "مشروب غازي", price: 37 },
];

export default function OrderDetails({ lang }: OrderDetailsProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <section className="flex flex-col justify-start gap-4 bg-white rounded-lg w-full">
      <h2 className="text-base font-medium text-black">{t.title}</h2>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col text-sm font-light text-black">
          <p>
            <span>{t.orderNumber}:</span>
            <strong> #12345</strong>
          </p>
          <p>
            <span>{t.estimatedTime}:</span>
            <strong> 30 دقيقة</strong>
          </p>
        </div>

        {/* <OrderItemsDropdown items={orderItems} lang={lang} /> */}
      </div>
    </section>
  );
}
