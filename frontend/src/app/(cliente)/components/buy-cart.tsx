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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { formatPrice } from "@/action/format-price";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Order } from "@/interfaces/order.interface";
import { Status } from "@/interfaces/order-state-interface";
import { Costumer } from "@/interfaces/costumer.interface";
import { createPedido, getClientByEmail } from "@/lib/auth";
import { useUser } from "@/hooks/use-user";

interface BuyCartProps {
  children: React.ReactNode;
  cartItems: Product[];
  removeItem: (item: Product) => void;
}

export function BuyCart({ children, cartItems, removeItem }: BuyCartProps) {
  const user = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [client, setClient] = useState<Costumer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMyClientData = async () => {
    const emailUser = user?.email;
    setIsLoading(true);

    try {
      const res = await getClientByEmail(emailUser);
      if (res) {
        setClient(res);
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

  const handleRemoveItem = (item: Product) => {
    removeItem(item);
  };

  const handlePurchase = async () => {
    if (cartItems.length === 0) {
      toast.error("El carrito está vacío. No se puede realizar la compra.");
      return;
    }

    if (!client) {
      toast.error(
        "No se pudo recuperar los datos del cliente. Inténtalo nuevamente."
      );
      return;
    } else {
      console.log("Maximo Descubierto: ", client.maximoDescubierto);
      if (
        client?.maximoDescubierto !== undefined &&
        client.maximoDescubierto <
          cartItems.reduce((acc, item) => acc + item.precio * item.cantidad!, 0)
      ) {
        toast.error(
          "No puede hacer este pedido porque no tiene suficiente crédito autorizado."
        );
        return;
      }
    }

    const newOrder: Order = {
      fecha: new Date(),
      numeroPedido: undefined,
      usuario: user ? user.email : undefined,
      observaciones: "",
      cliente: {
        id: client.id,
        nombre: client.nombre,
        apellido: client.apellido,
        correoElectronico: client.correoElectronico,
        dni: client.dni,
        cuit: client.cuit,
      },
      total: cartItems.reduce(
        (acc, item) => acc + item.precio * item.cantidad!,
        0
      ),
      estado: Status.PENDIENTE,
      detalle: cartItems.map((item) => ({
        cantidad: item.cantidad!,
        producto: item as Product, // Aseguramos que item es de tipo Product
        precioUnitario: item.precio,
        descuento: 0, // Asumimos que no hay descuento
        precioFinal: item.precio * item.cantidad!,
      })),
      historialEstado: [],
    };

    setIsLoading(true);
    try {
      // Enviar el pedido al servidor
      console.log("Orden a persistir :", newOrder);
      await createPedido(newOrder);
      // Mostrar mensaje de éxito
      toast.success("Pedido realizado con éxito.");

      // Borrar el contenido del carrito
      //clearCart();

      // Navegar a /pedidos
      router.push("/pedidos");
    } catch (error) {
      console.error(error);
      toast.error(
        "Hubo un problema al realizar el pedido. Inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      getMyClientData().then(() => {
        console.log("Cliente recuperado");
      });
    }
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Carrito de Compras</DialogTitle>
          <DialogDescription>
            Aquí puedes ver y gestionar los productos que has añadido a tu
            carrito.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Cantidad</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {item.cantidad}
                  </td>
                  <td className="py-2 px-4 border-b">{item.nombre}</td>
                  <td className="py-2 px-4 border-b text-right">
                    {formatPrice(item.precio)}
                  </td>
                  <td className="py-2 px-4 border-b text-right">
                    {formatPrice(item.precio * item.cantidad!)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Button
                      variant="destructive"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full items-center">
            <div className="text-left">
              <Badge className="mt-2 text-[14px]" variant={"outline"}>
                Total a Pagar:{" "}
                {formatPrice(
                  cartItems.reduce(
                    (acc, item) => acc + item.precio * item.cantidad!,
                    0
                  )
                )}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={handleClose}
              >
                Agregar más productos
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handlePurchase}
              >
                Crear Pedido
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
