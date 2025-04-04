'use client'

import { useState } from "react";
import { CategoryRowProps } from "@/src/interfaces/interfaces";
import ActionBar from "../action-bar/action-bar";
import ViewGrid from "./view-grid";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  categoriesData: CategoryRowProps[];
  lang: string;
}

export default function FullGrid({ categories, categoriesData, lang }: Props) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const firstCategory = categoriesData?.[0];
  const remainingCategories = categoriesData?.slice(1);

  return (
    <>
      <ActionBar
        categories={categories}
        onViewChange={(view) => setViewMode(view)} // pass state setter
      />
      <ViewGrid
        lang={lang}
        view={viewMode} // pass current view to ViewGrid
        categoriesData={firstCategory ? [firstCategory] : []}
        remainingCategories={remainingCategories}
      />
    </>
  );
}
