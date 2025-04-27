'use client'

import Image, { StaticImageData } from "next/image";
import { BackArrow } from "./icons";
import { useState, useEffect } from "react";

interface ProductInfoProps {
  name: string;
  description: string;
  imageSrc: StaticImageData | string;
  imageAlt?: string;
  lang: string;
  onClose: () => void;
}

export default function ProductInfo({
  name,
  description,
  imageSrc,
  imageAlt = "Product-Image",
  lang,
  onClose
}: ProductInfoProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [imageSrc]);

  return (
    <>
      <button className={`absolute top-4 z-[1000] ${lang === 'en' ? 'rotate-180 left-4' : 'right-4'}`} onClick={onClose}>
        <BackArrow />
      </button>
      <div className="flex flex-col gap-4 w-full items-center">
        <figure className="relative w-full">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}

          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}

          <Image
            className={`w-full h-[240px] object-contain ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
            src={imageSrc}
            width={390}
            height={240}
            alt={imageAlt}
            priority={true}
            quality={70}
            loading="eager"
            onLoadingComplete={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            unoptimized={typeof imageSrc === 'string' && imageSrc.includes('firebasestorage')}
          />
          <figcaption className="text-transparent absolute">
            {imageAlt}
          </figcaption>
        </figure>
        <article className="flex flex-col gap-3 w-[88%]">
          <h2 className="text-black text-xl font-medium">{name}</h2>
          <p className="text-black text-sm font-light">{description}</p>
        </article>
      </div>
    </>
  );
}
