// app/api/validate-otp/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { otp, PhoneNumber } = await request.json();
    
    if (!otp || !PhoneNumber) {
      return NextResponse.json(
        { error: 'OTP and phone number are required' },
        { status: 400 }
      );
    }
    
    // Make the request to the external API
    const response = await fetch('https://api.amrk.app/amrkCloudWeb/validateOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp, PhoneNumber }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: 'OTP validation failed', details: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Set cookies in the response
    const response_object = NextResponse.json({ 
      success: true, 
      user_id: data.user_id
    });
    
    // Set cookies
    response_object.cookies.set('userToken', data.userToken, { 
      path: '/',
      maxAge: 3600, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    response_object.cookies.set('user_id', data.user_id, { 
      path: '/',
      maxAge: 3600, // 1 hour 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    return response_object;
  } catch (error) {
    console.error('OTP validation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}