import { ReactNode } from "react";

export interface OverlayWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface WrapperProps {
  children: React.ReactNode;
}


export interface INavBar {
  text: string
}

export interface InputFieldProps {
  label: string;
  icon: React.FC;
  value: string;
}


export interface Addon {
  name: string;
  price: number;
  number: number;
}


export interface OrderItemsDropdownProps {
  items: { name: string; price: number; number: number; addons: Addon[] }[];
}

export interface Product {
  id: string;
  lang: string
  imageUrl: string;
  name: string;
  price: string;
  description?: string;
}

export interface CategoryRowProps {
  lang: string;
  categoryId: string;
  categoryName: string;
  products: Product[];
}

export interface OrderAgainRowProps {
  lang: string;
  products: Product[];
}

export interface OffersRowProps {
  lang: string;
  products: Product[];
  loading?: boolean;
}

export interface ViewGridProps {
  lang: string;
  orderAgainData?: OrderAgainRowProps;
  offersData?: OffersRowProps;
  categoriesData?: CategoryRowProps[];
}

export interface ChoiceOption {
  label: string;
  value: string;
  extraPrice?: string;
}

export interface RequiredChoicesProps {
  title: string;
  name: string;
  options: ChoiceOption[];
  onChange: (name: string, value: string) => void;
}

export interface OptionalChoicesProps {
  title: string;
  name: string;
  options: ChoiceOption[];
  onToggle: (name: string, value: string) => void;
}

export interface BasketItem {
  id: string;
  quantity: number;
  required: { name: string; value: string; extraPrice?: number };
  optional: { name: string; value: string; extraPrice?: number }[];
  totalPrice: number;
}
