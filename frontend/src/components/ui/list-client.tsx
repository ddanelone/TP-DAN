import { Button } from "@/components/ui/button";
import { LayoutList, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CreateUpdateItem } from "@/app/(vendedor)/abm/components/create-update-item-form";
import { ConfirmDeletion } from "@/app/(vendedor)/abm/components/confirm-deletion";
import AddItemToCart from "@/app/(cliente)/components/add-item-to-cart";
import { Costumer } from "@/interfaces/costumer.interface";
import { ConfirmDeletionClient } from "@/app/(vendedor)/abm/clientes/components/confirmDeletionClient";
import { CreateUpdateClient } from "@/app/(vendedor)/abm/clientes/components/create-update-client";

interface ListClientProps {
  isLoading: boolean;
  clients: Costumer[];
  getClients: () => Promise<void>;
  deleteClient: (client: Costumer) => Promise<void>;
}

export const ListClient = ({
  isLoading,
  clients,
  getClients,
  deleteClient,
}: ListClientProps) => {
  return (
    <div className="w-full block md:hidden">
      {/* Utiliza w-full para ocupar todo el ancho disponible */}
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
                  Correo Electrónico: {client.correoElectronico}
                  <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Máximo Autorizado: {client.maximoDescubierto}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {getClients && (
                <CreateUpdateClient
                  clientToUpdate={client}
                  getClients={getClients}
                >
                  <Button className="w-8 h-8 p-0">
                    <SquarePen className="w-5 h-5" />
                  </Button>
                </CreateUpdateClient>
              )}

              {deleteClient && (
                <ConfirmDeletionClient
                  deleteClient={deleteClient}
                  client={client}
                >
                  <Button className="ml-4" variant={"destructive"}>
                    <Trash2 />
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
