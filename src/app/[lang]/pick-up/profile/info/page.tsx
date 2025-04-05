import { Locale } from "@/src/i18n-config";
import { Suspense } from "react";
import InfoPageClient from "./client-page";

export default async function InfoPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang || "ar";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InfoPageClient params={{ lang }} />
    </Suspense>
  );
}
