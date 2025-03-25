import BranchDetails from "./branch-details";
import Offers from "./offers";
import UserCTA from "./user-cta";

export default function Header() {
  return (
    <header className="flex flex-col gap-2">
      <UserCTA />
      <BranchDetails />
      {/* <Offers /> */}
    </header>
  );
}
