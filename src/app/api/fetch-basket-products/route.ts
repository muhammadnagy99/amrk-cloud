// /app/api/fetch-basket-products/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const productIds: string[] = body.ids;

  const products = [];

  for (const id of productIds) {
    try {
      const res = await fetch("https://api.dev.amrk.app/amrkCloudWeb/getMenuInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TOKEN", // Replace this!
        },
        body: JSON.stringify({ menuId: id }),
      });

      const product = await res.json();
      products.push(product);
    } catch (err) {
      console.error(`Failed to fetch product ${id}:`, err);
    }
  }

  return NextResponse.json({ products });
}
