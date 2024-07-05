import { Button } from "@/components/ui/button";
import { Building2Icon, LayoutList, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Costumer } from "@/interfaces/costumer.interface";
import { ConfirmDeletionClient } from "@/app/(vendedor)/abm/clientes/components/confirmDeletionClient";
import { CreateUpdateClient } from "@/app/(vendedor)/abm/clientes/components/create-update-client";
import { ConfirmNavigationClient } from "@/app/(vendedor)/abm/clientes/components/confirm-building-client-nav";

interface ListClientProps {
  isLoading: boolean;
  clients: Costumer[];
  getClients: () => Promise<void>;
  deleteClient: (client: Costumer) => Promise<void>;
  viewBuildingsClients: (client: Costumer) => void;
}

export const ListClient = ({
  isLoading,
  clients,
  getClients,
  deleteClient,
  viewBuildingsClients,
}: ListClientProps) => {
  return (
    <div className="block md:hidden">
      {!isLoading &&
        clients &&
        clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <h3 className="font-semibold">{client.apellido}</h3>
                <div className="text-sm">
                  Nombre: {client.nombre} <br />
                  D.N.I.: {client.dni} <br />
                  C.U.I.T.: {client.cuit} <br />
                  Correo Electrónico: {client.correoElectronico} <br />
                  Máxima Cantidad Obras: {client.cantidad_obras}
                  <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Máximo Autorizado: {client.maximoDescubierto}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {viewBuildingsClients && (
                <ConfirmNavigationClient
                  client={client}
                  viewBuildingsClients={viewBuildingsClients}
                >
                  <Button className="w-8 h-8 p-0 bg-yellow-500 text-white">
                    <Building2Icon className="w-5 h-5" />
                  </Button>
                </ConfirmNavigationClient>
              )}

              {getClients && (
                <CreateUpdateClient
                  clientToUpdate={client}
                  getClients={getClients}
                >
                  <Button className="w-8 h-8 p-0 mt-4">
                    <SquarePen className="w-5 h-5" />
                  </Button>
                </CreateUpdateClient>
              )}

              {deleteClient && (
                <ConfirmDeletionClient
                  deleteClient={deleteClient}
                  client={client}
                >
                  <Button className="w-8 h-8 p-0 mt-4" variant={"destructive"}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </ConfirmDeletionClient>
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
      {!isLoading && clients.length === 0 && (
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

export default ListClient;
