// app/api/current-order/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Get branch ID and user ID from cookies
    const cookieStore = await cookies();
    const branchId = cookieStore.get('brnid')?.value;
    const userId = cookieStore.get('user_id')?.value;

    if (!branchId || !userId) {
      return NextResponse.json(
        { error: 'Missing required cookies (branch ID or user ID)' }, 
        { status: 400 }
      );
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Baarer TOKEN_VALUE"); // Note: Replace TOKEN_VALUE with actual token or environment variable

    const requestBody = JSON.stringify({
      "branchId": branchId,
      "userId": userId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: requestBody,
    };

    const response = await fetch(
      "https://api.amrk.app/amrkCloudWeb/currentOrder", 
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching current order status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current order status' }, 
      { status: 500 }
    );
  }
}