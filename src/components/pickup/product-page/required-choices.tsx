'use client'

import { RequiredChoicesProps } from "@/src/interfaces/interfaces";
import { RequiredLabel, RequiredLabel_EN } from "./icons";
import { RiyalCurrency } from "../basket-page/icons";



export default function RequiredChoices({ lang, title, name, options, onChange }: RequiredChoicesProps) {
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
                  <span className="flex flex-row gap-1 text-xs font-normal">+ {option.extraPrice} {lang === 'ar' ? <RiyalCurrency color="black" /> : <p>SAR</p>}</span>
                  <input type="radio" name={name} value={option.value} onChange={() => onChange(name, option.value)} />
                </div>
              ) : (
                <input type="radio" name={name} value={option.value} onChange={() => onChange(name, option.value)} />
              )}
            </label>
          </div>
        ))}
      </fieldset>
    </div>
  );
}
