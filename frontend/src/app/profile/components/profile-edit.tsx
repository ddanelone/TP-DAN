import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUser } from "@/lib/auth";
import { CircleUser, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { getFromLocalstorage } from "@/action/get-from-localstorage";
import { setInLocalstorage } from "@/action/set-in-localstorage";
import { useRouter } from "next/navigation";

function ProfileEdit() {
  const user = useUser(); // Asumiendo que useUser() proporciona los datos del usuario
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Nombre debe tener al menos 2 caracteres de longitud",
    }),
    surname: z.string().min(4, {
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
    email: z
      .string()
      .email("El formato del email no es válido, debe cumplir el RFC 5322"),
    password: z.string().min(8, {
      message:
        "El formato de la contraseña no es válido, debe contener al menos 8 caracteres",
    }),
    repeatPassword: z.string(),
    role: z.number().int(),
  });

  const { register, handleSubmit, formState, setValue } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      dni: user?.dni ?? "",
      email: user?.email ?? "",
      password: "",
      repeatPassword: "",
      role: user?.role ?? 0,
    },
  });

  const { errors } = formState;

  useEffect(() => {
    setValue("name", user?.name ?? "");
    setValue("surname", user?.surname ?? "");
    setValue("dni", user?.dni ?? "");
    setValue("email", user?.email ?? "");
    setValue("role", user?.role ?? 0);
    setValue("password", user?.password ?? "");
  }, [user, setValue]);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (formData.password !== formData.repeatPassword) {
      toast.error("Las contraseñas no coinciden", { duration: 4000 });
      return;
    }

    // Eliminar repeatPassword del formData antes de enviarlo al backend
    const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;

    setIsLoading(true);

    try {
      // Recuperar el ID del usuario del local storage
      const userLocal = getFromLocalstorage("user");
      const id = userLocal.id;

      // Lógica para actualizar el usuario en el backend
      const userUpdate = await updateUser(id, formDataWithoutRepeatPassword);

      //Asignar el usuario actualizado al localStorage
      setInLocalstorage("user", userUpdate);

      if (userUpdate.role === 1) router.push("/abm/productos");
      else router.push("/productos");

      toast.success("Perfil de usuario actualizado correctamente", {
        duration: 4000,
      });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;

        validationErrors.forEach((errorMessage: string) => {
          toast.error(errorMessage, { duration: 4000 });
        });
      } else {
        toast.error("Error al actualizar el perfil de usuario", {
          duration: 4000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <Badge className="mt-2 text-[14px]" variant={"outline"}>
          <h1 className="text-2xl ml-1">Editar perfil</h1>
        </Badge>
        <Button
          className="px-6"
          type="button"
          disabled={isLoading}
          onClick={() => {
            handleSubmit(onSubmit)();
          }} // Llamar handleSubmit con onSubmit
        >
          {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          Actualizar
          <CircleUser className="ml-2 w-[20px]" />
        </Button>
      </div>
      <div className="m-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          {/* Asegúrate de usar el evento onSubmit */}
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="mb-3">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  id="name"
                  placeholder="Juan Pérez"
                  type="text"
                  autoComplete="name"
                />
                <p className="form-error">{errors.name?.message}</p>
              </div>
              <div className="mb-3">
                <Label htmlFor="surname">Apellido</Label>
                <Input
                  {...register("surname", {
                    required: "El apellido es obligatorio",
                  })}
                  id="surname"
                  placeholder="Apellido"
                  type="text"
                  autoComplete="surname"
                />
                <p className="form-error">{errors.surname?.message}</p>
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="mb-3">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  {...register("email", {
                    required: "El correo es obligatorio",
                  })}
                  id="email"
                  placeholder="nombre@ejemplo.com"
                  type="email"
                  autoComplete="email"
                />
                <p className="form-error">{errors.email?.message}</p>
              </div>
              <div className="mb-3">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  {...register("password")}
                  id="password"
                  placeholder="******"
                  type="password"
                />
                <p className="form-error">{errors.password?.message}</p>
              </div>
              <div className="mb-3">
                <Label htmlFor="repeatPassword">Repetir Contraseña</Label>
                <Input
                  {...register("repeatPassword", {
                    required: "Repita su contraseña",
                  })}
                  id="repeatPassword"
                  placeholder="******"
                  type="password"
                />
                <p className="form-error">{errors.repeatPassword?.message}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileEdit;
