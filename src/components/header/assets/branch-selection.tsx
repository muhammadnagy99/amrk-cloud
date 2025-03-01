import { DownArrow } from "./icons";

export default function BranchSelection(){
    return(
        <div className="w-24 h-full flex flex-row justify-between bg-white items-center p-3 rounded-lg">
            <p className="text-black font-medium text-xs">
            اختيار الفرع
            </p>
            <p>
                <DownArrow />
            </p>
        </div>
    );
}