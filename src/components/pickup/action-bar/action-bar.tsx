'use client';

import { setCookie } from "cookies-next";
import { ListViewIcon, GridViewIcon, SearchIcon } from "./assets/icons"; // make sure you have GridViewIcon
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

export interface ActionBarProps {
  categories: Category[];
  onViewChange?: (view: 'grid' | 'list') => void; 
}

export default function ActionBar({ categories, onViewChange }: ActionBarProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const toggleView = () => {
    const newView = view === 'grid' ? 'list' : 'grid';
    setView(newView);
    setCookie('viewMode', newView); // persist in cookie
    onViewChange?.(newView);
  };

  return (
    <div className="flex flex-row justify-center items-center gap-2 sticky h-15 top-0 z-50 bg-white max-w-[434px] w-full">
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

      {/* <button className="p-2.5 flex justify-center items-center border-widget rounded-lg w-[10%]">
        <SearchIcon />
      </button> */}
    </div>
  );
}
