import { BellIcon } from "./icons";

type CallWaiterProps = {
  lang: string;
};

const TEXTS: Record<string, { title: string; button: string }> = {
  ar: {
    title: "وصلت؟ اطلب إحضار طلبك",
    button: "الاتصال بالنادل",
  },
  en: {
    title: "Arrived? Request your order",
    button: "Call the waiter",
  },
};

export default function CallWaiter({ lang }: CallWaiterProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <div className="flex flex-col gap-4 text-black">
      <p className="text-base font-medium">{t.title}</p>

      <button className="flex justify-start items-center w-full gap-4 px-4 py-3 bg-white border border-[#00000033] rounded-lg">
        <BellIcon />
        <span className="text-sm font-normal">{t.button}</span>
      </button>
    </div>
  );
}
