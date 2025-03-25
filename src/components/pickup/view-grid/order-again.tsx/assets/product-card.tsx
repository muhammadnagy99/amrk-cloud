'use client'

import { Product } from "@/src/interfaces/interfaces";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import DEFAULT from '@/public/default.png';
import OfferSkeletonCard from "../../../assets/offer-skeleton";

export default function ProductCard({ lang, imageUrl, name, price }: Product) {
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

  if (!isLoaded) return <OfferSkeletonCard />;

  return (
    <figure className="flex flex-col gap-2 snap-start min-w-[76px] justify-between">
      <Image
        className="rounded-lg max-h-[76px] object-contain"
        src={imgSrc}
        width={76}
        height={76}
        alt={name}
        priority={false}
        quality={80}
      />
      <figcaption className="flex flex-col gap-1">
        <h3 className="text-black font-medium text-xs break-words whitespace-normal text-start max-w-[76px]">
          {name}
        </h3>
        <p className="text-primaryColor font-medium text-[11px] break-words whitespace-normal text-start">
          {price} {currnecy}
        </p>
      </figcaption>
    </figure>
  );
}
