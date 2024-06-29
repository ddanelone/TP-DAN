"use client";

import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import toast from "react-hot-toast";
import { TableBuilding } from "@/components/ui/table-building";
import ListBuilding from "@/components/ui/list-building";
import { Building } from "@/interfaces/building.interface";
import { deleteObra, getAllObras } from "@/lib/auth";
import { CreateUpdateBuilding } from "./create-update-building";
import { Costumer } from "@/interfaces/costumer.interface";

const BuildingManager = () => {
  const user = useUser();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [client, setClient] = useState<Costumer | undefined>();

  /* ========== Traer todas las obras a la Tabla  ========== */
  const getBuildings = async () => {
    setIsLoading(true);

    try {
      const res = (await getAllObras()) as Building[];
      console.log(res);

      // Verifica si hay al menos una obra y si tiene al menos un cliente
      if (res.length > 0 && res[0].cliente) {
        setClient(res[0].cliente);
      }

      setBuildings(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Borrar una obra de la base de datos ========== */
  const deleteBuilding = async (building: Building) => {
    setIsLoading(true);

    try {
      await deleteObra(building?.id);

      toast.success("Obra eliminada correctamente");

      /* ========== Borro el cliente eliminado de la tabla ========== */
      const newBuildings = buildings.filter((i) => i.id !== building.id);

      setBuildings(newBuildings);
    } catch (error: any) {
      toast.error("No se pudo eliminar la Obra: " + error.message, {
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getBuildings();
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Administración de Obras</h1>

          <Badge className="mt-2 text-[14px]" variant={"outline"}>
            SECCIÓN EXCLUSIVA PARA VENDEDORES
          </Badge>
        </div>
        <CreateUpdateBuilding getBuildings={getBuildings} isLoading={isLoading}>
          <Button className="px-6">
            Crear
            <CirclePlus className="ml-2 w-[20px]" />
          </Button>
        </CreateUpdateBuilding>
      </div>
      <div className="m-4">
        <TableBuilding
          isLoading={isLoading}
          buildings={buildings}
          getBuildings={getBuildings}
          deleteBuilding={deleteBuilding}
        />
        <ListBuilding
          isLoading={isLoading}
          buildings={buildings}
          getBuildings={getBuildings}
          deleteBuilding={deleteBuilding}
        />
      </div>
    </>
  );
};

export default BuildingManager;
