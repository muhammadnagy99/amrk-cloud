'use client'
import { useState, useEffect, useRef } from "react";
import { AppleIcon, CreditCard } from "./icons";
import { loadApplePaySDK, checkApplePayAvailability, processApplePayment } from "@/src/lib/apple-pay";
import React from "react";
import { ApplePayButton } from "./apple-pay-btn";
import { useIframeListener } from "@/src/hooks/useFrame";

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
  const [paymentState, setPaymentState] = useState({
    isLoading: true,
    telrUrl: '',
    telrError: false
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const t = TEXTS[lang] || TEXTS["en"];

  // Single useEffect for initialization - only runs once on mount
  useEffect(() => {
    let isMounted = true; // For handling async operations on unmounted component

    const initialize = async () => {
      try {
        await loadApplePaySDK();
        const isAvailable = checkApplePayAvailability();
        if (isMounted) setIsApplePayAvailable(isAvailable);

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

        if (isMounted) {
          setPaymentState({
            isLoading: false,
            telrUrl: data.url,
            telrError: false
          });
        }
      } catch (error) {
        console.error('Initialization error:', error);

        if (isMounted) {
          setIsApplePayAvailable(false);
          setSelectedPayment('cardPay');
          setPaymentState({
            isLoading: false,
            telrUrl: '',
            telrError: true
          });
        }
      }
    };

    initialize();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [amount]); // Include all external values the effect depends on

  // Effect to scroll to payment form when switching to card payment
  useEffect(() => {
    if (selectedPayment === 'cardPay' && iframeRef.current) {
      iframeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedPayment]);

  const handleApplePayButtonClick = () => {
    if (!isApplePayAvailable) {
      if (onPaymentError) onPaymentError('Apple Pay is not available');
      return;
    }

    setPaymentState(prev => ({ ...prev, isLoading: true }));

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
          setPaymentState(prev => ({ ...prev, isLoading: false }));
          if (onPaymentSuccess) onPaymentSuccess(result);
        },
        onError: (error) => {
          console.error('Payment failed:', error);
          setPaymentState(prev => ({ ...prev, isLoading: false }));
          if (onPaymentError) onPaymentError(error);
        },
        onCancel: () => {
          console.log('Payment cancelled');
          setPaymentState(prev => ({ ...prev, isLoading: false }));
          if (onPaymentCancel) onPaymentCancel();
        }
      }
    );
  };

  // Render Apple Pay button if available
  const renderApplePayButton = () => {
    if (!isApplePayAvailable) return null;

    return (
      <div className="flex flex-col gap-2 items-center">
        <label className="w-[99%] border border-[#00000033] rounded-lg p-4 flex items-center cursor-pointer gap-4 h-14">
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
    );
  };
  // Render payment form based on current state
  const renderPaymentForm = () => {
    const { isLoading, telrUrl, telrError } = paymentState;

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-48 w-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b0438a]" />
          <div className="ml-3 text-[#b0438a]">{t.loading}</div>
        </div>
      );
    }

    if (selectedPayment === 'applePay' && isApplePayAvailable) {
      return (
        <div className="w-full">
          <ApplePayButton
            buttonStyle="black"
            buttonType="pay"
            locale={lang === 'ar' ? 'ar-SA' : 'en-US'}
            onClick={handleApplePayButtonClick}
            className="w-full h-12"
          />
        </div>
      );
    }

    if (selectedPayment === 'cardPay') {
      if (telrError) {
        return (
          <div className="flex justify-center items-center h-48 w-full text-red-500">
            {t.paymentError}
          </div>
        );
      }

      if (telrUrl) {
        return (
          <div className="w-full h-[400px]">
            <iframe
              ref={iframeRef}
              src={telrUrl}
              className="w-full h-full border-none"
              allowFullScreen
            />
          </div>
        );
      }
    }

    return null;
  };

  const { status } = useIframeListener();

  useEffect(() => {
    console.log("This is the Recieved Status: " + status)
  }, [status])

  return (
    <>
      <div className="bg-white flex flex-col gap-4">
        <h3 className="text-black font-medium text-base">{t.title}</h3>
        <div className="flex flex-col gap-3">
          {renderApplePayButton()}

          {/* Card Payment */}
          <div className="flex flex-col gap-2 items-center">
            <label className="w-[99%] border border-[#00000033] rounded-lg p-4 flex items-center cursor-pointer text-sm font-normal gap-4 h-14">
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

        <div className="w-full bg-white p-4 flex flex-col rounded-lg gap-3">
          {renderPaymentForm()}
        </div>
      </div>
    </>
  );
}