'use client'

import { useState, useEffect } from 'react';
import Image from "next/image";
import ProfileFallback from "@/public/profile.png";

import ActiveStatus from './assets/active-status';
import MapComponent from '../assets/google-map';
import { Clock } from './assets/icons';


// TypeScript interfaces
interface Hour {
  from: string;
  to: string;
}

interface WorkingHourDay {
  hours: Hour[];
  is_close: boolean;
  id: number;
  day: string;
}

interface Location {
  _latitude: number;
  _longitude: number;
  label?: string;
}

interface Props {
  branchLogo?: string | null;
  title?: string;
  description?: string;
  workingHours: WorkingHourDay[];
  location?: Location;
  lang?: string;
}

interface TranslationType {
  workingHoursTitle: string;
  days: {
    [key: string]: string;
  };
  closed: string;
  openNow: string;
  closedNow: string;
  branchInfo: string;
  location: string;
}

const translations: Record<string, TranslationType> = {
  ar: {
    workingHoursTitle: "ساعات عمل الفرع",
    days: {
      Saturday: "السبت",
      Sunday: "الأحد",
      Monday: "الإثنين",
      Tuesday: "الثلاثاء",
      Wednesday: "الأربعاء",
      Thursday: "الخميس",
      Friday: "الجمعة"
    },
    closed: "مغلق",
    openNow: "مفتوح الآن",
    closedNow: "مغلق الآن",
    branchInfo: "معلومات الفرع",
    location: "الموقع"
  },
  en: {
    workingHoursTitle: "Branch Working Hours",
    days: {
      Saturday: "Saturday",
      Sunday: "Sunday",
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday"
    },
    closed: "Closed",
    openNow: "Open Now",
    closedNow: "Closed Now",
    branchInfo: "Branch Information",
    location: "Location"
  }
};

export default function BranchInfoDisplay({
  branchLogo = null,
  title = "",
  description = "",
  workingHours = [],
  location = { _latitude: 24.7136, _longitude: 46.6753 },
  lang = "ar"
}: Props) {
  const [isCurrentlyOpen, setIsCurrentlyOpen] = useState<boolean>(false);
  const t: TranslationType = translations[lang] || translations.ar;

  useEffect(() => {
    checkIfBranchIsOpen();
    // Check every minute
    const interval = setInterval(checkIfBranchIsOpen, 60000);
    return () => clearInterval(interval);
  }, [workingHours]);

  const checkIfBranchIsOpen = (): void => {
    if (!workingHours || workingHours.length === 0) {
      setIsCurrentlyOpen(false);
      return;
    }

    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Find the current day in working hours
    const todaySchedule = workingHours.find(day => day.day === currentDay);

    if (!todaySchedule || todaySchedule.is_close) {
      setIsCurrentlyOpen(false);
      return;
    }

    // Check if current time is within any of the hour ranges
    let isOpen = false;
    todaySchedule.hours.forEach(hourRange => {
      const fromParts = hourRange.from.match(/(\d+):(\d+)\s*([AP]M)/);
      const toParts = hourRange.to.match(/(\d+):(\d+)\s*([AP]M)/);

      if (fromParts && toParts) {
        let fromHour = parseInt(fromParts[1]);
        const fromMinute = parseInt(fromParts[2]);
        const fromAmPm = fromParts[3];

        let toHour = parseInt(toParts[1]);
        const toMinute = parseInt(toParts[2]);
        const toAmPm = toParts[3];

        // Convert to 24-hour format
        if (fromAmPm === 'PM' && fromHour < 12) fromHour += 12;
        if (fromAmPm === 'AM' && fromHour === 12) fromHour = 0;
        if (toAmPm === 'PM' && toHour < 12) toHour += 12;
        if (toAmPm === 'AM' && toHour === 12) toHour = 0;

        const fromTime = fromHour * 60 + fromMinute;
        const toTime = toHour * 60 + toMinute;
        const currentTime = currentHour * 60 + currentMinute;

        if (currentTime >= fromTime && currentTime <= toTime) {
          isOpen = true;
        }
      }
    });

    setIsCurrentlyOpen(isOpen);
  };

  const formatHours = (day: WorkingHourDay): React.ReactNode => {
    if (day.is_close || day.hours.length === 0) {
      return t.closed;
    }

    return day.hours.map((hourRange, idx) => (
      <bdi key={idx} className="hour-range">
        {hourRange.from} - {hourRange.to}
      </bdi>
    )).reduce((prev, curr, idx) => {
      return idx === 0 ? [curr] : [...prev, ', ', curr];
    }, [] as React.ReactNode[]);
  };

  const textDirection = lang === 'ar' ? 'rtl' : 'ltr';
  const alignClass = lang === 'ar' ? 'text-right' : 'text-left';

  return (
    <div
      className={`bg-white w-full overflow-y-auto`}
      dir={textDirection}
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row items-center gap-4 w-full">
          <div className="rounded-lg w-[20%] min-w-[59px]">
            {branchLogo ? (
              <Image
                src={branchLogo}
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
          <div className="flex-1">
            <h3 className={`font-medium ${alignClass}`}>{title}</h3>
            {description && <p className={`text-sm text-gray-600 ${alignClass}`}>{description}</p>}
            {/* <div className={`text-sm mt-1 ${isCurrentlyOpen ? 'text-green-600' : 'text-red-600'} font-medium`}>
              {isCurrentlyOpen ? t.openNow : t.closedNow}
            </div> */}
            <ActiveStatus lang={lang} />

          </div>
        </div>

        <div className="w-full h-px bg-gray-200 my-2"></div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Clock />
            <h3 className={`text-sm font-medium ${alignClass}`}>{t.workingHoursTitle}</h3>
          </div>

          <div className="space-y-1">
            {workingHours.map((schedule, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="text-sm">{t.days[schedule.day]}</div>
                <div className={`text-sm ${schedule.is_close ? 'text-red-500' : 'text-gray-700'}`}>
                  {formatHours(schedule)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gray-200 my-2"></div>

        <div className="flex flex-col gap-2">
          <h3 className={`text-sm font-medium ${alignClass}`}>{t.location}</h3>
          <div className="h-58 w-full rounded-lg overflow-hidden border border-gray-200">
            <MapComponent
              locations={[location]}
              zoom={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
}