"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/auth"; // Cambiado a "@/lib/auth"
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getFromLocalstorage } from "@/action/get-from-localstorage";

function SignInForm() {
  const router = useRouter(); // Usa useRouter para la redirección
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /* ========== Formulario ========== */
  const formSchema = z.object({
    email: z
      .string()
      .email("El formato del correo electrónico no es válido")
      .min(1, { message: "El correo electrónico es requerido" }),
    password: z.string().min(8, {
      message:
        "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  /* ========== Iniciar Sesión ========== */
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await signIn(user);
      toast.success("Sesión iniciada correctamente", { duration: 4000 });

      // Obtener el usuario autenticado después del inicio de sesión
      const authenticatedUser = getFromLocalstorage("user");
      if (authenticatedUser.role === 1) {
        router.push("/abm/productos");
      } else {
        router.push("/productos");
      }
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
        <p className="text-sm text-muted-foreground">
          Ingrese su usuario y contraseña para acceder al sistema
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {/* ========== Email ========== */}
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
          {/* ========== Password ========== */}
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

          <Link
            href="/forgot-password"
            className="underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end"
          >
            {" ¿Olvidaste tu contraseña? "}
          </Link>

          {/* ========== Botón de enviar ========== */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2  h-4 w-4 animate-spin" />
            )}
            Iniciar sesión
          </Button>
        </div>
      </form>

      {/* ========== Registrarse ========== */}
      <p className="text-center text-sm text-muted-foreground">
        ¿Aun no tenés una cuenta? {""}
        <Link
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary "
        >
          {" "}
          Registrate
        </Link>
      </p>
    </>
  );
}

export default SignInForm;
