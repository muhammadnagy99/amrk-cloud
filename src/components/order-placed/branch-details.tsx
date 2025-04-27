import GoogleMapComponent from "./google-map";
import { PhoneIcon } from "./icons";

type BranchDetailsProps = {
  lang: string;
};

const TEXTS: Record<string, { title: string; contact: string }> = {
  ar: {
    title: "بيانات الفرع",
    contact: "تواصل مع الفرع",
  },
  en: {
    title: "Branch Information",
    contact: "Contact the Branch",
  },
};

export default function BranchDetails({ lang }: BranchDetailsProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="flex flex-col w-full text-black gap-4.5">
      <h2 className="text-base font-medium">{t.title}</h2>

      <div className="rounded-lg overflow-hidden">
        <GoogleMapComponent />
      </div>

      <button className="flex justify-start items-center w-full gap-4 px-4 py-3 bg-white border border-[#00000033] rounded-lg ">
        <PhoneIcon />
        <span className="text-sm font-normal">{t.contact}</span>
      </button>
    </div>
  );
}
