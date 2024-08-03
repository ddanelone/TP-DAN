"use client";

import { useUser } from "@/hooks/use-user";
import { CreateUpdateItem } from "./create-update-item-form";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import { deleteProductById, getProducts } from "@/lib/auth";
import { TableView } from "@/components/ui/table-view";
import ListView from "@/components/ui/list-view";
import SheetSearchProducts from "./sheet-search-productos";

function Items() {
  const user = useUser();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getProducts(page, 12);
      setItems((prevItems) => {
        const newItems = [...prevItems, ...res.data];
        const uniqueItems = Array.from(
          new Set(newItems.map((item) => item.id))
        ).map((id) => newItems.find((item) => item.id === id)!);
        return uniqueItems;
      });
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const deleteItem = async (item: Product) => {
    setIsLoading(true);
    try {
      await deleteProductById(item.id);
      toast.success("Item eliminado correctamente");
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    } catch (error: any) {
      toast.error(error.message, { duration: 4000 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && !hasFetched) {
      getItems().then(() => setHasFetched(true));
    }
  }, [user, getItems, hasFetched]);

  useEffect(() => {
    if (page > 0) {
      getItems();
    }
  }, [page, getItems]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && !isLoading && page < totalPages - 1) {
      setPage((prevPage) => {
        console.log("Setting page to:", prevPage + 1);
        return prevPage + 1;
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8 ">
        <div>
          <h1 className="text-2xl ml-1">Mis Productos</h1>
          {items.length > 0 && (
            <Badge className="mt-2 text-[14px]" variant={"outline"}>
              SECCIÓN EXCLUSIVA PARA VENDEDORES
            </Badge>
          )}
        </div>

        <div>
          {/* ========== Opción de filtras productos ========== */}
          <SheetSearchProducts
            items={items}
            setItems={setItems}
            getItems={getItems}
          ></SheetSearchProducts>

          {/* ========== Opción de crear producto ========== */}
          <CreateUpdateItem getItems={getItems}>
            <Button className="px-6 ml-4">
              Crear
              <CirclePlus className="ml-2 w-[20px]" />
            </Button>
          </CreateUpdateItem>
        </div>
      </div>

      <TableView
        deleteItem={deleteItem}
        getItems={getItems}
        items={items}
        isLoading={isLoading}
        handleScroll={handleScroll}
      />
      <ListView
        deleteItem={deleteItem}
        getItems={getItems}
        items={items}
        isLoading={isLoading}
        handleScroll={handleScroll}
      />
    </>
  );
}

export default Items;
