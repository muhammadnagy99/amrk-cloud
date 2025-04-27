import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('userToken')?.value;
  const userId = cookieStore.get('user_id')?.value;
  const branchId = cookieStore.get('brnid')?.value;
  
  if (!userToken || !userId || !branchId) {
    return Response.json({ error: 'Missing authentication or branch information' }, { status: 401 });
  }

  try {
    const historyResponse = await fetch("https://api.amrk.app/amrkCloudWeb/historyOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer TOKEN`,
      },
      body: JSON.stringify({
        "branchId": branchId,
        "userId": userId
      }),
    });
    
    console.log(historyResponse);
    
    if (!historyResponse.ok) {
      throw new Error(`API responded with status: ${historyResponse.status}`);
    }
    
    const data = await historyResponse.json();
    console.log('this is =>' + JSON.stringify(data));
    
    return Response.json(data);
  } catch (error: any) {
    console.error("Failed to fetch order history:", error);
    return Response.json({ error: 'Failed to fetch order history', details: error.message }, { status: 500 });
  }
}