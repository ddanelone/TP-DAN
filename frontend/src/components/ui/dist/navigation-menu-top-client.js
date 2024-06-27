"use client";
"use strict";
exports.__esModule = true;
exports.NavigationMenuTopClient = void 0;
var React = require("react");
var link_1 = require("next/link");
//import { Icons } from "@/components/icons";
var navigation_menu_1 = require("@/components/ui/navigation-menu");
function NavigationMenuTopClient() {
    return (React.createElement(navigation_menu_1.NavigationMenu, null,
        React.createElement(navigation_menu_1.NavigationMenuList, null,
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/productos", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Productos"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/obras", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Obras"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/pedidos", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Pedidos"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/usuarios", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Usuarios Habilitados"))))));
}
exports.NavigationMenuTopClient = NavigationMenuTopClient;
