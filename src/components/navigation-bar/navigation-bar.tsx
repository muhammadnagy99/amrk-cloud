'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { INavBar } from "@/src/interfaces/interfaces";
import { BackArrow } from "../product-page/icons";
import Link from "next/link";

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
  </div>
);

const DIRS: Record<number, string> = {1: 'dine-in', 2: 'pick-up'}

export default function NavBar({ text, lang, type }: INavBar) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBackClick = (e: React.MouseEvent) => {
    setLoading(true);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="flex flex-row justify-start gap-4 items-center">
        <Link href={`/${DIRS[type]}`} onClick={handleBackClick} className={`${lang === 'en' ? 'rotate-180' : ''}`}>
          <BackArrow />
        </Link>
        <h2 className="font-medium text-sm text-black">{text}</h2>
      </div>
    </>
  );
}
