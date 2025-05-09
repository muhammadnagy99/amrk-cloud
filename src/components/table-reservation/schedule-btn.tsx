export default function ScheduleBtn({ lang }: { lang: string }) {
    const label = lang === 'ar' ? 'تأكيد الحجز' : 'Confirm Booking';
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[434px] w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-40 rounded-lg gap-3 h-24">
            <button
                onClick={() => { }}
                className="flex items-center justify-center px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1"
            >
                <p className="">
                    {label}
                </p>
            </button>
        </div>
    )
}