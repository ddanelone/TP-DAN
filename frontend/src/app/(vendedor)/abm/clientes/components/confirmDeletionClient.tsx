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
import { Costumer } from "@/interfaces/costumer.interface";

interface ConfirmDeletionProps {
  children: React.ReactNode;
  deleteClient: (client: Costumer) => Promise<void>;
  client: Costumer;
}

export function ConfirmDeletionClient({
  children,
  deleteClient,
  client,
}: ConfirmDeletionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de querer eliminar el Cliente?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permamente y no podrás deshacerla luego.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteClient(client)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
