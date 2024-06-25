import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import Items from "../components/items";

export const metadata: Metadata = {
  title: "Productos",
  description: "Catálogo de productos",
};

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <Items />
      </div>
    </>
  );
};

export default Dashboard;
