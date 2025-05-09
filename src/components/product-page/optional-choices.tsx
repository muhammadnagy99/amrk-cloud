'use client'

import { OptionalChoicesProps } from "@/src/interfaces/interfaces";
import { OptionalLabel, OptionalLabel_EN } from "./icons";
import { RiyalCurrency } from "../basket-page/icons";
import { useEffect, useState } from "react";

// Extend the OptionalChoicesProps to include selectedValues
interface ExtendedOptionalChoicesProps extends OptionalChoicesProps {
  selectedValues?: string[]; // Optional prop for the pre-selected values
}

export default function OptionalChoices({ 
  lang, 
  title, 
  name, 
  options, 
  onToggle,
  selectedValues = [] 
}: ExtendedOptionalChoicesProps) {
  // Local state to track the selected values
  const [selected, setSelected] = useState<string[]>(selectedValues);

  // Update local state when selectedValues prop changes
  useEffect(() => {
    if (selectedValues && selectedValues.length > 0) {
      setSelected(selectedValues);
    }
  }, [selectedValues]);

  // Handler for when an option is toggled
  const handleToggle = (title: string, name: string, value: string) => {
    let newSelected: string[];
    
    if (selected.includes(value)) {
      // Remove from selection
      newSelected = selected.filter(v => v !== value);
    } else {
      // Add to selection
      newSelected = [...selected, value];
    }
    
    setSelected(newSelected);
    onToggle(title, name, value);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <fieldset className="w-[88%] flex flex-col justify-start">
        <legend className="w-full flex flex-row justify-between">
          <p className="text-black font-medium text-base">{title}</p>
          {lang === 'ar' ? <OptionalLabel /> : <OptionalLabel_EN />}
        </legend>
        
        {options.map((option, index) => (
          <div key={index} className="py-3 border-b border-gray-300">
            <label className="flex flex-row justify-between items-center">
              <p className="text-black text-[13px] font-normal">{option.label}</p>
              <div className="flex flex-row gap-4 items-center">
                {option.extraPrice && (
                  <span className="flex flex-row gap-1 text-xs font-normal">+ {option.extraPrice} {<RiyalCurrency color="black" />} </span>
                )}
                <input 
                  type="checkbox" 
                  name={name} 
                  value={option.value} 
                  checked={selected.includes(option.value)}
                  onChange={() => handleToggle(title, name, option.value)}
                />
              </div>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}