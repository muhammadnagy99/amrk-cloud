import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('userToken')?.value;
  const userId = cookieStore.get('user_id')?.value;

  if (!userToken || !userId) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  try {
    // Fetch profile data from external API
    const profileResponse = await fetch("https://api.amrk.app/amrkCloudWeb/profileInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${decodeURIComponent(userToken)}`
      },
      body: JSON.stringify({ userId: decodeURIComponent(userId) }),
    });

    if (!profileResponse.ok) {
      throw new Error(`API responded with status: ${profileResponse.status}`);
    }

    const profileData = await profileResponse.json();
    
    return Response.json({
      authenticated: true,
      ...profileData
    });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return Response.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}