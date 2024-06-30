import { Button } from "@/components/ui/button";
import { LayoutList, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Building } from "@/interfaces/building.interface";
import { CreateUpdateBuilding } from "@/app/(vendedor)/abm/obras/components/create-update-building";
import { ConfirmDeletionBuilding } from "@/app/(vendedor)/abm/obras/components/confirm-deletion-building";

interface ListBuildingProps {
  isLoading: boolean;
  buildings: Building[];
  getBuildings?: () => Promise<void>;
  deleteBuilding?: (building: Building) => Promise<void>;
}

export const ListBuilding = ({
  isLoading,
  buildings,
  getBuildings,
  deleteBuilding,
}: ListBuildingProps) => {
  return (
    <div className="w-full block md:hidden">
      {/* Utiliza w-full para ocupar todo el ancho disponible */}
      {!isLoading &&
        buildings &&
        buildings.map((building) => (
          <div
            key={building.id}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <h3 className="font-semibold">
                  Cliente: {building.cliente?.nombre},{" "}
                  {building.cliente?.apellido}
                </h3>
                <div className="text-sm">
                  Calle: {building.calle}
                  Altura: {building.altura} <br />
                  Ciudad: {building.ciudad} <br />
                  Presupuesto: {building.presupuesto} <br />
                  Latitud: {building.lat} <br />
                  Longitud: {building.lng}
                  <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Estado: {building.estado}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {getBuildings && (
                <CreateUpdateBuilding
                  isLoading={isLoading}
                  buildingToUpdate={building}
                  getBuildings={getBuildings}
                >
                  <Button className="w-8 h-8 p-0">
                    <SquarePen className="w-5 h-5" />
                  </Button>
                </CreateUpdateBuilding>
              )}

              {deleteBuilding && (
                <ConfirmDeletionBuilding
                  deleteBuilding={deleteBuilding}
                  building={building}
                >
                  <Button className="ml-4" variant={"destructive"}>
                    <Trash2 />
                  </Button>
                </ConfirmDeletionBuilding>
              )}
            </div>
          </div>
        ))}
      {isLoading &&
        [1, 1, 1, 1, 1].map((item, i) => (
          <div
            key={i}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <div className="ml-6">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="w-[100px] h-4 mt-2" />
              </div>
            </div>
          </div>
        ))}
      {!isLoading && buildings.length === 0 && (
        <div className="text-gray-200 my-20">
          <div className="flex justify-center">
            <LayoutList className="w-[120px] h-[120px]" />
          </div>
          <h2 className="text-center">No hay productos disponibles</h2>
        </div>
      )}
    </div>
  );
};

export default ListBuilding;
