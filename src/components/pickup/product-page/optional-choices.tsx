'use client'

import { OptionalChoicesProps } from "@/src/interfaces/interfaces";
import { OptionalLabel, OptionalLabel_EN } from "./icons";
import { RiyalCurrency } from "../basket-page/icons";

export default function OptionalChoices({ lang, title, name, options, onToggle }: OptionalChoicesProps) {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <fieldset className="w-[88%] flex flex-col justify-start">
        <legend className="w-full flex flex-row justify-between">
          <p className="text-black font-medium text-base">{title}</p>
          {lang === 'ar' ? <OptionalLabel />: <OptionalLabel_EN />} 
        </legend>

        {options.map((option, index) => (
          <div key={index} className="py-3 border-b border-gray-300">
            <label className="flex flex-row justify-between items-center">
              <p className="text-black text-[13px] font-normal">{option.label}</p>
              <div className="flex flex-row gap-4 items-center">
                {option.extraPrice && (
                  <span className="flex flex-row gap-1 text-xs font-normal">+ {option.extraPrice} {lang === 'ar' ? <RiyalCurrency color="black" /> : <p>SAR</p>}
</span>
                )}
                <input type="checkbox" name={name} value={option.value} onChange={() => onToggle(name, option.value)}
                />
              </div>
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
