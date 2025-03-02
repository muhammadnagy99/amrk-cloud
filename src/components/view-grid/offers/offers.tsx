import OfferCard from "./assets/offer-card";

export default function Offers() {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h2 className="text-black font-medium text-base">العروض 🎁 </h2>
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory w-full flex-nowrap">
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
