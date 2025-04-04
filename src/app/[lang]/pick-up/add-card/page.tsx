import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import PaymentCTA from "@/src/components/pickup/checkout/Payment-CTA";
import SaveCard from "@/src/components/pickup/add-cart/save-card";
import Terms from "@/src/components/pickup/add-cart/term";
import CardInputForm from "@/src/components/pickup/add-cart/credit-form";
import { Locale } from "@/src/i18n-config";

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
        <NavBar text={t.title} />
        <CardInputForm lang={lang} />
        <SaveCard lang={lang} />
        <Terms lang={lang} />
      </div>
      <PaymentCTA lang={lang} />
    </MobileWrapper>
  );
}
