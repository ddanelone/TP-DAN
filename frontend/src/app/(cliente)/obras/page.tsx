import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras",
  description: "Gestione sus Obras",
};

const ClienteObra = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default ClienteObra;
