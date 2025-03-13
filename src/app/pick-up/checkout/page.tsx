import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import OrderSummary from "@/src/components/pickup/checkout/order-summery";
import PaymentMethod from "@/src/components/pickup/checkout/payment-method";
import CarPickUp from "@/src/components/pickup/checkout/car-pickup";
import PaymentCTA from "@/src/components/pickup/checkout/Payment-CTA";

export default function CheckoutPage() {
  return (
    <MobileWrapper>
      <div className="flex flex-col gap-8 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
        <NavBar text="الدفع" />
        <PaymentMethod />
        <CarPickUp />
        <OrderSummary />
      </div>
      <PaymentCTA />
    </MobileWrapper>
  );
}
