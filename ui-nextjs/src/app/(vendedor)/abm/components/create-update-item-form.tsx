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
import { SelectCategoryes } from "@/components/ui/products-category-select";
import { saveProduct } from "@/lib/auth";

interface CreateUpdateItemProps {
  children: React.ReactNode;
  itemToUpdate?: Product;
  getItems: () => Promise<void>;
}

interface CreateUpdateItemsFormProps {
  onSubmit: (product: Product) => void;
  initialProduct?: Product;
}

export function CreateUpdateItem({
  children,
  itemToUpdate,
  getItems,
}: CreateUpdateItemProps) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  /* ========== Formulario ========== */

  const formSchema = z.object({
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
    descuento: z.coerce.number().gte(0, "El precio debe ser mayor a 0"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: itemToUpdate
      ? itemToUpdate
      : {
          nombre: "",
          descripcion: "",
          categoria: Category.CEMENTOS, // Por defecto seleccionar la primera categoría
          precio: undefined,
          stockActual: undefined,
          stockMinimo: undefined,
          descuento: undefined,
        },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  /* ========== Crear o actualizar un Producto ========== */
  const onSubmit = async (item: z.infer<typeof formSchema>) => {
    if (itemToUpdate && itemToUpdate.id) {
      // Si itemToUpdate tiene un id, es una actualización
      updateItem({ ...item, id: itemToUpdate.id });
    } else {
      // De lo contrario, es una creación
      createItem(item);
    }
  };

  /* ========== Crear un item en la base de datos ========== */

  const createItem = async (item: Product) => {
    setIsLoading(true);

    try {
      const createdProduct = await saveProduct(item);
      toast.success("Item creado correctamente");

      getItems();

      setOpen(false);

      form.reset();
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Actualizar un item en la base de datos ========== */

  const updateItem = async (item: Product) => {
    setIsLoading(true);

    try {
      const updatedProduct = await saveProduct(item);
      toast.success("Item actualizado correctamente");

      getItems();

      setOpen(false);

      form.reset();
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Manejo del select de categorias ========== */
  const handleCategoryChange = (category: Category) => {
    setValue("categoria", category);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {itemToUpdate ? "Actualizar Producto" : "Crear Producto"}
          </DialogTitle>
          <DialogDescription>
            Gestiona tus productos con la siguiente información
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[80vh]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              {/* ========== Nombre ========== */}
              <div className="mb-3">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  {...register("nombre")}
                  id="nombre"
                  placeholder="Nombre del producto"
                  type="text"
                  autoComplete="nombre"
                />
                <p className="form-error">{errors.nombre?.message}</p>
              </div>
              {/* ========== Descripción ========== */}
              <div className="mb-3">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  {...register("descripcion")}
                  id="descripcion"
                  placeholder="Descripción del producto"
                  type="text"
                  autoComplete="descripcion"
                />
                <p className="form-error">{errors.descripcion?.message}</p>
              </div>
              {/* ========== Categoria ========== */}
              <div className="mb-3">
                <Label htmlFor="categoria">Categoría</Label>
                <SelectCategoryes
                  selectedCategory={form.watch("categoria") || null}
                  onCategoryChange={handleCategoryChange}
                />
                <p className="form-error">{errors.categoria?.message}</p>
              </div>

              {/* ========== Precio ========== */}
              <div className="mb-3">
                <Label htmlFor="Precio">Precio</Label>
                <Input
                  {...register("precio")}
                  id="precio"
                  placeholder="0.00"
                  step="0.01"
                  type="number"
                />
                <p className="form-error">{errors.precio?.message}</p>
              </div>

              {/* ========== Descuento ========== */}
              <div className="mb-3">
                <Label htmlFor="Descuento">Descuento</Label>
                <Input
                  {...register("descuento")}
                  id="descuento"
                  placeholder="0.00"
                  step="0.01"
                  type="number"
                />
                <p className="form-error">{errors.descuento?.message}</p>
              </div>
              {/* ========== Stock ACtual ========== */}
              <div className="mb-3">
                <Label htmlFor="stockActual">Stock Actual</Label>
                <Input
                  {...register("stockActual")}
                  id="stockActual"
                  placeholder="0"
                  step="1"
                  type="number"
                  min="0"
                />
                <p className="form-error">{errors.stockActual?.message} </p>
              </div>
              {/* ========== Stock Mínimo ========== */}
              <div className="mb-3">
                <Label htmlFor="stockMinimo">Stock Mínimo</Label>
                <Input
                  {...register("stockMinimo")}
                  id="stockMinimo"
                  placeholder="0"
                  step="1"
                  type="number"
                  min="0"
                />
                <p className="form-error">{errors.stockMinimo?.message}</p>
              </div>

              {/* ========== Botón de enviar ========== */}
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {itemToUpdate ? "Actualizar" : "Crear"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
