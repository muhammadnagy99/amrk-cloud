import ActionBar from "@/src/components/pickup/action-bar/action-bar";
import Header from "@/src/components/pickup/header/header";
import ViewGrid from "@/src/components/pickup/view-grid/view-grid";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";
import { Locale } from "@/src/i18n-config";
import { cookies } from "next/headers";
import { transformData } from "@/src/lib/menu-data-transform";
import BasketCTAHome from "@/src/components/pickup/user-overlay/basket-home";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const cookieStore = cookies();
  const brnid = (await cookieStore).get('brnid')?.value || '9ObrplPiR3MyQq1Kiwdm'; // Fallback ID

  // Call the API from the server-side
  const response = await fetch(`https://api.dev.amrk.app/amrkCloudWeb/getMenuCategories?brnid=${brnid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-amrk-app-id": "amrk-eu1"
    },
    cache: "no-store" // disable caching if dynamic data
  });

  let rawMenuData;
  try {
    rawMenuData = await response.json();
  } catch (err) {
    console.error("Error parsing JSON:", err);
    rawMenuData = null;
  }

  // Use fallback or show error UI if needed
  if (!rawMenuData) {
    return <div>Failed to load menu data</div>;
  }

  // Transform the API response for your components
  const { actionBarCategories, categoriesData } = transformData(rawMenuData, lang);
  const orderAgainData = null;
  const offersData = null;

  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-6 mb-18">
          <Header lang={lang} />
          <ActionBar categories={actionBarCategories} />
          <ViewGrid
            lang={lang}
            categoriesData={categoriesData}
          />
        </div>
        <BasketCTAHome lang={lang} />
      </ScreenWrapper>
    </MobileWrapper>
  );
}
