import BranchDetails from "./branch-details";
import Offers from "./offers";
import UserCTA from "./user-cta";

export default function Header({lang, type}: {lang: string, type: number}) {
  return (
    <header className="flex flex-col gap-2">
      <UserCTA lang={lang} type={type} />
      <BranchDetails lang={lang} type={type}/>
      {/* <Offers /> */}
    </header>
  );
}
