import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookiesHeader = req.headers.get("cookie") || "";

  try {
    const cookieStore = cookies();
    const userId = (await cookieStore).get("user_id")?.value;
    const basketId = (await cookieStore).get("basket_id")?.value;
    const branchId = (await cookieStore).get("brnid")?.value;
    const token = (await cookieStore).get("userToken")?.value;

    if (!userId || !branchId || !basketId || !token) {
      return NextResponse.json({ error: "Missing required cookies" }, { status: 400 });
    }

    const { items, redeemPoints = false, pointsValue = 0 } = await req.json();

    // Get calculated totals (subtotal, vat, total) from your own summary API
    const summaryRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/checkout-summary`, {
      method: "POST",
      headers: { "Content-Type": "application/json",  cookie: cookiesHeader, },
      body: JSON.stringify({ items, redeemPoints, pointsValue }),
    });

    const summary = await summaryRes.json();

    const payload = {
      waiterOrders: [],
      orderId: "",
      splitItems: [],
      otherOrders: [],
      tableId: "0",
      userId,
      isMobile: false,
      branchId,
      tipValue: 0,
      tax: Number(summary.vatAmount.toFixed(2)),
      payUsingPoints: false,
      serVal: 0,
      netTipVal: 0,
      basketId,
      tipType: true,
      amount: Number(summary.total.toFixed(2)),
      unitPric: "SAR",
      country: "SA",
      devMode: true,
      srvPrs: null,
      payUsingGiftCards: false
    };

    console.log(payload)
    const telrRes = await fetch("https://api.amrk.app/amrkCloudWeb/createTelrCheckoutIframeV1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(payload),
    });

    const telrData = await telrRes.json();
    console.log(telrData)
    return NextResponse.json(telrData); 

  } catch (err) {
    console.error("Telr Checkout Error:", err);
    return NextResponse.json({ error: "Failed to create Telr iframe" }, { status: 500 });
  }
}
