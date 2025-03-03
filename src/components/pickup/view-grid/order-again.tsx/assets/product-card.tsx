import Image from "next/image";
import PImage from "@/public/product/I1.png";

export default function ProductCard() {
  return (
    <figure className="flex flex-col gap-2 snap-star min-w-[76px]">
      <Image
        className="rounded-lg"
        src={PImage}
        width={76}
        height={80}
        alt="Product-Image"
        priority={false}
        quality={80}
      />
      <figcaption className="flex flex-col gap-1">
        <h3 className="text-black font-medium text-xs break-words whitespace-normal text-start max-w-[76px]">
          وافل بلجيكي كلاسيك
        </h3>
        <p className="text-primaryColor font-medium text-[11px] break-words whitespace-normal text-start">
          34.00 ر.س
        </p>
      </figcaption>
    </figure>
  );
}
