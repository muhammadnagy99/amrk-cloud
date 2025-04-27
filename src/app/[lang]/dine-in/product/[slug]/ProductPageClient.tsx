'use client';

import AddCart from "@/src/components/product-page/add-cart";
import OptionalChoices from "@/src/components/product-page/optional-choices";
import ProductInfo from "@/src/components/product-page/product-info";
import RequiredChoices from "@/src/components/product-page/required-choices";
import { ProductOverlayProvider } from "@/src/components/view-grid/category.tsx/product-overlay";
import { useProductSelections } from "@/src/hooks/product-selection";
import { useEffect } from "react";
import MobileWrapper from "../../../mobile-wrapper";

interface ProductPageClientProps {
    productId: string;
    lang: string;
    name: string;
    description: string;
    imageSrc: string;
    price: number;
    requiredOptions?: {
        title: string;
        name: string;
        options: {
            label: string;
            value: string;
            extraPrice?: string;
        }[];
    }[];
    optionalOptions?: {
        title: string;
        name: string;
        options: {
            label: string;
            value: string;
            extraPrice?: string;
        }[];
    }[];
    onClose: () => void;
    type: number;
}

const preloadImage = (src: string) => {
    if (typeof window !== 'undefined') {
        const img = new Image();
        img.src = src;
    }
};

export default function ProductPageClient({
    productId,
    lang,
    name,
    description,
    imageSrc,
    price,
    requiredOptions,
    optionalOptions,
    onClose, 
    type
}: ProductPageClientProps) {
    const { required, optional, handleRequiredChange, handleOptionalToggle } = useProductSelections();
    useEffect(() => {
        if (imageSrc) {
            preloadImage(imageSrc);
        }
    }, [imageSrc]);

    console.log(type)
    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-full h-screen overflow-y-auto pb-28">
               
                <ProductInfo name={name} description={description} imageSrc={imageSrc} lang={lang} onClose={onClose}/>

                {requiredOptions?.map((group, index) => (
                    <RequiredChoices
                        lang={lang}
                        key={index}
                        title={group.title}
                        name={group.name}
                        options={group.options}
                        onChange={handleRequiredChange}
                    />
                ))}

                {optionalOptions?.map((group, index) => (
                    <OptionalChoices
                        lang={lang}
                        key={index}
                        title={group.title}
                        name={group.name}
                        options={group.options}
                        onToggle={handleOptionalToggle}
                    />
                ))}

            </div>
            <ProductOverlayProvider lang={lang} type={type}>
                <AddCart
                    productId={productId}
                    lang={lang}
                    price={price}
                    requiredOptions={requiredOptions?.flatMap((group) => group.options) || []}
                    optionalOptions={optionalOptions?.flatMap((group) => group.options) || []}
                    selectedRequired={required}
                    selectedOptional={optional}
                    type={type}
                />
            </ProductOverlayProvider>

        </MobileWrapper>
    );
}
