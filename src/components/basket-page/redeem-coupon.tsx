import React, { useState } from 'react';
import { RiyalCurrency } from './icons';

type CouponRedeemProps = {
    lang: string;
    onApplyCoupon: (code: string) => Promise<void>; // Changed to Promise for async handling
    onRemoveCoupon: () => void;
    appliedCoupon: string | null;
    discount: number;
};

const TEXTS = {
    ar: {
        couponTitle: "رمز الكوبون",
        couponPlaceholder: "رمز القسيمة",
        addButton: "إضافة",
        couponDiscount: "خصم رمز الكوبون",
        loading: "جاري التحميل...",
        error: "رمز كوبون خاطئ"
    },
    en: {
        couponTitle: "Coupon Code",
        couponPlaceholder: "Voucher code",
        addButton: "Add",
        couponDiscount: "Coupon Code Discount",
        loading: "Loading...",
        error: "Invalid Coupon Code"
    }
};

const PriceDisplay = ({ price, color, isDiscount = false }: { price: number; color: string; isDiscount?: boolean }) => {
    return (
        <div className="flex items-center gap-1" dir="ltr">
            <RiyalCurrency color={color} />
            <span>{isDiscount ? `- ${price.toFixed(2)}` : price.toFixed(2)}</span>
        </div>
    );
};

const Plus = () => (
    <svg className='w-5' viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="5.5" x2="9" y2="12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const Coupon = () => (
    <svg className='w-5 fill-[#B0438A] rotate-135' strokeWidth={1.5} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M40 11H8a4 4 0 0 0-4 4v5a1 1 0 0 0 1 1 2.77 2.77 0 0 1 1 .18 3 3 0 0 1 0 5.64A2.77 2.77 0 0 1 5 27a1 1 0 0 0-1 1v5a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4V15a4 4 0 0 0-4-4zm2 22a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4.1a5 5 0 0 0 0-9.8V15a2 2 0 0 1 2-2h32a2 2 0 0 1 2 2z"/><circle cx="13" cy="24" r="1"/><circle cx="13" cy="20" r="1"/><circle cx="13" cy="28" r="1"/><circle cx="13" cy="16" r="1"/><circle cx="13" cy="32" r="1"/><path d="M36.5 25a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.5-2.5zm0 3a.5.5 0 1 1 .5-.5.5.5 0 0 1-.5.5zM29.5 23a2.5 2.5 0 1 0-2.5-2.5 2.5 2.5 0 0 0 2.5 2.5zm0-3a.5.5 0 1 1-.5.5.5.5 0 0 1 .5-.5zM37.29 18.29l-10 10a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l10-10a1 1 0 0 0-1.42-1.42zM23 27h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM23 31h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM17 20a1 1 0 0 0 1-1v-3a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1zM20 20a1 1 0 0 0 1-1v-3a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1zM23 15a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1z"/></svg>
);

// Loading spinner component
const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const CouponRedeem: React.FC<CouponRedeemProps> = ({
    lang,
    onApplyCoupon,
    onRemoveCoupon,
    appliedCoupon,
    discount
}) => {
    const [couponCode, setCouponCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const t = TEXTS[lang as keyof typeof TEXTS];
    const isRTL = lang === 'ar';

    const handleApplyCoupon = async () => {
        if (couponCode.trim()) {
            setIsLoading(true);
            setError(null);
            
            try {
                await onApplyCoupon(couponCode.trim());
                setCouponCode('');
            } catch (err) {
                setError(t.error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg flex flex-col gap-2">
            <div className={`flex items-center justify-between`}>
                <h3 className={`flex gap-2 text-base font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.couponTitle}
                    <Coupon />
                </h3>
                {appliedCoupon && (
                    <div className={`flex items-center text-sm`}>
                        <span className="text-[#B0438A]">
                            {/* <PriceDisplay price={discount} color="#b0438a" isDiscount={true} /> */}
                        </span>
                    </div>
                )}
            </div>

            {!appliedCoupon ? (
                <div className="flex flex-col gap-1">
                    <div className={`flex`}>
                        <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => {
                                setCouponCode(e.target.value);
                                setError(null);
                            }}
                            placeholder={t.couponPlaceholder}
                            className={`w-[75%] border ${error ? 'border-red-500' : 'border-[#00000033]'} rounded-md px-3 py-2 text-sm focus:outline-none ${isRTL ? 'rounded-l-none' : 'rounded-r-none'}`}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleApplyCoupon}
                            disabled={isLoading || !couponCode.trim()}
                            className={`flex items-center justify-center text-sm gap-1.5 w-[25%] px-4 py-2 bg-[#B0438A] font-medium text-white rounded-md ${isRTL ? 'rounded-r-none' : 'rounded-l-none'} ${(isLoading || !couponCode.trim()) ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            <span className='flex items-center h-full'>
                                {isLoading ? <LoadingSpinner /> : <Plus />}
                            </span>
                            <span className='flex items-center h-full'>
                                {isLoading ? '' : t.addButton}
                            </span>
                        </button>
                    </div>
                    
                    {error && (
                        <div className="text-red-500 text-xs mt-1">
                            {error}
                        </div>
                    )}
                </div>
            ) : (
                <div className={`flex justify-between items-center`}>
                    <div className="flex items-center gap-2">
                        <span className="text-[#B0438A] text-sm font-medium">{appliedCoupon}</span>
                        <span className="text-sm text-gray-500">
                            {t.couponDiscount} ({discount})
                        </span>
                    </div>
                    <button
                        onClick={onRemoveCoupon}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default CouponRedeem;