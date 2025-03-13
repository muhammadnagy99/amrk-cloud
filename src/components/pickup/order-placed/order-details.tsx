import { ChevronDownIcon } from "./icons";
import OrderItemsDropdown from "./order-items";


    const orderItems = [
      { name: "بيتزا مارغريتا", price: 50 },
      { name: "برجر دجاج", price: 40 },
      { name: "سلطة سيزر", price: 30 },
      { name: "مشروب غازي", price: 37 },
    ];


export default function OrderDetails() {
    return (
        <section className="flex flex-col justify-start gap-4 bg-white rounded-lg w-full">
            <h2 className="text-base font-medium text-black">
                تفاصيل الطلب
            </h2>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col text-sm font-light text-black">
                    <p>
                        <span>رقم الطلب:</span>
                        <strong> #12345</strong>
                    </p>
                    <p>
                        <span >الوقت المتوقع للاستلام:</span>
                        <strong > 30 دقيقة</strong>
                    </p>
                </div>

               <OrderItemsDropdown items={orderItems} />

            </div>
        </section>
    )
}
