"use client";
"use strict";
exports.__esModule = true;
exports.BuyCart = void 0;
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
var format_price_1 = require("@/action/format-price");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
function BuyCart(_a) {
    var children = _a.children, cartItems = _a.cartItems, removeItem = _a.removeItem;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var handleRemoveItem = function (item) {
        removeItem(item);
    };
    var handlePurchase = function () {
        // Lógica para manejar la compra (por ahora solo cierra el diálogo)
        setOpen(false);
    };
    var handleClose = function () {
        setOpen(false);
    };
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[800px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Carrito de Compras"),
                React.createElement(dialog_1.DialogDescription, null, "Aqu\u00ED puedes ver y gestionar los productos que has a\u00F1adido a tu carrito.")),
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement("table", { className: "min-w-full bg-white" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Cantidad"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Nombre"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Precio"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Total"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Acciones"))),
                    React.createElement("tbody", null, cartItems.map(function (item) { return (React.createElement("tr", { key: item.id },
                        React.createElement("td", { className: "py-2 px-4 border-b text-center" }, item.cantidad),
                        React.createElement("td", { className: "py-2 px-4 border-b" }, item.nombre),
                        React.createElement("td", { className: "py-2 px-4 border-b text-right" }, format_price_1.formatPrice(item.precio)),
                        React.createElement("td", { className: "py-2 px-4 border-b text-right" }, format_price_1.formatPrice(item.precio * item.cantidad)),
                        React.createElement("td", { className: "py-2 px-4 border-b text-center" },
                            React.createElement(button_1.Button, { variant: "destructive", onClick: function () { return handleRemoveItem(item); } },
                                React.createElement(lucide_react_1.Trash2, null))))); })))),
            React.createElement(dialog_1.DialogFooter, null,
                React.createElement("div", { className: "flex justify-between w-full items-center" },
                    React.createElement("div", { className: "text-left" },
                        React.createElement(badge_1.Badge, { className: "mt-2 text-[14px]", variant: "outline" },
                            "Total a Pagar:",
                            " ",
                            format_price_1.formatPrice(cartItems.reduce(function (acc, item) { return acc + item.precio * item.cantidad; }, 0)))),
                    React.createElement("div", { className: "flex space-x-2" },
                        React.createElement(button_1.Button, { className: "bg-gray-200 text-gray-800 hover:bg-gray-300", onClick: handleClose }, "Agregar m\u00E1s productos"),
                        React.createElement(button_1.Button, { className: "bg-blue-600 text-white hover:bg-blue-700", onClick: handlePurchase }, "Crear Pedido")))))));
}
exports.BuyCart = BuyCart;
