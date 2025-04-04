'use client'

import { Product } from "@/src/interfaces/interfaces";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import DEFAULT from '@/public/default.png';
import SkeletonCard from "../../../assets/skeleton-card";

interface CategoryCardProps extends Product {
  view: 'grid' | 'list';
}


export default function OfferCard({ lang, imageUrl, name, price, description, id, view }: CategoryCardProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(DEFAULT);
  const [isLoaded, setIsLoaded] = useState(false);
  const currnecy = lang === 'en' ? 'SAR' : 'ر.س' ;
  useEffect(() => {
    const img = new window.Image();
    img.src = imageUrl;

    img.onload = () => {
      setImgSrc(imageUrl);
      setIsLoaded(true);
    };

    img.onerror = () => {
      setImgSrc(DEFAULT);
      setIsLoaded(true);
    };
  }, [imageUrl]);

  if (!isLoaded) {
    return (
      <div className="w-[106px] h-[136px]">
        <SkeletonCard view={view} />
      </div>
    );
  }

  return (
    <figure className="flex flex-col gap-2 snap-start w-[106px]">
      <Image
        className="rounded-lg"
        src={imgSrc}
        width={106}
        height={80}
        alt={name}
        priority={false}
        quality={80}
      />
      <figcaption className="flex flex-col gap-1 w-full">
        <h3 className="text-black font-medium text-[13px] break-words whitespace-normal text-start">
          {name}
        </h3>
        {description && (
          <p className="text-[#00000080] font-light text-[11px] break-words whitespace-normal text-start line-clamp-2 overflow-hidden text-ellipsis max-w-[106px]">
            {description}
          </p>
        )}
      </figcaption>
      <figcaption className="text-primaryColor text-[13px] font-medium">
        {price} {currnecy}
      </figcaption>
    </figure>
  );
}
