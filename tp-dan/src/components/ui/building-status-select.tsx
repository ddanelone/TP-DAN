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
import { Estados } from "@/interfaces/estado-enum.interface";

interface SelectStatusProps {
  selectedStatus: Estados | null;
  onStatusChange: (status: Estados) => void;
}

export function SelectStatus({
  selectedStatus,
  onStatusChange,
}: SelectStatusProps) {
  return (
    <Select
      value={selectedStatus || ""}
      onValueChange={(value) => onStatusChange(value as Estados)}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Seleccione..."
          defaultValue={selectedStatus || ""}
        />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Estado</SelectLabel>
          {Object.values(Estados).map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
