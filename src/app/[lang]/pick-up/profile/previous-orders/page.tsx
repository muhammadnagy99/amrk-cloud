import MobileWrapper from "@/src/app/mobile-wrapper";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import OrderItemsDropdown from "@/src/components/pickup/previous-orders/order-items";
import { OrderItemsDropdownProps } from "@/src/interfaces/interfaces";

const orderItems = [
    {
        name: "بيتزا مارغريتا",
        price: 50,
        number: 2,
        addons: [{ name: "إضافة جبنة", price: 2, number: 1 }],
    },
    {
        name: "برجر دجاج",
        price: 40,
        number: 2,
        addons: [{ name: "إضافة جبنة", price: 2, number: 1 }],
    },
    {
        name: "سلطة سيزر",
        price: 30,
        number: 2,
        addons: [{ name: "إضافة دجاج", price: 2, number: 1 }],
    },
    {
        name: "مشروب غازي",
        price: 37,
        number: 2,
        addons: [{ name: "إضافة ليمون", price: 2, number: 1 }],
    },
];

export default function PreviousOrdersPage() {
    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
                <NavBar text="الطلبات السابقة" />
                <div className="flex flex-col gap-4">
                    <OrderItemsDropdown items={orderItems} />
                    <OrderItemsDropdown items={orderItems} />
                    <OrderItemsDropdown items={orderItems} />
                    <OrderItemsDropdown items={orderItems} />
                </div>
            </div>
        </MobileWrapper>
    );
}
