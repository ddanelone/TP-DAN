import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2Icon,
  LayoutList,
  ShoppingCart,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./button";
import { Costumer } from "@/interfaces/costumer.interface";
import { CreateUpdateClient } from "@/app/(vendedor)/abm/clientes/components/create-update-client";
import { ConfirmDeletionClient } from "@/app/(vendedor)/abm/clientes/components/confirmDeletionClient";
import { CreateUpdateBuilding } from "@/app/(vendedor)/abm/obras/components/create-update-building";

interface TableClientProps {
  isLoading: boolean;
  clients: Costumer[];
  getClients: () => Promise<void>;
  deleteClient: (client: Costumer) => Promise<void>;
}

export function TableClient({
  isLoading,
  clients,
  getClients,
  deleteClient,
}: TableClientProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Apellido</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>CUIT</TableHead>
            <TableHead>Máximo Descubierto</TableHead>
            <TableHead>Máxima Cantidad Obras</TableHead>
            <TableHead className="text-center w-[250px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            clients &&
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-semibold">
                  {client.apellido}
                </TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.correoElectronico}</TableCell>
                <TableCell>{client.cuit}</TableCell>
                <TableCell className="w-[ 50px]">
                  {client.maximoDescubierto}
                </TableCell>
                <TableCell className="w-[ 50px]">
                  {client.cantidad_obras}
                </TableCell>
                <TableCell className="text-center">
                  {/* ========== Gestionar las obras ========== */}
                  {/* ========== ACA TENGO QUE REDIRIGIR A OBRAS, NO IMPLEMENTAR UN COMPLEMENTO ========== */}
                  <CreateUpdateBuilding
                    clientToUpdate={client}
                    getClients={getClients}
                  >
                    <Button className="bg-yellow-500 text-white">
                      <Building2Icon />
                    </Button>
                  </CreateUpdateBuilding>

                  {/* ========== Actualizar Cliente ========== */}

                  <CreateUpdateClient
                    clientToUpdate={client}
                    getClients={getClients}
                  >
                    <Button className="ml-4">
                      <SquarePen />
                    </Button>
                  </CreateUpdateClient>

                  {/* ========== Eliminar Client  ========== */}

                  <ConfirmDeletionClient
                    deleteClient={deleteClient}
                    client={client}
                  >
                    <Button className="ml-4" variant={"destructive"}>
                      <Trash2 />
                    </Button>
                  </ConfirmDeletionClient>
                </TableCell>
              </TableRow>
            ))}

          {/* ========== Loading ========== */}
          {isLoading &&
            [1, 1, 1, 1, 1].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-16 h-16 rounded-xl" />
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

      {!isLoading && clients.length === 0 && (
        <div className="text-gray-200 my-20">
          <div className="flex justify-center">
            <LayoutList className="w-[120px] h-[120px]" />
          </div>
          <h2 className="text-center">Nada para ver por aquí...</h2>
        </div>
      )}
    </div>
  );
}
