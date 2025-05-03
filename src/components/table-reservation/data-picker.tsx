// DatePicker.tsx
import React, { useState, useRef, useEffect, ReactNode } from 'react';
import Overlay from '../assets/overlay';

// Define supported languages
type SupportedLanguage = 'en' | 'ar';

// Language configuration interface
interface LanguageConfig {
    placeholder: string;
    direction: 'ltr' | 'rtl';
    locale: string;
}

// Language configurations
const LANGUAGE_CONFIG: Record<string, LanguageConfig> = {
    en: {
        placeholder: 'Select date',
        direction: 'ltr',
        locale: 'en-US'
    },
    ar: {
        placeholder: 'اختر التاريخ',
        direction: 'rtl',
        locale: 'ar'
    }
};

interface DatePickerProps {
    onDateChange: (date: Date) => void;
    initialDate?: Date | null;
    lang: string;
}

const RightArrow: React.FC = () => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.53998 6.28955L1.87998 0.639548C1.78702 0.54582 1.67642 0.471426 1.55456 0.420657C1.4327 0.369888 1.30199 0.34375 1.16998 0.34375C1.03797 0.34375 0.907264 0.369888 0.785405 0.420657C0.663546 0.471426 0.552945 0.54582 0.459982 0.639548C0.273731 0.826911 0.169189 1.08036 0.169189 1.34455C0.169189 1.60873 0.273731 1.86219 0.459982 2.04955L5.40998 7.04955L0.459982 11.9995C0.273731 12.1869 0.169189 12.4404 0.169189 12.7045C0.169189 12.9687 0.273731 13.2222 0.459982 13.4095C0.552597 13.504 0.663042 13.5792 0.784917 13.6307C0.906792 13.6822 1.03767 13.709 1.16998 13.7095C1.30229 13.709 1.43317 13.6822 1.55505 13.6307C1.67692 13.5792 1.78737 13.504 1.87998 13.4095L7.53998 7.75955C7.64149 7.66591 7.7225 7.55225 7.7779 7.42576C7.83331 7.29926 7.86191 7.16265 7.86191 7.02455C7.86191 6.88645 7.83331 6.74984 7.7779 6.62334C7.7225 6.49684 7.64149 6.38319 7.53998 6.28955Z" fill="#797B86" />
    </svg>
);

const LeftArrow: React.FC = () => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.500012 7.7998L6.20001 13.3998C6.60001 13.7998 7.20001 13.7998 7.60001 13.3998C8.00001 12.9998 8.00001 12.3998 7.60001 11.9998L2.70001 6.9998L7.60001 1.9998C8.00001 1.5998 8.00001 0.999804 7.60001 0.599804C7.40001 0.399804 7.20001 0.299805 6.90001 0.299805C6.60001 0.299805 6.40001 0.399804 6.20001 0.599804L0.500012 6.1998C0.100012 6.6998 0.100012 7.2998 0.500012 7.7998C0.500012 7.6998 0.500012 7.6998 0.500012 7.7998Z" fill="#797B86" />
    </svg>
)

const Calendar = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.66663 7.50033C1.66663 5.92866 1.66663 5.14366 2.15496 4.65533C2.64329 4.16699 3.42829 4.16699 4.99996 4.16699H15C16.5716 4.16699 17.3566 4.16699 17.845 4.65533C18.3333 5.14366 18.3333 5.92866 18.3333 7.50033C18.3333 7.89283 18.3333 8.08949 18.2116 8.21199C18.0891 8.33366 17.8916 8.33366 17.5 8.33366H2.49996C2.10746 8.33366 1.91079 8.33366 1.78829 8.21199C1.66663 8.08949 1.66663 7.89199 1.66663 7.50033ZM1.66663 15.0003C1.66663 16.572 1.66663 17.357 2.15496 17.8453C2.64329 18.3337 3.42829 18.3337 4.99996 18.3337H15C16.5716 18.3337 17.3566 18.3337 17.845 17.8453C18.3333 17.357 18.3333 16.572 18.3333 15.0003V10.8337C18.3333 10.4412 18.3333 10.2445 18.2116 10.122C18.0891 10.0003 17.8916 10.0003 17.5 10.0003H2.49996C2.10746 10.0003 1.91079 10.0003 1.78829 10.122C1.66663 10.2445 1.66663 10.442 1.66663 10.8337V15.0003Z" fill="#B0438A" />
        <path d="M5.83325 2.5V5M14.1666 2.5V5" stroke="#B0438A" strokeLinecap="round" />
    </svg>
)

