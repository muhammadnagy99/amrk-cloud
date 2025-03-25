import ActionBar from "@/src/components/pickup/action-bar/action-bar";
import Header from "@/src/components/pickup/header/header";
import ViewGrid from "@/src/components/pickup/view-grid/view-grid";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";
import Wrapper from "@/src/components/pickup/user-overlay/wrapper";
import LoginForm from "@/src/components/pickup/user-overlay/login-form";
import ProfileMenu from "@/src/components/pickup/user-overlay/profile-menu";
import OTPInput from "@/src/components/pickup/user-overlay/otp-input";
import { Locale } from "@/src/i18n-config";
import { cookies } from "next/headers";
import { transformData } from "@/src/menu-data-transform";

import sampleMenuData from '@/src/sample-menu.json';

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
  
}) {
  const params = await props.params;
  const lang = params.lang;
  console.log(lang);
  const cookieStore = cookies();
  const brnid = (await cookieStore).get('brnid')?.value;
  console.log(brnid);

  // Transform the data for our components
  const { actionBarCategories, categoriesData } = 
    transformData(sampleMenuData, lang);
    const orderAgainData = null
    const offersData = null
  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-6">
          <Header />
          <ActionBar categories={actionBarCategories} />
          <ViewGrid
            lang={lang}
            categoriesData={categoriesData}
          />
        </div>
        {/* <Wrapper>
          <LoginForm />
          <OTPInput />
           <ProfileMenu />
        </Wrapper> */}
      </ScreenWrapper>
    </MobileWrapper>
  );
}