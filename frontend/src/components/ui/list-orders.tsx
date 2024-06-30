import { formatPrice } from "@/action/format-price";
import { Button } from "@/components/ui/button";
import { LayoutList, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/interfaces/order.interface";
import { ConfirmDeletionOrder } from "@/app/(vendedor)/abm/pedidos/components/confirm-deletion-order";
import DateConverter from "@/action/convert-instant-to-date";

interface ListOrderProps {
  orders: Order[];
  getOrders?: () => Promise<void>;
  deleteOrder?: (order: Order) => Promise<void>;
  isLoading: boolean;
}

export const ListOrders = ({
  orders,
  getOrders,
  deleteOrder,
  isLoading,
}: ListOrderProps) => {
  return (
    <div className="w-full block md:hidden">
      {/* Utiliza w-full para ocupar todo el ancho disponible */}
      {!isLoading &&
        orders &&
        orders.map((order) => (
          <div
            key={order.numeroPedido}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <h3 className="font-semibold">{order.numeroPedido}</h3>
                <div className="text-sm">
                  Fecha: <DateConverter order={order}></DateConverter> <br />
                  Cliente Nombre: {order.cliente.nombre} <br />
                  Apellido: {order.cliente.apellido} <br />
                  Estado: {order.estado} <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Total: {formatPrice(order.total)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {getOrders && (
                //  <CreateUpdateItem itemToUpdate={item} getItems={getItems}>
                <Button className="w-8 h-8 p-0">
                  <SquarePen className="w-5 h-5" />
                </Button>
                //  </CreateUpdateItem>
              )}

              {deleteOrder && (
                <ConfirmDeletionOrder deleteOrder={deleteOrder} order={order}>
                  <Button className="w-8 h-8 p-0" variant={"destructive"}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </ConfirmDeletionOrder>
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
      {!isLoading && orders.length === 0 && (
        <div className="text-gray-200 my-20">
          <div className="flex justify-center">
            <LayoutList className="w-[120px] h-[120px]" />
          </div>
          <h2 className="text-center">No hay productos disponibles</h2>
        </div>
      )}
    </div>
  );
};

export default ListOrders;