const DatePicker: React.FC<DatePickerProps> = ({
    onDateChange,
    initialDate = null,
    lang
}) => {

    const getCurrentDate = (): Date => {
        return new Date();
    };

    // Get the language configuration
    const langConfig = LANGUAGE_CONFIG[lang];
    const { placeholder, direction, locale } = langConfig;
    const rtl = direction === 'rtl';
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);
    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);

    const hideOverlay = (): void => {
        setOverlayVisible(false);
    };

    useEffect(() => {
        if (!initialDate && !selectedDate) {
            setSelectedDate(new Date());
            onDateChange(new Date());
        }
    }, [initialDate, selectedDate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Get days in month
    const getDaysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
    const getFirstDayOfMonth = (year: number, month: number): number => {
        return new Date(year, month, 1).getDay();
    };

    // Format date for display
    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        
        // Format the date using the selected locale
        let formattedDate = date.toLocaleDateString(locale, options);
        
        // If locale is Arabic, ensure the date portion uses Western numerals
        if (locale === 'ar') {
            // Extract numeric parts and convert Arabic numerals to Western numerals
            formattedDate = formattedDate.replace(/[٠-٩]/g, (digit) => {
                return String(('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
            });
        }
        
        return formattedDate;
    };

    // Check if date is in the past
    const isPastDate = (year: number, month: number, day: number): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(year, month, day);
        return checkDate < today;
    };

    // Handle date selection
    const handleDateSelect = (day: number): void => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
        hideOverlay()
        if (onDateChange) {
            onDateChange(newDate);
        }
    };

    // Navigate to previous month
    const prevMonth = (): void => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    // Navigate to next month
    const nextMonth = (): void => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    
    // Ensure numbers are always displayed in English/Western format (0-9)
    const formatToWesternNumber = (num: number): string => {
        return num.toString();
    };
    
    // Format month name with Western numerals for the year
    const formatMonthYearDisplay = (date: Date): string => {
        const monthName = date.toLocaleDateString(locale, { month: 'long' });
        const year = date.getFullYear().toString();
        
        // If in Arabic mode, ensure the year is displayed with Western numerals
        if (locale === 'ar') {
            // Convert any Arabic numerals in the year to Western numerals
            const westernYear = year.replace(/[٠-٩]/g, (digit) => {
                return String(('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
            });
            return `${monthName} ${westernYear}`;
        }
        
        return `${monthName} ${year}`;
    };

    // Render calendar
    const renderCalendar = (): React.ReactElement => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        // Get formatted month and year with proper numerals
        const monthYearDisplay = formatMonthYearDisplay(currentMonth);

        // Day names based on locale (using Gregorian calendar)
        const dayNames: string[] = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(2023, 0, i + 1); // Use a Sunday as the first day
            dayNames.push(date.toLocaleDateString(locale, { weekday: 'short' }));
        }

        // Create calendar grid
        const days: React.ReactNode[] = [];
        const blanks: React.ReactNode[] = [];

        // Add blank spaces for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            blanks.push(<div key={`blank-${i}`} className="h-8 w-8"></div>);
        }

        // Add actual days
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(year, month, d);
            const isSelected = selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear();
            const isPast = isPastDate(year, month, d);

            days.push(
                <div
                    key={d}
                    onClick={isPast ? undefined : () => handleDateSelect(d)}
                    className={`h-8 w-8 flex items-center justify-center rounded-lg font-normal text-base
                    ${isPast
                            ? 'text-gray-300 cursor-not-allowed'
                            : isSelected
                                ? 'bg-[#B0438A] text-white cursor-pointer'
                                : 'hover:bg-gray-200 cursor-pointer'}`}
                >
                    {/* Always use Western numerals for day display */}
                    {formatToWesternNumber(d)}
                </div>
            );
        }

        const totalSlots = [...blanks, ...days];
        const rows: React.ReactNode[][] = [];
        let cells: React.ReactNode[] = [];

        totalSlots.forEach((slot, i) => {
            if (i % 7 !== 0) {
                cells.push(slot);
            } else {
                // Start new row
                if (cells.length > 0) rows.push(cells);
                cells = [slot];
            }

            // Add last row if we reach the end
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        // Remove empty first row if it exists
        if (rows[0] && rows[0].length === 0) {
            rows.shift();
        }

        return (
            <div className="bg-white rounded-lg py-4 w-full" dir={direction}>
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={prevMonth}
                        className="p-1 hover:bg-gray-200 rounded"
                        type="button"
                    >
                        {direction === 'rtl' ? <RightArrow /> : <LeftArrow />}
                    </button>
                    <div className='font-semibold text-[#B0438A] text-base'>
                        {monthYearDisplay}
                    </div>
                    <button
                        onClick={nextMonth}
                        className="p-1 hover:bg-gray-200 rounded"
                        type="button"
                    >
                        {direction === 'rtl' ? <LeftArrow /> : <RightArrow />}
                    </button>
                </div>

                {/* Day names */}
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                    {dayNames.map((day, index) => (
                        <div key={index} className="text-center text-xs text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1 font-normal">
                    {rows.map((row, i) => (
                        <React.Fragment key={i}>
                            {row.map((cell, j) => (
                                <React.Fragment key={j}>{cell}</React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="relative" ref={datePickerRef}>
            <div
                className="flex items-center justify-between h-[52px] px-3 border-widget rounded-lg cursor-pointer hover:border-[#B0438A]"
                onClick={() => { setOverlayVisible(true) }}
            >
                <div className={`flex items-center gap-2 `}>
                    <span className='h-full flex items-center'>
                        {placeholder}
                    </span>
                </div>
                <div className={`flex items-center gap-2`}>
                    <span className='h-full flex items-center text-xs font-light'>
                        {selectedDate ? formatDate(selectedDate) : ''}
                    </span>
                    <span className='h-full flex items-center'>
                        <Calendar />
                    </span>
                </div>
            </div>

            <Overlay isVisible={overlayVisible} onClose={hideOverlay}>
                {renderCalendar()}
            </Overlay>
        </div>
    );
};

export default DatePicker;