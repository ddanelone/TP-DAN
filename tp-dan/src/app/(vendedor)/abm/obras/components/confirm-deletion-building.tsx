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
import { Building } from "@/interfaces/building.interface";

interface ConfirmDeletionProps {
  children: React.ReactNode;
  deleteBuilding: (building: Building) => Promise<void>;
  building: Building;
}

export function ConfirmDeletionBuilding({
  children,
  deleteBuilding,
  building,
}: ConfirmDeletionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de querer eliminar la Obra?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permamente y no podrás deshacerla luego.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteBuilding(building)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
