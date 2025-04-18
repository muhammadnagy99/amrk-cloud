import { Locale } from "@/src/i18n-config";

import { Suspense } from "react";
import CheckoutPageCleint from "./checkout-client";

export default async function CheckoutPage(props: {
  params: Promise<{ lang: Locale }>;

}) {
  const params = await props.params;
  const lang = params.lang || "ar";
  return (
    <Suspense>
     <CheckoutPageCleint props={lang} />
    </Suspense>
  );
}
