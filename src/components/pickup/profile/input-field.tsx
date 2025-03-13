import { InputFieldProps } from "@/src/interfaces/interfaces";
import { EditIcon } from "./icons";

export default function InputField({ label, icon: Icon, value }: InputFieldProps) {
    return (
        <div className="flex items-center border border-[#00000033] rounded-lg h-12 px-4 justify-between">
            <div className="flex flex-row gap-4 w-[95%] justify-center items-center relative">
                {Icon && <Icon />}
                <div className="w-full">
                    <label className="absolute text-[#00000099] text-[8px] font-light">{label}</label>
                    <input type="text" placeholder={value} className="w-full bg-transparent outline-none pt-2 placeholder-black"/>
                </div>
            </div>
            <EditIcon />
        </div>
    );
}