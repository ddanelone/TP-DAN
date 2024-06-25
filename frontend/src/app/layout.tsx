"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { useUser } from "@/hooks/use-user";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUser();
  const pathName = usePathname();
  const router = useRouter();

  const authRoutes = ["/", "/sign-up", "/forgot-password"];
  const protectedRoutes = [
    "/productos",
    "/pedidos",
    "/obras",
    "/profile",
    "/abm/productos",
    "/abm/pedidos",
    "/abm/obras",
    "/abm/clientes",
  ];

  useEffect(() => {
    if (user) {
      // Redirigir usuarios autenticados fuera de las rutas de autenticación
      if (authRoutes.includes(pathName)) {
        if (user.role === 1 && pathName !== "/abm/productos") {
          router.push("/abm/productos");
        } else if (user.role === 0 && pathName !== "/productos") {
          router.push("/productos");
        }
      }
    } else {
      // Redirigir a la página de login si no hay usuario autenticado y se encuentra en una ruta protegida
      if (
        !authRoutes.includes(pathName) &&
        protectedRoutes.includes(pathName)
      ) {
        router.push("/");
      }
    }
  }, [user, pathName, router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
