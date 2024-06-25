"use client";

import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { TableView } from "./table-view";
import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import ListView from "./list-view";
import { getProducts } from "@/lib/auth";
import { Bag } from "react-bootstrap-icons";
import { ShoppingCart } from "lucide-react";
import { BuyCart } from "./buy-cart";

const Items = () => {
  const user = useUser();
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Product[]>([]); // Estado para el carrito

  /* ========== Cargar los productos en la tabla ========== */
  const getItems = async () => {
    setIsLoading(true);
    try {
      const res = await getProducts();
      setItems(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) getItems();
  }, [user]);

  /* ========== Agregar un item al carrito ========== */
  const addItemToCart = (item: Product) => {
    setCart((prevCart) => [...prevCart, item]);
    toast.success("Producto agregado al carrito");
    console.log("En el carrito, ahora: ", cart);
  };

  /* ========== Agregar un item al carrito ========== */
  const removeItemFromCart = (item: Product) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  /* Ya tengo el carrito cargado! Faltaría ver la lógica para concretar la compra
  con los requerimientos del TP.
   Comprar debería llevarlo a la pestaña de "Pedidos" o algo así, después vemos*/

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
      <TableView items={items} isLoading={isLoading} addItem={addItemToCart} />

      <ListView items={items} isLoading={isLoading} addItem={addItemToCart} />
    </>
  );
};

export default Items;
