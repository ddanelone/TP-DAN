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
import { ListHistoryOrders } from "@/app/(vendedor)/abm/components/list-history-order";

interface StatusHistoryViewProps {
  children: React.ReactNode;
  order: Order;
}

export function StatusHistoryView({ children, order }: StatusHistoryViewProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Historial de Estados</DialogTitle>
            <DialogDescription>Evolución del Pedido</DialogDescription>
          </DialogHeader>
          <div className="w-full block">
            <ListHistoryOrders order={order} />
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StatusHistoryView;
