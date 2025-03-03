import BranchSelection from "./assets/branch-selection";
import UserCustomize from "./assets/user-customize";

export default function UserCTA(){
    return(
        <div className="flex flex-row justify-between w-full h-9">
            <BranchSelection />
            <UserCustomize />
        </div>
    )
}