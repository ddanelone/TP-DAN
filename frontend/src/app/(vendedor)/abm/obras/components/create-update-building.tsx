//"user client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CirclePlus, LoaderCircle, UserCircle } from "lucide-react";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import {
  createObra,
  getAllClients,
  getCoordinates,
  updateObra,
  validarObra,
} from "@/lib/auth";
import { Costumer } from "@/interfaces/costumer.interface";
import { Building } from "@/interfaces/building.interface";
import { Address } from "@/interfaces/address.interface";
import { Estados } from "@/interfaces/estado-enum.interface";
import { SelectStatus } from "@/components/ui/building-status-select";
import { SelectType } from "@/components/ui/select-type-building";
import { SheetSearchClient } from "@/components/ui/sheet-search-client";

interface CreateUpdateBuildingProps {
  children: React.ReactNode;
  buildingToUpdate?: Building;
  isLoading: boolean;
  getBuildings: () => Promise<void>;
}

export function CreateUpdateBuilding({
  children,
  buildingToUpdate,
  getBuildings,
}: CreateUpdateBuildingProps) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [clients, setClients] = useState<Costumer[]>([]);
  const [selectedClient, setSelectedClient] = useState<Costumer | null>(
    buildingToUpdate?.cliente || null
  );

  /* ========== Traer todos los Clientes para pasárselo a SheetSearch  ========== */
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

  useEffect(() => {
    if (clients.length === 0) {
      getClients();
    }
  }, [user, clients]);

  /* ========== Formulario ========== */
  const formSchema = z.object({
    calle: z.string().min(2, {
      message: "Calle debe tener al menos 2 caracteres de longitud",
    }),
    estado: z.nativeEnum(Estados),
    altura: z.string().min(1, {
      message: "La altura debe ser un número entero",
    }),
    ciudad: z.string().min(2, {
      message: "Ciudad debe tener al menos 2 caracteres de longitud",
    }),
    provincia: z.string().min(2, {
      message: "Provincia debe tener al menos 2 caracteres de longitud",
    }),
    presupuesto: z.coerce.number().min(0),
    esRemodelacion: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: buildingToUpdate || {
      calle: "",
      estado: Estados.PENDIENTE,
      altura: "",
      ciudad: "",
      provincia: "",
      presupuesto: 0,
      esRemodelacion: false,
    },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  /* ========== Traer las Coordenadas de la Obra ========== */
  const getCoordinatesFromAPI = async (address: Address) => {
    try {
      const coordinates = await getCoordinates(address);
      console.log("Coordinates: ", coordinates);
      return coordinates;
    } catch (error) {
      console.error("Error getting coordinates: ", error);
      throw error;
    }
  };

  /* ========== Validar estado de una Obra ========== */
  const buildingStatusValidator = async (
    idCliente?: number,
    obra?: Building
  ) => {
    try {
      const response = await validarObra(idCliente, obra);
      console.log("Response: ", response);
      return response;
    } catch (error) {
      console.error("Error validating building status: ", error);
      throw error;
    }
  };

  const onSubmit = async (building: z.infer<typeof formSchema>) => {
    if (!selectedClient) {
      toast.error("Debe seleccionar un cliente antes de guardar la obra.", {
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    const address: Address = {
      calle: building.calle,
      altura: building.altura,
      ciudad: building.ciudad,
      provincia: building.provincia,
      pais: "Argentina",
    };

    try {
      const coordinates = await getCoordinatesFromAPI(address);
      const newBuilding: Building = {
        ...building,
        lat: coordinates.lat,
        lng: coordinates.lon,
        pais: "Argentina",
        cliente: selectedClient,
      };

      const validationResponse = await buildingStatusValidator(
        selectedClient.id,
        newBuilding
      );

      console.log("Validation response: ", validationResponse);

      if (validationResponse.status !== 200) {
        toast.error(validationResponse.error, { duration: 3000 });
        return;
      }

      if (buildingToUpdate) {
        await updateBuilding(newBuilding);
      } else {
        await createBuilding(newBuilding);
      }
    } catch (error) {
      console.error("Error creating or updating building: ", error);
      toast.error("¡¡¡ " + error + " !!!", {
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Crear una nueva Obra ========== */
  const createBuilding = async (building: Building) => {
    try {
      await createObra(building);
      toast.success("Obra creada correctamente");
      getBuildings();
      setOpen(false);
      form.reset();
      setSelectedClient(null);
    } catch (error: any) {
      toast.error(error.message, { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Actualizar una Obra ========== */
  const updateBuilding = async (building: Building) => {
    setIsLoading(true);
    try {
      await updateObra(buildingToUpdate?.id, building);
      toast.success("Obra actualizada correctamente");
      getBuildings();
      setOpen(false);
      form.reset();
      setSelectedClient(null);
    } catch (error: any) {
      toast.error(error.message, { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Manejo del select de Estados ========== */
  const handleStatusChange = (status: Estados) => {
    setValue("estado", status);
  };

  /* ========== Manejo del select de Tipo de Obra ========== */
  const handleTypeChange = (type: boolean) => {
    setValue("esRemodelacion", type);
  };

  const handleClientSelect = (client: Costumer) => {
    console.log("Client en create-update-building: ", client);
    setSelectedClient(client);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {buildingToUpdate ? "Actualizar Obra" : "Alta de Obra"}
          </DialogTitle>
          <DialogDescription>
            Gestionar la Obra con la siguiente información
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="mb-3">
              <Label htmlFor="calle">Calle</Label>
              <Input
                {...register("calle", {
                  required: "La calle es obligatoria",
                })}
                id="calle"
                placeholder="Calle pública"
                type="text"
                autoComplete="calle"
              />
              <p className="form-error">{errors.calle?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="altura">altura</Label>
              <Input
                {...register("altura", {
                  required: "La altura es obligatoria",
                })}
                id="altura"
                placeholder="1234"
                type="text"
                autoComplete="altura"
              />
              <p className="form-error">{errors.altura?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="dni">Ciudad</Label>
              <Input
                {...register("ciudad", {
                  required: "La ciudad es obligatoria",
                })}
                id="ciudad"
                placeholder="Ascochinga"
                type="text"
                autoComplete="ciudad"
              />
              <p className="form-error">{errors.ciudad?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="provincia">Provincia</Label>
              <Input
                {...register("provincia", {
                  required: "La provincia es obligatoria",
                })}
                id="provincia"
                placeholder="Córdoba"
                type="text"
                autoComplete="provincia"
              />
              <p className="form-error">{errors.provincia?.message}</p>
            </div>

            <div className="mb-3">
              <Label htmlFor="presupuesto">Presupuesto</Label>
              <Input
                {...register("presupuesto", {
                  required: "presupuesto",
                })}
                id="presupuesto"
                placeholder="0.00"
                step="0.01"
                type="number"
              />
              <p className="form-error">{errors.presupuesto?.message}</p>
            </div>

            {/* ========== Estado ========== */}
            <div className="mb-3">
              <Label htmlFor="estado">Estado</Label>
              <SelectStatus
                selectedStatus={form.watch("estado") || null}
                onStatusChange={handleStatusChange}
              />
              <p className="form-error">{errors.estado?.message}</p>
            </div>

            {/* Campo Tipo de Obra */}
            <div className="mb-3">
              <Label htmlFor="esRemodelacion">Tipo de Obra</Label>
              <SelectType
                selectedType={form.watch("esRemodelacion")}
                onTypeChange={handleTypeChange}
              />
              <p className="form-error">{errors.esRemodelacion?.message}</p>
            </div>

            <DialogFooter>
              <SheetSearchClient
                buildingToUpdate={buildingToUpdate}
                isLoading={isLoading}
                clients={clients}
                onSelectClient={handleClientSelect}
              ></SheetSearchClient>

              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {buildingToUpdate ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
