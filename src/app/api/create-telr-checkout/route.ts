// app/api/create-telr-checkout/route.ts
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get data from request body
    const { amount, vat } = await request.json();
    
    // Get necessary data from cookies
    const cookieStore = await cookies();
    const branchId = cookieStore.get('brnid')?.value;
    const userId = cookieStore.get('user_id')?.value ;
    const basketId = cookieStore.get('basket_id')?.value ;
    const token = cookieStore.get('userToken')?.value

    
    // Set up headers for the external API call
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    
    // Prepare the request body
    const requestBody = JSON.stringify({
      waiterOrders: [],
      orderId: "",
      splitItems: [],
      otherOrders: [],
      tableId: "0",
      userId: userId,
      isMobile: false,
      branchId: branchId,
      tipValue: 0,
      tax: vat,
      payUsingPoints: false,
      serVal: 0,
      netTipVal: 0,
      basketId: basketId,
      tipType: false,
      amount: amount,
      unitPric: "SAR",
      contry: "SA",
      devMode: true,
      srvPrs: null,
      payUsingGiftCards: false
    });

    console.log(requestBody);
    
    // Make the API call to Amrk
    const response = await fetch("https://api.amrk.app/amrkCloudWeb/createTelrCheckoutIframeV1", {
      method: "POST",
      headers: headers,
      body: requestBody
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Return the result
    const result = await response.json();
    console.log(result)
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error creating Telr checkout:', error);
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}