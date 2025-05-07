import { OverlayWrapperProps } from "@/src/interfaces/interfaces";
import CloseBtn from "./close-btn";

export default function Wrapper({ children, onClose }: OverlayWrapperProps) {
  return (
    <div className="flex-col fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[434px] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-4 flex justify-center items-center z-[1000] rounded-lg gap-3">
      <span className="py-6 w-full">
        <CloseBtn onClick={onClose} />
      </span>
      {children}
    </div>
  );
}
