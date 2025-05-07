"use client";

import { useEffect, useState } from "react";
import MapComponent from "../assets/google-map";
import { PhoneIcon } from "./icons";

type BranchDetailsProps = {
  lang: string;
  type: number;
};

interface Location {
  _latitude: number;
  _longitude: number;
  label?: string;
}

const TEXTS: Record<string, { title: string; contact: string }> = {
  ar: {
    title: "بيانات الفرع",
    contact: "تواصل مع الفرع",
  },
  en: {
    title: "Branch Information",
    contact: "Contact the Branch",
  },
};

export default function BranchDetails({ lang, type }: BranchDetailsProps) {
  const t = TEXTS[lang] || TEXTS["en"];
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const PRE = type === 1 ? 'dine-in' : 'pick-up';

  useEffect(() => {
    const getBranchDataFromLocalStorage = () => {
      try {
        const keys = Object.keys(localStorage);
        
        const branchDataKey = keys.find(key => key.startsWith(`${PRE}-branchData-`));
        
        if (branchDataKey) {
          const storedData = localStorage.getItem(branchDataKey);
          
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            
            if (parsedData.branchScheduleInfo?.location?.geopoint) {
              setLocation(parsedData.branchScheduleInfo.location.geopoint);
            }
          }
        }
      } catch (error) {
        console.error("Error retrieving branch data from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the function to get data from localStorage
    getBranchDataFromLocalStorage();
  }, []);

  if (!location) {
    return (
     <></>
    );
  }

  return (
    <div className="flex flex-col w-full text-black gap-4.5">
      <h2 className="text-base font-medium">{t.title}</h2>
      
      <div className="h-58 w-full rounded-lg overflow-hidden border border-gray-200">
        <MapComponent
          locations={[location]} 
          zoom={15}
        />
      </div>
      
      <button className="flex justify-start items-center w-full gap-4 px-4 py-3 bg-white border border-[#00000033] rounded-lg">
        <PhoneIcon />
        <span className="text-sm font-normal">{t.contact}</span>
      </button>
    </div>
  );
}