import { Product, CategoryRowProps, OrderAgainRowProps, OffersRowProps } from "./interfaces/interfaces";

interface MenuItem {
  product_id: string;
  item_name: string;
  item_name_ar: string;
  item_desc: string;
  item_desc_ar: string;
  item_img: string;
  item_price: number;
  category_name: string;
}

interface Category {
  catgory_name: string;
  catg_id: string;
  items: MenuItem[];
}

interface ApiResponse {
  branch_name: string;
  branch_name_ar: string;
  menu_items: Category[];
  categories_list: any[];
}

export function transformData(data: ApiResponse, lang: string = 'en') {
  // Transform categories for ActionBar
  const actionBarCategories = data.menu_items.map(category => ({
    id: category.catg_id || '', 
    name: lang === 'ar' ? category.catgory_name : category.catgory_name, // Just using catgory_name for now since there's no AR version in sample
  }));

  // Transform menu items into product format
  const transformItem = (item: MenuItem): Product => ({
    lang: lang,
    id: item.product_id,
    imageUrl: item.item_img || '', // Fallback to empty string if no image
    name: lang === 'ar' ? item.item_name_ar : item.item_name,
    price: `${item.item_price}`,
    description: lang === 'ar' ? item.item_desc_ar : item.item_desc,
  });

  // Create data for each category row
  const categoriesData: CategoryRowProps[] = data.menu_items.map(category=> ({
    lang,
    categoryId: category.catg_id,
    categoryName: lang === 'ar' ? category.catgory_name : category.catgory_name, // Using same name for now
    products: category.items.map(transformItem),
  }));



  return {
    actionBarCategories,
    categoriesData,

  };
}