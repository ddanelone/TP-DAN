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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";

interface AddItemToCartProps {
  children: React.ReactNode;
  item: Product;
  addItem: (item: Product) => void;
}

export function AddItemToCart({ children, item, addItem }: AddItemToCartProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      nombre: item.nombre,
      descripcion: item.descripcion,
      precio: item.precio,
      cantidad: 1,
    },
  });

  const cantidad = watch("cantidad");
  const totalItem = item.precio * cantidad;

  const onSubmit = (data: any) => {
    addItem({ ...item, cantidad: data.cantidad });
    console.log("Item agregado al carrito", {
      ...item,
      cantidad: data.cantidad,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar {item.nombre} al carrito</DialogTitle>
          <DialogDescription>
            Ajusta la cantidad y revisa el total antes de agregar al carrito.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {/* Nombre */}
            <div className="mb-3">
              <Label htmlFor="nombre">Nombre</Label>
              <Input id="nombre" value={item.nombre} disabled />
            </div>
            {/* Descripción */}
            <div className="mb-3">
              <Label htmlFor="descripcion">Descripción</Label>
              <Input id="descripcion" value={item.descripcion} disabled />
            </div>
            {/* Precio */}
            <div className="mb-3">
              <Label htmlFor="precio">Precio</Label>
              <Input id="precio" value={item.precio.toFixed(2)} disabled />
            </div>
            {/* Cantidad */}
            <div className="mb-3">
              <Label htmlFor="cantidad">Cantidad</Label>
              <Controller
                name="cantidad"
                control={control}
                render={({ field }) => (
                  <Input id="cantidad" type="number" {...field} min={0} />
                )}
              />
            </div>
            {/* Total */}
            <div className="mb-3">
              <Label htmlFor="totalItem">Total</Label>
              <Input id="totalItem" value={totalItem.toFixed(2)} disabled />
            </div>
            {/* Botón de enviar */}
            <DialogFooter>
              <Button type="submit">Agregar</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

AddItemToCart.displayName = "AddItemToCart";

export default AddItemToCart;
