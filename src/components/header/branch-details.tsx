import Image from "next/image";
import ProfileFallback from "@/public/profile.png";
import { Info } from "./assets/icons";
import BranchInfo from "./assets/branch-info";
import { transformBranchData } from "@/src/lib/branch-data-transform";
import { getBranchIdFromCookies, getTableFromCookies } from "@/src/lib/get-branch";
import InfoOverlay from "../assets/info-overlay";
import TableInfo from "./assets/table-info";

type Props = {
  lang: string;
  type: number;
};

export default async function BranchDetails({ lang, type }: Props) {
  const brnid = await getBranchIdFromCookies(type);
  
  // Get tableId only if type is 1
  let tableId = null;
  if (type === 1) {
    tableId = await getTableFromCookies();
    console.log(tableId);
  }
  
  console.log(type);
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
  
  const branchData = {
    branchLogo: branchInfo.logo || "",
    title: branchInfo.title,
    description: branchInfo.description,
    workingHours: branchScheduleInfo.workingHours,
    location: branchScheduleInfo.location.geopoint,
    lang: lang
  };
  
  return (
    <div className="flex flex-col gap-2">
      
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
      
      {/* Only render TableInfo if type is 1 and pass the tableId */}
      {type === 1 && tableId && <TableInfo table={tableId} total={34} lang={lang} />}
    </div>
  );
}