import Header from "@/src/components/header/header";
import CachedMenuContainer from "@/src/components/view-grid/cached-menu";
import { Locale } from "@/src/i18n-config";
import { getBranchIdFromCookies } from "@/src/lib/get-branch";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";
import BasketCTAHome from "@/src/components/user-overlay/basket-home-pickup";

export const dynamic = "force-dynamic";

const TYPE = 2

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const brnid = await getBranchIdFromCookies(TYPE);

  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-6 mb-18">
          <Header lang={lang} type={TYPE} />
          <CachedMenuContainer 
            lang={lang}
            brnid={brnid}
            type={TYPE}
          />
        </div>
        <BasketCTAHome lang={lang} type={TYPE} />
      </ScreenWrapper>
    </MobileWrapper>
  );
}