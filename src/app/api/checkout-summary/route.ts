import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { items, redeemPoints = false, pointsValue = 0 } = await req.json();

  try {
    // ✅ Get branchId from cookies
    const cookieStore = cookies();
    const branchId = (await cookieStore).get("brnid")?.value;

    if (!branchId) {
      return NextResponse.json({ error: "Missing branch ID" }, { status: 400 });
    }

    // ✅ Fetch VAT from branchInfo API
    const branchRes = await fetch("https://api.dev.amrk.app/amrkCloudWeb/branchInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer TOKEN`,
      },
      body: JSON.stringify({ branchId }),
    });

    const branchData = await branchRes.json();
    const vatPercent = branchData.vat ?? 15;

    // ✅ Fetch product prices for all items
    const prices: Record<string, number> = {};

    for (const item of items) {
      const res = await fetch("https://api.dev.amrk.app/amrkCloudWeb/getMenuInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer TOKEN`,
        },
        body: JSON.stringify({ menuId: item.id }),
      });

      const data = await res.json();
      prices[item.id] = data.item_price ?? 0;
    }

    // ✅ Calculate subtotal, vat, discount, and total
    let subtotal = 0;

    for (const item of items) {
      const base = prices[item.id] || 0;
      const extras =
        (item.required?.extraPrice ?? 0) +
        item.optional.reduce((sum: number, opt: any) => sum + (opt.extraPrice ?? 0), 0);
      subtotal += (base + extras) * item.quantity;
    }

    const vatAmount = (subtotal * vatPercent) / 100;
    const discount = redeemPoints ? pointsValue : 0;
    const total = subtotal + vatAmount - discount;

    return NextResponse.json({
      subtotal,
      vatPercent,
      vatAmount,
      discount,
      total,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to calculate summary" }, { status: 500 });
  }
}
