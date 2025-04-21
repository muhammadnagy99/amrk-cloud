'use client'

import { Product } from "@/src/interfaces/interfaces";
import Image, { StaticImageData } from "next/image";
import DEFAULT from '@/public/default.png'
import { useEffect, useState } from "react";
import SkeletonCard from "../../../assets/skeleton-card";
import { RiyalCurrency } from "../../../basket-page/icons";

interface CategoryCardProps extends Product {
  view?: 'grid' | 'list';
}

export default function CategoryCard({ id, lang, imageUrl, name, price, description, view = 'grid' }: CategoryCardProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(DEFAULT);
  const [isLoaded, setIsLoaded] = useState(false);
  const currnecy = lang === 'en' ? 'SAR' : 'ر.س';

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

  if (!isLoaded) return <SkeletonCard view={view}/>;
  
  return (
    <figure className={`${view === 'list' ? "flex flex-row-reverse gap-3 justify-between items-center w-full" : "flex flex-col gap-2 snap-start"}`}>
      
      <Image
        className={`rounded-lg ${view === 'list' ? 'w-[106px]' : ''}`}
        src={imgSrc}
        width={view === 'list' ? 80 : 106}
        height={view === 'list' ? 80 : 80}
        alt={name}
        quality={80}
      />
      
      <div className="flex flex-col items-start">
        <figcaption className="flex flex-col gap-1 w-full">
          <h3 className="text-black font-medium text-[13px] break-words whitespace-normal text-start">
            {name}
          </h3>
          {description && (
            <p
              className="text-[#00000080] font-light text-[11px] break-words whitespace-normal text-start
              line-clamp-2 overflow-hidden text-ellipsis max-w-[106px]"
            >
              {description}
            </p>
          )}
        </figcaption>
        <p className="text-primaryColor text-[13px]">
          <p className="flex items-center gap-1" dir="ltr">
            <RiyalCurrency color="#b0438a" />
            <span>{price}</span>
          </p>
        </p>
      </div>
    </figure>
  );
}