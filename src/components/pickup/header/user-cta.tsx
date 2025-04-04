import BranchSelection from "./assets/branch-selection";
import UserCustomize from "./assets/user-customize";

export default function UserCTA({lang}: {lang: string}){
    return(
        <div className="flex flex-row justify-between w-full h-9">
            <BranchSelection />
            <UserCustomize lang={lang} />
        </div>
    )
}