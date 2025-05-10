'use client'

import { useState, useMemo, useEffect } from "react";
import { CategoryRowProps, Product } from "@/src/interfaces/interfaces";
import ActionBar from "../action-bar/action-bar";
import ViewGrid from "./view-grid";
import ProductGridSkeletonLoader from "../assets/grid-skeleton";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  categoriesData: CategoryRowProps[];
  lang: string;
  type: number;
}

// Fuzzy search algorithm
function fuzzySearch(needle: string, haystack: string): number {
  needle = needle.toLowerCase();
  haystack = haystack.toLowerCase();
  
  // Direct match
  if (haystack.includes(needle)) return 1;
  
  // Start with matching
  if (haystack.startsWith(needle)) return 0.9;
  
  // Word boundary matching
  const words = haystack.split(/\s+/);
  for (const word of words) {
    if (word.startsWith(needle)) return 0.8;
  }
  
  // Character-by-character matching (typo tolerance)
  let needleIndex = 0;
  let score = 0;
  let consecutiveMatches = 0;
  
  for (let i = 0; i < haystack.length && needleIndex < needle.length; i++) {
    if (haystack[i] === needle[needleIndex]) {
      score += 1 + consecutiveMatches * 0.5;
      consecutiveMatches++;
      needleIndex++;
    } else {
      consecutiveMatches = 0;
    }
  }
  
  // Normalize score
  const maxScore = needle.length + (needle.length - 1) * 0.5;
  return needleIndex === needle.length ? score / maxScore * 0.7 : 0;
}

// Search through products
function searchProducts(
  searchTerm: string,
  categoriesData: CategoryRowProps[]
): { product: Product; categoryId: string; categoryName: string; score: number }[] {
  if (!searchTerm.trim()) return [];
  
  const results: { product: Product; categoryId: string; categoryName: string; score: number }[] = [];
  
  categoriesData.forEach(category => {
    category.products.forEach(product => {
      // Search in product name
      const nameScore = fuzzySearch(searchTerm, product.name || '');
      
      // Search in product description
      const descriptionScore = fuzzySearch(searchTerm, product.description || '') * 0.7;
      
      // Search in category name
      const categoryScore = fuzzySearch(searchTerm, category.categoryName) * 0.5;
      
      // Get the highest score
      const score = Math.max(nameScore, descriptionScore, categoryScore);
      
      if (score > 0.3) { // Threshold for relevance
        results.push({
          product,
          categoryId: category.categoryId,
          categoryName: category.categoryName,
          score
        });
      }
    });
  });
  
  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

// No results component
const NoResultsState = ({ searchValue, lang }: { searchValue: string, lang: string }) => {
  const translations = {
    en: {
      title: "No results found",
      description: `We couldn't find anything matching "${searchValue}"`,
      suggestion: "Try searching with different keywords"
    },
    ar: {
      title: "لم يتم العثور على نتائج",
      description: `لم نتمكن من العثور على أي شيء يطابق "${searchValue}"`,
      suggestion: "حاول البحث باستخدام كلمات مختلفة"
    }
  };
 
  const t = translations[lang as keyof typeof translations] || translations.en;
 
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 mb-6 text-gray-300">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${lang === 'ar' ? 'font-arabic' : ''}`}>
        {t.title}
      </h3>
      <p className={`text-gray-600 text-center max-w-md ${lang === 'ar' ? 'font-arabic' : ''}`}>
        {t.description}
      </p>
      <p className={`text-sm text-gray-500 mt-2 ${lang === 'ar' ? 'font-arabic' : ''}`}>
        {t.suggestion}
      </p>
    </div>
  );
 };

export default function FullGrid({ categories, categoriesData, lang, type }: Props) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(true);
  
  const searchLabel = lang === 'ar' ? 'نتائج البحث لـ' : 'Search results for';
  useEffect(() => {
    if (!searchValue.trim()) {
      setIsSearching(false);
      setShowResults(true);
      return;
    }
    
    setIsSearching(true);
    setShowResults(false);
    
    const timer = setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
    }, 500); 
    
    return () => clearTimeout(timer);
  }, [searchValue]);

  const searchResults = useMemo(() => {
    if (!searchValue.trim()) return null;
    
    const results = searchProducts(searchValue, categoriesData);
    
    if (results.length === 0) return null;
    
    const searchResultsCategory: CategoryRowProps = {
      lang,
      categoryId: 'search-results',
      categoryName: `${searchLabel} "${searchValue}"`,
      products: results.map(r => r.product),
      view: viewMode
    };
    
    return searchResultsCategory;
  }, [searchValue, categoriesData, lang, viewMode]);

  const handleSearch = (search: string) => {
    setSearchValue(search);
  };

  const firstCategory = searchResults || categoriesData?.[0];
  const remainingCategories = searchResults ? [] : categoriesData?.slice(1);
  
  const hasSearchNoResults = searchValue.trim() && !searchResults && !isSearching;

  return (
    <>
      <ActionBar
        categories={categories}
        lang={lang}
        onViewChange={(view) => setViewMode(view)}
        onSearch={handleSearch}
      />
      
      {isSearching && <ProductGridSkeletonLoader /> }
      
      {hasSearchNoResults && showResults && (
        <NoResultsState searchValue={searchValue} lang={lang} />
      )}
      
      {!isSearching && showResults && !hasSearchNoResults && (
        <div className={`transition-all duration-300 ease-in-out ${
          showResults ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <ViewGrid
            lang={lang}
            view={viewMode}
            categoriesData={firstCategory ? [firstCategory] : []}
            remainingCategories={remainingCategories}
            type={type}
          />
        </div>
      )}
    </>
  );
}