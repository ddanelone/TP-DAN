"use client";

import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

import { getProducts } from "@/lib/auth";
import { ShoppingCart } from "lucide-react";
import { BuyCart } from "./buy-cart";
import { TableView } from "@/components/ui/table-view";
import { ListView } from "@/components/ui/list-view";

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

  /* ========== Lógica para concretar la compra ========== */
  const handlePurchase = () => {
    console.log("Comprando los productos en el carrito:", cart);
    toast.success("Compra realizada correctamente", { duration: 2500 });
    setCart([]);
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
