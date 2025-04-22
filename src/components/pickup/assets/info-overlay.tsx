'use client'
import Overlay from "@/src/components/pickup/assets/overlay";
import BranchInfoDisplay from "../header/branch-info-overlay-data";
import { useState } from "react";
import { Info } from "@/src/components/pickup/header/assets/icons";

interface BranchInfoData {
  branchLogo: string;
  title: any; 
  description: string;
  workingHours: any; 
  location: any; 
  lang: string;
}

interface InfoOverlayProps {
  branchInfo: BranchInfoData;
}

export default function InfoOverlay({ branchInfo }: InfoOverlayProps) {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  
  const hideOverlay = (): void => {
    setOverlayVisible(false);
  };
  
  return (
    <>
      <p onClick={() => {setOverlayVisible(true)}}>
        <Info />
      </p>
      <Overlay isVisible={overlayVisible} onClose={hideOverlay}>
        <BranchInfoDisplay
          branchLogo={branchInfo.branchLogo}
          title={branchInfo.title}
          description={branchInfo.description}
          workingHours={branchInfo.workingHours}
          location={branchInfo.location}
          lang={branchInfo.lang}
        />
      </Overlay>
    </>
  );
}