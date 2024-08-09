import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/interfaces/product-category-interface";

interface SelectCategoryesProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category) => void;
}

export function SelectCategoryes({
  selectedCategory,
  onCategoryChange,
}: SelectCategoryesProps) {
  return (
    <Select
      value={selectedCategory || ""}
      onValueChange={(value) => onCategoryChange(value as Category)}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Seleccione..."
          defaultValue={selectedCategory || ""}
        />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorías</SelectLabel>
          {Object.values(Category).map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
