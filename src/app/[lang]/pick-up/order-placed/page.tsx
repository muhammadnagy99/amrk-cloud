import NavBar from "@/src/components/pickup/navigation-bar/navigation-bar";
import MobileWrapper from "../../mobile-wrapper";
import HomeBtn from "@/src/components/pickup/order-placed/home-btn";
import SuccessMessage from "@/src/components/pickup/order-placed/success-message";
import OrderDetails from "@/src/components/pickup/order-placed/order-details";
import CallWaiter from "@/src/components/pickup/order-placed/CallWaiter";
import BranchDetails from "@/src/components/pickup/order-placed/branch-details";
import { Locale } from "@/src/i18n-config";

type PageProps = {
    params: {
        lang: Locale;
    };
};

export default async function OrderPlacedPage(props: {
    params: Promise<{ lang: Locale }>;

}) {
    const params = await props.params;
    const lang = params.lang
    return (
        <MobileWrapper>
            <div className="flex flex-col gap-7 w-[88%] h-screen overflow-y-auto pb-28 pt-10 relative">
                <NavBar text="" />
                <SuccessMessage lang={lang} />
                <OrderDetails lang={lang} />
                <CallWaiter lang={lang} />
                <BranchDetails lang={lang} />
            </div>
            <HomeBtn />
        </MobileWrapper>
    )
}