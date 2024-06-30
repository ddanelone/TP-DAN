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

interface ConfirmNavigationProps {
  children: React.ReactNode;
  viewBuildingsClients: (client: Costumer) => void;
  client: Costumer;
}

export function ConfirmNavigationClient({
  children,
  viewBuildingsClients,
  client,
}: ConfirmNavigationProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Navegar hacia el ABM de Obras?</AlertDialogTitle>
          <AlertDialogDescription>
            Listará las obras asignadas a este cliente únicamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => viewBuildingsClients(client)}>
            Navegar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
