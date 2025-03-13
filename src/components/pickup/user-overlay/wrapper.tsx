import { WrapperProps } from "@/src/interfaces/interfaces";
import CloseBtn from "./close-btn";

export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex-col fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] px-6 flex justify-center items-center z-50 rounded-lg gap-3">

      <p className="py-6 w-full">
        <CloseBtn />
      </p>
      {children}
    </div>
  );
}
