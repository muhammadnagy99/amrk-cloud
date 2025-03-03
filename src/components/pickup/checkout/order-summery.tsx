export default function PaymentSummery() {
  return (
    <div className="bg-white flex flex-col gap-4">
      <h3 className="text-black font-medium text-base">ملخص الدفع</h3>
      <div className="grid grid-cols-2 text-black text-xs font-light gap-3">
        <span className="rtl:text-right ltr:text-left">المجموع الفرعي</span>
        <span className="rtl:text-left ltr:text-right">ر.س 135.00</span>

        <span className="rtl:text-right ltr:text-left">
          ضريبة المبيعات (15%)
        </span>
        <span className="rtl:text-left ltr:text-right">ر.س 20.25</span>

        <span className="rtl:text-right ltr:text-left">ضريبة (15%)</span>
        <span className="rtl:text-left ltr:text-right">ر.س 20.25</span>
      </div>

      <div className="flex justify-between items-center font-medium text-base">
        <span className="text-black">المبلغ الإجمالي</span>
        <span className="text-black">ر.س 178.50</span>
      </div>
    </div>
  );
}
