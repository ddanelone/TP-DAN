"use strict";
exports.__esModule = true;
exports.TableOrders = void 0;
var react_1 = require("react");
var format_price_1 = require("@/action/format-price");
var button_1 = require("@/components/ui/button");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var confirm_deletion_order_1 = require("@/app/(vendedor)/abm/pedidos/components/confirm-deletion-order");
var update_status_order_1 = require("@/app/(vendedor)/abm/pedidos/components/update-status-order");
var status_history_view_1 = require("@/app/(vendedor)/abm/pedidos/components/status-history-view");
var format_date_1 = require("@/action/format-date");
function TableOrders(_a) {
    var orders = _a.orders, getOrders = _a.getOrders, deleteOrder = _a.deleteOrder, isLoading = _a.isLoading;
    return (react_1["default"].createElement("div", { className: "hidden md:block" },
        react_1["default"].createElement(table_1.Table, null,
            react_1["default"].createElement(table_1.TableHeader, null,
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[100px]" }, "N\u00B0 Pedido"),
                    react_1["default"].createElement(table_1.TableHead, null, "Fecha"),
                    react_1["default"].createElement(table_1.TableHead, null, "Nombre"),
                    react_1["default"].createElement(table_1.TableHead, null, "Apellido"),
                    react_1["default"].createElement(table_1.TableHead, null, "Total"),
                    react_1["default"].createElement(table_1.TableHead, null, "Estado"),
                    react_1["default"].createElement(table_1.TableHead, { className: "text-center w-[250px]" }, "Acciones"))),
            react_1["default"].createElement(table_1.TableBody, null,
                !isLoading &&
                    orders &&
                    orders.map(function (order) { return (react_1["default"].createElement(table_1.TableRow, { key: order.numeroPedido },
                        react_1["default"].createElement(table_1.TableCell, null, order.numeroPedido),
                        react_1["default"].createElement(table_1.TableCell, null,
                            order.fecha ? format_date_1.formatDate(new Date(order.fecha)) : "N/A",
                            " ",
                            react_1["default"].createElement("br", null)),
                        react_1["default"].createElement(table_1.TableCell, null, order.cliente.nombre),
                        react_1["default"].createElement(table_1.TableCell, null, order.cliente.apellido),
                        react_1["default"].createElement(table_1.TableCell, null, format_price_1.formatPrice(order.total)),
                        react_1["default"].createElement(table_1.TableCell, null, order.estado),
                        react_1["default"].createElement(table_1.TableCell, { className: "text-center" },
                            getOrders && (react_1["default"].createElement(status_history_view_1.StatusHistoryView, { order: order, getOrders: getOrders },
                                react_1["default"].createElement(button_1.Button, null,
                                    react_1["default"].createElement(lucide_react_1.Calendar, null)))),
                            getOrders && (react_1["default"].createElement(update_status_order_1.UpdateStatusOrder, { orderToUpdate: order, getOrders: getOrders },
                                react_1["default"].createElement(button_1.Button, { className: "ml-4" },
                                    react_1["default"].createElement(lucide_react_1.SquarePen, null)))),
                            deleteOrder && (react_1["default"].createElement(confirm_deletion_order_1.ConfirmDeletionOrder, { deleteOrder: deleteOrder, order: order },
                                react_1["default"].createElement(button_1.Button, { className: "ml-4", variant: "destructive" },
                                    react_1["default"].createElement(lucide_react_1.Trash2, null))))))); }),
                isLoading &&
                    [1, 1, 1, 1, 1].map(function (e, i) { return (react_1["default"].createElement(table_1.TableRow, { key: i },
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })))); }))),
        !isLoading && orders.length === 0 && (react_1["default"].createElement("div", { className: "text-gray-200 my-20" },
            react_1["default"].createElement("div", { className: "flex justify-center" },
                react_1["default"].createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            react_1["default"].createElement("h2", { className: "text-center" }, "No hay productos disponibles")))));
}
exports.TableOrders = TableOrders;
