"use client";

import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import { deletePedido, getAllPedidos, getClientByEmail } from "@/lib/auth";
import { Order } from "@/interfaces/order.interface";
import { TableOrders } from "@/components/ui/table-orders";
import ListOrders from "@/components/ui/list-orders";
import { setInLocalstorage } from "@/action/set-in-localstorage";
import { Costumer } from "@/interfaces/costumer.interface";
import { getFromLocalstorage } from "@/action/get-from-localstorage";

const OrdersClient = () => {
  const user = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [client, setClient] = useState<Costumer | undefined>();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const getMyClientData = async () => {
    const emailUser = user?.email;
    setIsLoading(true);

    try {
      const res = await getClientByEmail(emailUser);
      console.log(res);
      if (res) {
        setInLocalstorage("idClient", res.id);
      }
    } catch (error) {
      toast.error(
        "No se pudo recuperar los datos de Cliente asociado con este Usuario.",
        {
          duration: 2000,
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const res: Order[] = await getAllPedidos();

      console.log(res);

      const idLocalClient = getFromLocalstorage("idClient");
      if (idLocalClient) {
        const filteredOrders = res.filter(
          (order: Order) => order.cliente?.id === idLocalClient
        );
        setOrders(filteredOrders);
        setClient(idLocalClient);
        setIsFiltered(true);
      } else {
        setOrders(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
    if (user) {
      getMyClientData().then(() => {
        getOrders();
      });
    }
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Gestor de Pedidos</h1>
          {orders.length > 0 && (
            <Badge className="mt-2 text-[14px]" variant={"outline"}>
              SECCIÓN EXCLUSIVA PARA COMPRADORES
            </Badge>
          )}
        </div>
      </div>
      <TableOrders orders={orders} isLoading={isLoading} />
      <ListOrders orders={orders} isLoading={isLoading} />
    </>
  );
};

export default OrdersClient;
