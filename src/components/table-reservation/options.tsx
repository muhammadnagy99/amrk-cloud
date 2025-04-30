'use client'

import { useState } from "react";
import DatePicker from "./data-picker";
import TimePicker from "./time-picker";
import NumPersons from "./num-person";
import SearchTables from "./search-tables";


export default function Options({ lang }: { lang: string }) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [selectedTime, setSelectedTime] = useState<{
        hour: number;
        minute: number;
        period: 'AM' | 'PM'
    } | null>(null);

    const [persons, setPersons] = useState<number>(1);

    const handleTimeChange = (time: {
        hour: number;
        minute: number;
        period: 'AM' | 'PM'
    }): void => {
        setSelectedTime(time);
        const formattedTime = `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')} ${time.period}`;
    };

    const handleDateChange = (date: Date): void => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split('T')[0];
    };

    const handlePersonsChange = (value: number) => {
        setPersons(value);
    };

    return (
        <div className="flex flex-col gap-3">
            <DatePicker
                onDateChange={handleDateChange}
                lang={lang}
            />
            <TimePicker
                onTimeChange={handleTimeChange}
                lang={lang}
            />
            <NumPersons
                lang={lang}
                initialValue={persons}
                onChange={handlePersonsChange}
            />
            <SearchTables lang={lang} guests={persons} date={selectedDate} />
        </div>
    )
}