"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Order } from "@/interfaces/order.interface";
import { OrderDetails } from "@/interfaces/order-detail.interface";
import { TableOrderDetail } from "./table-detail-order";

interface StatusHistoryViewProps {
  children: React.ReactNode;
  orderToView: Order;
  orderDetail: OrderDetails[];
  getOrders: () => Promise<void>;
  isLoading: boolean;
}

export function DialogOrderDetail({
  children,
  orderToView,
  orderDetail,
  getOrders,
  isLoading,
}: StatusHistoryViewProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-full w-full">
          <DialogHeader>
            <DialogTitle>Pedido</DialogTitle>
            <DialogDescription>Detalle de su Orden</DialogDescription>
          </DialogHeader>
          <div className="w-full block">
            <TableOrderDetail
              orderToView={orderToView}
              orderDetail={orderToView.detalle}
              getOrders={getOrders}
              isLoading={isLoading}
            ></TableOrderDetail>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogOrderDetail;
