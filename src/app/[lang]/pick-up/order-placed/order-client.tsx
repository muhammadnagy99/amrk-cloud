
import NavBar from "@/src/components/navigation-bar/navigation-bar";
import CallWaiter from "@/src/components/order-placed/CallWaiter";
import HomeBtn from "@/src/components/order-placed/home-btn";
import OrderDetails from "@/src/components/order-placed/order-details";
import SuccessMessage from "@/src/components/order-placed/success-message";
import MobileWrapper from "../../mobile-wrapper";
import BranchDetails from "@/src/components/order-placed/branch-details";
import CleintNavBar from "@/src/components/navigation-bar/custom-navbar";

interface PageProps {
    lang: string;
    onToggle: () => void;
};

export default function OrderPlacedClient({ lang, onToggle }: PageProps) {
    return (
        <MobileWrapper>
            <div className="flex flex-col gap-7 w-[88%] h-screen overflow-y-auto pb-28 pt-10 relative">
                <CleintNavBar text="" lang={lang} onClose={onToggle} />
                <SuccessMessage lang={lang} />
                <OrderDetails lang={lang} />
                <CallWaiter lang={lang} />
                <BranchDetails lang={lang} type={2} />
            </div>
            <HomeBtn />
        </MobileWrapper>
    )
}