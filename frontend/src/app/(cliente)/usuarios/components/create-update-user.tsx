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
import { AuthorizedUser } from "@/interfaces/user-authorize.interface";
import { createAuthorizedUser } from "@/lib/auth";
import { getFromLocalstorage } from "@/action/get-from-localstorage";

interface CreateUpdateUserProps {
  children: React.ReactNode;
  userToUpdate?: AuthorizedUser;
  getUsers: () => Promise<void>;
}

export function CreateUpdateUser({
  children,
  userToUpdate,
  getUsers,
}: CreateUpdateUserProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<AuthorizedUser[]>([]);

  /* ========== Formulario ========== */
  const formSchema = z.object({
    id: z.number().optional(),
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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: userToUpdate
      ? userToUpdate
      : {
          id: undefined,
          nombre: "",
          apellido: "",
          dni: "",
          correoElectronico: "",
        },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  /* ========== Crear o actualizar un Autorizado ========== */

  const onSubmit = async (authUser: z.infer<typeof formSchema>) => {
    console.log(authUser);

    if (userToUpdate) updateUser(authUser);
    else createUser(authUser);
  };

  /* ========== Crear un nuevo Usuario Autorizado ========== */

  const createUser = async (authUser: AuthorizedUser) => {
    authUser.id = userToUpdate?.id;

    const idClient = getFromLocalstorage("idClient");

    setIsLoading(true);

    try {
      await createAuthorizedUser(idClient, authUser);

      toast.success("Usuario creado correctamente");

      getUsers();

      setOpen(false);

      form.reset();
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Actualizar un cliente ========== */

  const updateUser = async (authUser: AuthorizedUser) => {
    const idClient = getFromLocalstorage("idClient");

    setIsLoading(true);

    try {
      //Acá tengo el usuario con un id, por lo que el método POST lo va a actualizar

      await createAuthorizedUser(idClient, authUser);

      toast.success("Cliente actualizado correctamente");

      getUsers();

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
            {userToUpdate ? "Actualizar Usuario" : "Alta de Usuario"}
          </DialogTitle>
          <DialogDescription>
            Gestiona los Usuarios Autorizados para operar en tú nombre
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

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {userToUpdate ? "Actualizar" : "Crear"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
