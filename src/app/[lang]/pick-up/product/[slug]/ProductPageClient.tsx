'use client';

import ProductInfo from "@/src/components/pickup/product-page/product-info";
import AddCart from "@/src/components/pickup/product-page/add-cart";
import RequiredChoices from "@/src/components/pickup/product-page/required-choices";
import OptionalChoices from "@/src/components/pickup/product-page/optional-choices";
import MobileWrapper from "../../../mobile-wrapper";
import { useProductSelections } from "@/src/hooks/product-selection";

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
        options: { label: string; value: string; extraPrice?: string }[];
    };
    optionalOptions?: {
        title: string;
        name: string;
        options: { label: string; value: string; extraPrice?: string }[];
    };
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
}: ProductPageClientProps) {
    const { required, optional, handleRequiredChange, handleOptionalToggle } = useProductSelections();

    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-full h-screen overflow-y-auto pb-28">
                <ProductInfo name={name} description={description} imageSrc={imageSrc} />

                {requiredOptions && (
                    <RequiredChoices
                        title={requiredOptions.title}
                        name={requiredOptions.name}
                        options={requiredOptions.options}
                        onChange={handleRequiredChange}
                    />
                )}

                {optionalOptions && (
                    <OptionalChoices
                        title={optionalOptions.title}
                        name={optionalOptions.name}
                        options={optionalOptions.options}
                        onToggle={handleOptionalToggle}
                    />
                )}
            </div>

            <AddCart
                productId={productId}
                lang={lang}
                price={price}
                requiredOptions={requiredOptions?.options || []}
                optionalOptions={optionalOptions?.options || []}
                selectedRequired={required}
                selectedOptional={optional}
            />
        </MobileWrapper>
    );
}
