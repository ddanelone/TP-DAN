"use client";

import { useUser } from "@/hooks/use-user";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import { getProducts } from "@/lib/auth";
import { ShoppingCart } from "lucide-react";
import { BuyCart } from "./buy-cart";
import { TableView } from "@/components/ui/table-view";
import { ListView } from "@/components/ui/list-view";
import SheetSearchProducts from "@/app/(vendedor)/abm/components/sheet-search-productos";

const Items = () => {
  const user = useUser();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Product[]>([]);
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

  useEffect(() => {
    if (user) getItems();
  }, [user]);

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

  /* ========== Agregar un item al carrito ========== */
  const addItemToCart = (item: Product) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      toast.error("El producto ya está en el carrito", { duration: 2500 });
    } else {
      setCart((prevCart) => [...prevCart, item]);
      toast.success("Producto agregado al carrito");
    }
  };

  /* ========== Eliminar un item del carrito ========== */
  const removeItemFromCart = (item: Product) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <div>
          <h1 className="text-2xl ml-1">Nuestros Productos</h1>
          {items.length > 0 && (
            <Badge className="mt-2 text-[14px]" variant={"outline"}>
              SECCIÓN EXCLUSIVA PARA CLIENTES
            </Badge>
          )}
        </div>
        <div>
          {/* ========== Opción de filtrar productos ========== */}
          <SheetSearchProducts
            items={items}
            setItems={setItems}
            getItems={getItems}
          ></SheetSearchProducts>
          <BuyCart cartItems={cart} removeItem={removeItemFromCart}>
            <Button className="px-6">
              <span className="flex items-center">
                Ver Carrito
                <span className="inline-block bg-gray-200 rounded-full p-1 ml-2">
                  <ShoppingCart className="text-gray-600" size={20} />
                </span>
              </span>
            </Button>
          </BuyCart>
        </div>
      </div>
      <TableView
        items={items}
        isLoading={isLoading}
        addItem={addItemToCart}
        handleScroll={handleScroll}
      />
      <ListView
        items={items}
        isLoading={isLoading}
        addItem={addItemToCart}
        handleScroll={handleScroll}
      />
    </>
  );
};

export default Items;
