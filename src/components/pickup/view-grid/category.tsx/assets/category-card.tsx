import Image from "next/image";
import O1 from "@/public/product/offer.png";

export default function CategoryCard() {
  return (
    <figure className="flex flex-col gap-2 snap-start min-w-[106px]">
      <Image
        className="rounded-lg"
        src={O1}
        width={106}
        height={80}
        alt="Product-Image"
        priority={false}
        quality={80}
      />
      <figcaption className="flex flex-col gap-1 w-full">
        <h3 className="text-black font-medium text-[13px] break-words whitespace-normal text-start">
          وجبة الدجاج بلس
        </h3>
        <p
          className="text-[#00000080] font-light text-[11px] break-words whitespace-normal text-start 
          line-clamp-2 overflow-hidden text-ellipsis max-w-[106px]"
        >
          استمتع بوجبة دجاج لذيذة مع أرز متبل، مشروب منعش
        </p>
      </figcaption>
      <figcaption className="text-primaryColor text-[13px] font-medium ">
        49.00 ر.س
      </figcaption>
    </figure>
  );
}
