'use client';

import { setCookie } from "cookies-next";
import { ListViewIcon, GridViewIcon, SearchIcon } from "./assets/icons";
import { useState, useRef, useEffect } from "react";
import { ChangeEvent } from 'react';

interface Category {
  id: string;
  name: string;
}

export interface ActionBarProps {
  categories: Category[];
  lang: string;
  onViewChange?: (view: 'grid' | 'list') => void;
  onSearch: (search: string) => void;
}

export default function ActionBar({ categories, onViewChange, onSearch, lang }: ActionBarProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const toggleView = () => {
    const newView = view === 'grid' ? 'list' : 'grid';
    setView(newView);
    setCookie('viewMode', newView);
    onViewChange?.(newView);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
  };

  const handleCloseSearch = () => {
    setIsSearching(false);
    setSearchValue('');
    onSearch(''); // Clear search in parent when closing
    // Clear any pending debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };

  // Focus input when search mode is activated
  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearching) {
        handleCloseSearch();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSearching]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      onSearch(value);
    }, 1000);
  };

  const handleSearchSubmit = () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    onSearch(searchValue);
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-row justify-center items-center gap-2 sticky h-15 top-0 z-50 bg-white max-w-[434px] w-full">
      {/* Main content */}
      <div
        className={`flex flex-row justify-center items-center gap-2 w-full transition-all duration-300 ease-in-out ${
          isSearching ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        <button
          className="p-2.5 flex justify-center items-center border-widget rounded-lg w-[10%]"
          onClick={toggleView}
        >
          {view === 'grid' ? <ListViewIcon /> : <GridViewIcon />}
        </button>

        <div className="flex flex-row gap-2 w-[90%] overflow-x-auto whitespace-nowrap">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="p-2.5 flex justify-center items-center border-widget rounded-lg text-xs font-normal"
            >
              {category.name}
            </a>
          ))}
        </div>

        <button
          className="p-2.5 flex justify-center items-center border-widget rounded-lg w-[10%]"
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </button>
      </div>

      {/* Search input */}
      <div
        className={`absolute inset-0 flex items-center bg-white transition-all duration-300 ease-in-out ${
          isSearching ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex items-center w-full gap-2">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search..."
              className={`w-full px-4 py-2 ${lang == 'ar' ? 'pl-10': 'pr-10'} text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#b0438a]`}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
            />
            <button
              onClick={handleCloseSearch}
              className={`absolute ${lang === 'ar' ? 'left-3' : 'right-3' } top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
            >
              ✕
            </button>
          </div>
          <button
            className="p-2.5 flex justify-center items-center border-widget rounded-lg"
            onClick={handleSearchSubmit}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}