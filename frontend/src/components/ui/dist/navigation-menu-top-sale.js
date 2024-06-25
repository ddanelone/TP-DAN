"use client";
"use strict";
exports.__esModule = true;
exports.NavigationMenuTopSale = void 0;
var React = require("react");
var link_1 = require("next/link");
//import { Icons } from "@/components/icons";
var navigation_menu_1 = require("@/components/ui/navigation-menu");
var components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description: "A modal dialog that interrupts the user with important content and expects a response."
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description: "For sighted users to preview content available behind a link."
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content."
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time."
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    },
];
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
