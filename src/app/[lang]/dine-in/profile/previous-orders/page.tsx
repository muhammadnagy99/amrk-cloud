import { Locale } from "@/src/i18n-config";

import { Suspense } from "react";
import PreviousOrdersClient from "./client-page";

export default async function PreviousOrdersPage({ params }: {
  params: Promise<{ lang: Locale }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || "ar";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviousOrdersClient lang={lang} />
    </Suspense>
  );
}
