import MobileWrapper from "../../mobile-wrapper";
import BasketCTA from "@/src/components/pickup/basket-page/basket-CTA";
import CartItem from "@/src/components/pickup/basket-page/item-row";
import UserDiscount from "@/src/components/pickup/basket-page/discount";
import OrderSummary from "@/src/components/pickup/basket-page/order-summery";
import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";

export default function BasketPage() {
  return (
    <MobileWrapper>
      <div className="flex flex-col gap-6 w-[88%] h-screen overflow-y-auto pb-28 pt-10">
        <NavBar  text="سلة المشتريات"/>
        <div className="flex flex-col">
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <UserDiscount />
        <OrderSummary />
      </div>
      <BasketCTA />
    </MobileWrapper>
  );
}
