import { ApplePayIcon, CreditCard, PlusCircle } from "./icons";

export default function PaymentMethod() {
  return (
    <div className="bg-white flex flex-col gap-4">
      <h3 className="text-black font-medium text-base">اختر طريقة الدفع</h3>
      <div className="flex flex-col gap-3">
        <div className="bg-black text-white rounded-lg p-4 flex items-center justify-center cursor-pointer gap-4 h-16">
          <ApplePayIcon />
          <span className="text-sm font-normal">الدفع باستخدام Apple Pay</span>
        </div>

        <label className="border border-[#00000033] rounded-lg p-4 flex items-center justify-between cursor-pointer text-sm font-normal">
          <p className="flex items-center gap-4">
            <CreditCard />
            <span>xxxx-4382</span>
          </p>
          <input
            type="radio"
            name="payment"
            className="w-5 h-5"
          />
        </label>

        <label className="border border-[#00000033] rounded-lg p-4 flex items-center justify-between cursor-pointer text-sm font-normal">
          <p className="flex items-center gap-4">
            <PlusCircle />
            <span>إضافة بطاقة دفع جديدة</span>
          </p>
          <input type="radio" name="payment" className="w-5 h-5" />
        </label>
      </div>
    </div>
  );
}
