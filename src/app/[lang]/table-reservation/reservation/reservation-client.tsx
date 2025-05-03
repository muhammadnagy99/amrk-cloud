'use client'

import CleintNavBar from "@/src/components/navigation-bar/custom-navbar";
import MobileWrapper from "../../mobile-wrapper";
import { Locale } from "@/src/i18n-config";
import { CalenderIcon, LocationIcon, OccasionIcon, UserIcon } from "@/src/components/table-reservation/icons";
import InputFieldDisplay from "@/src/components/table-reservation/display-input-field";
import SelectFieldDisplay from "@/src/components/table-reservation/select-field";
import { ChangeEvent, useState } from "react";
import { occasionOptions } from "./data";
import InputFieldRegular from "@/src/components/table-reservation/input-field";
import ScheduleBtn from "@/src/components/table-reservation/schedule-btn";

interface OccasionOption {
    value: string;
    en: string;
    ar: string;
    [key: string]: string;
}

interface SelectOption {
    value: string;
    label: string;
}

const TEXTS: Record<Locale, any> = {
    ar: {
        title: "تأكيد بيانات الحجز",
        personalInfo: "بياناتك الشخصية",
        bookingInfo: "بيانات الحجز",
        notes: "هل لديك ملاحظات؟",
        bookingTerms: "شروط الحجز",
        nameLabel: "الاسم - اجباري",
        emailLabel: "البريد الالكتروني - اجباري",
        phoneLabel: "رقم الجوال - اختياري",
        branchLabel: "الفرع",
        dateTimeLabel: "الموعد المحدد",
        guestsLabel: "عدد الأفراد",
        occasionLabel: "مناسبة خاصة",
        notesPlaceholder: "اكتب ملاحظاتك هنا...",
        agreeTerms: "أوافق على شروط الحجز",
        tableReservation: "حجز الطاولة",
        guest: "ضيف",
        guests: "ضيوف",
        floorPrefix: "الطابق",
        days: {
            sunday: "الأحد",
            monday: "الإثنين",
            tuesday: "الثلاثاء",
            wednesday: "الأربعاء",
            thursday: "الخميس",
            friday: "الجمعة",
            saturday: "السبت"
        },
        months: {
            january: "يناير",
            february: "فبراير",
            march: "مارس",
            april: "أبريل",
            may: "مايو",
            june: "يونيو",
            july: "يوليو",
            august: "أغسطس",
            september: "سبتمبر",
            october: "أكتوبر",
            november: "نوفمبر",
            december: "ديسمبر"
        }
    },
    en: {
        title: "Booking Details Confirmation",
        personalInfo: "Personal Information",
        bookingInfo: "Reservation Details",
        notes: "Additional Notes",
        bookingTerms: "Reservation Terms",
        nameLabel: "Full Name - Must",
        emailLabel: "Email Address - Must",
        phoneLabel: "Mobile Number - Optional",
        branchLabel: "Branch",
        dateTimeLabel: "Appointment Date",
        guestsLabel: "Number of Guests",
        occasionLabel: "Special Occasion",
        notesPlaceholder: "Enter your notes here...",
        agreeTerms: "I agree to the reservation terms",
        tableReservation: "Table Reservation",
        guest: "guest",
        guests: "guests",
        floorPrefix: "Floor",
        days: {
            sunday: "Sunday",
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday"
        },
        months: {
            january: "January",
            february: "February",
            march: "March",
            april: "April",
            may: "May",
            june: "June",
            july: "July",
            august: "August",
            september: "September",
            october: "October",
            november: "November",
            december: "December"
        }
    },
};

const formatOptionsForSelectField = (options: OccasionOption[], language: string): SelectOption[] => {
    return options.map(option => ({
        value: option.value,
        label: option[language]
    }));
};

interface props {
    props: string;
    onToggle: () => void;
    type: number;
    branchName: string | null;
    date: Date | null;
    guests: number
    floor: string;
}

