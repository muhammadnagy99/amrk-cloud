import { useState } from "react";
import { SplitIconLight } from "./icons";
import PayBillClient from "@/src/app/[lang]/dine-in/bill/pay-full-bill";

export default function BillPay({ lang }: { lang: string }) {
  const [showBillOverlay, setShowBillOverlay] = useState(false);
  const [closingAnimation, setClosingAnimation] = useState(false);
  const [showClosingAnimation, setShowClosingAnimation] = useState(false);
  const translations = {
    en: {
      totalBill: "Total Bill",
      splitBill: "Split Bill"
    },
    ar: {
      totalBill: "دفع إجمالي الفاتورة",
      splitBill: "تقسيم الفاتورة"
    }
  };

  const text = translations[lang as keyof typeof translations] || translations.en;

  const toggleBillOverlay = () => {
    setShowBillOverlay(!showBillOverlay);
  };

  const closeBillOverlay = () => {
    if (showBillOverlay && !closingAnimation) {
      setClosingAnimation(true);
      setShowClosingAnimation(true);
      setTimeout(() => {
        setShowBillOverlay(false);
        setClosingAnimation(false);
        setShowClosingAnimation(false);
      }, 300);
    }
  };

  return (
    <>
      {(showBillOverlay || showClosingAnimation) && (
        <div className="fixed inset-0 bg-transparent z-50 flex flex-col justify-end">
          <div
            className="bg-white w-full shadow-lg overflow-hidden transition-transform duration-300 ease-out transform"
            style={{
              transform: closingAnimation ? 'translateY(100%)' : 'translateY(0)',
              height: '100vh',
              animation: showBillOverlay && !closingAnimation
                ? 'slide-up 0.3s ease-out'
                : closingAnimation
                  ? 'slide-down 0.3s ease-out'
                  : 'none'
            }}
            onAnimationEnd={() => {
              if (closingAnimation) {
                setShowClosingAnimation(false);
                setClosingAnimation(false);
              }
            }}
          >
            <div className="h-full overflow-auto">
              <PayBillClient props={lang} onToggle={closeBillOverlay} type={1} />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-40 rounded-lg gap-3 h-24">
        <button
          onClick={toggleBillOverlay}
          className="flex items-center justify-center px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1"
        >
          <p className="">
            {text.totalBill}
          </p>
        </button>
        <button
          onClick={() => { }}
          className="flex items-center justify-center px-4 bg-[#005ec9] text-white w-full h-12 rounded-lg flex-1 gap-2"
        >
          <SplitIconLight />
          <p className="text-center">
            {text.splitBill}
          </p>
        </button>
      </div>

      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </>
  );
}