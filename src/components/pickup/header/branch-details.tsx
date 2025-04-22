import Image from "next/image";
import ProfileFallback from "@/public/profile.png";
import { Info } from "./assets/icons";
import BranchInfo from "./assets/branch-info";
import { transformBranchData } from "@/src/lib/branch-data-transform";
import { getBranchIdFromCookies } from "@/src/lib/get-branch";
import InfoOverlay from "../assets/info-overlay";

type Props = {
  lang: string;
};

export default async function BranchDetails({ lang }: Props) {
  const brnid = await getBranchIdFromCookies();
  
  if (!brnid) return null;
  
  const res = await fetch("https://api.amrk.app/amrkCloudWeb/branchInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer Token", // Replace this securely
    },
    body: JSON.stringify({ branchId: brnid }),
    cache: "no-store",
  });
  
  if (!res.ok) {
    console.error("Failed to fetch branch data");
    return null;
  }
  
  const data = await res.json();
  const { branchInfo, branchScheduleInfo, technicalInfo } = transformBranchData(data, lang);
  
  console.log(branchScheduleInfo.location);
  // Create a branchData object for InfoOverlay component
  const branchData = {
    branchLogo: branchInfo.logo || "",
    title: branchInfo.title,
    description: branchInfo.description,
    workingHours: branchScheduleInfo.workingHours,
    location: branchScheduleInfo.location.geopoint,
    lang: lang
  };
  
  return (
    <div className="w-full max-h-90 flex flex-row gap-3 p-3 bg-white rounded-lg border-widget">
      <div className="rounded-lg w-[20%]">
        {branchInfo.logo ? (
          <Image
            src={branchInfo.logo}
            alt="branch-logo"
            width={59}
            height={59}
            className="rounded-lg w-full h-auto object-cover"
          />
        ) : (
          <Image
            src={ProfileFallback}
            alt="fallback-logo"
            width={59}
            height={59}
            className="rounded-lg w-full h-auto object-cover"
          />
        )}
      </div>
      
      <div className="flex flex-row justify-between w-[80%]">
        <BranchInfo title={branchInfo.title} description={branchInfo.description} lang={lang} />
        <InfoOverlay branchInfo={branchData} />
      </div>
    </div>
  );
}