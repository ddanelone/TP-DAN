"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.NavigationMenuTopClient = void 0;
var React = require("react");
var link_1 = require("next/link");
var utils_1 = require("@/lib/utils");
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
function NavigationMenuTopClient() {
    return (React.createElement(navigation_menu_1.NavigationMenu, null,
        React.createElement(navigation_menu_1.NavigationMenuList, null,
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/docs", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Documentation"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/docs", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Documentation"))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(navigation_menu_1.NavigationMenuTrigger, null, "Components"),
                React.createElement(navigation_menu_1.NavigationMenuContent, null,
                    React.createElement("ul", { className: "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] " }, components.map(function (component) { return (React.createElement(ListItem, { key: component.title, title: component.title, href: component.href }, component.description)); })))),
            React.createElement(navigation_menu_1.NavigationMenuItem, null,
                React.createElement(link_1["default"], { href: "/docs", legacyBehavior: true, passHref: true },
                    React.createElement(navigation_menu_1.NavigationMenuLink, { className: navigation_menu_1.navigationMenuTriggerStyle() }, "Documentation"))))));
}
exports.NavigationMenuTopClient = NavigationMenuTopClient;
var ListItem = React.forwardRef(function (_a, ref) {
    var className = _a.className, title = _a.title, children = _a.children, props = __rest(_a, ["className", "title", "children"]);
    return (React.createElement("li", null,
        React.createElement(navigation_menu_1.NavigationMenuLink, { asChild: true },
            React.createElement("a", __assign({ ref: ref, className: utils_1.cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className) }, props),
                React.createElement("div", { className: "text-sm font-medium leading-none" }, title),
                React.createElement("p", { className: "line-clamp-2 text-sm leading-snug text-muted-foreground" }, children)))));
});
ListItem.displayName = "ListItem";
