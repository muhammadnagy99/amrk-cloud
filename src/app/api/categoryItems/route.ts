import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryId = searchParams.get('categoryId');
  const lang = searchParams.get('lang');

  if (!categoryId) {
    return NextResponse.json(
      { error: 'Category ID is required' },
      { status: 400 }
    );
  }

  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "catgId": categoryId
    });
    
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: raw
    };
    
    const response = await fetch(
      "https://api.dev.amrk.app/amrkCloudWeb/getMenuItems", 
      requestOptions
    );
    
    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching category items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category items' },
      { status: 500 }
    );
  }
}