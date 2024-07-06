import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import { deletePedido, getAllPedidos } from "@/lib/auth";
import { Order } from "@/interfaces/order.interface";
import { TableOrders } from "@/components/ui/table-orders";
import ListOrders from "@/components/ui/list-orders";
import { OrderDetails } from "@/interfaces/order-detail.interface";

function Orders() {
  const user = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const res = await getAllPedidos();

      console.log(res);

      setOrders(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Borrar un Pedido de la base de datos ========== */

  const deleteOrder = async (order: Order) => {
    setIsLoading(true);

    try {
      const res = await deletePedido(order?.id);

      toast.success("Pedido eliminado correctamente");

      const newOrders = orders.filter((i) => i.id !== order.id);

      setOrders(newOrders);
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getOrders();
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Gestor de Pedidos</h1>
          {orders.length > 0 && (
            <Badge className="mt-2 text-[14px]" variant={"outline"}>
              SECCIÓN EXCLUSIVA PARA VENDEDORES
            </Badge>
          )}
        </div>
      </div>
      <TableOrders
        deleteOrder={deleteOrder}
        getOrders={getOrders}
        orders={orders}
        isLoading={isLoading}
      />
      <ListOrders
        deleteOrder={deleteOrder}
        getOrders={getOrders}
        orders={orders}
        isLoading={isLoading}
      />
    </>
  );
}

export default Orders;
