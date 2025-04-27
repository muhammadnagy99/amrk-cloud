import { EditIcon, RiyalCurrency, TrashIcon } from "./icons";

interface CartOption {
  name: string;
  price: number;
}

interface CartItemProps {
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

const TEXTS: Record<string, { delete: string; edit: string; currency: string }> = {
  ar: {
    delete: "حذف",
    edit: "تعديل",
    currency: "ر.س",
  },
  en: {
    delete: "Delete",
    edit: "Edit",
    currency: "SAR",
  },
};

export default function CartItem({
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

  return (
    <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-1 min-h-[88px] justify-between">
      <div className="flex justify-between items-center">
        <p className="text-black text-sm font-medium flex gap-1">
          <span>x{quantity}</span>
          <span>{name}</span>
        </p>
        <span className="text-[#00000080] text-sm">
          <PriceDisplay price={basePrice} color="gray" />
        </span>
      </div>
      <ul className="text-[#00000080] text-xs flex flex-col gap-2">
        {options.map((option, index) => (
          <li key={index} className={`flex flex-row justify-between ${lang === 'ar' ? 'pr-4' : 'pl-4'}`}>
            <span>• {option.name}</span>
            <span>
              <PriceDisplay price={option.price} color="gray" />
            </span>
          </li>
        ))}
      </ul>
      <div className={`flex items-center ${mode === 'CH' ? 'justify-end' : 'justify-between'}`}>
        <div className={`${mode === 'CH' ? 'hidden' : ''} flex gap-6`}>
          <button
            className="text-blue-500 flex items-center gap-1 cursor-pointer"
            onClick={onClick}
          >
            <EditIcon />
            <span className="text-xs font-medium">{t.edit}</span>
          </button>
          <button
            className="text-red-500 flex items-center gap-1 cursor-pointer"
            onClick={onDelete}
          >
            <TrashIcon />
            <span className="text-xs font-medium">{t.delete}</span>
          </button>
        </div>
        <span className="font-medium text-sm">
          <PriceDisplay price={totalPrice} color="black" />
        </span>
      </div>
    </div>
  );
}