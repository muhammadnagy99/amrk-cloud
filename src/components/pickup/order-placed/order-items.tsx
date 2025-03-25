'use client'

import { FC, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "../order-placed/icons";
import { Addon } from "@/src/interfaces/interfaces";

interface OrderItemsDropdownProps {
    items: { name: string; price: number; }[];
}

const OrderItemsDropdown: FC<OrderItemsDropdownProps> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-gray-100 rounded-lg p-3">
            <div
                className="flex justify-between items-center text-[13px] font-light cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className="flex flex-row gap-4 items-center">
                    <span>4 أصناف</span>
                    {isOpen ? (
                        <ChevronUpIcon />
                    ) : (
                        <ChevronDownIcon />
                    )}
                </p>
                <p className="flex flex-row gap-1 font-medium text-[13px]">
                    <strong className="">157.00</strong> رس
                </p>
            </div>

            {isOpen && (
                <ul className="rounded-lg px-1 py-1 text-[#00000080] font-normal">
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between flex-row text-[12px]">
                            <span>
                                {item.name}
                            </span>
                            <p className="flex flex-row gap-1">
                                <strong className="font-medium">{item.price.toFixed(2)}</strong> رس
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderItemsDropdown;
