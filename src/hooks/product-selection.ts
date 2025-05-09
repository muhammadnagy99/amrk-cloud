'use client';
import { useState } from "react";

// Define type for product option
interface ProductOption {
  label: string; 
  name: string; 
  value: string;
  extraPrice?: string;
}

export function useProductSelections() {
  const [required, setRequired] = useState<ProductOption[]>([]);
  const [optional, setOptional] = useState<ProductOption[]>([]);
  
  const handleRequiredChange = (label: string, name: string, value: string, extraPrice?: string) => {
    setRequired((prev) => {
      const nameExists = prev.find((opt) => opt.name === name);
      
      if (nameExists) {
        return prev.map((opt) =>
          opt.name === name ? { label, name, value, extraPrice } : opt
        );
      } else {
        return [...prev, { label, name, value, extraPrice }];
      }
    });
  };
  
  const handleOptionalToggle = (label: string, name: string, value: string, extraPrice?: string) => {
    setOptional((prev) => {
      const exists = prev.find((opt) => opt.value === value);
      if (exists) {
        return prev.filter((opt) => opt.value !== value);
      } else {
        return [...prev, { label, name, value, extraPrice }];
      }
    });
  };
  
  // Add direct setters for basket product restoration
  const setRequiredOptions = (options: ProductOption[]) => {
    setRequired(options);
  };
  
  const setOptionalOptions = (options: ProductOption[]) => {
    setOptional(options);
  };
  
  return {
    required,
    optional,
    handleRequiredChange,
    handleOptionalToggle,
    setRequiredOptions,
    setOptionalOptions
  };
}