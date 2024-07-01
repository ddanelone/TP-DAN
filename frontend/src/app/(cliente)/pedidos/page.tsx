import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import OrdersClient from "./components/order-manager-client";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "Visualización de Pedidos",
};

const ClientePedido = () => {
  return (
    <div>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <OrdersClient />
      </div>
    </div>
  );
};

export default ClientePedido;
