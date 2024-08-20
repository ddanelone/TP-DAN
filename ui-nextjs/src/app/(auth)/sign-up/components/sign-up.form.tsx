"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/lib/auth";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Nombre debe tener al menos 2 caracteres de longitud",
    }),
    surname: z.string().min(3, {
      message: "Apellido debe tener al menos 3 caracteres de longitud",
    }),
    dni: z
      .string()
      .min(8, {
        message:
          "El número de documento no es válido, debe ser un número entero y tener 8 dígitos",
      })
      .regex(/^\d+$/, {
        message: "El número de documento debe contener solo dígitos",
      }),
    email: z
      .string()
      .email("El formato del email no es válido, debe cumplir el RFC 5322"),
    password: z.string().min(8, {
      message:
        "El formato de la password no es válido, debe contener una mayúscula, una minúscula y un número",
    }),
    role: z.number().int({
      message: "El rol debe ser 0 o un número entero positivo",
    }),
  });

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      dni: "",
      email: "",
      password: "",
      role: 1, // Todo el que se da de alta vía web va a ser Vendedor, así puede crear Clientes
    },
  });

  const { errors } = formState;
  const router = useRouter();

  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await createUser(user);
      toast.success(`Bienvenido ${user.name}!`, { icon: "👋" });
      //Asumo que el usuario que se registra es un cliente, lo hizo via web
      router.push("/abm/productos");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        validationErrors.forEach((errorMessage: string) => {
          toast.error(errorMessage, { duration: 4000 });
        });
      } else {
        toast.error("Error al registrar usuario", { duration: 4000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Crear cuenta</h1>
        <p className="text-sm text-muted-foreground">
          Ingrese la siguiente información para crear una cuenta
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="mb-3">
            <Label htmlFor="name">Nombre</Label>
            <Input
              {...register("name")}
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
              {...register("surname")}
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
              {...register("dni")}
              id="dni"
              placeholder="22222222"
              type="text"
              autoComplete="dni"
            />
            <p className="form-error">{errors.dni?.message}</p>
          </div>
          <div className="mb-3">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              {...register("email")}
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

          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2  h-4 w-4 animate-spin" />
            )}
            Registrarse
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tenés una cuenta? {""}
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-primary "
        >
          Ingresá
        </Link>
      </p>
    </>
  );
}

export default SignUpForm;
