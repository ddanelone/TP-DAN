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

interface SelectTypeProps {
  selectedType: boolean;
  onTypeChange: (type: boolean) => void;
}

export function SelectType({ selectedType, onTypeChange }: SelectTypeProps) {
  return (
    <Select
      value={selectedType ? "Remodelación" : "Construcción"}
      onValueChange={(value) => onTypeChange(value === "Remodelación")}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Seleccione..."
          defaultValue={selectedType ? "Remodelación" : "Construcción"}
        />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipo de Obra</SelectLabel>
          <SelectItem value="Remodelación">Remodelación</SelectItem>
          <SelectItem value="Construcción">Construcción</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
