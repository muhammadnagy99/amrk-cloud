import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import OrderItemsDropdown from "@/src/components/pickup/previous-orders/order-items";
import { OrderItemsDropdownProps } from "@/src/interfaces/interfaces";
import MobileWrapper from "../../../mobile-wrapper";
import { Locale } from "@/src/i18n-config";

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

type PageProps = {
    params: {
        lang: Locale;
    };
};

const TEXTS: Record<Locale, any> = {
    ar: {
        title: "الطلبات السابقة",
    },
    en: {
        title: "Previous Orders",
    }
};


export default async function PreviousOrdersPage(props: {
    params: Promise<{ lang: Locale }>;

}) {
    const params = await props.params;
    const lang = params.lang || 'ar';
    const t = TEXTS[lang];

    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
                <NavBar text={t.title} />
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
