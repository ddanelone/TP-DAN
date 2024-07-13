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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/use-user";
import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";
import { Category } from "@/interfaces/product-category-interface";
import { updateOrderProvision, updatePromotionalDiscount } from "@/lib/auth";

interface UpdateStockPriceDiscountProps {
  children: React.ReactNode;
  itemToUpdate: Product; // Producto seleccionado para mostrar información
  getItems: () => Promise<void>;
}

export function UpdateStockPriceDiscount({
  children,
  itemToUpdate,
  getItems,
}: UpdateStockPriceDiscountProps) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  /* ========== Formulario ========== */

  // Schema para la visualización de detalles del producto
  const formSchemaView = z.object({
    nombre: z.string().min(4, { message: "El nombre es requerido" }),
    descripcion: z.string().min(4, { message: "La descripción es requerida" }),
    categoria: z.nativeEnum(Category),
    precio: z.coerce.number().gte(0, "El precio debe ser mayor a 0"),
    stockActual: z.coerce
      .number()
      .gte(0, "El stock debe ser mayor o igual a 0"),
    stockMinimo: z.coerce
      .number()
      .gte(0, "El stock mínimo debe ser mayor o igual a 0"),
    descuento: z.coerce
      .number()
      .gte(0, "El descuento debe ser mayor o igual a 0"),
  });

  // Schema para la actualización de precio, stock recibido y descuento
  const formSchemaUpdate = z.object({
    precio: z.coerce.number().gte(0, "El precio debe ser mayor a 0"),
    stockRecibido: z.coerce
      .number()
      .gte(0, "El stock recibido debe ser mayor o igual a 0"),
    descuento: z.coerce
      .number()
      .gte(0, "El descuento debe ser mayor o igual a 0"),
  });

  const formView = useForm<z.infer<typeof formSchemaView>>({
    resolver: zodResolver(formSchemaView),
    defaultValues: itemToUpdate,
  });

  const formUpdate = useForm<z.infer<typeof formSchemaUpdate>>({
    resolver: zodResolver(formSchemaUpdate),
    defaultValues: {
      precio: itemToUpdate.precio,
      stockRecibido: 0,
      descuento: itemToUpdate.descuento,
    },
  });

  const {
    handleSubmit: handleSubmitUpdate,
    formState: formStateUpdate,
    setValue: setValueUpdate,
  } = formUpdate;
  const { errors: errorsUpdate } = formStateUpdate;

  /* ========== Actualizar el stock, precio y descuento ========== */
  const onSubmitUpdate = async (formData: z.infer<typeof formSchemaUpdate>) => {
    setIsLoading(true);

    try {
      //Actualizar stock y precio si hubo modificaciones
      if (
        formData.stockRecibido !== 0 ||
        formData.precio !== itemToUpdate.precio
      ) {
        await updateOrderProvision(
          itemToUpdate.id,
          formData.stockRecibido,
          formData.precio
        );
        toast.success("Precios y Stock actualizados correctamente");
      } else {
        toast.error("No se realizaron cambios en stock y precio", {
          duration: 2500,
        });
      }

      //Actualizar descuento si es diferente al actual
      if (formData.descuento !== itemToUpdate.descuento) {
        await updatePromotionalDiscount(itemToUpdate.id, formData.descuento);
        toast.success("Actualización de descuentos realizada correctamente");
      } else {
        toast.error("No se realizaron cambios en descuentos", {
          duration: 2500,
        });
      }

      getItems();
      setOpen(false);
      formView.reset();
      formUpdate.reset();
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Renderizado del componente ========== */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Actualizar: stock / precio / descuento</DialogTitle>
          <DialogDescription>
            Gestionar productos con la siguiente información:
          </DialogDescription>
        </DialogHeader>

        {/* Mostrar detalles del producto */}
        <div className="grid gap-2">
          <div className="mb-3">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              type="text"
              value={itemToUpdate.nombre}
              readOnly
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              type="text"
              value={itemToUpdate.descripcion}
              readOnly
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="categoria">Categoría</Label>
            <Input
              id="categoria"
              type="text"
              value={itemToUpdate.categoria}
              readOnly
            />
          </div>
        </div>

        {/* Formulario para actualizar precio, stock recibido y descuento */}
        <form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
          <div className="grid gap-2">
            <div className="mb-3">
              <Label htmlFor="precio">Precio</Label>
              <Input
                {...formUpdate.register("precio")}
                autoComplete="precio"
                id="precio"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
              <p className="form-error">{errorsUpdate.precio?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="descuento">Descuento</Label>
              <Input
                {...formUpdate.register("descuento")}
                autoComplete="descuento"
                id="descuento"
                type="number"
                step="0.01"
                placeholder="0.00"
              />
              <p className="form-error">{errorsUpdate.descuento?.message}</p>
            </div>
            <div className="mb-3">
              <Label htmlFor="stockRecibido">Stock Recibido</Label>
              <Input
                {...formUpdate.register("stockRecibido")}
                autoComplete="stockRecibido"
                id="stockRecibido"
                type="number"
                step="1"
                placeholder="0"
              />
              <p className="form-error">
                {errorsUpdate.stockRecibido?.message}
              </p>
            </div>
          </div>

          {/* Botón de enviar */}
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Actualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
