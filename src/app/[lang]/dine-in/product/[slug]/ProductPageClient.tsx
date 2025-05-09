'use client';

import AddCart from "@/src/components/product-page/add-cart";
import OptionalChoices from "@/src/components/product-page/optional-choices";
import ProductInfo from "@/src/components/product-page/product-info";
import RequiredChoices from "@/src/components/product-page/required-choices";
import { ProductOverlayProvider } from "@/src/components/view-grid/category.tsx/product-overlay";
import { useProductSelections } from "@/src/hooks/product-selection";
import { useEffect, useState, useRef } from "react";
import MobileWrapper from "../../../mobile-wrapper";


interface BasketItem {
    basket_id: string;
    id: string;
    quantity: number;
    required: Array<{
        label: string;
        name: string;
        value: string;
        extraPrice?: string;
    }>;
    optional: Array<{
        label: string;
        name: string;
        value: string;
        extraPrice?: string;
    }>;
    totalPrice: number;
}

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
    onEdit: boolean;
    basketId: string | null;
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
    type,
    onEdit,
    basketId
}: ProductPageClientProps) {
    const { required, optional, handleRequiredChange, handleOptionalToggle } = useProductSelections();

    // Create maps to store selected values for each option group
    const [requiredSelections, setRequiredSelections] = useState<Record<string, string>>({});
    const [optionalSelections, setOptionalSelections] = useState<Record<string, string[]>>({});

    // Use a ref to track if we've already loaded from localStorage
    const initialLoadDone = useRef(false);

    // Check if product exists in basket and pre-select options
    useEffect(() => {
        // Only run this effect once on component mount
        if (typeof window !== 'undefined' && !initialLoadDone.current && onEdit) {
            try {
                // Get basket items from localStorage
                const basketItems: BasketItem[] = JSON.parse(localStorage.getItem(`dine_basket_items`) || '[]');
                // Find if this product is already in the basket
                const existingProduct = basketItems.find(item => item.basket_id === basketId);
                if (existingProduct) {
                    // Process required options
                    if (existingProduct.required && existingProduct.required.length > 0) {
                        // Create a map of name -> value for required options
                        const requiredMap: Record<string, string> = {};

                        // Batch all the calls to handleRequiredChange to avoid multiple re-renders
                        existingProduct.required.forEach(option => {
                            requiredMap[option.name] = option.value;
                            handleRequiredChange(option.label, option.name, option.value);
                        });

                        setRequiredSelections(requiredMap);
                    }

                    // Process optional options
                    if (existingProduct.optional && existingProduct.optional.length > 0) {
                        // Group optional selections by name
                        const optionalMap: Record<string, string[]> = {};

                        // Batch all the calls to handleOptionalToggle to avoid multiple re-renders
                        existingProduct.optional.forEach(option => {
                            if (!optionalMap[option.name]) {
                                optionalMap[option.name] = [];
                            }
                            optionalMap[option.name].push(option.value);
                            handleOptionalToggle(option.label, option.name, option.value);
                        });

                        setOptionalSelections(optionalMap);
                    }
                }

                // Mark that we've completed the initial load
                initialLoadDone.current = true;
            } catch (error) {
                console.error("Error reading from localStorage:", error);
                initialLoadDone.current = true; // Mark as done even on error
            }
        }
    }, [basketId]);

    useEffect(() => {
        if (imageSrc) {
            preloadImage(imageSrc);
        }
    }, [imageSrc]);

    const fun = () => {
        console.log('clicked');
    };

    return (
        <MobileWrapper>
            <div className="flex flex-col gap-8 w-full h-screen overflow-y-auto pb-28">
                <ProductInfo
                    name={name}
                    description={description}
                    imageSrc={imageSrc}
                    lang={lang}
                    onClose={onClose}
                />

                {requiredOptions?.map((group, index) => (
                    <RequiredChoices
                        lang={lang}
                        key={index}
                        title={group.title}
                        name={group.name}
                        options={group.options}
                        onChange={handleRequiredChange}
                        selectedValue={requiredSelections[group.name]}
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
                        selectedValues={optionalSelections[group.name] || []}
                    />
                ))}
            </div>

            <ProductOverlayProvider lang={lang} type={type} onToggle={fun} onEdit={onEdit} basketId={basketId}>
                <AddCart
                    productId={productId}
                    lang={lang}
                    price={price}
                    requiredOptions={requiredOptions?.flatMap((group) => group.options) || []}
                    optionalOptions={optionalOptions?.flatMap((group) => group.options) || []}
                    selectedRequired={required}
                    selectedOptional={optional}
                    type={type}
                    onClose={onClose}
                    edited={onEdit}
                    basketId={basketId}
                />
            </ProductOverlayProvider>
        </MobileWrapper>
    );
}