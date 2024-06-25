import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
  description: "ABM de Clientes",
};

const Dashboard = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
