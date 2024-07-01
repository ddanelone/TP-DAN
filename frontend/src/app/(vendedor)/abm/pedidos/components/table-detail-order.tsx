import React from "react";
import { formatPrice } from "@/action/format-price";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutList } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "@/interfaces/order.interface";
import { OrderDetails } from "@/interfaces/order-detail.interface";
import { Badge } from "@/components/ui/badge";

interface TableOrderDetailProps {
  isLoading: boolean;
  orderToView: Order;
  orderDetail: OrderDetails[];
  getOrders?: () => Promise<void>;
}

export function TableOrderDetail({
  orderToView,
  orderDetail,
  getOrders,
  isLoading,
}: TableOrderDetailProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableCaption className="text-left ">
          <Badge className="mt-2 font-semibold" variant={"outline"}>
            Total de la orden: $ {formatPrice(orderToView.total)}
          </Badge>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cantidad</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Descripcion</TableHead>
            <TableHead>Precio unitario</TableHead>
            <TableHead>Descuento</TableHead>
            <TableHead>Precio final</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderDetail && orderDetail.length > 0 ? (
            orderDetail.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>{detail.cantidad}</TableCell>
                <TableCell>{detail.producto.id}</TableCell>
                <TableCell>{detail.producto.nombre}</TableCell>
                <TableCell>{detail.producto.descripcion}</TableCell>
                <TableCell>{formatPrice(detail.precioUnitario)}</TableCell>
                <TableCell>{formatPrice(detail.descuento)}</TableCell>
                <TableCell>{formatPrice(detail.precioFinal)}</TableCell>
                <TableCell>
                  {formatPrice(detail.precioFinal * detail.cantidad)}
                </TableCell>
              </TableRow>
            ))
          ) : !isLoading && orderDetail.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="text-gray-200 my-20">
                  <div className="flex justify-center">
                    <LayoutList className="w-[120px] h-[120px]" />
                  </div>
                  <h2 className="text-center">No hay detalle disponible</h2>
                </div>
              </TableCell>
            </TableRow>
          ) : null}
          {isLoading &&
            [1, 1, 1, 1, 1].map((e, i) => (
              <TableRow key={i}>
                <TableCell colSpan={7}>
                  <div className="flex justify-between">
                    <Skeleton className="w-16 h-16 rounded-xl" />
                    <Skeleton className="w-full h-4 mx-2" />
                    <Skeleton className="w-full h-4 mx-2" />
                    <Skeleton className="w-full h-4 mx-2" />
                    <Skeleton className="w-full h-4 mx-2" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
