export default function BasketCTA() {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex justify-between items-center z-50 rounded-lg gap-3 h-24">
      <button className="flex items-center justify-between px-4 bg-[#b0438a] text-white w-full h-12 rounded-lg flex-1">
        <p className="h-6 w-6 bg-[#922b6e] rounded-full text-white text-xs font-medium flex justify-center items-center">
          5
        </p>
        <p className="flex flex-row items-center">
          <span className="text-sm font-medium">تابع للدفع</span>
        </p>
        <span className="text-sm font-light">21.00 ر.س</span>
      </button>
    </div>
  );
}
