"use client";

import { Badge } from "@/components/ui/badge";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import toast from "react-hot-toast";
import {
  deleteAuthorizedUser,
  getClientByEmail,
  getClientById,
} from "@/lib/auth";
import { AuthorizedUser } from "@/interfaces/user-authorize.interface";
import { TableAuthorizateUser } from "@/components/ui/table-authorizate-user";
import ListAuthorizateUser from "@/components/ui/list-authorizate-user";
import { CreateUpdateUser } from "./create-update-user";
import { setInLocalstorage } from "@/action/set-in-localstorage";
import { getFromLocalstorage } from "@/action/get-from-localstorage";

const UserAuthorizateManager = () => {
  const user = useUser();
  const [userAuths, setAuthUsers] = useState<AuthorizedUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMyClientData = async () => {
    const emailUser = user?.email;
    setIsLoading(true);

    try {
      const res = await getClientByEmail(emailUser);
      console.log(res);
      if (res) {
        setInLocalstorage("idClient", res.id);
      }
    } catch (error) {
      toast.error("No se han recuperado usuarios autorizados", {
        duration: 2000,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    const idClient = getFromLocalstorage("idClient");

    setIsLoading(true);

    try {
      const res = await getClientById(idClient);
      console.log(res);

      // Extraer el arreglo de usuarios habilitados del cliente
      const authorizedUsers = res.usuariosHabilitados || [];

      setAuthUsers(authorizedUsers);
    } catch (error) {
      toast.error("No se han recuperado usuarios autorizados", {
        duration: 2000,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userA: AuthorizedUser) => {
    setIsLoading(true);

    try {
      await deleteAuthorizedUser(userA?.id);

      toast.success("Usuario Authorizado desvinculado correctamente");

      // Borro el Usuario Autorizado de la tabla DEL CLIENTE
      const newUsers = userAuths.filter((i) => i.id !== userA.id);

      setAuthUsers(newUsers);
    } catch (error: any) {
      toast.error(
        "No se pudo eliminar el Usuario Autorizado por el Cliente: " +
          error.message,
        {
          duration: 4000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getMyClientData().then(() => {
        getUsers();
      });
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Administración Usuarios Habilitados</h1>
          <Badge className="mt-2 text-[14px]" variant={"outline"}>
            SECCIÓN EXCLUSIVA PARA COMPRADORES
          </Badge>
        </div>
        <CreateUpdateUser getUsers={getUsers}>
          <Button className="px-6">
            Nuevo Habilitado
            <CirclePlus className="ml-2 w-[20px]" />
          </Button>
        </CreateUpdateUser>
      </div>
      <div className="m-4">
        <TableAuthorizateUser
          isLoading={isLoading}
          userAuths={userAuths}
          getUsers={getUsers}
          deleteUser={deleteUser}
        />
        <ListAuthorizateUser
          isLoading={isLoading}
          userAuths={userAuths}
          getUsers={getUsers}
          deleteUser={deleteUser}
        />
      </div>
    </>
  );
};

export default UserAuthorizateManager;
