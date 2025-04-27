import Link from "next/link";

type TermsProps = {
  lang: string;
};

const TEXTS: Record<string, { line: string; link: string }> = {
  ar: {
    line: "عند تنفيذ هذا الطلب عبر بطاقة الإتمان انت توافق على",
    link: "الشروط والأحكام",
  },
  en: {
    line: "By completing this order with a credit card, you agree to the",
    link: "Terms and Conditions",
  },
};

export default function Terms({ lang }: TermsProps) {
  const t = TEXTS[lang] || TEXTS["en"];

  return (
    <p className="font-normal text-sm absolute bottom-36 text-center w-full">
      {t.line}
      <br />
      <Link href="/terms" className="text-sm font-medium underline">
        {t.link}
      </Link>
    </p>
  );
}
