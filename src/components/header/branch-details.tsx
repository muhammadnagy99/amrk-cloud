import Image from "next/image";
import Profile from "@/public/profile.png";
import { Info } from "./assets/icons";
import BranchInfo from "./assets/branch-info";

export default function BranchDetails() {
  return (
    <div className="w-full max-h-90 flex flex-row gap-3 p-3 bg-white rounded-lg">
      <Image
        className="rounded-lg w-[20%]"
        src={Profile}
        width={59}
        height={59}
        alt="restaurant-logo"
        priority={true}
        quality={90}
      />
      <div className="flex flex-row justify-between w-[80%]">
        <BranchInfo />
        <Info />
      </div>
    </div>
  );
}
