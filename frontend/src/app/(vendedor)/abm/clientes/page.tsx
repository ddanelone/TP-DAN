import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import CustomerEdit from "./components/client-manager";

export const metadata: Metadata = {
  title: "Clientes",
  description: "ABM de Clientes",
};

const VendedorCliente = () => {
  return (
    <div>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <CustomerEdit />
      </div>
    </div>
  );
};

export default VendedorCliente;
