import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import { Status } from "@/interfaces/order-state-interface";
import { SelectStatus } from "./status-select";
import { newStatusOrder } from "@/lib/auth";
import { useForm } from "react-hook-form";

interface UpdateStatusOrderProps {
  children: React.ReactNode;
  orderToUpdate: any;
  getOrders: () => void;
}

export function UpdateStatusOrder({
  children,
  orderToUpdate,
  getOrders,
}: UpdateStatusOrderProps) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: orderToUpdate,
  });
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  /* ========== Actualizar Estado ========== */
  const onSubmit = async (data: any) => {
    const newStatus = watch("estado");
    if (orderToUpdate && newStatus) {
      updateStatus(orderToUpdate.id, newStatus, user?.name);
    }
  };

  /* ========== Actualizar un item en la base de datos ========== */
  const updateStatus = async (
    pedidoId?: string,
    nuevoEstado?: Status,
    usuarioCambio?: string
  ) => {
    setIsLoading(true);

    try {
      const orderHistory = { nuevoEstado, usuarioCambio };

      await newStatusOrder(pedidoId, orderHistory);

      toast.success("Item actualizado correctamente");

      getOrders();

      setOpen(false);
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Manejo del select de Estado ========== */
  const handleStatusChange = (status: Status) => {
    setValue("estado", status);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar Estado</DialogTitle>
          <DialogDescription>Gestiona el Estado del Pedido</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* ========== Número de pedido ========== */}
            <div className="mb-3">
              <Label htmlFor="numeroPedido">Nro. Pedido</Label>
              <Input
                id="numeroPedido"
                type="text"
                autoComplete="numeroPedido"
                disabled
                {...register("numeroPedido")}
              />
            </div>
            {/* ========== Fecha ========== */}
            <div className="mb-3">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="text"
                autoComplete="fecha"
                disabled
                {...register("fecha")}
              />
            </div>
            {/* ========== Cliente ========== */}
            <div className="mb-3">
              <Label htmlFor="clienteNombre">Nombre</Label>
              <Input
                id="clienteNombre"
                type="text"
                disabled
                value={orderToUpdate?.cliente?.nombre || ""}
              />
            </div>
            <div className="mb-3">
              <Label htmlFor="clienteApellido">Apellido</Label>
              <Input
                id="clienteApellido"
                type="text"
                disabled
                value={orderToUpdate?.cliente?.apellido || ""}
              />
            </div>
            {/* ========== Observaciones ========== */}
            <div className="mb-3">
              <Label htmlFor="observaciones">Observaciones</Label>
              <Input
                id="observaciones"
                type="text"
                disabled
                {...register("observaciones")}
              />
            </div>
            {/* ========== Estado ========== */}
            <div className="mb-3">
              <Label htmlFor="estado">Nuevo Estado</Label>
              <SelectStatus
                selectedStatus={watch("estado") || null}
                onStatusChange={handleStatusChange}
              />
            </div>
            {/* ========== Botón de enviar ========== */}
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Actualizar Estado
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
