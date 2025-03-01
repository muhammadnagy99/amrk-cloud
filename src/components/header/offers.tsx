import LoyaltyCard from "./assets/loyalty-card";
import PointsCard from "./assets/points-card";

export default function Offers() {
  return (
    <div className="flex flex-row w-full justify-between">
        <LoyaltyCard />
        <PointsCard />
    </div>
  );
}
