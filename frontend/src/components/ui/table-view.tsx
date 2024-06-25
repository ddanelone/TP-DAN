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
import { Product } from "@/interfaces/product-interface";
import { LayoutList, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateUpdateItem } from "@/app/(vendedor)/abm/components/create-update-item-form";
import { ConfirmDeletion } from "@/app/(vendedor)/abm/components/confirm-deletion";
import AddItemToCart from "@/app/(cliente)/components/add-item-to-cart";

interface TableViewProps {
  items: Product[];
  getItems?: () => Promise<void>;
  deleteItem?: (item: Product) => Promise<void>;
  isLoading: boolean;
  addItem?: (item: Product) => void;
}

export function TableView({
  items,
  getItems,
  deleteItem,
  isLoading,
  addItem,
}: TableViewProps) {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombre</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Stock Actual</TableHead>
            <TableHead>Stock Mínimo</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead className="text-center w-[250px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            items &&
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-semibold w-[350px]">
                  {item.nombre}
                </TableCell>
                <TableCell className="font-semibold w-[350px]">
                  {item.descripcion}
                </TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{item.stockActual}</TableCell>
                <TableCell>{item.stockMinimo}</TableCell>
                <TableCell>{formatPrice(item.precio)}</TableCell>
                <TableCell className="text-center">
                  {/* ========== Actualizar producto ========== */}
                  {getItems && (
                    <CreateUpdateItem itemToUpdate={item} getItems={getItems}>
                      <Button>
                        <SquarePen />
                      </Button>
                    </CreateUpdateItem>
                  )}
                  {/* ========== Eliminar producto  ========== */}
                  {deleteItem && (
                    <ConfirmDeletion deleteItem={deleteItem} item={item}>
                      <Button className="ml-4" variant={"destructive"}>
                        <Trash2 />
                      </Button>
                    </ConfirmDeletion>
                  )}
                  {/* ========== Agregar al carrito ========== */}
                  {addItem && (
                    <AddItemToCart item={item} addItem={addItem}>
                      <Button>
                        <ShoppingCart />
                      </Button>
                    </AddItemToCart>
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

      {!isLoading && items.length === 0 && (
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
