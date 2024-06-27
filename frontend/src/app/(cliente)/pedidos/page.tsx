import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "Visualización de Pedidos",
};

const ClientePedido = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default ClientePedido;
