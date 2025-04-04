import ActiveIcon from "./icons";

export default function ActiveStatus({ lang }: { lang: string }) {
    const text = lang === "ar" ? "مفتوح الآن" : "Open Now";

    return (
        <article className="flex flex-row gap-1 bg-[#0000000c] w-18 p-1 justify-center items-center rounded-[20px]">
            <ActiveIcon />
            <p className="text-xs font-light text-black">
                {text}
            </p>
        </article>
    );
}
