import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('userToken')?.value;
  const userId = cookieStore.get('user_id')?.value;

  if (!userToken || !userId) {
    return Response.json({ authenticated: false }, { status: 401 });
  }

  try {
    const { name, email } = await request.json();

    // Call the external API to update profile
    const updateResponse = await fetch("https://api.amrk.app/amrkCloudWeb/updateProfileInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${decodeURIComponent(userToken)}`
      },
      body: JSON.stringify({ 
        userId: decodeURIComponent(userId), 
        name, 
        email 
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(`API responded with status: ${updateResponse.status}`);
    }
    const result = await updateResponse.text();
    console.log(result);

    if (result === "Updated") {
      return Response.json({ success: true, message: "Profile updated successfully" });
    } else {
      return Response.json({ success: false, message: "Profile update failed" }, { status: 400 });
    }

  } catch (error) {
    console.error("Update failed:", error);
    return Response.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}