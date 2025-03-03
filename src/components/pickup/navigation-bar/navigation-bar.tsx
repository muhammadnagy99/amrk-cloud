import { INavBar } from "@/src/interfaces/interfaces";
import { BackArrow } from "../product-page/icons";

export default function NavBar({ text }: INavBar) {
  return (
    <div className="flex flex-row justify-start gap-4 items-center">
      <a href="/pick-up">
        <BackArrow />
      </a>
      <h2 className="font-medium text-sm text-black">{text}</h2>
    </div>
  );
}
