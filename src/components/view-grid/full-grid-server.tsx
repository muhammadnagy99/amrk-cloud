import { CategoryRowProps } from '@/src/interfaces/interfaces';
import FullGrid from './full-grid';

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
  categoriesData: CategoryRowProps[];
  lang: string;
}

export default function FullGridServer({ categories, categoriesData, lang }: Props) {
  return (
    <FullGrid
      categories={categories}
      categoriesData={categoriesData}
      lang={lang}
      type={2}
    />
  );
}
