'use client'
import { useState, useEffect, useRef } from "react";
import { AppleIcon, CreditCard } from "./icons";
import { loadApplePaySDK, checkApplePayAvailability, processApplePayment } from "@/src/lib/apple-pay";
import React from "react";

type PaymentMethodProps = {
  lang: string;
  amount: number;
  token?: string; // Auth token for API calls
  vat?: number;
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
    loading: "جاري التحميل...",
    paymentError: "حدث خطأ أثناء تحميل خيارات الدفع"
  },
  en: {
    title: "Payment methods",
    applePay: "Pay with Apple Pay",
    cardPay: "Pay with Credit/Debit Card",
    payWithApple: "Pay with Apple",
    cardDetails: "Card Details",
    loading: "Loading payment options...",
    paymentError: "Error loading payment options"
  },
};

export default function PaymentMethod({
  lang,
  amount = 0,
  vat = 0,
  token,
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel
}: PaymentMethodProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>('cardPay');
  const [isApplePayAvailable, setIsApplePayAvailable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [telrUrl, setTelrUrl] = useState<string>('');
  const [telrError, setTelrError] = useState<boolean>(false);
  const paymentFormRef = useRef<HTMLDivElement>(null);
  const t = TEXTS[lang] || TEXTS["en"];

  // Initialize Apple Pay and fetch Telr iframe URL on component mount
  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize Apple Pay
        // await loadApplePaySDK();
        // const isAvailable = checkApplePayAvailability();
        // setIsApplePayAvailable(isAvailable);
        
        // if (!isAvailable) {
        //   setSelectedPayment('cardPay');
        // }
        // Fetch Telr iframe URL
        const response = await fetch('/api/create-telr-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount, vat }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment session');
        }

        const data = await response.json();
        console.log(data)

        setTelrUrl(data.url);
        setIsLoading(false);
      } catch (error) {
        console.error('Initialization error:', error);
        setIsApplePayAvailable(false);
        setSelectedPayment('cardPay');
        setTelrError(true);
        setIsLoading(false);
        
        if (onPaymentError) {
          onPaymentError('Failed to initialize payment options');
        }
      }
    };

    initialize();
  }, [amount, onPaymentError]);

  const handleApplePayButtonClick = () => {
    if (!isApplePayAvailable) {
      if (onPaymentError) onPaymentError('Apple Pay is not available');
      return;
    }

    setIsLoading(true);

    const applePayConfig = {
      merchantName: 'Amrk',
      countryCode: 'SA',
      currencyCode: 'SAR'
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

  // Handle payment form rendering based on selected payment method
  useEffect(() => {
    if (!paymentFormRef.current) return;
    
    // Clear previous content
    paymentFormRef.current.innerHTML = '';
    
    if (isLoading) {
      // Show loading state
      const loadingContainer = document.createElement('div');
      loadingContainer.className = 'flex justify-center items-center h-48 w-full';
      
      const loadingSpinner = document.createElement('div');
      loadingSpinner.className = 'animate-spin rounded-full h-8 w-8 border-b-2 border-[#b0438a]';
      
      const loadingText = document.createElement('div');
      loadingText.className = 'ml-3 text-[#b0438a]';
      loadingText.textContent = t.loading;
      
      loadingContainer.appendChild(loadingSpinner);
      loadingContainer.appendChild(loadingText);
      paymentFormRef.current.appendChild(loadingContainer);
      
      return;
    }
    
    if (selectedPayment === 'applePay' && isApplePayAvailable) {
      // Render Apple Pay button
      const container = document.createElement('div');
      container.className = 'w-full';
      
      const applePayButton = document.createElement('apple-pay-button');
      applePayButton.setAttribute('buttonstyle', 'black');
      applePayButton.setAttribute('type', 'pay');
      applePayButton.setAttribute('locale', lang === 'ar' ? 'ar-SA' : 'en-US');
      applePayButton.className = 'w-full h-12';
      
      applePayButton.addEventListener('click', handleApplePayButtonClick);
      container.appendChild(applePayButton);
      
      paymentFormRef.current.appendChild(container);
    } 
    else if (selectedPayment === 'cardPay') {
      // Render Telr iframe for card payment
      if (telrError) {
        // Show error state
        const errorContainer = document.createElement('div');
        errorContainer.className = 'flex justify-center items-center h-48 w-full text-red-500';
        errorContainer.textContent = t.paymentError;
        paymentFormRef.current.appendChild(errorContainer);
        return;
      }
      
      if (telrUrl) {
        // Create iframe with Telr checkout URL
        const container = document.createElement('div');
        container.className = 'w-full h-[400px]';
        
        const iframe = document.createElement('iframe');
        iframe.src = telrUrl;
        iframe.className = 'w-full h-full border-none';
        iframe.allowFullscreen = true;
        
        container.appendChild(iframe);
        paymentFormRef.current.appendChild(container);
      }
    }
    
    // Scroll to payment form when switching to card payment
    if (selectedPayment === 'cardPay') {
      paymentFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedPayment, isLoading, isApplePayAvailable, telrUrl, telrError, lang, t]);

  return (
    <>
      <div className={`bg-white flex flex-col gap-4`}>
        <h3 className="text-black font-medium text-base">{t.title}</h3>
        <div className="flex flex-col gap-3">
          {/* Apple Pay - Only show if available */}
          {/* {isApplePayAvailable && (
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
          )} */}

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
          {/* Payment form content rendered by useEffect */}
        </div>
      </div>
    </>
  );
}