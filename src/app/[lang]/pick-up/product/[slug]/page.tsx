import { Locale } from "@/src/i18n-config";
import ProductPageClient from "./ProductPageClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; lang: Locale; }>;

}) {
  const { slug, lang } = await params;

  const res = await fetch("https://api.dev.amrk.app/amrkCloudWeb/getMenuInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer TOKEN",
    },
    body: JSON.stringify({ menuId: slug }),
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch product info");

  const data = await res.json();
  const product = data;

  const name = lang === "ar" ? product.item_name_ar : product.item_name;
  const description = lang === "ar" ? product.item_desc_ar : product.item_desc;
  const imageSrc = product.item_img || "/default.png";
  const price = product.item_price || 0;

  const requiredOptions =
    product.required_options && product.required_options.options?.length
      ? product.required_options
      : undefined;

  const optionalOptions =
    product.optional_options && product.optional_options.options?.length
      ? product.optional_options
      : undefined;

  return (
    <ProductPageClient
      productId={product.product_id}
      lang={lang}
      name={name}
      description={description}
      imageSrc={imageSrc}
      price={price}
      requiredOptions={requiredOptions}
      optionalOptions={optionalOptions}
    />
  );
}
