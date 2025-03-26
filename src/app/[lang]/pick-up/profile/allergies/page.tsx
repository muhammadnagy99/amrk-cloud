import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../../mobile-wrapper";

const toggleItems = [
    "اسماك",
    "لاكتوز",
    "جيلاتين",
    "المحار",
    "ذرة",
    "ألبان",
    "مكسرات",
    "فول سوداني",
    "صويا",
    "قمح",
    "بيض",
    "بذور",
];

function Save() {
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] p-4 flex flex-col justify-between items-center z-50 rounded-lg gap-4">
                <p className="flex flex-row gap-2">
                    <NoteIcon />
                    <span className="text-[8px] font-normal text-[#00000066]">
                        على الرغم من حرصنا الشديد، لا يمكننا ضمان خلو المكونات من مسببات الحساسية. ومع ذلك، نوضح في وصف المنتج أي مكونات قد تشكل خطرًا على المصابين بالحساسية.
                    </span>
                </p>
            <button className="flex items-center justify-start px-4 bg-[#b0438a] text-white w-full rounded-lg flex-1">
                <p className="flex flex-row items-center justify-center w-full h-12">
                    <span className="text-sm font-medium">حفظ الخيارات</span>
                </p>
            </button>
        </div>
    )
}
function Toggle() {
    return (
        <label className="inline-flex items-center cursor-pointer ">
            <input
                type="checkbox"
                value=""
                className="sr-only peer !hidden"
                disabled={false}
            />
            <div className="relative w-11 h-6 bg-[#cecece] peer-focus:outline-none peer-focus:none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#b0438a]"></div>
        </label>
    )
}

function NoteIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.16663 13.1666H9.83329V8.16663H8.16663V13.1666ZM8.99996 6.49996C9.23607 6.49996 9.43413 6.41996 9.59413 6.25996C9.75413 6.09996 9.83385 5.90218 9.83329 5.66663C9.83274 5.43107 9.75274 5.23329 9.59329 5.07329C9.43385 4.91329 9.23607 4.83329 8.99996 4.83329C8.76385 4.83329 8.56607 4.91329 8.40663 5.07329C8.24718 5.23329 8.16718 5.43107 8.16663 5.66663C8.16607 5.90218 8.24607 6.10024 8.40663 6.26079C8.56718 6.42135 8.76496 6.50107 8.99996 6.49996ZM8.99996 17.3333C7.84718 17.3333 6.76385 17.1144 5.74996 16.6766C4.73607 16.2388 3.85413 15.6452 3.10413 14.8958C2.35413 14.1464 1.76052 13.2644 1.32329 12.25C0.886072 11.2355 0.667183 10.1522 0.666627 8.99996C0.666071 7.84774 0.88496 6.7644 1.32329 5.74996C1.76163 4.73552 2.35524 3.85357 3.10413 3.10413C3.85302 2.35468 4.73496 1.76107 5.74996 1.32329C6.76496 0.885515 7.84829 0.666626 8.99996 0.666626C10.1516 0.666626 11.235 0.885515 12.25 1.32329C13.265 1.76107 14.1469 2.35468 14.8958 3.10413C15.6447 3.85357 16.2386 4.73552 16.6775 5.74996C17.1163 6.7644 17.335 7.84774 17.3333 8.99996C17.3316 10.1522 17.1127 11.2355 16.6766 12.25C16.2405 13.2644 15.6469 14.1464 14.8958 14.8958C14.1447 15.6452 13.2627 16.2391 12.25 16.6775C11.2372 17.1158 10.1538 17.3344 8.99996 17.3333ZM8.99996 15.6666C10.8611 15.6666 12.4375 15.0208 13.7291 13.7291C15.0208 12.4375 15.6666 10.8611 15.6666 8.99996C15.6666 7.13885 15.0208 5.56246 13.7291 4.27079C12.4375 2.97913 10.8611 2.33329 8.99996 2.33329C7.13885 2.33329 5.56246 2.97913 4.27079 4.27079C2.97913 5.56246 2.33329 7.13885 2.33329 8.99996C2.33329 10.8611 2.97913 12.4375 4.27079 13.7291C5.56246 15.0208 7.13885 15.6666 8.99996 15.6666Z" fill="#B0438A" />
        </svg>

    )
}

export default function InfoPAge() {
    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
                <NavBar text="إعدادات حساسية الأطعمة" />
                <div className="w-full flex flex-col justify-between h-full pb-12">
                    {toggleItems.map((item, index) => (
                        <div key={index} className="py-3 border-b border-gray-300 bg-white flex flex-row justify-between">
                            <span className="font-normal text-sm">{item}</span>
                            <Toggle />
                        </div>
                    ))}
                </div>
                <Save />
            </div>
        </MobileWrapper>
    );
}
