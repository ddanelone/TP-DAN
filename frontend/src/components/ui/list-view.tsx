import { formatPrice } from "@/action/format-price";
import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces/product-interface";
import { LayoutList, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CreateUpdateItem } from "@/app/(vendedor)/abm/components/create-update-item-form";
import { ConfirmDeletion } from "@/app/(vendedor)/abm/components/confirm-deletion";
import AddItemToCart from "@/app/(cliente)/components/add-item-to-cart";

interface ListViewProps {
  items: Product[];
  getItems?: () => Promise<void>;
  deleteItem?: (item: Product) => Promise<void>;
  isLoading: boolean;
  addItem?: (item: Product) => void;
}

export const ListView = ({
  items,
  getItems,
  deleteItem,
  isLoading,
  addItem,
}: ListViewProps) => {
  return (
    <div className="block md:hidden">
      {/* Utiliza w-full para ocupar todo el ancho disponible */}
      {!isLoading &&
        items &&
        items.map((item) => (
          <div
            key={item.id}
            className="flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6"
          >
            <div className="flex justify-start items-center">
              <div className="ml-6">
                <h3 className="font-semibold">{item.nombre}</h3>
                <div className="text-sm">
                  Descripción: {item.descripcion} <br />
                  Categoría: {item.categoria} <br />
                  Stock Actual: {item.stockActual} <br />
                </div>
                {getItems && (
                  <div className="text-sm">
                    Stock Mínimo: {item.stockMinimo} <br />
                  </div>
                )}
                <div className="text-sm">
                  Precio: {formatPrice(item.precio)} <br />
                  <Badge className="mt-2" variant={"outline"}>
                    Total: {formatPrice(item.precio * 1000)}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="ml-2">
              {getItems && (
                <CreateUpdateItem itemToUpdate={item} getItems={getItems}>
                  <Button className="w-8 h-8 p-0">
                    <SquarePen className="w-5 h-5" />
                  </Button>
                </CreateUpdateItem>
              )}

              {deleteItem && (
                <ConfirmDeletion deleteItem={deleteItem} item={item}>
                  <Button className="w-8 h-8 p-0 mt-4" variant={"destructive"}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </ConfirmDeletion>
              )}

              {addItem && (
                <AddItemToCart item={item} addItem={addItem}>
                  <Button className="mt-4">
                    <ShoppingCart className="w-5 h-5" />
                  </Button>
                </AddItemToCart>
              )}
            </div>
          </div>
        ))}
      {isLoading &&
        [1, 1, 1, 1, 1].map((item, i) => (
          <div
            key={i}
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
