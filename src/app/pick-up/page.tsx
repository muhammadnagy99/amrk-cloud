import ActionBar from "@/src/components/pickup/action-bar/action-bar";
import Header from "@/src/components/pickup/header/header";
import ViewGrid from "@/src/components/pickup/view-grid/view-grid";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";
import Wrapper from "@/src/components/pickup/user-overlay/wrapper";
import LoginForm from "@/src/components/pickup/user-overlay/login-form";
import ProfileMenu from "@/src/components/pickup/user-overlay/profile-menu";
import OTPInput from "@/src/components/pickup/user-overlay/otp-input";

export default function Home() {
  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-6">
          <Header />
          <ActionBar />
          <ViewGrid />
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
