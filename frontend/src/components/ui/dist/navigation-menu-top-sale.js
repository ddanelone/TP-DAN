"use client";
"use strict";
exports.__esModule = true;
exports.NavigationMenuTopSale = void 0;
var React = require("react");
var link_1 = require("next/link");
var navigation_menu_1 = require("@/components/ui/navigation-menu");
function NavigationMenuTopSale() {
    return (React.createElement(navigation_menu_1.NavigationMenu, null,
        React.createElement(navigation_menu_1.NavigationMenuList, null,
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/abm/clientes", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Clientes"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/abm/obras", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Obras"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/abm/productos", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Productos"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/abm/pedidos", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Pedidos"))))));
}
exports.NavigationMenuTopSale = NavigationMenuTopSale;
