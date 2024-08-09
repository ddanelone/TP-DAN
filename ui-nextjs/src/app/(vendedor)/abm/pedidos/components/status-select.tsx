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
import { Status } from "@/interfaces/order-state-interface";

interface SelectStatusProps {
  selectedStatus: Status | null;
  onStatusChange: (status: Status) => void;
}

export function SelectStatus({
  selectedStatus,
  onStatusChange,
}: SelectStatusProps) {
  const allowedStatuses = [Status.ENTREGADO, Status.CANCELADO];

  return (
    <Select
      value={selectedStatus || ""}
      onValueChange={(value) => onStatusChange(value as Status)}
    >
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder="Seleccione..."
          defaultValue={selectedStatus || ""}
        />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Estados</SelectLabel>
          {allowedStatuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
