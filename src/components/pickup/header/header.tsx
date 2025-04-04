import BranchDetails from "./branch-details";
import Offers from "./offers";
import UserCTA from "./user-cta";

export default function Header({lang}: {lang: string}) {
  return (
    <header className="flex flex-col gap-2">
      <UserCTA lang={lang} />
      <BranchDetails lang={lang}/>
      {/* <Offers /> */}
    </header>
  );
}
