// TimePicker.tsx
import React, { useState, useRef, useEffect } from 'react';
import Overlay from '../assets/overlay';

// Define supported languages
type SupportedLanguage = 'en' | 'ar';

// Language configuration interface
interface LanguageConfig {
    placeholder: string;
    direction: 'ltr' | 'rtl';
    locale: string;
    labels: {
        hours: string;
        minutes: string;
        seconds: string;
        am: string;
        pm: string;
        select: string;
        cancel: string;
    };
}

// Language configurations
const LANGUAGE_CONFIG: Record<string, LanguageConfig> = {
    en: {
        placeholder: 'Select time',
        direction: 'ltr',
        locale: 'en-US',
        labels: {
            hours: 'Hours',
            minutes: 'Minutes',
            seconds: 'Seconds',
            am: 'AM',
            pm: 'PM',
            select: 'Select',
            cancel: 'Cancel'
        }
    },
    ar: {
        placeholder: 'اختر الوقت',
        direction: 'rtl',
        locale: 'ar',
        labels: {
            hours: 'الساعات',
            minutes: 'الدقائق',
            seconds: 'الثواني',
            am: 'AM',
            pm: 'PM',
            select: 'اختر',
            cancel: 'الغاء'
        }
    }
};

const Clock = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.99996 1.66699C14.6025 1.66699 18.3333 5.39783 18.3333 10.0003C18.3333 14.6028 14.6025 18.3337 9.99996 18.3337C5.39746 18.3337 1.66663 14.6028 1.66663 10.0003C1.66663 5.39783 5.39746 1.66699 9.99996 1.66699ZM9.99996 5.00032C9.77894 5.00032 9.56698 5.08812 9.4107 5.2444C9.25442 5.40068 9.16662 5.61264 9.16662 5.83366V10.0003C9.16667 10.2213 9.2545 10.4332 9.41079 10.5895L11.9108 13.0895C12.068 13.2413 12.2785 13.3253 12.497 13.3234C12.7155 13.3215 12.9245 13.2338 13.079 13.0793C13.2335 12.9248 13.3211 12.7158 13.323 12.4973C13.3249 12.2788 13.2409 12.0683 13.0891 11.9112L10.8333 9.65532V5.83366C10.8333 5.61264 10.7455 5.40068 10.5892 5.2444C10.4329 5.08812 10.221 5.00032 9.99996 5.00032Z" fill="#B0438A" />
    </svg>

)

