import { NextRequest, NextResponse } from 'next/server';
import { transformData } from "@/src/lib/menu-data-transform";

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const brnid = searchParams.get('brnid');
  const lang = searchParams.get('lang');
  
  if (!brnid || !lang) {
    return NextResponse.json(
      { error: 'Branch ID and language are required' },
      { status: 400 }
    );
  }

  try {
    // Call the external API securely from the server
    const response = await fetch(`https://api.dev.amrk.app/amrkCloudWeb/getMenuCategories?brnid=${brnid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-amrk-app-id": "amrk-eu1"
        // Add any other secure headers here
      },
      next: {
        revalidate: 3600 // Server-side caching for 1 hour
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const rawMenuData = await response.json();
    
    // Transform the data before sending it to the client
    const transformedData = transformData(rawMenuData, lang);
    
    // Return the transformed data
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('API fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu data' },
      { status: 500 }
    );
  }
}