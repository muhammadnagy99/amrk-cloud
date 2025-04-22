import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('userToken')?.value;
  const userId = cookieStore.get('user_id')?.value;
  const branchId = cookieStore.get('branchId')?.value; 

  if (!userToken || !userId || !branchId) {
    return Response.json({ error: 'Missing authentication or branch information' }, { status: 401 });
  }

  try {
    const historyResponse = await fetch("https://api.amrk.app/amrkCloudWeb/historyOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${decodeURIComponent(userToken)}`,
      },
      body: JSON.stringify({ 
        userId: decodeURIComponent(userId), 
        branchId 
      }),
    });

    if (!historyResponse.ok) {
      throw new Error(`API responded with status: ${historyResponse.status}`);
    }

    const data = await historyResponse.json();
    
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch order history:", error);
    return Response.json({ error: 'Failed to fetch order history' }, { status: 500 });
  }
}