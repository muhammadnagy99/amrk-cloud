'use client';
import { useState } from "react";

export function useProductSelections() {
  const [required, setRequired] = useState<{ name: string; value: string }[]>([]);
  const [optional, setOptional] = useState<{ name: string; value: string }[]>([]);

  const handleRequiredChange = (name: string, value: string) => {
    setRequired((prev) => {
      const exists = prev.find((opt) => opt.value === value);
      if (exists) {
        return prev.filter((opt) => opt.value !== value);
      } else {
        return [...prev, { name, value }];
      }
    });
  };

  const handleOptionalToggle = (name: string, value: string) => {
    setOptional((prev) => {
      const exists = prev.find((opt) => opt.value === value);
      if (exists) {
        return prev.filter((opt) => opt.value !== value);
      } else {
        return [...prev, { name, value }];
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
