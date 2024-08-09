import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import BuildingManagerClient from "./components/building-manager-client";

export const metadata: Metadata = {
  title: "Obras",
  description: "Gestione sus Obras",
};

const ClienteObra = () => {
  return (
    <div>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <BuildingManagerClient />
      </div>
    </div>
  );
};

export default ClienteObra;
