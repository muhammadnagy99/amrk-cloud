import { transformBranchData } from "@/src/lib/branch-data-transform";
import { getBranchIdFromCookies, getTableFromCookies } from "@/src/lib/get-branch";
import BranchDataManager from "./BranchDataManager";

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
  }
  
  if (!brnid) return null;
  
  // Fetch fresh data from API
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
  const transformedData = transformBranchData(data, lang);
  
  const branchData = {
    branchId: brnid,
    branchInfo: transformedData.branchInfo,
    branchScheduleInfo: transformedData.branchScheduleInfo,
    technicalInfo: transformedData.technicalInfo
  };
  
  // Pass all data to the client component
  return (
    <BranchDataManager 
      initialBranchData={branchData} 
      lang={lang} 
      type={type} 
      tableId={tableId} 
    />
  );
}