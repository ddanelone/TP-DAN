import { formatPrice } from "@/action/format-price";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/interfaces/product-interface";
import { LayoutList, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import { CreateUpdateItem } from "./create-update-item-form";
import { ConfirmDeletion } from "./confirm-deletion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface ListViewProps {
  items: Product[];
  getItems?: () => Promise<void>;
  deleteItem?: (item: Product) => Promise<void>;
  isLoading: boolean;
  addItem?: (item: Product) => void;
}

const ListView = ({
  items,
  getItems,
  deleteItem,
  isLoading,
  addItem,
}: ListViewProps) => {
  return (
    <div className="block md:hidden">
      {!isLoading &&
        items &&
        items.map((item) => (
          <div
            key={item.id} // Añade una key para ayudar a React con la renderización
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <h3 className="font-semibold">{item.nombre}</h3>
                <div className="text-sm">
                  Descripción: {item.descripcion} <br />
                  Categoría: {item.categoria} <br />
                  Stock Actual: {item.stockActual} <br />
                  Stock Mínimo: {item.stockMinimo} <br />
                  Precio: {formatPrice(item.precio)} <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Total: {formatPrice(item.precio * 1000)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {/* ========== Actualizar producto ========== */}
              {getItems && (
                <CreateUpdateItem itemToUpdate={item} getItems={getItems}>
                  <Button className="w-8 h-8 p-0">
                    <SquarePen className="w-5 h-5" />
                  </Button>
                </CreateUpdateItem>
              )}

              {/* ========== Eliminar producto  ========== */}
              {deleteItem && (
                <ConfirmDeletion deleteItem={deleteItem} item={item}>
                  <Button className="w-8 h-8 p-0" variant={"destructive"}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </ConfirmDeletion>
              )}
              {/* ========== Agregar al carrito ========== */}
              {addItem && (
                <Button
                  className="ml-4"
                  variant={"outline"}
                  onClick={() => addItem(item)}
                >
                  <ShoppingCart />
                </Button>
              )}
            </div>
          </div>
        ))}

      {/* ========== Loading ========== */}
      {isLoading &&
        [1, 1, 1, 1, 1].map((item, i) => (
          <div
            key={i} // Añade una key para ayudar a React con la renderización
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <Skeleton className="w-16 h-16 rounded-xl" />
              <div className="ml-6">
                <Skeleton className="w-[150px] h-4" />
                <Skeleton className="w-[100px] h-4 mt-2" />
              </div>
            </div>
          </div>
        ))}

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
};

export default ListView;
