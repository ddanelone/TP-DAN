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
import { useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { formatPrice } from "@/action/format-price";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BuyCartProps {
  children: React.ReactNode;
  cartItems: Product[];
  removeItem: (item: Product) => void;
}

export function BuyCart({ children, cartItems, removeItem }: BuyCartProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleRemoveItem = (item: Product) => {
    removeItem(item);
  };

  const handlePurchase = () => {
    // Lógica para manejar la compra (por ahora solo cierra el diálogo)
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                Seguir Comprando
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handlePurchase}
              >
                Comprar
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
