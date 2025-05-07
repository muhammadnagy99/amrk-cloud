
import BranchDetails from "@/src/components/header/branch-details";
import NavBar from "@/src/components/navigation-bar/navigation-bar";
import CallWaiter from "@/src/components/order-placed/CallWaiter";
import HomeBtn from "@/src/components/order-placed/home-btn";
import OrderDetails from "@/src/components/order-placed/order-details";
import SuccessMessage from "@/src/components/order-placed/success-message";
import { Locale } from "@/src/i18n-config";
import MobileWrapper from "../../mobile-wrapper";
import OrderPlacedClient from "./order-client";
import { Suspense } from "react";

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
      <Suspense></Suspense>
    )
}