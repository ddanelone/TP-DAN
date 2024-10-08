"use client"

import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import toast from "react-hot-toast";
import { TableClient } from "@/components/ui/table-client";
import { deleteClient, getAllClients } from "@/lib/auth";
import { Costumer } from "@/interfaces/costumer.interface";
import { CreateUpdateClient } from "./create-update-client";
import ListClient from "@/components/ui/list-client";
import { setInLocalstorage } from "@/action/set-in-localstorage";
import { useRouter } from "next/navigation";

function CustomerManager() {
  const user = useUser();
  const [clients, setClients] = useState<Costumer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();

  /* ========== Traer todos los Clientes a la Tabla  ========== */
  const getClients = async () => {
    setIsLoading(true);

    try {
      const res = (await getAllClients()) as Costumer[];
      console.log(res);

      setClients(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Borrar un Cliente de la base de datos ========== */

  const deleteCostumer = async (client: Costumer) => {
    setIsLoading(true);

    try {
      await deleteClient(client?.id);

      toast.success("Cliente eliminado correctamente");

      /* ========== Borro el cliente eliminado de la tabla ========== */
      const newClients = clients.filter((i) => i.id !== client.id);

      setClients(newClients);
    } catch (error: any) {
      toast.error("No se pudo eliminar el Cliente: " + error.message, {
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Setear un Cliente en el localStorage ========== */

  const viewBuildingsClients = (client: Costumer) => {
    setIsLoading(true);

    setInLocalstorage("cliente", client);

    router.push("/abm/obras");
  };

  useEffect(() => {
    if (user) getClients();
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Administración de Clientes</h1>

          <Badge className="mt-2 text-[14px]" variant={"outline"}>
            SECCIÓN EXCLUSIVA PARA VENDEDORES
          </Badge>
        </div>
        <CreateUpdateClient getClients={getClients}>
          <Button className="px-6">
            Crear
            <CirclePlus className="ml-2 w-[20px]" />
          </Button>
        </CreateUpdateClient>
      </div>
      <div className="m-4">
        <TableClient
          isLoading={isLoading}
          clients={clients}
          getClients={getClients}
          deleteClient={deleteCostumer}
          viewBuildingsClients={viewBuildingsClients}
        />
        <ListClient
          isLoading={isLoading}
          clients={clients}
          getClients={getClients}
          deleteClient={deleteCostumer}
          viewBuildingsClients={viewBuildingsClients}
        />
      </div>
    </>
  );
}

export default CustomerManager;
