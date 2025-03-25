import { ListViewIcon, SearchIcon } from "./assets/icons";

interface Category {
  id: string;
  name: string;
}

interface ActionBarProps {
  categories: Category[];
}

export default function ActionBar({ categories }: ActionBarProps) {
  return (
    <div className="flex flex-row justify-center items-center gap-2 sticky h-15 top-0 z-50 bg-white max-w-[434px] w-full">
      <button className="p-2.5 flex justify-center items-center border-widget rounded-lg w-[10%]">
        <ListViewIcon />
      </button>
      <div className="flex flex-row gap-2 w-[80%] overflow-x-auto whitespace-nowrap">
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
      <button className="p-2.5 flex justify-center items-center border-widget rounded-lg w-[10%]">
        <SearchIcon />
      </button>
    </div>
  );
}
