import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras",
  description: "ABM de Obras",
};

const Dashboard = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
