import { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers'; 

export async function GET() {
    const cookieStore = await cookies();
    const userToken = cookieStore.get('userToken')?.value;
    const userId = cookieStore.get('user_id')?.value;
  
    if (userToken && userId) {
      return Response.json({ 
        authenticated: true,
      });
    }
  
    return Response.json({ authenticated: false });
  }