// app/api/place-pickup-order/route.ts
import { NextRequest, NextResponse } from 'next/server'


function maskPhoneNumber(fullNumber: string): string {
    const match = fullNumber.match(/^(\+\d{1,4})(\d+)$/)
  
    if (!match) return fullNumber
  
    const countryCode = match[1]
    const localNumber = match[2]
    const lastFour = localNumber.slice(-4)
  
    return `${countryCode}****${lastFour}`
  }
  
  
export async function POST(req: NextRequest) {
   

  try {
    const cookies = req.cookies
    const body = await req.json()

    const basketItems = body.basketItems
    const token = cookies.get('userToken')?.value
    const branchId = cookies.get('brnid')?.value || ''
    const userId = cookies.get('user_id')?.value || ''
    const rawPhone = cookies.get('user_phone')?.value || ''
    const phone = maskPhoneNumber(rawPhone)
    const lang = cookies.get('locale')?.value === 'ar' ? 1 : 2
    const orderType = 2 // pickup
    const payType = 2 // predefined
    const tipValue = 0 // static for now

    // 1. Fetch branch info
    const branchInfoRes = await fetch('https://api.amrk.app/amrkCloudWeb/branchInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ branchId }),
    })

    const branchInfo = await branchInfoRes.json()
    const vat = branchInfo.vat || 0
    const restId = branchInfo.rest_id || ''
    const unitPrice = branchInfo.currency || 'SAR'

    // 2. Prepare basket items
    let itemsMenu: any[] = []
    let subtotal = 0

    for (const item of basketItems) {
      const productRes = await fetch('https://api.dev.amrk.app/amrkCloudWeb/getMenuInfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ menuId: item.id }),
      })

      const product = await productRes.json()

      const itemSubtotal = item.totalPrice
      subtotal += itemSubtotal

      itemsMenu.push({
        price_non_inclusive: itemSubtotal,
        has_inclusive_taxes: false,
        taxes_breakdown: [],
        menuId: product.product_id,
        offerId: "",
        cookTime: 0,
        menuData: {
          menuName: product.item_name,
          catgId: product.catg_id,
          menu_name_ar: product.item_name_ar,
          price: product.item_price,
          catgName: product.category_name || "",
        },
        cusz: [
          ...item.required.map((addon: any) => ({
            cuszName: addon.name,
            cuszNameAr: addon.value,
            plu: "",
            items: [],
          })),
        ],
        menuNote: "",
        loyalty_id: "",
        redeemable_loyalty_id: "",
        subtotal: itemSubtotal,
        packOrderTogo: true,
        orderType,
        quantitys: item.quantity,
      })
    }

    const totalPrice = parseFloat((subtotal * (1 + vat / 100)).toFixed(2))

    // 3. Construct full payload
    const payload = {
      branchId,
      userIsAnnoyms: false,
      userId,
      tableId: "",
      vat,
      userName: phone,
      unitPrice,
      orderNote: "",
      packOrderTogo: true,
      subTotal: parseFloat(subtotal.toFixed(2)),
      totalPrice,
      lang,
      restId,
      orderType,
      tipValue,
      tipType: 1,
      payType,
      locationId: "",
      deliveryDT: "",
      deliveryCost: 0,
      delivIsASAP: true,
      delivCompany: "test",
      pickupDT: "",
      pickIsASAP: true,
      curbSideId: "",
      curbSidePickup: false,
      itemsMenu,
    }

    // 4. Final order request
    const orderRes = await fetch("https://api.dev.amrk.app/orders/placePickupOrderConsumer", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Header": "Bearer",
      },
      body: JSON.stringify(payload),
    })



     const orderResult = await orderRes.text() 
    return NextResponse.json(orderResult)

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
