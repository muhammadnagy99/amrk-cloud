'use client'

import { BackArrow } from "../product-page/icons";

interface BasketNavBarProps {
  text: string;
  lang: string;
  onClose: () => void; // Function to close the overlay
}

const CleintNavBar = ({ text, lang, onClose }: BasketNavBarProps) => {
  return (
    <div className="flex flex-row justify-start gap-4 items-center">
      <button 
        onClick={onClose} 
        className={`${lang === 'en' ? 'rotate-180' : ''}`}
        aria-label="Close basket"
      >
        <BackArrow />
      </button>
      <h2 className="font-medium text-sm text-black">{text}</h2>
    </div>
  );
};

export default CleintNavBar;