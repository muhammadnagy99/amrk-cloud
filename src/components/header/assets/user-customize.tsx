import { ELnag, User } from "./icons";

export default function UserCustomize(){
    return(
        <div className="flex flex-row justify-between h-full gap-2">
            <p className="w-9 h-9 flex justify-center items-center bg-white rounded-lg">
                <ELnag />
            </p>
            <p className="w-9 h-9 flex justify-center items-center bg-white rounded-lg">
                <User />
            </p>
        </div>
    )
}