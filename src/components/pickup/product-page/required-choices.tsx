'use client'

import { RequiredChoicesProps } from "@/src/interfaces/interfaces";
import { RequiredLabel } from "./icons";



export default function RequiredChoices({ title, name, options, onChange }: RequiredChoicesProps) {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <fieldset className="w-[88%] flex flex-col justify-start">
        <legend className="w-full flex flex-row justify-between">
          <p className="text-black font-medium text-base">{title}</p>
          <RequiredLabel />
        </legend>

        {options.map((option, index) => (
          <div key={index} className="py-3 border-b border-gray-300">
            <label className="flex flex-row justify-between items-center">
              <p className="text-black text-[13px] font-normal">{option.label}</p>
              {option.extraPrice ? (
                <div className="flex flex-row gap-4 items-center">
                  <span className="text-xs font-normal">+ {option.extraPrice} رس</span>
                  <input type="radio" name={name} value={option.value}  onChange={() => onChange(name, option.value)}/>
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
