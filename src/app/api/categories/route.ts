import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const brnid = searchParams.get('brnid');
  const lang = searchParams.get('lang');

  if (!brnid) {
    return NextResponse.json(
      { error: 'Branch ID is required' },
      { status: 400 }
    );
  }

  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "branchId": brnid
    });
    
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: raw
    };
    
    const response = await fetch(
      "https://api.amrk.app/amrkCloudWeb/getCategories", 
      requestOptions
    );
    
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}