import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "ABM de Pedidos",
};

const VendedorPedido = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default VendedorPedido;
