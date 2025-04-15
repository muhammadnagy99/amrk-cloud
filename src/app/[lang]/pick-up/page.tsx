export const dynamic = "force-dynamic";
import Header from "@/src/components/pickup/header/header";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";
import { Locale } from "@/src/i18n-config";
import BasketCTAHome from "@/src/components/pickup/user-overlay/basket-home";
import { getBranchIdFromCookies } from "@/src/lib/get-branch";
import CachedMenuContainer from "@/src/components/pickup/view-grid/cached-menu";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const brnid = await getBranchIdFromCookies();

  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-6 mb-18">
          <Header lang={lang} />
          <CachedMenuContainer 
            lang={lang}
            brnid={brnid}
          />
        </div>
        <BasketCTAHome lang={lang} />
      </ScreenWrapper>
    </MobileWrapper>
  );
}