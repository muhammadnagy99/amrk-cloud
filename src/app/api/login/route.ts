// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { PhoneNumber } = await request.json();
    
    if (!PhoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }
    
    // Make the request to the external API
    const response = await fetch('https://api.amrk.app/amrkCloudWeb/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ PhoneNumber }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'Login failed', details: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    const response_object = NextResponse.json({ success: true, user_id: data.user_id });
    
    response_object.cookies.set('user_id', data.user_id, { 
      path: '/',
      maxAge: 259200, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    response_object.cookies.set('user_phone', PhoneNumber, { 
      path: '/',
      maxAge: 259200, // 1 hour 
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    return response_object;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}