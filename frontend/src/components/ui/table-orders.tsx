import React from "react";
import { formatPrice } from "@/action/format-price";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  FileText,
  LayoutList,
  ShoppingCart,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/interfaces/order.interface";
import { ConfirmDeletionOrder } from "@/app/(vendedor)/abm/pedidos/components/confirm-deletion-order";
import { UpdateStatusOrder } from "@/app/(vendedor)/abm/pedidos/components/update-status-order";
import { StatusHistoryView } from "@/app/(vendedor)/abm/pedidos/components/status-history-view";
import { formatDate } from "@/action/format-date";
import DialogOrderDetail from "@/app/(vendedor)/abm/pedidos/components/dialog-order-detail";

interface TableOrderProps {
  orders: Order[];
  getOrders?: () => Promise<void>;
  deleteOrder?: (order: Order) => Promise<void>;
  isLoading: boolean;
}

export function TableOrders({
  orders,
  getOrders,
  deleteOrder,
  isLoading,
}: TableOrderProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">N° Pedido</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center w-[250px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            orders &&
            orders.map((order) => (
              <TableRow key={order.numeroPedido}>
                <TableCell>{order.numeroPedido}</TableCell>
                <TableCell>
                  {order.fecha ? formatDate(new Date(order.fecha)) : "N/A"}{" "}
                  <br />
                </TableCell>
                <TableCell>{order.cliente.nombre}</TableCell>
                <TableCell>{order.cliente.apellido}</TableCell>
                <TableCell>{formatPrice(order.total)}</TableCell>
                <TableCell>{order.estado}</TableCell>
                <TableCell className="text-center">
                  {/* ========== Historial de la Orden ========== */}
                  {getOrders && (
                    <StatusHistoryView order={order} getOrders={getOrders}>
                      <Button className="ml-4 mt-4">
                        <Calendar />
                      </Button>
                    </StatusHistoryView>
                  )}
                  {/* ========== Actualizar Estado de Orden ========== */}
                  {getOrders && (
                    <UpdateStatusOrder
                      orderToUpdate={order}
                      getOrders={getOrders}
                    >
                      <Button className="ml-4 mt-4">
                        <SquarePen />
                      </Button>
                    </UpdateStatusOrder>
                  )}
                  {/* ========== Ver Detalle de Orden ========== */}
                  {getOrders && (
                    <DialogOrderDetail
                      orderToView={order}
                      orderDetail={order.detalle}
                      getOrders={getOrders}
                      isLoading={isLoading}
                    >
                      <Button className="ml-4 mt-4">
                        <FileText />
                      </Button>
                    </DialogOrderDetail>
                  )}
                  {/* ========== Eliminar Orden  ========== */}
                  {deleteOrder && (
                    <ConfirmDeletionOrder
                      deleteOrder={deleteOrder}
                      order={order}
                    >
                      <Button className="ml-4 mt-4" variant={"destructive"}>
                        <Trash2 />
                      </Button>
                    </ConfirmDeletionOrder>
                  )}
                </TableCell>
              </TableRow>
            ))}

          {/* ========== Loading ========== */}
          {isLoading &&
            [1, 1, 1, 1, 1].map((e, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-16 h-16 rounded-xl" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* ========== No hay productos para mostrar ========== */}
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
}
