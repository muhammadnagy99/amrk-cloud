export default function HomeBtn() {
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
            <button className="flex items-center justify-center px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1">
                <p className="flex flex-row items-center">
                    <span className="text-sm font-medium"> عودة إلى القائمة</span>
                </p>
            </button>
        </div>
    );
}