export default function ReservationClient({ props, onToggle, type, branchName, date, guests, floor }: props) {
    const lang = props || "ar";
    const t = TEXTS[lang];
    const [occasion, setOccasion] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const formattedOptions: SelectOption[] = formatOptionsForSelectField(occasionOptions, lang);

    const handleNameInputChange = (value: string) => {
        setName(value);
    };

    const handleEmailInputChange = (value: string) => {
        setEmail(value);
    };
    
    const handlePhoneInputChange = (value: string) => {
        setPhone(value);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setIsChecked(newValue);
    };

    // Format the branch name display
    const formatBranchDisplay = () => {
        if (!branchName) return "";
        return `${branchName}`;
    };

    // Format the date and floor display
    const formatDateFloorDisplay = () => {
        if (!date) return "";
        
        const dayIndex = date.getDay();
        const monthIndex = date.getMonth();
        
        const dayNames: Record<string, any> = {
            ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
            en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        };
        
        const monthNames: Record<string, any> = {
            ar: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };
        
        const dayName = dayNames[lang][dayIndex];
        const day = date.getDate();
        const monthName = monthNames[lang][monthIndex];
        
        if (lang === 'ar') {
            return `${dayName}, ${day} ${monthName} - ${floor}`;
        } else {
            return `${dayName}, ${monthName} ${day} - ${floor}`;
        }
    };

    // Format the guests display
    const formatGuestsDisplay = () => {
        if (lang === 'ar') {
            return `${guests} ${guests === 1 ? t.guest : t.guests}`;
        } else {
            return `${guests} ${guests === 1 ? t.guest : t.guests}`;
        }
    };

    return (
        <>
            <MobileWrapper>
                <div className="flex flex-col gap-5 w-[88%] overflow-y-auto pt-10 mb-36">
                    <CleintNavBar text={t.title} lang={lang} onClose={onToggle} />
                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-medium">
                            {t.personalInfo}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <InputFieldRegular
                                label={t.nameLabel}
                                value={name}
                                onChange={handleNameInputChange}
                            />
                            <InputFieldRegular
                                label={t.emailLabel}
                                value={email}
                                onChange={handleEmailInputChange}
                            />
                            <InputFieldRegular
                                label={t.phoneLabel}
                                value={phone}
                                onChange={handlePhoneInputChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-medium">
                            {t.bookingInfo}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <InputFieldDisplay 
                                label={t.branchLabel} 
                                icon={LocationIcon} 
                                value={formatBranchDisplay()} 
                                lang={lang} 
                            />
                            <InputFieldDisplay 
                                label={t.dateTimeLabel} 
                                icon={CalenderIcon} 
                                value={formatDateFloorDisplay()} 
                                lang={lang} 
                            />
                            <InputFieldDisplay 
                                label={t.guestsLabel} 
                                icon={UserIcon} 
                                value={formatGuestsDisplay()} 
                                lang={lang} 
                            />
                            <SelectFieldDisplay
                                label={t.occasionLabel}
                                icon={OccasionIcon}
                                value={occasion}
                                options={formattedOptions}
                                onChange={setOccasion}
                                lang={props}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-medium">
                            {t.notes}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={t.notesPlaceholder}
                                dir={lang === 'ar' ? "rtl" : "ltr"}
                                className="w-full p-4 text-sm border rounded-lg border-gray-300 outline-none resize-none"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-base font-medium flex gap-1">
                            {t.bookingTerms}

                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.5 8.5H6.5V5.5H5.5V8.5ZM6 4.5C6.14167 4.5 6.2605 4.452 6.3565 4.356C6.4525 4.26 6.50033 4.14133 6.5 4C6.49967 3.85867 6.45167 3.74 6.356 3.644C6.26033 3.548 6.14167 3.5 6 3.5C5.85833 3.5 5.73967 3.548 5.644 3.644C5.54833 3.74 5.50033 3.85867 5.5 4C5.49967 4.14133 5.54767 4.26017 5.644 4.3565C5.74033 4.45283 5.859 4.50067 6 4.5ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.606C3.44167 10.3433 2.9125 9.98717 2.4625 9.5375C2.0125 9.08783 1.65633 8.55867 1.394 7.95C1.13167 7.34133 1.00033 6.69133 1 6C0.999667 5.30867 1.131 4.65867 1.394 4.05C1.657 3.44133 2.01317 2.91217 2.4625 2.4625C2.91183 2.01283 3.441 1.65667 4.05 1.394C4.659 1.13133 5.309 1 6 1C6.691 1 7.341 1.13133 7.95 1.394C8.559 1.65667 9.08817 2.01283 9.5375 2.4625C9.98683 2.91217 10.3432 3.44133 10.6065 4.05C10.8698 4.65867 11.001 5.30867 11 6C10.999 6.69133 10.8677 7.34133 10.606 7.95C10.3443 8.55867 9.98817 9.08783 9.5375 9.5375C9.08683 9.98717 8.55767 10.3435 7.95 10.6065C7.34233 10.8695 6.69233 11.0007 6 11Z" fill="#B0438A" />
                            </svg>

                        </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between text-right">
                                <label
                                    htmlFor="terms-checkbox"
                                    className="text-sm font-normal cursor-pointer select-none"
                                >
                                    {t.agreeTerms}
                                </label>
                                <div className="relative">
                                    <input
                                        id="terms-checkbox"
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        className="w-5 h-5 border border-gray-300 rounded appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ScheduleBtn lang={lang} />
            </MobileWrapper>
        </>
    )
}