import React, { useState } from 'react';
import { RiyalCurrency } from '../basket-page/icons';

// Define types for better TypeScript support
interface ContentTextItem {
    title: string;
    optional: string;
    customInput: string;
}

interface ContentTextType {
    en: ContentTextItem;
    ar: ContentTextItem;
}

type TipIndex = number | 'custom' | null;

const contentText: ContentTextType = {
    en: {
        title: "Thank The Restaurant With A Tip",
        optional: "Optional",
        customInput: "Enter a number"
    },
    ar: {
        title: "اشكر المطعم بدفع إكرامية",
        optional: "اختياري",
        customInput: "اكتب رقم محدد"
    }
};

interface TipSelectorProps {
    lang: string;
    tipValues: number[]
    onSelectTip: (amount: number | string | null) => void;
}

const TipSelector: React.FC<TipSelectorProps> = ({ lang, tipValues, onSelectTip }) => {
    const [selectedTip, setSelectedTip] = useState<TipIndex>(null);
    const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
    const [customTipValue, setCustomTipValue] = useState<string>('');

    // Get the appropriate text content based on language
    const text = contentText[lang as keyof ContentTextType] || contentText.en;
    const isRTL = lang === 'ar';

    const handleTipSelect = (index: TipIndex): void => {
        if (selectedTip === index) {
            setSelectedTip(null);
            setShowCustomInput(false);
            if (selectedTip) {
                setSelectedTip(null);
                onSelectTip(null)
            }
            return;
        }
        if (index === 'custom') {
            setShowCustomInput(true);
            setSelectedTip('custom');
            onSelectTip(customTipValue ? parseFloat(customTipValue) : 0);            
        } else if (typeof index === 'number') {
            setShowCustomInput(false);
            setSelectedTip(index);
            onSelectTip(tipValues[index]);
        }
    };

    const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCustomTipValue(value);
        
        if (selectedTip === 'custom') {
            if (!value) {
                onSelectTip(0);
            } else {
                const numericValue = parseFloat(value);
                onSelectTip(isNaN(numericValue) ? value : numericValue);
            }
        }
    };

    return (
        <div>
            <div
                className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                <div className="w-full flex justify-between items-center mb-4">
                    <h2 className="text-base font-medium">{text.title}</h2>
                    <span className="text-black rounded-[4px] text-[10px] p-1 bg-[#00000019]">{text.optional}</span>
                </div>

                <div className="flex gap-3 w-full">
                    {tipValues.map((tip, index) => (
                        <button
                            key={index}
                            onClick={() => handleTipSelect(index)}
                            className={`h-9 w-14 rounded-md text-xs gap-1 flex items-center justify-center border border-[#00000033] transition-colors ${selectedTip === index ? 'bg-[#B0438A] text-white' : 'text-black'
                                }`}
                            dir='ltr'
                        >
                            <RiyalCurrency color={`${selectedTip === index ? 'white' : 'black'}`} />
                            {tip}
                        </button>
                    ))}

                    <button
                        onClick={() => handleTipSelect('custom')}
                        className={`h-9 max-w-[100px] border border-[#00000033] text-xs rounded-md flex-1 transition-colors ${selectedTip === 'custom' ? 'bg-[#B0438A] text-white' : ' text-black'
                            }`}
                    >
                        {text.customInput}
                    </button>
                </div>

                {showCustomInput && (
                    <div className="mt-3 w-full">
                        <input
                            type="number"
                            value={customTipValue}
                            onChange={handleCustomTipChange}
                            placeholder={text.customInput}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none text-xs"
                            min="0"

                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TipSelector;