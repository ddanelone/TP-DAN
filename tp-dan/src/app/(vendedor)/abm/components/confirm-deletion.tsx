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
import { Product } from "@/interfaces/product-interface";

interface ConfirmDeletionProps {
  children: React.ReactNode;
  deleteItem: (item: Product) => Promise<void>;
  item: Product;
}

export function ConfirmDeletion({
  children,
  deleteItem,
  item,
}: ConfirmDeletionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de querer eliminar el producto?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permamente y no podrás deshacerla luego.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteItem(item)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
