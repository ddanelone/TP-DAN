import Navbar from "@/components/ui/navbar";
import { Metadata } from "next";
import ProfileEdit from "./components/profile-edit";

export const metadata: Metadata = {
  title: "DAN 2024",
  description: "Gestión Integral",
};

const Profile = () => {
  return (
    <div>
      <Navbar />

      <div className="md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36">
        <ProfileEdit />
      </div>
    </div>
  );
};

export default Profile;
