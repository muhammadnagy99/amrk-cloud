import Category from "./category.tsx/category";
import Offers from "./offers/offers";
import OrderAgain from "./order-again.tsx/order-again";

export default function ViewGrid(){
    return(
        <div className="flex flex-col gap-5 w-full">
            <OrderAgain />
            <Offers />
            <Category />
            <Category />
            <Category />
        </div>
    );
}