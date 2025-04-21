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
  const [selectedPayment, setSelectedPayment] = useState<string>('applePay'); // Default to Apple Pay
  const [isApplePayAvailable, setIsApplePayAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const paymentFormRef = useRef<HTMLDivElement>(null);
  const applePayButtonRef = useRef<HTMLElement | null>(null);
  const t = TEXTS[lang] || TEXTS["en"];

  // Initialize Apple Pay on component mount
  useEffect(() => {
    const initApplePay = async () => {
      try {
        // Load the Apple Pay SDK
        await loadApplePaySDK();
        
        // Check if Apple Pay is available
        const isAvailable = checkApplePayAvailability();
        setIsApplePayAvailable(isAvailable);
        
        // If not available, switch to card payment
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

  // Handle Apple Pay button click
  const handleApplePayButtonClick = () => {
    if (!isApplePayAvailable) {
      if (onPaymentError) onPaymentError('Apple Pay is not available');
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Configure Apple Pay with correct locale
    const applePayConfig = {
      merchantName: 'Amrk',
      countryCode: lang === 'ar' ? 'SA' : 'US', // Set country based on language
      currencyCode: 'USD' // Update with your currency
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

  // Setup Apple Pay button click handler
  useEffect(() => {
    // Initialize the Apple Pay button when it's available in the DOM
    if (selectedPayment === 'applePay' && isApplePayAvailable && applePayButtonRef.current) {
      const buttonElement = applePayButtonRef.current;
      
      // Remove any existing event listeners
      const newButtonElement = buttonElement.cloneNode(true) as HTMLElement;
      if (buttonElement.parentNode) {
        buttonElement.parentNode.replaceChild(newButtonElement, buttonElement);
      }
      applePayButtonRef.current = newButtonElement;

      // Add the click event listener
      newButtonElement.addEventListener('click', handleApplePayButtonClick);
    }
  }, [selectedPayment, isApplePayAvailable, amount]);

  // Render the content for the selected payment method
  const renderSelectedPaymentContent = () => {
    switch (selectedPayment) {
      case 'applePay':
        return (
          <div className="w-full">
            {isLoading ? (
              <div className="flex justify-center items-center h-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#b0438a]"></div>
              </div>
            ) : (
              React.createElement('apple-pay-button' as any, {
                ref: applePayButtonRef,
                buttonstyle: "black",
                type: "pay",
                locale: lang === 'ar' ? 'ar-SA' : 'en-US',
                className: "w-full h-12"
              })
            )}
          </div>
        );
      case 'cardPay':
        return (
          <div className="w-full">
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
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (selectedPayment === 'cardPay' && paymentFormRef.current) {
      paymentFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedPayment]);


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
          {renderSelectedPaymentContent()}
        </div>
      </div>
    </>
  );
}