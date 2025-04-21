'use client'
import { useState, useEffect, useRef } from "react";
import { AppleIcon, AppleIconLight, ApplePayIcon, CreditCard } from "./icons";
import { loadApplePaySDK, checkApplePayAvailability, processApplePayment } from "@/src/lib/apple-pay";
import React from "react";


type PaymentMethodProps = {
  lang: string;
  amount: number;
  token?: string; // Auth token for API calls
  onPaymentSuccess?: (result: any) => void;
  onPaymentError?: (error: string) => void;
  onPaymentCancel?: () => void;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'apple-pay-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

// If using document.createElement, you might also need
interface HTMLElementTagNameMap {
  'apple-pay-button': HTMLElement;
}

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

export default function PaymentMethod({
  lang,
  amount = 0,
  token,
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel
}: PaymentMethodProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>('applePay');
  const [isApplePayAvailable, setIsApplePayAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const paymentFormRef = useRef<HTMLDivElement>(null);
  const applePayContainerRef = useRef<HTMLDivElement>(null);
  const t = TEXTS[lang] || TEXTS["en"];

  useEffect(() => {
    const initApplePay = async () => {
      try {
        await loadApplePaySDK();

        const isAvailable = checkApplePayAvailability();
        setIsApplePayAvailable(isAvailable);

        if (!isAvailable) {
          setSelectedPayment('cardPay');
        }
      } catch (error) {
        console.error('Failed to initialize Apple Pay:', error);
        setIsApplePayAvailable(false);
        setSelectedPayment('cardPay');
      }
    };

    initApplePay();
  }, []);

  const handleApplePayButtonClick = () => {
    if (!isApplePayAvailable) {
      if (onPaymentError) onPaymentError('Apple Pay is not available');
      return;
    }

    setIsLoading(true);

    const applePayConfig = {
      merchantName: 'Amrk',
      countryCode: 'SA',
      currencyCode: 'SAR' // Update with your currency
    };

    // Process the Apple Pay payment
    processApplePayment(
      amount,
      token || '',
      applePayConfig,
      {
        onValidationStart: () => {
          console.log('Merchant validation started');
        },
        onProcessingStart: () => {
          console.log('Payment processing started');
        },
        onSuccess: (result) => {
          console.log('Payment successful:', result);
          setIsLoading(false);
          if (onPaymentSuccess) onPaymentSuccess(result);
        },
        onError: (error) => {
          console.error('Payment failed:', error);
          setIsLoading(false);
          if (onPaymentError) onPaymentError(error);
        },
        onCancel: () => {
          console.log('Payment cancelled');
          setIsLoading(false);
          if (onPaymentCancel) onPaymentCancel();
        }
      }
    );
  };

  useEffect(() => {
    console.log("Payment method changed to:", selectedPayment);

    if (paymentFormRef.current) {
      paymentFormRef.current.innerHTML = '';

      if (selectedPayment === 'applePay' && !isLoading) {
        const container = document.createElement('div');
        container.className = 'w-full';

        if (isLoading) {
          const loadingDiv = document.createElement('div');
          loadingDiv.className = 'flex justify-center items-center h-12';
          const spinner = document.createElement('div');
          spinner.className = 'animate-spin rounded-full h-6 w-6 border-b-2 border-[#b0438a]';
          loadingDiv.appendChild(spinner);
          container.appendChild(loadingDiv);
        } else if (isApplePayAvailable) {
          const applePayButton = document.createElement('apple-pay-button');
          applePayButton.setAttribute('buttonstyle', 'black');
          applePayButton.setAttribute('type', 'pay');
          applePayButton.setAttribute('locale', lang === 'ar' ? 'ar-SA' : 'en-US');
          applePayButton.className = 'w-full h-12';

          applePayButton.addEventListener('click', handleApplePayButtonClick);
          container.appendChild(applePayButton);
        } else {
          const message = document.createElement('div');
          message.className = 'flex justify-center items-center h-12 text-gray-500';
          message.textContent = 'Apple Pay is not available on this device';
          container.appendChild(message);
        }

        paymentFormRef.current.appendChild(container);
      }
      else if (selectedPayment === 'cardPay') {
        const cardFormHTML = `
        <div class="w-full">
          <div class="flex flex-col gap-4">
            <h4 class="font-medium text-sm">${t.cardDetails}</h4>
            <div class="flex flex-col gap-3 w-full">
              <!-- Card Number -->
              <div class="flex flex-col gap-1">
                <label class="text-sm text-gray-600">${t.cardNumber}</label>
                <input
                  type="text"
                  class="border border-[#00000033] rounded-lg p-3 h-12"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
                
              <!-- Expiry Date and CVV on same row -->
              <div class="flex gap-3 w-full">
                <div class="flex flex-col gap-1 flex-1 w-[65%]">
                  <label class="text-sm text-gray-600">${t.expiryDate}</label>
                  <input
                    type="text"
                    class="border border-[#00000033] rounded-lg p-3 h-12"
                    placeholder="MM/YY"
                  />
                </div>
                <div class="flex flex-col gap-1 w-[30%]">
                  <label class="text-sm text-gray-600">${t.cvv}</label>
                  <input
                    type="text"
                    class="border border-[#00000033] rounded-lg p-3 h-12"
                    placeholder="123"
                  />
                </div>
              </div>
                
              <!-- Cardholder Name -->
              <div class="flex flex-col gap-1 w-full">
                <label class="text-sm text-gray-600">${t.cardholderName}</label>
                <input
                  type="text"
                  class="border border-[#00000033] rounded-lg p-3 h-12"
                  placeholder="John Doe"
                />
              </div>
                
              <!-- Pay Button -->
              <button class="bg-[#b0438a] text-white rounded-lg py-3 px-6 font-medium mt-2 h-12">
                ${t.pay}
              </button>
            </div>
          </div>
        </div>
      `;

        paymentFormRef.current.innerHTML = cardFormHTML;
      }
    }

    return () => {
    };
  }, [selectedPayment, isLoading, isApplePayAvailable, lang]);

  // useEffect(() => {
  //   if (selectedPayment === 'cardPay' && paymentFormRef.current) {
  //     paymentFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  //   }
  // }, [selectedPayment]);


  return (
    <>
      <div className={`bg-white flex flex-col gap-4`}>
        <h3 className="text-black font-medium text-base">{t.title}</h3>
        <div className="flex flex-col gap-3">
          {/* Apple Pay - Only show if available */}
          {isApplePayAvailable && (
            <div className="flex flex-col gap-2 items-center">
              <label
                className={`w-[99%] border border-[#00000033] rounded-lg p-4 flex items-center cursor-pointer gap-4 h-14`}
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
            </div>
          )}

          {/* Card Payment */}
          <div className="flex flex-col gap-2 items-center">
            <label
              className={`w-[99%] border border-[#00000033] rounded-lg p-4 flex items-center cursor-pointer text-sm font-normal gap-4 h-14`}
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
          </div>
        </div>

        <div
          ref={paymentFormRef}
          className="w-full bg-white p-4 flex flex-col rounded-lg gap-3"
        >
        </div>
      </div>
    </>
  );
}