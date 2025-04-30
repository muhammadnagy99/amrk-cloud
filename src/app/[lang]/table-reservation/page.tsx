import Header from "@/src/components/header/header";
import CachedMenuContainer from "@/src/components/view-grid/cached-menu";
import { Locale } from "@/src/i18n-config";
import { getBranchIdFromCookies } from "@/src/lib/get-branch";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";
import BasketCTAHome from "@/src/components/user-overlay/basket-home-dine";
import TableReservationHeader from "@/src/components/header/assets/table-header";
import LangWrapper from "@/src/components/header/assets/switcher-wrapper";
import DatePicker from "@/src/components/table-reservation/data-picker";
import Options from "@/src/components/table-reservation/options";

export const dynamic = "force-dynamic";


const TYPE = 4

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const brnid = await getBranchIdFromCookies(TYPE);

  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-3 mb-18">
          <div className="flex w-full justify-end">
            <LangWrapper lang={lang} />
          </div>
          <TableReservationHeader lang={lang} type={TYPE} />
          <Options lang={lang}/>
        </div>
      </ScreenWrapper>
    </MobileWrapper>
  );
}