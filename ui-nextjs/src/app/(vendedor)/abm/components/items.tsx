"use client";

import { useUser } from "@/hooks/use-user";
import { CreateUpdateItem } from "./create-update-item-form";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import { deleteProductById, getProductById, getProducts } from "@/lib/auth";
import { TableView } from "@/components/ui/table-view";
import ListView from "@/components/ui/list-view";
import SheetSearchProducts from "./sheet-search-productos";

function Items() {
  const user = useUser();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getItems = useCallback(
    async (resetPage = false) => {
      setIsLoading(true);
      try {
        const currentPage = resetPage ? 0 : page;
        const res = await getProducts(currentPage, 12);

        if (currentPage === 0) {
          setItems(res.data);
        } else {
          setItems((prevItems) => {
            const newItems = [...prevItems, ...res.data];
            const uniqueItems = Array.from(
              new Set(newItems.map((item) => item.id))
            ).map((id) => newItems.find((item) => item.id === id)!);
            return uniqueItems;
          });
        }

        setPage(currentPage);
        setTotalPages(res.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  const updateItem = async (item: Product) => {
    setIsLoading(true);
    try {
      const updatedItem = await getProductById(item.id);

      if (updatedItem) {
        setItems((prevItems) =>
          prevItems.map((i) => (i.id === item.id ? updatedItem : i))
        );
        toast.success("Item actualizado correctamente");
      } else {
        toast.error(
          "Error al actualizar el item: no se encontró el producto actualizado",
          { duration: 2500 }
        );
      }
    } catch (error: any) {
      toast.error(error.message, { duration: 2500 });
    } finally {
      setIsLoading(false);
    }
  };

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
      setPage(0); // Resetea la página al cargar por primera vez
      getItems(true).then(() => setHasFetched(true));
    }
  }, [user, getItems, hasFetched]);

  useEffect(() => {
    if (!isLoading) {
      getItems();
    }
  }, [page, getItems]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && !isLoading && page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
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
