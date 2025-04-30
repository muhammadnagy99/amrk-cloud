'use client'

import ReservationClient from "@/src/app/[lang]/table-reservation/reservation/reservation-client";
import { useEffect, useState } from "react";

interface props {
    lang: string;
    headline: string;
    times: string[];
    guests: number;
    date: Date | null;
}

export default function RowSchedule({ headline, times, lang, guests, date }: props) {

    const [showReservationOverlay, setShowReservationOverlay] = useState(false);
    const [closingAnimation, setClosingAnimation] = useState(false);
    const [showClosingAnimation, setShowClosingAnimation] = useState(false);
    const [branchName, setBranchName] = useState<string | null>('');

    useEffect(() => {
        const storedBranchName = localStorage.getItem('table_reservation_branch_name');
        setBranchName(storedBranchName);
    }, []);

    const toggleReservationOverlay = () => {
        setShowReservationOverlay(!showReservationOverlay);
    };


    const closeReservationOverlay = () => {
        if (showReservationOverlay && !closingAnimation) {
            setClosingAnimation(true);
            setShowClosingAnimation(true);
            setTimeout(() => {
                setShowReservationOverlay(false);
                setClosingAnimation(false);
                setShowClosingAnimation(false);
            }, 300);
        }
    };

    return (
        <>
            {(showReservationOverlay || showClosingAnimation) && (
                <div className="fixed inset-0 bg-transparent z-50 flex flex-col justify-end">
                    <div
                        className="bg-white w-full shadow-lg overflow-hidden transition-transform duration-300 ease-out transform"
                        style={{
                            transform: closingAnimation ? 'translateY(100%)' : 'translateY(0)',
                            height: '100vh',
                            animation: showReservationOverlay && !closingAnimation
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
                            <ReservationClient props={lang} onToggle={closeReservationOverlay} type={4} branchName={branchName} guests={guests} date={date} floor={headline} />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col justify-start gap-2 w-full">
                <h3 className="text-sm">
                    {headline}
                </h3>
                <div className="relative w-full max-w-md">
                    <div className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap w-full pb-2 scrollbar-thin px-2">
                        {times.map((time, index) => (
                            <button
                                key={index}
                                className="h-9 w-16 flex-shrink-0 text-center border-widget text-xs font-light rounded-lg"
                                dir="ltr"
                                onClick={toggleReservationOverlay}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
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
    )
}