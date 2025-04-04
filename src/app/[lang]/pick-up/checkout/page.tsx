import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import OrderSummary from "@/src/components/pickup/checkout/order-summery";
import PaymentMethod from "@/src/components/pickup/checkout/payment-method";
import CarPickUp from "@/src/components/pickup/checkout/car-pickup";
import PaymentCTA from "@/src/components/pickup/checkout/Payment-CTA";
import { Locale } from "@/src/i18n-config";

const TEXTS: Record<Locale, any> = {
  ar: {
    title: "الدفع",
  },
  en: {
    title: "Payment",
  }
};

export default async function CheckoutPage(props: {
  params: Promise<{ lang: Locale }>;

}) {
  const params = await props.params;
  const lang = params.lang
  const t = TEXTS[lang];

  return (
    <MobileWrapper>
      <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
        <NavBar text={t.title} />
        <PaymentMethod lang={lang} />
        <CarPickUp lang={lang} />
        <OrderSummary lang={lang} />
      </div>
      <PaymentCTA lang={lang} />
    </MobileWrapper>
  );
}
