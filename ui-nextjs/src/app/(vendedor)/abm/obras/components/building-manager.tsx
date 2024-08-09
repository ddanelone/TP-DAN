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
import { useRouter } from "next/navigation";
import { getFromLocalstorage } from "@/action/get-from-localstorage";

function BuildingManager() {
  const user = useUser();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [client, setClient] = useState<Costumer | undefined>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const router = useRouter();

  const getBuildings = async () => {
    setIsLoading(true);
    try {
      const res = (await getAllObras()) as Building[];
      console.log(res);

      const localClient = getFromLocalstorage("cliente");
      if (localClient) {
        localClient as Costumer;
        const filteredBuildings = res.filter(
          (building) => building.cliente?.id === localClient.id
        );
        setBuildings(filteredBuildings);
        setClient(localClient);
        setIsFiltered(true);
      } else {
        setBuildings(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteBuilding = async (building: Building) => {
    setIsLoading(true);
    try {
      await deleteObra(building?.id);
      toast.success("Obra eliminada correctamente");
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

  const removeFilter = () => {
    localStorage.removeItem("cliente");
    setClient(undefined);
    setIsFiltered(false);
    getBuildings();
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
        <div className="flex">
          {isFiltered && (
            <Button className="mr-4" onClick={removeFilter}>
              Quitar filtro
            </Button>
          )}
          <CreateUpdateBuilding
            getBuildings={getBuildings}
            isLoading={isLoading}
          >
            <Button className="px-6">
              Crear
              <CirclePlus className="ml-2 w-[20px]" />
            </Button>
          </CreateUpdateBuilding>
        </div>
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
}

export default BuildingManager;
