"use client";

import { getFromLocalstorage } from "@/action/get-from-localstorage";
import { User } from "@/interfaces/user.interface";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathName = usePathname();

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

  const isInProtectedRoute = protectedRoutes.includes(pathName);

  useEffect(() => {
    const jwt = getFromLocalstorage("jwt");

    if (!jwt) {
      setUser(null);
      if (isInProtectedRoute) {
        router.push("/");
      }
    } else {
      const userInLocalstorage = getFromLocalstorage("user");
      if (userInLocalstorage) {
        setUser(userInLocalstorage);
      }
    }
  }, [pathName]);

  return user;
};
