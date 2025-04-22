import Overlay from "@/src/components/pickup/assets/overlay";
import { Locale } from "@/src/i18n-config";

import { Suspense } from "react";
import Over from "../../../../components/pickup/assets/info-overlay";

export default async function PaymentGateWay(props: {
  params: Promise<{ lang: Locale }>;

}) {
  const params = await props.params;
  const lang = params.lang || "ar";
  return (
    <Suspense>
    </Suspense>
  );
}
