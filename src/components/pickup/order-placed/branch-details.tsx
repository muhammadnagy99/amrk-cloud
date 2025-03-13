import GoogleMapComponent from "./google-map";
import { PhoneIcon } from "./icons";

export default function BranchDetails() {
    return (
        <div className="flex flex-col w-full text-black gap-4.5">
            <h2 className="text-base font-medium">
                بيانات الفرع
            </h2>

            <div className="rounded-lg overflow-hidden">
                <GoogleMapComponent />
            </div>

            <button className="flex justify-start items-center w-full gap-4 px-4 py-3 bg-white border border-[#00000033] rounded-lg ">
                <PhoneIcon />
                <span className="text-sm font-normal"> تواصل مع الفرع</span>
            </button>
        </div>
    )
}
