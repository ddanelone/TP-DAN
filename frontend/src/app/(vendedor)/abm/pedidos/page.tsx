import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import Orders from "./components/order-manager";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "ABM de Pedidos",
};

const VendedorPedido = () => {
  return (
    <div>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <Orders />
      </div>
    </div>
  );
};

export default VendedorPedido;
