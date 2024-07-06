"use client";

import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { TableBuilding } from "@/components/ui/table-building";
import ListBuilding from "@/components/ui/list-building";
import { Building } from "@/interfaces/building.interface";
import { getAllObras, getClientByEmail, getClientById } from "@/lib/auth";
import { Costumer } from "@/interfaces/costumer.interface";
import { getFromLocalstorage } from "@/action/get-from-localstorage";
import { setInLocalstorage } from "@/action/set-in-localstorage";
import toast from "react-hot-toast";

const BuildingManagerClient = () => {
  const user = useUser();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [client, setClient] = useState<Costumer | undefined>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const getMyClientData = async () => {
    const emailUser = user?.email;
    setIsLoading(true);

    try {
      const res = await getClientByEmail(emailUser);
      console.log(res);
      if (res) {
        setInLocalstorage("idClient", res.id);
      }
    } catch (error) {
      toast.error(
        "No se pudo recupear los datos de Cliente asociado con este Usuario.",
        {
          duration: 2000,
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBuildings = async () => {
    setIsLoading(true);
    try {
      const res = (await getAllObras()) as Building[];

      const idLocalClient = getFromLocalstorage("idClient");
      if (idLocalClient) {
        const filteredBuildings = res.filter(
          (building) => building.cliente?.id === idLocalClient
        );
        setBuildings(filteredBuildings);
        setClient(idLocalClient);
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

  const removeFilter = () => {
    localStorage.removeItem("cliente");
    setClient(undefined);
    setIsFiltered(false);
    getBuildings();
  };

  useEffect(() => {
    if (user) {
      getMyClientData().then(() => {
        getBuildings();
      });
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Visualización de Obras</h1>
          <Badge className="mt-2 text-[14px]" variant={"outline"}>
            SECCIÓN EXCLUSIVA PARA CLIENTES
          </Badge>
        </div>
      </div>
      <div className="m-4">
        <TableBuilding isLoading={isLoading} buildings={buildings} />
        <ListBuilding isLoading={isLoading} buildings={buildings} />
      </div>
    </>
  );
};

export default BuildingManagerClient;
function setAuthUsers(authorizedUsers: any) {
  throw new Error("Function not implemented.");
}
