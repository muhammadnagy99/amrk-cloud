import BranchDetails from "../branch-details";
import UserCTA from "../user-cta";

export default function TableReservationHeader({lang, type}: {lang: string, type: number}) {
    return (
      <header className="flex flex-col gap-2">
        <BranchDetails lang={lang} type={type}/>
      </header>
    );
  }