'use client'
import { Locale } from "@/src/i18n-config";
import ProductPageClient from "./ProductPageClient";
import { useState, useEffect } from "react";
import { cacheManager } from "@/src/cacheManager";

// Define types for better type safety
export type ProductData = {
    product_id: string;
    item_name: string;
    item_name_ar: string;
    item_desc: string;
    item_desc_ar: string;
    item_img?: string;
    item_price: number;
    cusomisation_grouping_list?: any[];
};

type ProductOption = {
    label: string;
    value: string;
    extraPrice: string;
};

type ProductOptionGroup = {
    title: string;
    name: string;
    options: ProductOption[];
};

interface ProcessedProductData {
    productId: string;
    name: string;
    description: string;
    imageSrc: string;
    price: number;
    requiredOptions?: ProductOptionGroup[];
    optionalOptions?: ProductOptionGroup[];
}

const CACHE_TTL = 10 * 60 * 1000; 


async function fetchProductData(slug: string): Promise<ProductData> {
    const cachedData = cacheManager.get<ProductData>(`product-${slug}`, CACHE_TTL);
    if (cachedData) {
        console.log("Using cached product data for:", slug);
        return cachedData;
    }

    try {
        const res = await fetch(`/api/products/${slug}`);

        if (!res.ok) {
            throw new Error("Failed to fetch product info");
        }

        const data: ProductData = await res.json();
        cacheManager.set(`product-${slug}`, data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function processProductData(product: ProductData, lang: string) {
    const name = lang === "ar" ? product.item_name_ar : product.item_name;
    const description = lang === "ar" ? product.item_desc_ar : product.item_desc;
    const imageSrc = product.item_img || "/default.png";
    const price = product.item_price || 0;

    const requiredOptions = product.cusomisation_grouping_list
        ?.filter((group) => group.min > 0)
        .map((group) => ({
            title: lang === "ar" ? group.cusomisation_grouping_name_ar : group.cusomisation_grouping_name,
            name: group.cusomisation_grouping_name,
            options: (group.items || []).map((item: any) => ({
                label: lang === "ar" ? item.item_name_ar : item.item_name,
                value: lang === "ar" ? item.item_name_ar : item.item_name,
                extraPrice: item.price?.toString() ?? "0",
            })),
        }));

    const optionalOptions = product.cusomisation_grouping_list
        ?.filter((group) => group.min === 0)
        .map((group) => ({
            title: lang === "ar" ? group.cusomisation_grouping_name_ar : group.cusomisation_grouping_name,
            name: group.cusomisation_grouping_name,
            options: (group.items || []).map((item: any) => ({
                label: lang === "ar" ? item.item_name_ar : item.item_name,
                value: lang === "ar" ? item.item_name_ar : item.item_name,
                extraPrice: item.price?.toString() ?? "0",
            })),
        }));

    return {
        productId: product.product_id,
        name,
        description,
        imageSrc,
        price,
        requiredOptions,
        optionalOptions
    };
}

const LoadingOverlay = () => (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-white backdrop-blur-sm">
        <div className="w-16 h-16 border-4 border-[#b0438a] border-t-transparent rounded-full animate-spin" />
    </div>
);

interface ProductPageProps {
    productId: string;
    lang: string;
    isOverlay: boolean;
    onClose: () => void;
    onEdit: boolean;
    basketId: string | null;
}

export default function ProductPage({
    productId,
    lang,
    isOverlay,
    onClose,
    onEdit,
    basketId
}: ProductPageProps) {
   

    const [processedData, setProcessedData] = useState<ProcessedProductData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const product = await fetchProductData(productId);
                const data = processProductData(product, lang);
                setProcessedData(data);
            } catch (err) {
                setError("Failed to fetch product data");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [productId, lang]);

    if (isLoading) return <LoadingOverlay />;
    if (error) return <div>Error: {error}</div>;
    if (!processedData) return <div>No product data found</div>;

    return (
        <ProductPageClient
            productId={processedData.productId}
            lang={lang}
            name={processedData.name}
            description={processedData.description}
            imageSrc={processedData.imageSrc}
            price={processedData.price}
            requiredOptions={processedData.requiredOptions}
            optionalOptions={processedData.optionalOptions}
            onClose={onClose}
            type={1}
            onEdit={onEdit}
            basketId={basketId}
        />
    );
}