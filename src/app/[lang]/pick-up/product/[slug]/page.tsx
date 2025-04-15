// ProductPage.tsx
import { Locale } from "@/src/i18n-config";
import ProductPageClient from "./ProductPageClient";
import { Suspense } from "react";
import ProductPage from "./product-cleint-server";

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale }>;
}) {
  const props = await params;
  
  return (
    <Suspense>
      {/* <ProductPage params={props} /> */}
    </Suspense>
  );
}