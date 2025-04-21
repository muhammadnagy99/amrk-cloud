'use client';
import { useState } from "react";

export function useProductSelections() {
  const [required, setRequired] = useState<{label: string; name: string; value: string }[]>([]);
  const [optional, setOptional] = useState<{label: string; name: string; value: string }[]>([]);

  const handleRequiredChange = (label: string, name: string, value: string) => {
    setRequired((prev) => {
      const labelExists = prev.find((opt) => opt.label === label);
      
      if (labelExists) {
        return prev.map((opt) => 
          opt.label === label ? { label, name, value } : opt
        );
      } else {
        return [...prev, { label, name, value }];
      }
    });
  };

  const handleOptionalToggle = (label: string, name: string, value: string) => {
    setOptional((prev) => {
      const exists = prev.find((opt) => opt.value === value);
      if (exists) {
        return prev.filter((opt) => opt.value !== value);
      } else {
        return [...prev, { label, name, value }];
      }
    });
  };

  return {
    required,
    optional,
    handleRequiredChange,
    handleOptionalToggle,
  };
}