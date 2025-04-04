import { EditIcon, TrashIcon } from "./icons";

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
  onEdit: () => void;
  lang: string;
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
  onEdit,
  lang,
}: CartItemProps) {
  const t = TEXTS[lang];

  return (
    <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-1 min-h-[88px] justify-between">
      <div className="flex justify-between items-center">
        <p className="text-black text-sm font-medium flex gap-1">
          <span>x{quantity}</span>
          <span>{name}</span>
        </p>
        <span className="text-[#00000080] text-sm">
          {t.currency} {basePrice.toFixed(2)}
        </span>
      </div>
      <ul className="text-[#00000080] text-xs flex flex-col gap-2">
        {options.map((option, index) => (
          <li key={index} className="flex flex-row justify-between pr-4">
            <span>• {option.name}</span>
            <span>
              {t.currency} {option.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <button
            className="text-red-500 flex items-center gap-1 cursor-pointer"
            onClick={onDelete}
          >
            <TrashIcon />
            <span className="text-xs font-medium">{t.delete}</span>
          </button>
          <button
            className="text-blue-500 flex items-center gap-1 cursor-pointer"
            onClick={onEdit}
          >
            <EditIcon />
            <span className="text-xs font-medium">{t.edit}</span>
          </button>
        </div>
        <span className="font-medium text-sm">
          {t.currency} {totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
