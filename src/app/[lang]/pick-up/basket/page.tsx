import { Locale } from "@/src/i18n-config";
import BasketPageClient from "./basket-client";
import { Suspense } from "react";

export default async function BasketPage(props: {
  params: Promise<{ lang: Locale }>;

}) {
  const params = await props.params;
  const lang = params.lang || "ar";
  return (
    <Suspense>
      {/* <BasketPageClient props={lang} /> */}
    </Suspense>
  );
}
