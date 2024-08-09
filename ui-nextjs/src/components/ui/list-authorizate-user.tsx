import { Button } from "@/components/ui/button";
import { LayoutList, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AuthorizedUser } from "@/interfaces/user-authorize.interface";
import { CreateUpdateUser } from "@/app/(cliente)/usuarios/components/create-update-user";
import { ConfirmDeletionUser } from "@/app/(cliente)/usuarios/components/confirm-deletion-user";

interface TableAuthorizateUserProps {
  isLoading: boolean;
  userAuths: AuthorizedUser[];
  getUsers: () => Promise<void>;
  deleteUser: (userAuth: AuthorizedUser) => Promise<void>;
}

export function ListAuthorizateUser({
  isLoading,
  userAuths,
  getUsers,
  deleteUser,
}: TableAuthorizateUserProps) {
  return (
    <div className="w-full block md:hidden">
      {/* Utiliza w-full para ocupar todo el ancho disponible */}
      {!isLoading &&
        userAuths &&
        userAuths.map((user) => (
          <div
            key={user.id}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <h3 className="font-semibold">{user.apellido}</h3>
                <div className="text-sm">
                  Nombre: {user.nombre} <br />
                  D.N.I.: {user.dni} <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Correo Electrónico: {user.correoElectronico}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {getUsers && (
                <CreateUpdateUser userToUpdate={user} getUsers={getUsers}>
                  <Button className="w-8 h-8 p-0">
                    <SquarePen className="w-5 h-5" />
                  </Button>
                </CreateUpdateUser>
              )}

              {deleteUser && (
                <ConfirmDeletionUser deleteUser={deleteUser} userAuth={user}>
                  <Button className="ml-4" variant={"destructive"}>
                    <Trash2 />
                  </Button>
                </ConfirmDeletionUser>
              )}
            </div>
          </div>
        ))}
      {isLoading &&
        [1, 1, 1, 1, 1].map((item, i) => (
          <div
            key={i}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <div className="ml-6">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="w-[100px] h-4 mt-2" />
              </div>
            </div>
          </div>
        ))}
      {!isLoading && userAuths.length === 0 && (
        <div className="text-gray-200 my-20">
          <div className="flex justify-center">
            <LayoutList className="w-[120px] h-[120px]" />
          </div>
          <h2 className="text-center">
            No tiene Usuarios habilitados para operar por usted
          </h2>
        </div>
      )}
    </div>
  );
}

export default ListAuthorizateUser;
