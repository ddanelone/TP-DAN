import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import Items from "../components/items";

export const metadata: Metadata = {
  title: "Productos",
  description: "ABM de Productos",
};

const VenedorProducto = () => {
  return (
    <>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <Items />
      </div>
    </>
  );
};

export default VenedorProducto;
