import { Locale } from "@/src/i18n-config";

import { Suspense } from "react";
import PaymentGateWayClient from "./payorder-client";


export default async function PaymentGateWay(props: {
  params: Promise<{ lang: Locale }>;

}) {
  const params = await props.params;
  const lang = params.lang || "ar";
  return (
    <Suspense>
     <PaymentGateWayClient props={lang} />
    </Suspense>
  );
}
