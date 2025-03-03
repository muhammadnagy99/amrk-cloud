import ActionBar from "@/src/components/pickup/action-bar/action-bar";
import Header from "@/src/components/pickup/header/header";
import ViewGrid from "@/src/components/pickup/view-grid/view-grid";
import MobileWrapper from "../mobile-wrapper";
import ScreenWrapper from "../screen-wrapper";

export default function Home() {
  return (
    <MobileWrapper>
      <ScreenWrapper>
        <div className="flex flex-col gap-6">
          <Header />
          <ActionBar />
          <ViewGrid />
        </div>
      </ScreenWrapper>
    </MobileWrapper>
  );
}
