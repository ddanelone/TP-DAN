import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AuthorizedUser } from "@/interfaces/user-authorize.interface";

interface ConfirmDeletionProps {
  children: React.ReactNode;
  deleteUser: (user: AuthorizedUser) => Promise<void>;
  userAuth: AuthorizedUser;
}

export function ConfirmDeletionUser({
  children,
  deleteUser,
  userAuth,
}: ConfirmDeletionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de querer eliminar el Usuario Autorizado?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permamente y no podrás deshacerla luego.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteUser(userAuth)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
