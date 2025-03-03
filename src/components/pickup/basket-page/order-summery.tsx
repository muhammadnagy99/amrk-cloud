export default function OrderSummary() {
  return (
    <div className=" py-3 border-b border-gray-300 bg-white flex flex-col gap-4">
      <div className="grid grid-cols-2 text-black text-xs font-light gap-3">
        <span className="rtl:text-right ltr:text-left">المجموع الفرعي</span>
        <span className="rtl:text-left ltr:text-right">ر.س 135.00</span>

        <span className="rtl:text-right ltr:text-left">
          ضريبة المبيعات (15%)
        </span>
        <span className="rtl:text-left ltr:text-right">ر.س 20.25</span>

        <span className="rtl:text-right ltr:text-left">ضريبة (15%)</span>
        <span className="rtl:text-left ltr:text-right">ر.س 20.25</span>

        <span className=" rtl:text-right ltr:text-left text-primaryColor">
          استبدال نقاط الولاء
        </span>
        <span className="rtl:text-left ltr:text-right text-primaryColor">
          - ر.س 12.00
        </span>
      </div>

      <div className="flex justify-between items-center font-medium text-base">
        <span className="text-black">المبلغ الإجمالي</span>
        <span className="text-black">ر.س 178.50</span>
      </div>
    </div>
  );
}
