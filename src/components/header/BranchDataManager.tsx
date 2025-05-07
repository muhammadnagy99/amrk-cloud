"use client";

import { useEffect, useState } from "react";
import BranchDetailsUI from "./BranchDetailsUI";

interface BranchDataManagerProps {
  initialBranchData: any;
  lang: string;
  type: number;
  tableId: string | null;
}

export default function BranchDataManager({
  initialBranchData,
  lang,
  type,
  tableId
}: BranchDataManagerProps) {
  const [branchData, setBranchData] = useState(initialBranchData);
  
  const PRE = type === 1 ? 'dine-in' : 'pick-up';
  
  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${PRE}-branchdata`)) {
        localStorage.removeItem(key);
        i--;
      }
    }
    
    // Store the branch data in localStorage
    if (initialBranchData) {
      localStorage.setItem(
        `${PRE}-branchData-${initialBranchData.branchId}`,
        JSON.stringify({
          ...initialBranchData,
          timestamp: Date.now() // Add timestamp for cache invalidation
        })
      );
    }
    
    // If we have new data from server, update our state
    if (initialBranchData && initialBranchData.branchId) {
      setBranchData(initialBranchData);
    }
  }, [initialBranchData]);
  
  return (
    <BranchDetailsUI
      branchData={branchData}
      lang={lang}
      type={type}
      tableId={tableId}
    />
  );
}