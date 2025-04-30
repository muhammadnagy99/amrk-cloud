import RowSchedule from "./row-schedule";

interface props{
    lang: string
    guests: number;
    date: Date | null;
}
export default function SearchTables({ lang, guests, date }: props) {
    const translations: Record<string, any> = {
        en: "Search for Available Tables",
        ar: "البحث عن الطاولات المتاحة"
    };

    // Schedule data for both languages
    const scheduleDataByLang: Record<string, any[]> = {
        en: [
            {
                location: "First Floor",
                times: ["6:15 PM", "6:30 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
            },
            {
                location: "Second Floor",
                times: ["6:15 PM", "6:30 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
            },
            {
                location: "Terrace",
                times: ["6:15 PM", "6:30 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
            }
        ],
        ar: [
            {
                location: "الطابق الأول",
                times: ["6:15 PM", "6:30 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
            },
            {
                location: "الطابق الثاني",
                times: ["6:15 PM", "6:30 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
            },
            {
                location: "التراس",
                times: ["6:15 PM", "6:30 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"]
            }
        ]
    };

    // Use the appropriate language data or fall back to English
    const scheduleData = scheduleDataByLang[lang] || scheduleDataByLang.en;
    const buttonText = translations[lang] || translations.en;

    return (
        <div className="flex flex-col gap-10">
            <button
                className="bg-[#B0438A] mt-2 rounded-lg text-white h-12 w-full text-center"
            >
                {buttonText}
            </button>
            <div className="flex flex-col gap-4">
                {scheduleData.map((schedule, index) => (
                    <RowSchedule
                        lang={lang}
                        key={index}
                        headline={schedule.location}
                        times={schedule.times}
                        guests={guests}
                        date={date}
                    />
                ))}
            </div>
        </div>
    );
}