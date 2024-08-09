"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendResetEmail } from "@/lib/auth"; // Cambiado a "@/lib/auth"
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function RecoverPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  /* ========== Formulario ========== */
  const formSchema = z.object({
    email: z
      .string()
      .email("El formato del correo electrónico no es válido")
      .min(1, { message: "El correo electrónico es requerido" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  /* ========== Recuperar contraseña ========== */
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await sendResetEmail(user.email);
      toast.success(
        "Te hemos enviado un correo electrónico para recuperar tu contraseña",
        { duration: 4000 }
      );
      router.push("/");
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:border border-solid border-gray-300 rounded-xl p-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Recuperar Contraseña</h1>
        <p className="text-sm text-muted-foreground">
          Te enviaremos un correo para recuperar la contraseña
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

          {/* ========== Botón de enviar ========== */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2  h-4 w-4 animate-spin" />
            )}
            Recuperar contraseña
          </Button>
        </div>
      </form>

      {/* ========== Registrarse ========== */}
      <p className="text-center text-sm text-muted-foreground mt-3">
        <Link
          href="/"
          className="underline underline-offset-4 hover:text-primary "
        >
          {"<- Volver"}
        </Link>
      </p>
    </div>
  );
}

export default RecoverPasswordForm;
