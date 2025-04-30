"use client";

import CleintNavBar from "@/src/components/navigation-bar/custom-navbar";
import { Locale } from "@/src/i18n-config";
import { useEffect, useState } from "react";
import MobileWrapper from "../../mobile-wrapper";
import CartItem from "@/src/components/dine-in/bill-row";
import BillPay from "@/src/components/user-overlay/bill-pay";
import toast from "react-hot-toast";
import UserDiscount from "@/src/components/basket-page/discount";
import CouponRedeem from "@/src/components/basket-page/redeem-coupon";
import OrderSummary from "@/src/components/dine-in/order-summery";
import TipSelector from "@/src/components/dine-in/tip-selector";

const TEXTS: Record<Locale, any> = {
    ar: {
        title: "الفاتورة",
        orderSuccess: "تم تقديم الطلب بنجاح!",
        orderError: "حدث خطأ في تقديم الطلب، يرجى المحاولة مرة أخرى.",
        loading: "جاري التحميل..."
    },
    en: {
        title: "Your Bill",
        orderSuccess: "Order submitted successfully!",
        orderError: "There was an error submitting your order. Please try again.",
        loading: "Loading..."
    },
};

export interface BasketItem {
    id: string;
    quantity: number;
    required: { name: string; value: string; extraPrice?: number }[];
    optional: { name: string; value: string; extraPrice?: number }[];
    totalPrice: number;
}

const LoadingOverlay = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
    </div>
);

export default function PayBillClient({ props, onToggle, type }: { props: string, onToggle: () => void, type: number }) {
    const [isLoading, setIsLoading] = useState(false);
    const [redeem, setRedeem] = useState(false);
    const [summaryTotal, setSummaryTotal] = useState(0);
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponDiscountValue, setCouponDiscountValue] = useState(0);
    const [selectedTip, setSelectedTip] = useState<number | null>(null);

    const points = 1203;
    const pointsValue = 12.03;

    const lang = props || "ar";
    const t = TEXTS[lang];

    const testItems = [
        {
            user: 'current',
            quantity: 2,
            name: "Double Cheeseburger",
            basePrice: 25.00,
            options: [
                { name: "Extra cheese", price: 5.00 },
                { name: "No onions", price: 0.00 },
                { name: "Special sauce", price: 3.00 }
            ],
            totalPrice: 58.00,
            mode: "CH"
        },
        {
            user: 'Ali',
            quantity: 1,
            name: "French Fries",
            basePrice: 12.00,
            options: [],
            totalPrice: 12.00,
            mode: "CH"
        },
        {
            user: 'Ahmed',
            quantity: 1,
            name: "Ice Cream Sundae",
            basePrice: 18.00,
            options: [
                { name: "Extra chocolate", price: 3.00 },
                { name: "Nuts", price: 2.00 }
            ],
            totalPrice: 23.00,
            mode: "CH"
        }
    ];

    const handleApplyCoupon = async (code: string) => {
        try {
            const response = await fetch('/api/validate-coupon', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ couponCode: code, type: '2' })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Error: ${response.status}`);
            }

            const result = await response.json();

            if (result && result.success === "OK") {
                setCouponCode(code);
                setCouponDiscountValue(result.coupon_value);
                toast.success(`Coupon ${code} applied successfully!`);
                return result;
            } else {
                throw new Error(result.message || 'Invalid coupon code');
            }
        } catch (error) {
            console.error("Error applying coupon:", error);
            const errorMessage = error instanceof Error ? error.message : 'Error validating coupon';
            toast.error(errorMessage);
            throw error;
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode(null);
        setCouponDiscountValue(0);
        setCouponDiscount(0);
    };

    const handleToggle = (checked: boolean) => {
        setRedeem(checked);
        document.cookie = `use_point=${checked}; path=/`;
    };
    const handleTipChange = (amount: number | string | null) => {
        // Convert to number if it's a valid numeric value, otherwise set to null
        const tipAmount = amount !== null && !isNaN(Number(amount))
            ? Number(amount)
            : null;

        setSelectedTip(tipAmount);
    };

    // Update coupon discount amount when summary total changes
    useEffect(() => {
        if (couponDiscountValue > 0) {
            const discountAmount = couponDiscountValue;
            setCouponDiscount(discountAmount);
        }
    }, [summaryTotal, couponDiscountValue]);

    return (
        <MobileWrapper>
            <div className="flex flex-col gap-5 w-[88%] overflow-y-auto pt-10 mb-18">
                <CleintNavBar text={t.title} lang={lang} onClose={onToggle} />

                {/* {
                        isLoading ? (
                            <LoadingOverlay />
                        ) : true ? (
                            <div className="flex flex-col items-center justify-center text-center gap-4 mt-20">
                                <p className="text-gray-500 text-sm">{t.emptyMessage}</p>
                                <button
                                    onClick={onToggle}
                                    className="text-[#B0438A] underline text-sm font-medium"
                                >
                                    {t.goBack}
                                </button>
                            </div>
                        ) : (
                            <>
                                           
                            </>
                        )} */}

                <div className="flex flex-col">
                    {testItems.map((item, index) => (
                        <CartItem
                            user={item.user}
                            quantity={item.quantity}
                            name={item.name}
                            basePrice={item.basePrice}
                            options={item.options}
                            totalPrice={item.totalPrice}
                            onDelete={() => { }}
                            onClick={() => { }}
                            lang={lang}
                            mode={item.mode}
                        />
                    ))}
                </div>

                <UserDiscount
                    lang={lang}
                    points={points}
                    onToggle={handleToggle}
                />

                <CouponRedeem
                    lang={lang}
                    onApplyCoupon={handleApplyCoupon}
                    onRemoveCoupon={handleRemoveCoupon}
                    appliedCoupon={couponCode}
                    discount={couponDiscountValue}
                />

                <TipSelector lang={lang} tipValues={[3, 4, 6]} onSelectTip={handleTipChange}/>

                <OrderSummary
                    lang={lang}
                    redeemPoints={redeem}
                    pointsValue={redeem ? pointsValue : 0}
                    couponDiscount={couponCode ? couponDiscount : 0}
                    couponCode={couponCode}
                    couponPercentage={couponDiscountValue}
                    items={testItems}
                    onTotalChange={(val) => setSummaryTotal(val)}
                    tipAmount={selectedTip || 0}
                />
            </div>


        </MobileWrapper>
    );
}