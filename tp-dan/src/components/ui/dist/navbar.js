"use client";
"use strict";
exports.__esModule = true;
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
var logo_1 = require("../logo");
var navigation_menu_top_sale_1 = require("./navigation-menu-top-sale");
var profile_dropdown_1 = require("./profile-dropdown");
var navigation_menu_top_client_1 = require("./navigation-menu-top-client");
var Navbar = function () {
    var userData = get_from_localstorage_1.getFromLocalstorage("user");
    return (React.createElement("div", { className: "flex justify-between mx-6 mb-10 lg:mx-20 py-6 border-b border-solid border-gray-200 md:border-b-0" },
        React.createElement(logo_1["default"], null),
        (userData === null || userData === void 0 ? void 0 : userData.role) === 1 && React.createElement(navigation_menu_top_sale_1.NavigationMenuTopSale, null),
        (userData === null || userData === void 0 ? void 0 : userData.role) === 0 && React.createElement(navigation_menu_top_client_1.NavigationMenuTopClient, null),
        React.createElement("div", { className: "md:mr-10" },
            React.createElement(profile_dropdown_1.ProfileDropdown, null))));
};
exports["default"] = Navbar;
