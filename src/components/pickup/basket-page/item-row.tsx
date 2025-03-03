import { EditIcon, TrashIcon } from "./icons";

export default function CartItem() {
  return (
    <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <p className="text-black text-sm font-medium flex gap-1">
          <span>x1</span>
          <span>قهوة لاتيه</span>
        </p>
        <span className="text-[#00000080] text-sm">ر.س 21.00</span>
      </div>
      <ul className="text-[#00000080] text-xs flex flex-col gap-2">
        <li className="flex flex-row justify-between pr-4">
          <span>• وسط</span>
          <span>ر.س 2.00</span>
        </li>
        <li className="flex flex-row justify-between pr-4">
          <span>• كراميل</span>
          <span>ر.س 4.00</span>
        </li>
      </ul>
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <button className="text-red-500 flex items-center gap-1">
            <TrashIcon />
            <span className="text-xs font-medium">حذف</span>
          </button>
          <button className="text-blue-500 flex items-center gap-1">
            <EditIcon />
            <span className="text-xs font-medium">تعديل</span>
          </button>
        </div>
        <span className="font-medium text-sm">ر.س 27.00</span>
      </div>
    </div>
  );
}
