"use client";

import { useUser } from "@/hooks/use-user";
import { CreateUpdateItem } from "./create-update-item-form";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import { deleteProductById, getProducts } from "@/lib/auth";
import { TableView } from "@/components/ui/table-view";
import ListView from "@/components/ui/list-view";

const Items = () => {
  const user = useUser();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getItems = async () => {
    setIsLoading(true);
    try {
      const res = await getProducts();

      console.log(res);

      setItems(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ========== Borrar un item en la base de datos ========== */

  const deleteItem = async (item: Product) => {
    setIsLoading(true);

    try {
      const res = await deleteProductById(item.id);

      toast.success("Item eliminado correctamente");

      const newItems = items.filter((i) => i.id !== item.id);

      setItems(newItems);
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getItems();
  }, [user]);

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Mis Productos</h1>
          {items.length > 0 && (
            <Badge className="mt-2 text-[14px]" variant={"outline"}>
              SECCIÓN EXCLUSIVA PARA VENDEDORES
            </Badge>
          )}
        </div>
        <CreateUpdateItem getItems={getItems}>
          <Button className="px-6">
            Crear
            <CirclePlus className="ml-2 w-[20px]" />
          </Button>
        </CreateUpdateItem>
      </div>
      <TableView
        deleteItem={deleteItem}
        getItems={getItems}
        items={items}
        isLoading={isLoading}
      />
      <ListView
        deleteItem={deleteItem}
        getItems={getItems}
        items={items}
        isLoading={isLoading}
      />
    </>
  );
};

export default Items;
