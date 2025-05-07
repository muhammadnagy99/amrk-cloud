// app/api/order-details/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderReference = searchParams.get('reference');

  if (!orderReference) {
    return NextResponse.json({ error: 'Order reference is required' }, { status: 400 });
  }

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect
  };

  try {
    const response = await fetch(
      `https://api.amrk.app/amrkCloudWeb/getOrderDetails/${orderReference}`, 
      requestOptions
    );
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching order details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order details' }, 
      { status: 500 }
    );
  }
}