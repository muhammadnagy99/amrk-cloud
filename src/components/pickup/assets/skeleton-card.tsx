export default function SkeletonCard() {
    return (
      <div className="animate-pulse flex flex-col gap-2 ">
        <div className="bg-gray-200 rounded-lg w-[106px] h-[80px]" />
        <div className="bg-gray-200 h-3 w-24 rounded" />
        <div className="bg-gray-200 h-3 w-20 rounded" />
        <div className="bg-gray-200 h-3 w-16 rounded" />
      </div>
    );
  }
  