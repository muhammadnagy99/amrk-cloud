export const dynamic = "force-dynamic";

import Header from "@/src/components/pickup/header/header";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";
import { Locale } from "@/src/i18n-config";
import { transformData } from "@/src/lib/menu-data-transform";
import BasketCTAHome from "@/src/components/pickup/user-overlay/basket-home";
import FullGridServer from "@/src/components/pickup/view-grid/full-grid-server";
import { getBranchIdFromCookies } from "@/src/lib/get-branch";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const brnid = await getBranchIdFromCookies();

  // Call the API from the server-side
  const response = await fetch(`https://api.dev.amrk.app/amrkCloudWeb/getMenuCategories?brnid=${brnid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-amrk-app-id": "amrk-eu1"
    },
    next: {
      revalidate: 3600
    }
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
  const { actionBarCategories, categoriesData = [] } = transformData(rawMenuData, lang);

  const orderAgainData = null;
  const offersData = null;

  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-6 mb-18">
          <Header lang={lang} />
          <FullGridServer
            categories={actionBarCategories}
            categoriesData={categoriesData}
            lang={lang}
          />
        </div>
        <BasketCTAHome lang={lang} />
      </ScreenWrapper>
    </MobileWrapper>
  );
}
