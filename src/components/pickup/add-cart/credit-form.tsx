import { CreditCard } from "./icons";

export default function CardInputForm() {
  return (
    <form className="flex flex-col w-full gap-3">
      {/* Card Number Input */}
      <label className="">
        <div className="border border-[#00000080] rounded-lg flex items-center p-4 gap-4">
          <CreditCard />
          <input
            type="text"
            name="cardNumber"
            placeholder="ادخل رقم البطاقة"
            className="bg-transparent outline-none text-right text-sm font-light"
            required
            aria-label="رقم البطاقة"
          />
        </div>
      </label>

      {/* Expiry Date & CVV Inputs */}
      <div className="flex justify-between w-full">
        <label className="w-[48%] ">
          <div className="border border-[#00000080] rounded-lg flex items-center p-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="تاريخ الإنتهاء MM/YY"
              className="bg-transparent outline-none text-right text-sm font-light w-full"
              required
              aria-label="تاريخ الإنتهاء"
            />
          </div>
        </label>
        <label className="w-[48%]">
          <div className="border border-[#00000080] rounded-lg flex items-center p-4 gap-4">
            <CreditCard />
            <input
              type="text"
              name="cvv"
              placeholder="ادخل رقم CVV"
              className="bg-transparent outline-none text-right text-sm font-light w-[70%]"
              required
              aria-label="رمز CVV"
            />
          </div>
        </label>
      </div>
    </form>
  );
}
