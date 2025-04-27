import { EditIcon, RiyalCurrency, TrashIcon } from "../basket-page/icons";
import { SplitIcon } from "./icons";

interface CartOption {
    name: string;
    price: number;
}

interface CartItemProps {
    user: string;
    quantity: number;
    name: string;
    basePrice: number;
    options: CartOption[];
    totalPrice: number;
    onDelete: () => void;
    onClick: () => void;
    lang: string;
    mode: string;
}

const TEXTS: Record<string, { delete: string; split: string; currency: string }> = {
    ar: {
        delete: "حذف",
        split: "تقسيم الطلب",
        currency: "ر.س",
    },
    en: {
        delete: "Delete",
        split: "Split Order",
        currency: "SAR",
    },
};

export default function CartItem({
    user,
    quantity,
    name,
    basePrice,
    options,
    totalPrice,
    onDelete,
    onClick,
    lang,
    mode
}: CartItemProps) {
    const t = TEXTS[lang];
    const isRTL = lang === 'ar';

    const PriceDisplay = ({ price, color }: { price: number; color: "gray" | "black" }) => {
        return (
            <div className="flex items-center gap-1" dir="ltr">
                <RiyalCurrency color={color} />
                <span>{price.toFixed(2)}</span>
            </div>
        );
    };

    const getText = () => {
        if (lang === 'ar') {
          return user === 'current' ? 'طلباتي' : `طلبات ${user}`;
        } else {
          return user === 'current' ? 'My Order' : `${user}'s Order`;
        }
      };

    return (
        <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-1 min-h-[88px] justify-between">
            <div className="flex bg-black h-8 items-center px-4">
                <span className="text-white text-sm font-medium">
                    {getText()}
                </span>
            </div>
            <label className="flex gap-2 items-center mt-2">
                <div className="flex items-center">
                    <input type="checkbox" name={user} value={user} className=""
                    />
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-black text-sm font-medium flex gap-1">
                        <span>x{quantity}</span>
                        <span>{name}</span>
                    </p>
                    <span className="text-[#00000080] text-sm">
                        <PriceDisplay price={basePrice} color="gray" />
                    </span>
                </div>
            </label>
            <ul className="text-[#00000080] text-xs flex flex-col gap-2">
                {options.map((option, index) => (
                    <li key={index} className={`flex flex-row justify-between ${lang === 'ar' ? 'pr-7' : 'pl-7'}`}>
                        <span>• {option.name}</span>
                        <span>
                            <PriceDisplay price={option.price} color="gray" />
                        </span>
                    </li>
                ))}
            </ul>
            <div className={`flex items-center ${mode === 'CH' ? 'justify-end' : 'justify-between'}`}>
                <div className={`${mode === 'CH' ? 'hidden' : ''} flex gap-6 ${lang === 'ar' ? 'pr-7' : 'pl-7'}`}>
                    <button
                        className="text-blue-500 flex items-center gap-1 cursor-pointer"
                        onClick={onClick}
                    >
                        <SplitIcon />
                        <span className="text-xs font-medium">{t.split}</span>
                    </button>
                </div>
                <span className="font-medium text-sm">
                    <PriceDisplay price={totalPrice} color="black" />
                </span>
            </div>
        </div>
    );
}