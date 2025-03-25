import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { BackArrow } from "./icons";

interface ProductInfoProps {
  name: string;
  description: string;
  imageSrc: StaticImageData | string;
  imageAlt?: string;
}

export default function ProductInfo({
  name,
  description,
  imageSrc,
  imageAlt = "Product-Image",
}: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <figure className="relative w-full">
        <Image
          className="w-full h-[240px] object-contain"
          src={imageSrc}
          width={390}
          height={240}
          alt={imageAlt}
          priority={true}
          quality={100}
        />
        <Link href="/pick-up" className="absolute top-4 right-4">
          <BackArrow />
        </Link>
        <figcaption className="text-transparent absolute">
          {imageAlt}
        </figcaption>
      </figure>
      <article className="flex flex-col gap-3 w-[88%]">
        <h2 className="text-black text-xl font-medium">{name}</h2>
        <p className="text-black text-sm font-light">{description}</p>
      </article>
    </div>
  );
}
