import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import BuildingManager from "./components/building-manager";

export const metadata: Metadata = {
  title: "Obras",
  description: "ABM de Obras",
};

const VendedorObra = () => {
  return (
    <div>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <BuildingManager />
      </div>
    </div>
  );
};

export default VendedorObra;
