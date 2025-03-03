import ActiveIcon from "./icons";

export default function ActiveStatus(){
    return(
        <article className="flex flex-row gap-1 bg-[#0000000c] w-18 p-1 justify-center items-center rounded-[20px]">
            <ActiveIcon />
            <p className="text-xs font-light text-black">
            مفتوح الآن
            </p>
        </article>
    )
}