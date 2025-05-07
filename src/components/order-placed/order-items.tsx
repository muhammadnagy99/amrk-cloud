'use client'

import { FC, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../order-placed/icons";
import { Addon } from "@/src/interfaces/interfaces";
import { RiyalCurrency } from "../basket-page/icons";

interface OrderItemsDropdownProps {
    items: { name: string; price: number; number: number; }[];
    lang: string;
    orderId: any;
    orderNum: any;
    totalPrice: any;
}

const TEXTS: Record<string, { itemLabel: (count: number) => string; currency: string }> = {
    ar: {
        itemLabel: (count: number) => `${count} صنف${count > 1 ? "ًا" : ""}`,
        currency: "ر.س",
    },
    en: {
        itemLabel: (count: number) => `${count} item${count !== 1 ? "s" : ""}`,
        currency: "SAR",
    }
};

const OrderItemsDropdown: FC<OrderItemsDropdownProps> = ({ items, lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = TEXTS[lang] || TEXTS["en"];

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="bg-gray-100 rounded-lg p-3">
            <div
                className="flex justify-between items-center text-[13px] font-light cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="flex flex-row gap-4 items-center">
                    <span className="text-sm font-normal">{t.itemLabel(items.length - 1)}</span>
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </p>
                <p className="flex flex-row items-center gap-1 font-medium text-[13px]" dir="ltr">
                    <RiyalCurrency color="black" />
                    <strong>{total.toFixed(2)}</strong>
                </p>
            </div>

            {isOpen && (
                <ul className="rounded-lg px-1 py-1 text-[#00000080] font-normal">
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between flex-row text-[13px]">
                            <p className="flex flex-row gap-2">
                                {!item.name.startsWith('VAT') && !item.name.startsWith('ضريبة') && (
                                    <span dir="ltr">
                                        x
                                        {item.number}
                                    </span>
                                )}
                                <span>
                                    {item.name}
                                </span>
                            </p>
                            <p className="flex flex-row gap-1 items-center" dir="ltr">
                                <RiyalCurrency color="gray" />
                                <strong className="font-medium">{item.price.toFixed(2)}</strong>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderItemsDropdown;
