import { NextRequest, NextResponse } from 'next/server';

export interface ProductData {
  product_id: string;
  item_name: string;
  item_name_ar: string;
  item_desc: string;
  item_desc_ar: string;
  item_img?: string;
  item_price: number;
  cusomisation_grouping_list?: any[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  if (!slug) {
    return NextResponse.json(
      { error: 'Menu ID is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://api.dev.amrk.app/amrkCloudWeb/getMenuInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer TOKEN`,
      },
      body: JSON.stringify({ slug }),
      next: { revalidate: 60 },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product info: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}