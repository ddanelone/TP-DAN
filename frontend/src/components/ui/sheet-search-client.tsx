import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Costumer } from "@/interfaces/costumer.interface";
import { Building } from "@/interfaces/building.interface";
import ListClientBuilding from "@/app/(vendedor)/abm/obras/components/list-client-building";

interface SheetSearchProps {
  buildingToUpdate?: Building;
  isLoading: boolean;
  clients: Costumer[];
  onSelectClient: (client: Costumer) => void;
}

export function SheetSearchClient({
  isLoading,
  buildingToUpdate,
  clients,
  onSelectClient,
}: SheetSearchProps) {
  const [apellido, setApellido] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [filteredClients, setFilteredClients] = useState<Costumer[]>(clients);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const filtered = clients.filter((client) => {
      return (
        (!apellido ||
          client.apellido.toLowerCase().includes(apellido.toLowerCase())) &&
        (!nombre ||
          client.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
        (!dni || client.dni.includes(dni))
      );
    });
    setFilteredClients(filtered);
  }, [apellido, nombre, dni, clients]);

  const handleSelectClient = (client: Costumer) => {
    onSelectClient(client);
    console.log("Client en sheet-search-client ", client);
    setIsSheetOpen(false); // Cerrar el Sheet al seleccionar un cliente
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
          {buildingToUpdate ? "Actualizar Cliente" : "Asignar a Cliente"}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Buscar Cliente</SheetTitle>
          <SheetDescription>
            Ingrese al menos UN criterio de búsqueda
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Apellido
            </Label>
            <Input
              id="apellido"
              placeholder="Pérez"
              className="col-span-3"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              placeholder="Juan"
              className="col-span-3"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="documento" className="text-right">
              D.N.I.
            </Label>
            <Input
              id="documento"
              placeholder="12345678"
              className="col-span-3"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="button" onClick={() => setIsSheetOpen(false)}>
            Cancelar
          </Button>
        </SheetFooter>
        <br />
        <ListClientBuilding
          isLoading={isLoading}
          clients={filteredClients}
          onSelectClient={handleSelectClient}
        />
      </SheetContent>
    </Sheet>
  );
}
