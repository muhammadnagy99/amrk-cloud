"use client";

import { useEffect, useState } from "react";
import FullGrid from "@/src/components/pickup/view-grid/full-grid";
import { Locale } from "@/src/i18n-config";
import { CategoryRowProps, Product } from "@/src/interfaces/interfaces";
import ProductGridSkeletonLoader from "../assets/grid-skeleton";

interface CachedMenuContainerProps {
  lang: Locale;
  brnid: string;
}


interface Category {
  id: string;
  name: string;
}

export default function CachedMenuContainer({ lang, brnid }: CachedMenuContainerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesData, setCategoriesData] = useState<CategoryRowProps[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CATEGORIES_CACHE_KEY = `menu_categories_${brnid}_${lang}`;
  const CATEGORIES_CACHE_EXPIRY_KEY = `menu_categories_expiry_${brnid}_${lang}`;
  const ITEMS_CACHE_PREFIX = `menu_items_${brnid}_${lang}_`;
  const ITEMS_CACHE_EXPIRY_PREFIX = `menu_items_expiry_${brnid}_${lang}_`;
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  useEffect(() => {
    async function loadCategories() {
      setLoadingCategories(true);
      setError(null);

      const cachedCategories = checkCategoriesCache();

      if (cachedCategories) {
        setCategories(cachedCategories);
        setLoadingCategories(false);
      } else {
        // Fetch fresh categories data
        try {
          const fetchedCategories = await fetchCategories();
          if (fetchedCategories && fetchedCategories.length > 0) {
            setCategories(fetchedCategories);
            updateCategoriesCache(fetchedCategories);
          } else {
            setError("No categories available");
          }
        } catch (err) {
          console.error("Error loading categories:", err);
          setError("Failed to load menu categories. Please try again.");
        } finally {
          setLoadingCategories(false);
        }
      }
    }

    loadCategories();
  }, [brnid, lang]);

  useEffect(() => {
    async function loadCategoryItems() {
      if (categories.length === 0 || error) return;

      setLoadingItems(true);

      const categoryItemsPromises = categories.map(async (category) => {
        const cachedItems = checkCategoryItemsCache(category.id);

        if (cachedItems) {
          return mapToCategoryRowProps(category, cachedItems);
        } else {
          try {
            const fetchedItems = await fetchCategoryItems(category.id);
            updateCategoryItemsCache(category.id, fetchedItems);
            return mapToCategoryRowProps(category, fetchedItems);
          } catch (err) {
            console.error(`Error loading items for category ${category.id}:`, err);
            return {
              lang,
              categoryId: category.id,
              categoryName: category.name,
              products: []
            };
          }
        }
      });

      try {
        const results = await Promise.all(categoryItemsPromises);
        const validResults = results.filter(category => category.products.length > 0);
        setCategoriesData(validResults);
      } catch (err) {
        console.error("Error loading all category items:", err);
        setError("Failed to load menu items. Please try again.");
      } finally {
        setLoadingItems(false);
      }
    }

    loadCategoryItems();
  }, [categories, lang, error]);

  function mapToCategoryRowProps(category: Category, apiItems: any[]): CategoryRowProps {
    const products: Product[] = apiItems.map(item => ({
      id: item.product_id,
      lang,
      imageUrl: item.item_img || "",
      name: lang === "ar" && item.item_name_ar ? item.item_name_ar : item.item_name,
      price: item.item_price.toString(),
      description: lang === "ar" && item.item_desc_ar ? item.item_desc_ar : item.item_desc,
    }));

    return {
      lang,
      categoryId: category.id,
      categoryName: category.name,
      products,
      view: 'grid'
    };
  }

  function checkCategoriesCache() {
    if (typeof window === "undefined") return null;

    try {
      const cachedExpiry = localStorage.getItem(CATEGORIES_CACHE_EXPIRY_KEY);
      const now = new Date().getTime();

      if (!cachedExpiry || parseInt(cachedExpiry) < now) {
        // Cache expired or doesn't exist
        return null;
      }

      const cachedDataString = localStorage.getItem(CATEGORIES_CACHE_KEY);
      if (!cachedDataString) return null;

      const cachedCategories = JSON.parse(cachedDataString);
      console.log("Using cached categories data");
      return cachedCategories;
    } catch (err) {
      console.error("Error reading from categories cache:", err);
      // If there's any error reading cache, clear it
      try {
        localStorage.removeItem(CATEGORIES_CACHE_KEY);
        localStorage.removeItem(CATEGORIES_CACHE_EXPIRY_KEY);
      } catch (e) {
        console.error("Failed to clear corrupted categories cache:", e);
      }
      return null;
    }
  }

  function checkCategoryItemsCache(categoryId: string) {
    if (typeof window === "undefined") return null;

    try {
      const cacheKey = `${ITEMS_CACHE_PREFIX}${categoryId}`;
      const expiryKey = `${ITEMS_CACHE_EXPIRY_PREFIX}${categoryId}`;

      const cachedExpiry = localStorage.getItem(expiryKey);
      const now = new Date().getTime();

      if (!cachedExpiry || parseInt(cachedExpiry) < now) {
        return null;
      }

      const cachedDataString = localStorage.getItem(cacheKey);
      if (!cachedDataString) return null;

      const cachedItems = JSON.parse(cachedDataString);
      console.log(`Using cached items for category ${categoryId}`);
      return cachedItems;
    } catch (err) {
      console.error(`Error reading from items cache for category ${categoryId}:`, err);
      try {
        const cacheKey = `${ITEMS_CACHE_PREFIX}${categoryId}`;
        const expiryKey = `${ITEMS_CACHE_EXPIRY_PREFIX}${categoryId}`;
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(expiryKey);
      } catch (e) {
        console.error(`Failed to clear corrupted items cache for category ${categoryId}:`, e);
      }
      return null;
    }
  }

  function updateCategoriesCache(categories: Category[]) {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(categories));
      localStorage.setItem(CATEGORIES_CACHE_EXPIRY_KEY, String(new Date().getTime() + CACHE_DURATION));
      console.log("Categories cache updated");
    } catch (err) {
      console.error("Error updating categories cache:", err);
    }
  }

  function updateCategoryItemsCache(categoryId: string, items: any[]) {
    if (typeof window === "undefined") return;

    try {
      const cacheKey = `${ITEMS_CACHE_PREFIX}${categoryId}`;
      const expiryKey = `${ITEMS_CACHE_EXPIRY_PREFIX}${categoryId}`;

      localStorage.setItem(cacheKey, JSON.stringify(items));
      localStorage.setItem(expiryKey, String(new Date().getTime() + CACHE_DURATION));
      console.log(`Items cache updated for category ${categoryId}`);
    } catch (err) {
      console.error(`Error updating items cache for category ${categoryId}:`, err);
    }
  }

  async function fetchCategories(): Promise<Category[]> {
    console.log("Fetching fresh categories data...");

    try {
      const response = await fetch(`/api/categories?brnid=${brnid}&lang=${lang}`);

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();

      return data.categories_list.map((cat: any) => ({
        id: cat.catg_id,
        name: lang === "ar" && cat.category_name_ar ? cat.category_name_ar : cat.category_name
      }));
    } catch (err) {
      console.error("Categories API fetch error:", err);
      throw err;
    }
  }

  async function fetchCategoryItems(categoryId: string): Promise<any[]> {
    console.log(`Fetching items for category ${categoryId}...`);

    try {
      const response = await fetch(`/api/categoryItems?categoryId=${categoryId}&lang=${lang}`);

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      return data.menu_items || [];
    } catch (err) {
      console.error(`API fetch error for category ${categoryId}:`, err);
      throw err;
    }
  }

  if (loadingCategories) {
    return <ProductGridSkeletonLoader />;
  }

  if (error) {
    return <div className="w-full text-center py-6 text-red-500">{error}</div>;
  }

  if (!categories.length) {
    return <div className="w-full text-center py-6">No menu categories available</div>;
  }

  return (
    <>
      {loadingItems && (
          <ProductGridSkeletonLoader />
      )}

      {!loadingItems && categoriesData.length === 0 && (
        <div className="w-full text-center py-6">No menu items available</div>
      )}

      {!loadingItems && categoriesData.length > 0 && (
        <FullGrid
          categories={categories}
          categoriesData={categoriesData}
          lang={lang}
        />
      )}
    </>
  );
}