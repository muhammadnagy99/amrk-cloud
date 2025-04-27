import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const cookieStore = await cookies();
        const { couponCode, type } = body;
        let branchId;
        if(type === '1'){
            branchId = cookieStore.get('dine_brnid')?.value
        }else if(type === '2'){
            branchId = cookieStore.get('brnid')?.value
        }

        console.log(type, branchId)

        if (!couponCode || typeof couponCode !== 'string' || !branchId) {
            return new Response(JSON.stringify({ message: 'Coupon code is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!branchId) {
            return new Response(JSON.stringify({ message: 'Invalid Request, No Branch Provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer Token");

        const response = await fetch("https://api.dev.amrk.app/amrkCloudWeb/getCouponData", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                couponCode,
                branchId
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('External API error:', errorText);
            
            return new Response(JSON.stringify({ 
                message: `Coupon validation failed (${response.status})` 
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const data = await response.json();
        
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error validating coupon:', error);
        
        return new Response(JSON.stringify({ 
            message: error instanceof Error ? error.message : 'Failed to validate coupon'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}