import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/product-interface";
import { formatPrice } from "@/action/format-price";
import { LoaderCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Order } from "@/interfaces/order.interface";
import { Costumer } from "@/interfaces/costumer.interface";
import { checkStockProducto, createPedido, getClientByEmail } from "@/lib/auth";
import { useUser } from "@/hooks/use-user";
import { Building } from "@/interfaces/building.interface";
import { getFromLocalstorage } from "@/action/get-from-localstorage";

interface BuyCartProps {
  children: React.ReactNode;
  cartItems: Product[];
  removeItem: (item: Product) => void;
}

export function BuyCart({ children, cartItems, removeItem }: BuyCartProps) {
  const user = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [client, setClient] = useState<Costumer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMyClientData = async () => {
    const emailUser = user?.email;
    setIsLoading(true);

    try {
      const res = await getClientByEmail(emailUser);
      if (res) {
        setClient(res);
      }
    } catch (error) {
      toast.error(
        "No se pudo recuperar los datos de Cliente asociado con este Usuario.",
        {
          duration: 2500,
        }
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (item: Product) => {
    removeItem(item);
  };

  const handlePurchase = async () => {
    if (cartItems.length === 0) {
      toast.error("El carrito está vacío. No se puede realizar la compra.", {
        duration: 2500,
      });
      return;
    }

    //Verifciar que exista una obra a la que asignarle el pedido
    const selectedBuilding = getFromLocalstorage(
      "selectedBuilding" || "null"
    ) as Building | null;
    if (!selectedBuilding) {
      toast.error("Debe elegir una obra a la cual enviar el pedido.", {
        duration: 2500,
      });
      router.push("/obras");
      return;
    }

    if (!client) {
      toast.error(
        "No se pudo recuperar los datos del cliente. Inténtalo nuevamente.",
        {
          duration: 2500,
        }
      );
      return;
    } else {
      if (
        client?.maximoDescubierto !== undefined &&
        client.maximoDescubierto <
          cartItems.reduce((acc, item) => acc + item.precio * item.cantidad!, 0)
      ) {
        toast.error(
          "No puede hacer este pedido porque no tiene suficiente crédito autorizado."
        );
        return;
      }
    }

    setIsLoading(true);
    try {
      for (const item of cartItems) {
        try {
          await checkStockProducto(item.id, item.cantidad!);
        } catch (error: any) {
          toast.error(error.message, { duration: 1000 });
          setIsLoading(false);

          /* ========== Le saco el return, para que avise que no hay stock pero que procese igual ========== */
          //return;
        }
      }

      const totalSinDescuento = cartItems.reduce(
        (acc, item) => acc + item.precio * item.cantidad!,
        0
      );

      const totalConDescuento = cartItems.reduce(
        (acc, item) => acc + (item.precio - item.descuento) * item.cantidad!,
        0
      );

      console.log({ totalSinDescuento, totalConDescuento });

      const newOrder: Order = {
        fecha: new Date(),
        numeroPedido: undefined,
        usuario: user ? user.email : undefined,
        observaciones: "",
        cliente: {
          id: client.id,
          nombre: client.nombre,
          apellido: client.apellido,
          correoElectronico: client.correoElectronico,
          dni: client.dni,
          cuit: client.cuit,
        },
        obra: {
          id: selectedBuilding.id,
          calle: selectedBuilding.calle,
          ciudad: selectedBuilding.ciudad,
          provincia: selectedBuilding.provincia,
          pais: selectedBuilding.pais,
          altura: selectedBuilding.altura,
          esRemodelacion: selectedBuilding.esRemodelacion,
          lat: selectedBuilding.lat,
          lng: selectedBuilding.lng,
          presupuesto: selectedBuilding.presupuesto,
          estado: selectedBuilding.estado,
        },
        total: totalConDescuento,
        detalle: cartItems.map((item) => ({
          cantidad: item.cantidad!,
          producto: item as Product,
          precioUnitario: item.precio,
          descuento: item.descuento,
          precioFinal: (item.precio - item.descuento) * item.cantidad!,
        })),
        historialEstado: [],
      };

      console.log("Orden a persistir :", newOrder);
      await createPedido(newOrder);

      localStorage.removeItem("selectedBuilding");

      toast.success("Pedido realizado con éxito.");

      router.push("/pedidos");
    } catch (error) {
      console.error(error);
      toast.error("No puedes realizar el pedido: " + error, {
        duration: 2500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (user) {
      getMyClientData();
    }
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Carrito de Compras</DialogTitle>
          <DialogDescription>
            Aquí puedes ver y gestionar los productos que has añadido a tu
            carrito.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto max-h-[80vh]">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Cantidad</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b text-center">
                    {item.cantidad}
                  </td>
                  <td className="py-2 px-4 border-b">{item.nombre}</td>
                  <td className="py-2 px-4 border-b text-right">
                    {formatPrice(item.precio)}
                  </td>
                  <td className="py-2 px-4 border-b text-right">
                    {formatPrice(item.precio * item.cantidad!)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <Button
                      variant="destructive"
                      onClick={() => handleRemoveItem(item)}
                    >
                      <Trash2 />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <div className="flex justify-between w-full items-center">
            <div className="text-left">
              <Badge className="mt-2 text-[14px]" variant={"outline"}>
                Total a Pagar:{" "}
                {formatPrice(
                  cartItems.reduce(
                    (acc, item) => acc + item.precio * item.cantidad!,
                    0
                  )
                )}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={handleClose}
              >
                Agregar más productos
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={handlePurchase}
              >
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Crear Pedido
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
