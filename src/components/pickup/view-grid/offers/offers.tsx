import OfferCard from "./assets/offer-card";

export default function Offers() {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h2 className="text-black font-medium text-base">العروض 🎁 </h2>
      <div className="grid grid-cols-3 gap-3 w-full">
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </div>
    </div>
  );
}
