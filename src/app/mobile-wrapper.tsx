import { WrapperProps } from "@/src/interfaces/interfaces";

export default function MobileWrapper({ children }: WrapperProps){
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[420px] min-h-screen bg-white shadow-lg flex justify-center relative">
        {children}
      </div>
    </div>
  );
};
