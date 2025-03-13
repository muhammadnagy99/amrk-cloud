import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import HomeBtn from "@/src/components/pickup/order-placed/home-btn";
import SuccessMessage from "@/src/components/pickup/order-placed/success-message";
import OrderDetails from "@/src/components/pickup/order-placed/order-details";
import CallWaiter from "@/src/components/pickup/order-placed/CallWaiter";
import BranchDetails from "@/src/components/pickup/order-placed/branch-details";

export default function OrderPlacedPage() {
    return (
        <MobileWrapper>
            <div className="flex flex-col gap-7 w-[88%] h-screen overflow-y-auto pb-28 pt-10 relative">
                <NavBar text="" />
                <SuccessMessage />
                <OrderDetails />
                <CallWaiter />
                <BranchDetails />
            </div>
            <HomeBtn />
        </MobileWrapper>
    )
}