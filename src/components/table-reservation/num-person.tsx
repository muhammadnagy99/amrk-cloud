import React, { useState } from 'react';

// Define the type for the component props
interface NumPersonsProps {
  lang: string;
  initialValue?: number;
  onChange: (value: number) => void;
}

// Define the translations
const translations: Record<string, any> = {
  ar: {
    title: 'عدد الأشخاص'
  },
  en: {
    title: 'Number of Persons'
  }
};

const NumPersons: React.FC<NumPersonsProps> = ({ 
  lang = 'en', 
  initialValue = 1, 
  onChange 
}) => {
  // State to track the current number of persons
  const [count, setCount] = useState<number>(initialValue);
  
  // Handler for decreasing the count
  const handleDecrease = () => {
    if (count > 1) {
      const newValue = count - 1;
      setCount(newValue);
      onChange(newValue);
    }
  };
  
  // Handler for increasing the count
  const handleIncrease = () => {
    const newValue = count + 1;
    setCount(newValue);
    onChange(newValue);
  };

  return (
    <div className={`flex items-center justify-between h-[68px] px-3 border-widget rounded-lg`}>
      <div className="text-base">
        {translations[lang].title}
      </div>
      <div className={`${lang === 'en' ? 'flex flex-row-reverse': 'flex'} items-center gap-4 bg-[#F9F9F9] py-0.5 rounded-lg`}>
        <button
          onClick={handleIncrease}
          className="flex items-center justify-center w-8 h-8"
        >
          <span className="text-2xl text-[#B0438A]">+</span>
        </button>
        <span className="text-base w-2">{count}</span>
        <button
          onClick={handleDecrease}
          disabled={count <= 1}
          className="flex items-center justify-center w-8 h-8 disabled:text-gray-100"
        >
          <span className="text-2xl text-[#B0438A]">−</span>
        </button>
      </div>
    </div>
  );
};

export default NumPersons;