interface TimePickerProps {
    onTimeChange?: (time: { hour: number; minute: number; period: 'AM' | 'PM' }) => void;
    initialTime?: { hour: number; minute: number; period: 'AM' | 'PM' } | null;
    lang: string;
    showSeconds?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
    onTimeChange,
    initialTime = null,
    lang = 'ar',
    showSeconds = true
}) => {
    // Get the language configuration
    const langConfig = LANGUAGE_CONFIG[lang];
    const { placeholder, direction, locale, labels } = langConfig;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedHour, setSelectedHour] = useState<number>(initialTime?.hour || 1);
    const [selectedMinute, setSelectedMinute] = useState<number>(initialTime?.minute || 0);
    const [selectedSecond, setSelectedSecond] = useState<number>(0);
    const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(initialTime?.period || 'AM');
    const timePickerRef = useRef<HTMLDivElement>(null);

    const [overlayVisible, setOverlayVisible] = useState<boolean>(false);

    const hideOverlay = (): void => {
        setOverlayVisible(false);
    };


    // Close the time picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (timePickerRef.current && !timePickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Format time for display
    const formatTime = (): string => {
        if (!selectedHour && selectedHour !== 0) return placeholder;

        const hour = selectedHour.toString().padStart(2, '0');
        const minute = selectedMinute.toString().padStart(2, '0');
        const second = selectedSecond.toString().padStart(2, '0');

        if (showSeconds) {
            return `${hour}:${minute} ${selectedPeriod}`;
        } else {
            return `${hour}:${minute} ${selectedPeriod}`;
        }
    };

    // Handle time selection
    const handleTimeSelect = (): void => {
        setIsOpen(false);
        setOverlayVisible(false)
        if (onTimeChange) {
            onTimeChange({
                hour: selectedHour,
                minute: selectedMinute,
                period: selectedPeriod
            });
        }
    };

    // Handle cancel
    const handleCancel = (): void => {

        if (initialTime) {
            setSelectedHour(initialTime.hour);
            setSelectedMinute(initialTime.minute);
            setSelectedPeriod(initialTime.period);
        }
        setIsOpen(false);
        setOverlayVisible(false)
    };

    // Generate options for hours (1-12)
    const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);

    // Generate options for minutes (0-59)
    const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

    // Generate options for seconds (0-59)
    const secondOptions = Array.from({ length: 60 }, (_, i) => i);
    

    return (
        <div className="relative" ref={timePickerRef}>
            <div
                className="flex items-center justify-between h-[52px] px-3 border-widget rounded-lg cursor-pointer "
                onClick={() => { setOverlayVisible(true) }}
            >
                <div className={`flex items-center gap-2`}>
                    <span className='h-full flex items-center'>
                        {placeholder}
                    </span>
                </div>
                <div className={`flex items-center gap-2`}>
                    <span className='h-full flex items-center text-xs font-light' dir='ltr'>
                        {formatTime()}
                    </span>
                    <span className='h-full flex items-center'>
                        <Clock />
                    </span>
                </div>
            </div>

            <Overlay isVisible={overlayVisible} onClose={hideOverlay}>
                <div className="mt-1 bg-white p-4 w-full" dir={direction}>
                    <div className="flex justify-between mb-4">
                        <div className="text-base font-medium">{placeholder}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4" dir='ltr'>
                        {/* Hours */}
                        <div className="flex flex-col items-center">
                            <div className="h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {hourOptions.map(hour => (
                                    <div
                                        key={`hour-${hour}`}
                                        className={`py-2 px-3 text-sm text-center cursor-pointer rounded-lg  ${selectedHour === hour ? 'bg-[#B0438A] text-white' : ''
                                            }`}
                                        onClick={() => setSelectedHour(hour)}
                                    >
                                        {hour.toString().padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Minutes */}
                        <div className="flex flex-col items-center">
                            <div className="h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                {minuteOptions.map(minute => (
                                    <div
                                        key={`minute-${minute}`}
                                        className={`py-2 px-3 text-sm text-center cursor-pointer rounded-lg  ${selectedMinute === minute ? 'bg-[#B0438A] text-white' : ''
                                            }`}
                                        onClick={() => setSelectedMinute(minute)}
                                    >
                                        {minute.toString().padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* AM/PM */}
                        <div className="flex flex-col items-center">
                            <div className="flex flex-col h-32 justify-start">
                                <div
                                    className={`py-2 px-3 text-sm text-center cursor-pointer rounded-lg ${selectedPeriod === 'AM' ? 'bg-[#B0438A] text-white' : ''
                                        }`}
                                    onClick={() => setSelectedPeriod('AM')}
                                >
                                    {labels.am}
                                </div>
                                <div
                                    className={`py-2 px-3 text-sm text-center cursor-pointer rounded-lg  ${selectedPeriod === 'PM' ? 'bg-[#B0438A] text-white' : ''
                                        }`}
                                    onClick={() => setSelectedPeriod('PM')}
                                >
                                    {labels.pm}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time display and buttons */}
                    <div className="border-t pt-3 mt-2">
                        <div className="text-center text-lg mb-3 flex gap-1 justify-center" dir='ltr'>
                            <span>
                                {selectedHour.toString().padStart(2, '0')}
                            </span>
                            <span>
                                :
                            </span>
                            <span>
                                {selectedMinute.toString().padStart(2, '0')}
                            </span>
                            <span>
                                {selectedPeriod}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="px-4 h-[40px] w-[49%] bg-white border border-gray-300 rounded-lg text-sm"
                                onClick={handleCancel}
                                type="button"
                            >
                                {labels.cancel}
                            </button>
                            <button
                                className="px-4 h-[40px] w-[49%] bg-[#B0438A] text-white text-sm rounded-lg"
                                onClick={handleTimeSelect}
                                type="button"
                            >
                                {labels.select}
                            </button>
                        </div>
                    </div>
                </div>
            </Overlay>
        </div>
    );
};

export default TimePicker;