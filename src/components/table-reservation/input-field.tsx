import React, { useState, ChangeEvent } from 'react';

export interface InputFieldProps {
    label: string;
    value?: string;
    lang?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export default function InputFieldRegular({ 
    label,
    value = '',
    lang = 'en',
    placeholder = '',
    onChange
}: InputFieldProps) {
    const [inputValue, setInputValue] = useState(value);
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };
    
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center border border-[#00000033] rounded-lg h-12 px-4 justify-between">
                <div className="flex flex-row gap-4 w-[95%] justify-center items-center relative">
                    <div className="w-full">
                        <input
                            type="text"
                            value={inputValue}
                            placeholder={label}
                            onChange={handleChange}
                            className="w-full bg-transparent outline-none font-light text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}