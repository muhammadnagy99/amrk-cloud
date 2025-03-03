import ProductInfo from "@/src/components/pickup/product-page/product-info";
import MobileWrapper from "../../mobile-wrapper";
import RequiredChoices from "@/src/components/pickup/product-page/required-choices";
import OptionalChoices from "@/src/components/pickup/product-page/optional-choices";
import AddCart from "@/src/components/pickup/product-page/add-cart";

export default function ProductPage() {
  return (
    <MobileWrapper>
      <div className="flex flex-col gap-8 w-full h-screen overflow-y-auto pb-28">
        <ProductInfo />
        <RequiredChoices />
        <OptionalChoices />
        <OptionalChoices />
      </div>
      <AddCart />
    </MobileWrapper>
  );
}
