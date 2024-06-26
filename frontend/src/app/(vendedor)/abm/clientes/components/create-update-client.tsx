"user client";

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
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { createClient, updateClient } from "@/lib/auth";
import { Costumer } from "@/interfaces/costumer.interface";
import { AuthorizedUser } from "@/interfaces/user-authorize.interface";

interface CreateUpdateClientProps {
  children: React.ReactNode;
  clientToUpdate?: Costumer;
  getClients: () => Promise<void>;
}

export function CreateUpdateClient({
  children,
  clientToUpdate,
  getClients,
}: CreateUpdateClientProps) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  //const [clients, setClients] = useState<Costumer[]>([]);

  /* ========== Formulario ========== */
  const formSchema = z.object({
    nombre: z.string().min(2, {
      message: "Nombre debe tener al menos 2 caracteres de longitud",
    }),
    apellido: z.string().min(4, {
      message: "Apellido debe tener al menos 4 caracteres de longitud",
    }),
    dni: z
      .string()
      .min(1, {
        message:
          "El número de documento no es válido, debe ser un número entero",
      })
      .regex(/^\d+$/, {
        message: "El número de documento debe contener solo dígitos",
      }),
    correoElectronico: z
      .string()
      .email("El formato del email no es válido, debe cumplir el RFC 5322"),
    cuit: z
      .string()
      .min(13)
      .max(13)
      .regex(/^\d{2}-\d{8}-\d{1}$/, {
        message: "El formato de cuit no es válido, debe ser XX-XXXXXXXX-X",
      }),
    maximoDescubierto: z.coerce.number().int().min(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: clientToUpdate
      ? clientToUpdate
      : {
          nombre: "",
          apellido: "",
          dni: "",
          correoElectronico: "",
          cuit: "",
          maximoDescubierto: 0,
        },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  /* ========== Crear o actualizar un Cliente ========== */

  const onSubmit = async (client: z.infer<typeof formSchema>) => {
    console.log(client);

    if (clientToUpdate) updateCostumer(client);
    else createCostumer(client);
  };

  /* ========== Crear un nuevo Cliente ========== */

  const createCostumer = async (client: Costumer) => {
    setIsLoading(true);

    try {
      await createClient(client);

      toast.success("Cliente creado correctamente");

      getClients();

      setOpen(false);

      form.reset();
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Actualizar un cliente ========== */

  const updateCostumer = async (client: Costumer) => {
    setIsLoading(true);

    try {
      await updateClient(clientToUpdate?.id, client);

      toast.success("Cliente actualizado correctamente");

      getClients();

      setOpen(false);

      form.reset();
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {clientToUpdate ? "Actualizar Cliente" : "Alta de Cliente"}
          </DialogTitle>
          <DialogDescription>
            Gestiona el cliente con la siguiente información
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <div className="mb-3">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                })}
                id="nombre"
                placeholder="Juan Pérez"
                type="text"
                autoComplete="nombre"
              />
              <p className="form-error">{errors.nombre?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="apellido">Apellido</Label>
              <Input
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                })}
                id="apellido"
                placeholder="Apellido"
                type="text"
                autoComplete="apellido"
              />
              <p className="form-error">{errors.apellido?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="dni">Documento</Label>
              <Input
                {...register("dni", {
                  required: "El documento es obligatorio",
                })}
                id="dni"
                placeholder="22222222"
                type="text"
                autoComplete="dni"
              />
              <p className="form-error">{errors.dni?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="correoElectronico">Correo Electrónico</Label>
              <Input
                {...register("correoElectronico", {
                  required: "El correo es obligatorio",
                })}
                id="correoElectronico"
                placeholder="nombre@ejemplo.com"
                type="correoElectronico"
                autoComplete="correoElectronico"
              />
              <p className="form-error">{errors.correoElectronico?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="cuit">Cuit</Label>
              <Input
                {...register("cuit")}
                id="cuit"
                placeholder="xx-xxxxxxxx-x"
                type="text"
              />
              <p className="form-error">{errors.cuit?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="maximoDescubierto">Máximo Descubierto</Label>
              <Input
                {...register("maximoDescubierto", {
                  required: "Máximo descubierto",
                })}
                id="maximoDescubierto"
                placeholder="0.00"
                type="text"
              />
              <p className="form-error">{errors.maximoDescubierto?.message}</p>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {clientToUpdate ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
