"use client";

import { getFromLocalstorage } from "@/action/get-from-localstorage";
import Logo from "../logo";
import { NavigationMenuTopSale } from "./navigation-menu-top-sale";
import { ProfileDropdown } from "./profile-dropdown";
import { NavigationMenuTopClient } from "./navigation-menu-top-client";

const Navbar = () => {
  const userData = getFromLocalstorage("user");

  return (
    <div className="flex justify-between mx-6 mb-10 lg:mx-20 py-6 border-b border-solid border-gray-200 md:border-b-0">
      <Logo />

      {userData?.role === 1 && <NavigationMenuTopSale />}

      {userData?.role === 0 && <NavigationMenuTopClient />}

      <div className="md:mr-10">
        <ProfileDropdown />
      </div>
    </div>
  );
};
export default Navbar;
