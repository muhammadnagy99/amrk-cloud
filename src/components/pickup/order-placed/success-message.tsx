import { CheckCircleIcon } from "./icons";

type SuccessMessageProps = {
  lang: string;
};

const TEXTS: Record<string, string> = {
  ar: "تم استلام طلبك بنجاح!",
  en: "Order received successfully!",
};

export default function SuccessMessage({ lang }: SuccessMessageProps) {
  const message = TEXTS[lang] || TEXTS["en"];

  return (
    <section
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-6 p-6 rounded-lg bg-white"
    >
      <CheckCircleIcon />
      <p className="text-xl font-medium text-black text-center">
        {message}
      </p>
    </section>
  );
}
