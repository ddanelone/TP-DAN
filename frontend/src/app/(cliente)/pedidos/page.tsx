import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedidos",
  description: "Visualización de Pedidos",
};

const Dashboard = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
