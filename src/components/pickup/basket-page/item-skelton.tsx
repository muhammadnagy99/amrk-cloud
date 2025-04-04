export default function CartItemSkeleton() {
    return (
      <div className="py-3 border-b border-gray-300 bg-white flex flex-col gap-2 animate-pulse min-h-[88px] justify-between">
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 h-4 w-24 rounded" />
          <div className="bg-gray-200 h-4 w-16 rounded" />
        </div>
        <ul className="flex flex-col gap-2 pr-4">
          <li className="flex justify-between">
            <div className="bg-gray-200 h-3 w-20 rounded" />
            <div className="bg-gray-200 h-3 w-10 rounded" />
          </li>
          <li className="flex justify-between">
            <div className="bg-gray-200 h-3 w-20 rounded" />
            <div className="bg-gray-200 h-3 w-10 rounded" />
          </li>
        </ul>
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <div className="bg-gray-200 h-4 w-12 rounded" />
            <div className="bg-gray-200 h-4 w-12 rounded" />
          </div>
          <div className="bg-gray-200 h-4 w-12 rounded" />
        </div>
      </div>
    );
  }
  