import { Locale } from "@/src/i18n-config";
import { Suspense } from "react";
import InfoPageClient from "./client-page";

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default async function InfoPage(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang || "ar";

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <InfoPageClient params={{ lang }} />
    </Suspense>
  );
}
