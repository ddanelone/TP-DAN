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
                React.createElement(navigation_menu_1.NavigationMenuTrigger, null, "Pedidos"),
                React.createElement(navigation_menu_1.NavigationMenuContent, null,
                    React.createElement("ul", { className: "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] " }, pedidos.map(function (pedido) { return (React.createElement("li", { key: pedido.title },
                        React.createElement(link_1["default"], { href: pedido.href, legacyBehavior: true, passHref: true },
                            React.createElement("a", { className: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" },
                                React.createElement("div", { className: "text-sm font-medium leading-none" }, pedido.title))))); })))))));
}
exports.NavigationMenuTopSale = NavigationMenuTopSale;
var pedidos = [
    { title: "Consultar", href: "/abm/pedidos" },
    { title: "Actualizar", href: "/abm/pedidos" },
];
