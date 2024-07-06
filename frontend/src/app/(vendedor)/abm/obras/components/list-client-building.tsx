import { Button } from "@/components/ui/button";
import { LayoutList, SquareCheck } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Costumer } from "@/interfaces/costumer.interface";

interface ListClientBuildingProps {
  isLoading: boolean;
  clients: Costumer[];
  onSelectClient: (client: Costumer) => void;
}

export function ListClientBuilding({
  isLoading,
  clients,
  onSelectClient,
}: ListClientBuildingProps) {
  return (
    <div className="w-full block">
      {!isLoading &&
        clients &&
        clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <h3 className="font-semibold">Apellido: {client.apellido}</h3>
                <div className="text-sm">
                  Nombre: {client.nombre} <br />
                  D.N.I.: {client.dni} <br />
                </div>
              </div>
            </div>
            <div className="ml-2">
              <Button
                className="w-8 h-8 p-0 bg-black text-white hover:bg-green-500"
                onClick={() => onSelectClient(client)}
              >
                <SquareCheck className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      {isLoading &&
        [1, 1, 1, 1, 1].map((_, i) => (
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
          <h2 className="text-center">No hay Clientes que coincidan</h2>
        </div>
      )}
    </div>
  );
}

export default ListClientBuilding;
