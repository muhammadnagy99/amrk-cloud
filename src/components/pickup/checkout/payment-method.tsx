'use client'
import { useState } from "react";
import { AppleIcon, AppleIconLight, ApplePayIcon, CreditCard } from "./icons";

type PaymentMethodProps = {
  lang: string;
};

const TEXTS: Record<string, any> = {
  ar: {
    title: " طرق الدفع",
    applePay: "الدفع باستخدام Apple Pay",
    cardPay: "الدفع باستخدام بطاقة ائتمان / خصم",
    payWithApple: "الدفع باستخدام Apple",
    cardDetails: "تفاصيل البطاقة",
    cardNumber: "رقم البطاقة",
    expiryDate: "تاريخ الانتهاء",
    cvv: "CVV",
    cardholderName: "اسم حامل البطاقة",
    pay: "ادفع الآن"
  },
  en: {
    title: "Payment methods",
    applePay: "Pay with Apple Pay",
    cardPay: "Pay with Credit/Debit Card",
    payWithApple: "Pay with Apple",
    cardDetails: "Card Details",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    cardholderName: "Cardholder Name",
    pay: "Pay Now"
  },
};

export default function PaymentMethod({ lang }: PaymentMethodProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const t = TEXTS[lang] || TEXTS["en"];
  
  return (
    <div className="bg-white flex flex-col gap-4">
      <h3 className="text-black font-medium text-base">{t.title}</h3>
      <div className="flex flex-col gap-3">
        {/* Apple Pay */}
        <div className="flex flex-col gap-2 items-center">
          <label
            className={`w-[99%] border border-[#00000033] rounded-lg p-4 flex items-center cursor-pointer gap-4 h-14 ${selectedPayment === 'applePay' ? 'ring-2 ring-[#b0438a]' : ''}`}
          >
            <input
              type="radio"
              name="payment"
              value="applePay"
              checked={selectedPayment === 'applePay'}
              onChange={() => setSelectedPayment('applePay')}
              className="h-5 w-5"
            />
            <div className="flex items-center gap-4">
              <AppleIcon />
              <span className="text-sm font-normal">{t.applePay}</span>
            </div>
          </label>
          {selectedPayment === 'applePay' && (
            <div className="rounded-lg p-4 mt-1 w-full flex justify-center">
              <button className="bg-black text-white rounded-full py-3 px-6 font-medium flex items-center gap-2 w-full justify-center">
                <AppleIconLight />
                <span>{t.payWithApple}</span>
              </button>
            </div>
          )}
        </div>
        
        {/* Card Payment */}
        <div className="flex flex-col gap-2 items-center">
          <label
            className={`w-[99%] border border-[#00000033] rounded-lg p-4 flex items-center cursor-pointer text-sm font-normal gap-4 h-14 ${selectedPayment === 'cardPay' ? 'ring-2 ring-[#b0438a]' : ''}`}
          >
            <input
              type="radio"
              name="payment"
              value="cardPay"
              checked={selectedPayment === 'cardPay'}
              onChange={() => setSelectedPayment('cardPay')}
              className="h-5 w-5"
            />
            <div className="flex items-center gap-4">
              <CreditCard />
              <span>{t.cardPay}</span>
            </div>
          </label>
          {selectedPayment === 'cardPay' && (
            <div className="border border-gray-200 rounded-lg p-4 mt-1 w-full">
              <div className="flex flex-col gap-4">
                <h4 className="font-medium text-sm">{t.cardDetails}</h4>
                
                <div className="flex flex-col gap-3 w-full">
                  {/* Card Number */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-600">{t.cardNumber}</label>
                    <input 
                      type="text" 
                      className="border border-[#00000033] rounded-lg p-3 h-12" 
                      placeholder="1234 5678 9012 3456" 
                    />
                  </div>
                  
                  {/* Expiry Date and CVV on same row */}
                  <div className="flex gap-3 w-full">
                    <div className="flex flex-col gap-1 flex-1 w-[65%]">
                      <label className="text-sm text-gray-600">{t.expiryDate}</label>
                      <input 
                        type="text" 
                        className="border border-[#00000033] rounded-lg p-3 h-12" 
                        placeholder="MM/YY" 
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-[30%]">
                      <label className="text-sm text-gray-600">{t.cvv}</label>
                      <input 
                        type="text" 
                        className="border border-[#00000033] rounded-lg p-3 h-12" 
                        placeholder="123" 
                      />
                    </div>
                  </div>
                  
                  {/* Cardholder Name */}
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm text-gray-600">{t.cardholderName}</label>
                    <input 
                      type="text" 
                      className="border border-[#00000033] rounded-lg p-3 h-12" 
                      placeholder="John Doe" 
                    />
                  </div>
                  
                  {/* Pay Button */}
                  <button className="bg-[#b0438a] text-white rounded-lg py-3 px-6 font-medium mt-2 h-12">
                    {t.pay}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}