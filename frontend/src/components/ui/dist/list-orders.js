"use strict";
exports.__esModule = true;
exports.ListOrders = void 0;
var format_price_1 = require("@/action/format-price");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var badge_1 = require("@/components/ui/badge");
var confirm_deletion_order_1 = require("@/app/(vendedor)/abm/pedidos/components/confirm-deletion-order");
var convert_instant_to_date_1 = require("@/action/convert-instant-to-date");
exports.ListOrders = function (_a) {
    var orders = _a.orders, getOrders = _a.getOrders, deleteOrder = _a.deleteOrder, isLoading = _a.isLoading;
    return (React.createElement("div", { className: "w-full block md:hidden" },
        !isLoading &&
            orders &&
            orders.map(function (order) { return (React.createElement("div", { key: order.numeroPedido, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement("div", { className: "ml-6" },
                        React.createElement("h3", { className: "font-semibold" }, order.numeroPedido),
                        React.createElement("div", { className: "text-sm" },
                            "Fecha: ",
                            React.createElement(convert_instant_to_date_1["default"], { order: order }),
                            " ",
                            React.createElement("br", null),
                            "Cliente Nombre: ",
                            order.cliente.nombre,
                            " ",
                            React.createElement("br", null),
                            "Apellido: ",
                            order.cliente.apellido,
                            " ",
                            React.createElement("br", null),
                            "Estado: ",
                            order.estado,
                            " ",
                            React.createElement("br", null),
                            React.createElement(badge_1.Badge, { className: "mt-2", variant: "outline" },
                                "Total: ",
                                format_price_1.formatPrice(order.total))))),
                React.createElement("div", { className: "ml-2" },
                    getOrders && (
                    //  <CreateUpdateItem itemToUpdate={item} getItems={getItems}>
                    React.createElement(button_1.Button, { className: "w-8 h-8 p-0" },
                        React.createElement(lucide_react_1.SquarePen, { className: "w-5 h-5" }))
                    //  </CreateUpdateItem>
                    ),
                    deleteOrder && (React.createElement(confirm_deletion_order_1.ConfirmDeletionOrder, { deleteOrder: deleteOrder, order: order },
                        React.createElement(button_1.Button, { className: "w-8 h-8 p-0", variant: "destructive" },
                            React.createElement(lucide_react_1.Trash2, { className: "w-5 h-5" }))))))); }),
        isLoading &&
            [1, 1, 1, 1, 1].map(function (item, i) { return (React.createElement("div", { key: i, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" }),
                    React.createElement("div", { className: "ml-6" },
                        React.createElement(skeleton_1.Skeleton, { className: "w-[150px] h-4" }),
                        React.createElement(skeleton_1.Skeleton, { className: "w-[100px] h-4 mt-2" }))))); }),
        !isLoading && orders.length === 0 && (React.createElement("div", { className: "text-gray-200 my-20" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            React.createElement("h2", { className: "text-center" }, "No hay productos disponibles")))));
};
exports["default"] = exports.ListOrders;