'use client'

import { RequiredChoicesProps } from "@/src/interfaces/interfaces";
import { RequiredLabel, RequiredLabel_EN } from "./icons";
import { RiyalCurrency } from "../basket-page/icons";
import { useEffect, useState } from "react";

// Extend the RequiredChoicesProps to include selectedValue
interface ExtendedRequiredChoicesProps extends RequiredChoicesProps {
  selectedValue?: string; // Optional prop for the pre-selected value
}

export default function RequiredChoices({ 
  lang, 
  title, 
  name, 
  options, 
  onChange,
  selectedValue 
}: ExtendedRequiredChoicesProps) {
  // Local state to track the selected value
  const [selected, setSelected] = useState<string | undefined>(selectedValue);

  // Update local state when selectedValue prop changes
  useEffect(() => {
    if (selectedValue) {
      setSelected(selectedValue);
    }
  }, [selectedValue]);

  // Handler for when an option is selected
  const handleChange = (title: string, name: string, value: string) => {
    setSelected(value);
    onChange(title, name, value);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <fieldset className="w-[88%] flex flex-col justify-start">
        <legend className="w-full flex flex-row justify-between">
          <p className="text-black font-medium text-base">{title}</p>
          {lang === 'ar' ? <RequiredLabel /> : <RequiredLabel_EN />}
        </legend>
        
        {options.map((option, index) => (
          <div key={index} className="py-3 border-b border-gray-300">
            <label className="flex flex-row justify-between items-center">
              <p className="text-black text-[13px] font-normal">{option.label}</p>
              {option.extraPrice ? (
                <div className="flex flex-row gap-4 items-center">
                  <span className="flex flex-row gap-1 text-xs font-normal">+ {option.extraPrice} {<RiyalCurrency color="black" />}</span>
                  <input 
                    type="radio" 
                    name={name} 
                    value={option.value} 
                    checked={selected === option.value}
                    onChange={() => handleChange(title, name, option.value)} 
                  />
                </div>
              ) : (
                <input 
                  type="radio" 
                  name={name} 
                  value={option.value} 
                  checked={selected === option.value}
                  onChange={() => handleChange(title, name, option.value)} 
                />
              )}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}