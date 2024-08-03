import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutList, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./button";
import { CreateUpdateBuilding } from "@/app/(vendedor)/abm/obras/components/create-update-building";
import { ConfirmDeletionBuilding } from "@/app/(vendedor)/abm/obras/components/confirm-deletion-building";
import { Building } from "@/interfaces/building.interface";
import { setInLocalstorage } from "@/action/set-in-localstorage";

interface TableBuildingProps {
  isLoading: boolean;
  buildings: Building[];
  getBuildings?: () => Promise<void>;
  deleteBuilding?: (building: Building) => Promise<void>;
  existingBuilding?: () => void;
}

export function TableBuilding({
  isLoading,
  buildings,
  getBuildings,
  deleteBuilding,
  existingBuilding,
}: TableBuildingProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null
  );

  const handleSelectBuilding = (building: Building) => {
    if (selectedBuilding?.id === building.id) {
      setSelectedBuilding(null);
      localStorage.removeItem("selectedBuilding");
    } else {
      setSelectedBuilding(building);
      setInLocalstorage("selectedBuilding", building);
      if (existingBuilding) {
        existingBuilding();
      }
    }
  };

  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={2} className="text-center">
              Cliente
            </TableHead>
            <TableHead colSpan={7} className="text-center">
              Obra
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-[200px]">Apellido</TableHead>
            <TableHead className="w-[200px]">Nombre</TableHead>
            <TableHead>Calle</TableHead>
            <TableHead>Altura</TableHead>
            <TableHead>Ciudad</TableHead>
            <TableHead>Presupuesto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[25px]">Latitud</TableHead>
            <TableHead className="w-[25px]">Longitud</TableHead>
            {getBuildings && deleteBuilding && (
              <TableHead className="text-center w-[250px]">Acciones</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            buildings &&
            buildings.map((building) => (
              <TableRow key={building.id}>
                <TableCell>{building.cliente?.apellido ?? "N/A"}</TableCell>
                <TableCell>{building.cliente?.nombre ?? "N/A"}</TableCell>
                <TableCell>{building.calle}</TableCell>
                <TableCell>{building.altura}</TableCell>
                <TableCell>{building.ciudad}</TableCell>
                <TableCell>{building.presupuesto}</TableCell>
                <TableCell>{building.estado}</TableCell>
                <TableCell className="w-[50px]">{building.lat}</TableCell>
                <TableCell className="w-[50px]">{building.lng}</TableCell>
                <TableCell className="text-center">
                  {/* ========== Seleccionar una Obra ========== */}
                  {!getBuildings && (
                    <Button
                      className="ml-4"
                      onClick={() => handleSelectBuilding(building)}
                    >
                      {selectedBuilding?.id === building.id ? "✔️" : "❌"}
                    </Button>
                  )}
                  {/* ========== Actualizar Obra ========== */}
                  {getBuildings && (
                    <CreateUpdateBuilding
                      isLoading={isLoading}
                      buildingToUpdate={building}
                      getBuildings={getBuildings}
                    >
                      <Button className="ml-4">
                        <SquarePen />
                      </Button>
                    </CreateUpdateBuilding>
                  )}

                  {/* ========== Eliminar Obra  ========== */}
                  {deleteBuilding && (
                    <ConfirmDeletionBuilding
                      deleteBuilding={deleteBuilding}
                      building={building}
                    >
                      <Button className="ml-4 mt-4" variant={"destructive"}>
                        <Trash2 />
                      </Button>
                    </ConfirmDeletionBuilding>
                  )}
                </TableCell>
              </TableRow>
            ))}
          {/* ========== Loading ========== */}
          {isLoading &&
            [1, 1, 1, 1, 1].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* ========== No hay productos para mostrar ========== */}
      {!isLoading && buildings.length === 0 && (
        <div className="text-gray-200 my-20">
          <div className="flex justify-center">
            <LayoutList className="w-[120px] h-[120px]" />
          </div>
          <h2 className="text-center">No hay obras para mostrar</h2>
        </div>
      )}
    </div>
  );
}
