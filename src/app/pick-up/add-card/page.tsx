import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import PaymentCTA from "@/src/components/pickup/checkout/Payment-CTA";
import SaveCard from "@/src/components/pickup/add-cart/save-card";
import Terms from "@/src/components/pickup/add-cart/term";
import CardInputForm from "@/src/components/pickup/add-cart/credit-form";

export default function CardPage() {
  return (
    <MobileWrapper>
      <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10 relative">
        <NavBar text="إضافة بطاقة دفع جديدة" />
        <CardInputForm />
        <SaveCard />
        <Terms />
      </div>
      <PaymentCTA />
    </MobileWrapper>
  );
}
