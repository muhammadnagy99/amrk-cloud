'use client';

import ProductInfo from "@/src/components/pickup/product-page/product-info";
import AddCart from "@/src/components/pickup/product-page/add-cart";
import RequiredChoices from "@/src/components/pickup/product-page/required-choices";
import OptionalChoices from "@/src/components/pickup/product-page/optional-choices";
import MobileWrapper from "../../../mobile-wrapper";
import { useProductSelections } from "@/src/hooks/product-selection";
import { BackArrow } from "@/src/components/pickup/product-page/icons";
import { ProductOverlayProvider } from "@/src/components/pickup/view-grid/category.tsx/product-overlay";

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
}


export default function ProductPageClient({
    productId,
    lang,
    name,
    description,
    imageSrc,
    price,
    requiredOptions,
    optionalOptions,
    onClose
}: ProductPageClientProps) {
    const { required, optional, handleRequiredChange, handleOptionalToggle } = useProductSelections();

    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-full h-screen overflow-y-auto pb-28">
                <button className={`absolute top-4 z-[1000] ${lang === 'en' ? 'rotate-180 left-4' : 'right-4'}`} onClick={onClose}>
                    <BackArrow />
                </button>
                <ProductInfo name={name} description={description} imageSrc={imageSrc} />

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
            <ProductOverlayProvider lang={lang}>
                <AddCart
                    productId={productId}
                    lang={lang}
                    price={price}
                    requiredOptions={requiredOptions?.flatMap((group) => group.options) || []}
                    optionalOptions={optionalOptions?.flatMap((group) => group.options) || []}
                    selectedRequired={required}
                    selectedOptional={optional}
                />
            </ProductOverlayProvider>

        </MobileWrapper>
    );
}
