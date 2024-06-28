import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutList, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./button";
import { AuthorizedUser } from "@/interfaces/user-authorize.interface";
import { ConfirmDeletionUser } from "@/app/(cliente)/usuarios/components/confirm-deletion-user";
import { CreateUpdateUser } from "@/app/(cliente)/usuarios/components/create-update-user";

interface TableAuthorizateUserProps {
  isLoading: boolean;
  userAuths: AuthorizedUser[];
  getUsers: () => Promise<void>;
  deleteUser: (userAuth: AuthorizedUser) => Promise<void>;
}

export function TableAuthorizateUser({
  isLoading,
  userAuths,
  getUsers,
  deleteUser,
}: TableAuthorizateUserProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Apellido</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead className="text-center w-[250px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            userAuths &&
            userAuths.map((userAuth) => (
              <TableRow key={userAuth.id}>
                <TableCell className="font-semibold">
                  {userAuth.apellido}
                </TableCell>
                <TableCell>{userAuth.nombre}</TableCell>
                <TableCell>{userAuth.correoElectronico}</TableCell>
                <TableCell>{userAuth.dni}</TableCell>
                <TableCell className="text-center">
                  {/* ========== Actualizar Cliente ========== */}

                  <CreateUpdateUser userToUpdate={userAuth} getUsers={getUsers}>
                    <Button>
                      <SquarePen />
                    </Button>
                  </CreateUpdateUser>

                  {/* ========== Eliminar Client  ========== */}

                  <ConfirmDeletionUser
                    deleteUser={deleteUser}
                    userAuth={userAuth}
                  >
                    <Button className="ml-4" variant={"destructive"}>
                      <Trash2 />
                    </Button>
                  </ConfirmDeletionUser>
                </TableCell>
              </TableRow>
            ))}

          {/* ========== Loading ========== */}
          {isLoading &&
            [1, 1, 1, 1, 1].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-16 h-16 rounded-xl" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* ========== No hay productos para mostrar ========== */}

      {!isLoading && userAuths.length === 0 && (
        <div className="text-gray-200 my-20">
          <div className="flex justify-center">
            <LayoutList className="w-[120px] h-[120px]" />
          </div>
          <h2 className="text-center">
            {" "}
            No tiene Usuarios habilitados para operar por usted
          </h2>
        </div>
      )}
    </div>
  );
}
