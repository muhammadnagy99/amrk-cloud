import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('userToken')?.value;
  const userId = cookieStore.get('user_id')?.value;
  const branchId = cookieStore.get('branchId')?.value;

  if (!userToken || !userId || !branchId) {
    return Response.json({ error: 'Missing authentication or branch information' }, { status: 401 });
  }

  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return Response.json({ error: 'Missing orderId parameter' }, { status: 400 });
    }

    const reOrderResponse = await fetch("https://api.amrk.app/amrkCloudWeb/reOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${decodeURIComponent(userToken)}`,
      },
      body: JSON.stringify({
        branchId,
        userId: decodeURIComponent(userId),
        orderId
      }),
    });

    if (!reOrderResponse.ok) {
      throw new Error(`API responded with status: ${reOrderResponse.status}`);
    }

    const result = await reOrderResponse.text();
    
    return Response.json({ success: true, result });
  } catch (error) {
    console.error("Re-order failed:", error);
    return Response.json({ error: 'Failed to re-order' }, { status: 500 });
  }
}