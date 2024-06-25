import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras",
  description: "Gestione sus Obras",
};

const Dashboard = () => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
