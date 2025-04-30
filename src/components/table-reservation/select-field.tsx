import React, { useState } from 'react';

export interface SelectFieldProps {
    label: string;
    icon: React.FC;
    value: string;
    options: { value: string; label: string }[];
    onChange?: (value: string) => void;
    disabled?: boolean;
    lang: string;
}

export default function SelectFieldDisplay({
    label,
    icon: Icon,
    value,
    options,
    onChange,
    disabled = false,
    lang
}: SelectFieldProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (optionValue: string) => {
        if (onChange) {
            onChange(optionValue);
        }
        setIsOpen(false);
    };

    // Find the label for the current value
    const selectedLabel = options.find(option => option.value === value)?.label || '';

    return (
        <div className="relative">
            <div
                className={`flex items-center border border-[#00000033] rounded-lg h-12 px-4 justify-between cursor-pointer ${disabled ? 'opacity-50' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <div className="flex flex-row gap-4 w-[95%] justify-center items-center relative">
                    {Icon && <Icon />}
                    <div className="w-full">
                        <label className={`absolute text-[#00000099] text-[8px] font-light top-0 ${lang === 'en' ? 'left-5' : 'right-5'}`}>
                            {label}
                        </label>
                        <div className="w-full bg-transparent outline-none mt-3 font-light text-sm">
                            {selectedLabel}
                        </div>
                    </div>
                </div>
                <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.364 5.29344C14.1764 5.10597 13.9221 5.00065 13.657 5.00065C13.3918 5.00065 13.1375 5.10597 12.95 5.29344L7.99995 10.2434L3.04995 5.29344C2.86135 5.11128 2.60875 5.01049 2.34655 5.01276C2.08435 5.01504 1.83354 5.12021 1.64813 5.30562C1.46272 5.49103 1.35756 5.74184 1.35528 6.00404C1.353 6.26623 1.45379 6.51884 1.63595 6.70744L7.29295 12.3644C7.48048 12.5519 7.73479 12.6572 7.99995 12.6572C8.26512 12.6572 8.51942 12.5519 8.70695 12.3644L14.364 6.70744C14.5514 6.51991 14.6567 6.2656 14.6567 6.00044C14.6567 5.73528 14.5514 5.48097 14.364 5.29344Z" fill="#B0438A" />
                    </svg>
                </div>
            </div>

            {isOpen && !disabled && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-[#00000033] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${option.value === value ? 'bg-gray-50 font-medium' : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}