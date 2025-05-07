"use client";

import Image from "next/image";
import ProfileFallback from "@/public/profile.png";
import BranchInfo from "./assets/branch-info";
import InfoOverlay from "../assets/info-overlay";
import TableInfo from "./assets/table-info";
import BranchNameStorage from "../table-reservation/branch-strorage";

interface BranchDetailsUIProps {
  branchData: any;
  lang: string;
  type: number;
  tableId: string | null;
}

export default function BranchDetailsUI({ 
  branchData, 
  lang, 
  type, 
  tableId 
}: BranchDetailsUIProps) {
  const { branchInfo, branchScheduleInfo } = branchData;
  
  const overlayData = {
    branchLogo: branchInfo.logo || "",
    title: branchInfo.title,
    description: branchInfo.description,
    workingHours: branchScheduleInfo.workingHours,
    location: branchScheduleInfo.location.geopoint,
    lang: lang
  };
  
  return (
    <div className="flex flex-col gap-2">
      <BranchNameStorage branchName={branchInfo.title} />
      
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
          <BranchInfo 
            title={branchInfo.title} 
            description={branchInfo.description} 
            lang={lang} 
          />
          <InfoOverlay branchInfo={overlayData} />
        </div>
      </div>
      
      {/* Only render TableInfo if type is 1 and pass the tableId */}
      {type === 1 && tableId && <TableInfo table={tableId} total={34} lang={lang} />}
    </div>
  );
}