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
import { Order } from "@/interfaces/order.interface";
import { Product } from "@/interfaces/product-interface";

interface ConfirmDeletionProps {
  children: React.ReactNode;
  deleteOrder: (order: Order) => Promise<void>;
  order: Order;
}

export function ConfirmDeletionOrder({
  children,
  deleteOrder,
  order,
}: ConfirmDeletionProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estás seguro de querer eliminar la Orden?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción es permamente y no podrás deshacerla luego.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteOrder(order)}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
