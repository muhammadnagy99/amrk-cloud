
import CardInputForm from "@/src/components/add-cart/credit-form";
import SaveCard from "@/src/components/add-cart/save-card";
import Terms from "@/src/components/add-cart/term";
import PaymentCTA from "@/src/components/checkout/Payment-CTA";
import NavBar from "@/src/components/navigation-bar/navigation-bar";
import { Locale } from "@/src/i18n-config";
import MobileWrapper from "../../mobile-wrapper";

type PageProps = {
  params: {
    lang: Locale;
  };
};

const TEXTS: Record<Locale, any> = {
  ar: {
    title: "إضافة بطاقة دفع جديدة",
  },
  en: {
    title: "Add New Card",
  }
};

export default async function CardPage(props: {
  params: Promise<{ lang: Locale }>;

}) {
  const params = await props.params;
  const lang = params.lang || "ar";
  const t = TEXTS[lang];
  return (
    <MobileWrapper>
      <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10 relative">
        <NavBar text={t.title} lang={lang} type={2} />
        <CardInputForm lang={lang} />
        <SaveCard lang={lang} />
        <Terms lang={lang} />
      </div>
      <PaymentCTA lang={lang} />
    </MobileWrapper>
  );
}
