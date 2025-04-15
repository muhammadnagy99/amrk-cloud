"use client";

import { useEffect, useState } from "react";
import FullGrid from "@/src/components/pickup/view-grid/full-grid";
import { Locale } from "@/src/i18n-config";

interface CachedMenuContainerProps {
  lang: Locale;
  brnid: string;
}

export default function CachedMenuContainer({ lang, brnid }: CachedMenuContainerProps) {
  const [actionBarCategories, setActionBarCategories] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CACHE_KEY = `menu_cache_${brnid}_${lang}`;
  const CACHE_EXPIRY_KEY = `menu_cache_expiry_${brnid}_${lang}`;
  const CACHE_DURATION = 60 * 60 * 1000; 
  
  useEffect(() => {
    async function loadMenuData() {
      setLoading(true);
      setError(null);
      
      // First check if we have valid cached data
      const cachedData = checkCache();
      
      if (cachedData) {
        // Use cached data and return early
        setActionBarCategories(cachedData.actionBarCategories);
        setCategoriesData(cachedData.categoriesData);
        setLoading(false);
        return;
      }
      
      // If no valid cache, fetch fresh data
      try {
        const data = await fetchMenuData();
        if (data) {
          const { actionBarCategories: newActionBarCategories, categoriesData: newCategoriesData } = data;
          setActionBarCategories(newActionBarCategories);
          setCategoriesData(newCategoriesData);
          updateCache(newActionBarCategories, newCategoriesData);
        }
      } catch (err) {
        console.error("Error loading menu data:", err);
        setError("Failed to load menu data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    loadMenuData();
  }, [brnid, lang]);

  // Check if we have valid cached data
  function checkCache() {
    if (typeof window === "undefined") return null;
    
    try {
      const cachedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
      const now = new Date().getTime();
      
      if (!cachedExpiry || parseInt(cachedExpiry) < now) {
        // Cache expired or doesn't exist
        return null;
      }
      
      const cachedDataString = localStorage.getItem(CACHE_KEY);
      if (!cachedDataString) return null;
      
      const cachedData = JSON.parse(cachedDataString);
      console.log("Using cached menu data");
      return cachedData;
    } catch (err) {
      console.error("Error reading from cache:", err);
      // If there's any error reading cache, clear it
      try {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_EXPIRY_KEY);
      } catch (e) {
        console.error("Failed to clear corrupted cache:", e);
      }
      return null;
    }
  }
  
  // Update the cache with new data
  function updateCache(newActionBarCategories: any[], newCategoriesData: any[]) {
    if (typeof window === "undefined") return;
    
    try {
      const cacheData = {
        actionBarCategories: newActionBarCategories,
        categoriesData: newCategoriesData
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      localStorage.setItem(CACHE_EXPIRY_KEY, String(new Date().getTime() + CACHE_DURATION));
      console.log("Menu cache updated");
    } catch (err) {
      console.error("Error updating cache:", err);
    }
  }
  
  // Fetch fresh data from our secure Next.js API route
  async function fetchMenuData() {
    console.log("Fetching fresh menu data...");
    
    try {
      // Call our secure internal API route instead of the external API directly
      const response = await fetch(`/api/menu?brnid=${brnid}&lang=${lang}`);
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      // The data is already transformed by our API route
      return await response.json();
    } catch (err) {
      console.error("API fetch error:", err);
      throw err;
    }
  }

  if (loading) {
    return <div className="w-full text-center py-6">Loading menu data...</div>;
  }
  
  if (error) {
    return <div className="w-full text-center py-6 text-red-500">{error}</div>;
  }
  
  if (!categoriesData.length) {
    return <div className="w-full text-center py-6">No menu items available</div>;
  }

  return (
    <FullGrid 
      categories={actionBarCategories}
      categoriesData={categoriesData}
      lang={lang}
    />
  );
}