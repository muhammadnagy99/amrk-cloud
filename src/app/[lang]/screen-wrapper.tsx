import { WrapperProps } from "@/src/interfaces/interfaces";
import Image from "next/image";
import BG from "@/public/background.png";

export default function ScreenWrapper({ children }: WrapperProps) {
  return (
    <>
      <Image
        className="absolute top-0 w-full"
        src={BG}
        width={390}
        height={144}
        alt="Menu-Background"
        priority={true}
        quality={100}
      />
      <main className="flex flex-col w-[88%] relative py-8">
        {children}
      </main>
    </>
  );
}
