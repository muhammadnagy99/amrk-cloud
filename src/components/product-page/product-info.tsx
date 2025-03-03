import Link from "next/link";
import Image from "next/image";
import PImage from "@/public/product/P1.png";
import { BackArrow } from "./icons";

export default function ProductInfo() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <figure className="relative">
        <Image
          className="w-full"
          src={PImage}
          width={390}
          height={240}
          alt="Product-Image"
          priority={true}
          quality={80}
        />
        <Link href="/pick-up" className="absolute top-4 right-4 ">
          <BackArrow />
        </Link>
        <figcaption className="text-transparent absolute">
          Product-Image
        </figcaption>
      </figure>
      <article className="flex flex-col gap-3 w-[88%]">
        <h2 className="text-black text-xl font-medium">
        قهوة لاتيه
        </h2>
        <p className="text-black text-sm font-light">
        إسبريسو ممزوج بحليب بخاري ورغوة خفيفة. - 50kcal
        </p>
      </article>
    </div>
  );
}
