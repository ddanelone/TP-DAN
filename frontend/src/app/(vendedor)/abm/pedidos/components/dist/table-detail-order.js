"use strict";
exports.__esModule = true;
exports.TableOrderDetail = void 0;
var react_1 = require("react");
var format_price_1 = require("@/action/format-price");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var badge_1 = require("@/components/ui/badge");
function TableOrderDetail(_a) {
    var orderToView = _a.orderToView, orderDetail = _a.orderDetail, getOrders = _a.getOrders, isLoading = _a.isLoading;
    return (react_1["default"].createElement("div", { className: "hidden md:block" },
        react_1["default"].createElement(table_1.Table, null,
            react_1["default"].createElement(table_1.TableCaption, { className: "text-left " },
                react_1["default"].createElement(badge_1.Badge, { className: "mt-2 font-semibold", variant: "outline" },
                    "Total de la orden: $ ",
                    format_price_1.formatPrice(orderToView.total))),
            react_1["default"].createElement(table_1.TableHeader, null,
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, null, "Cantidad"),
                    react_1["default"].createElement(table_1.TableHead, null, "Id"),
                    react_1["default"].createElement(table_1.TableHead, null, "Producto"),
                    react_1["default"].createElement(table_1.TableHead, null, "Descripcion"),
                    react_1["default"].createElement(table_1.TableHead, null, "Precio unitario"),
                    react_1["default"].createElement(table_1.TableHead, null, "Descuento"),
                    react_1["default"].createElement(table_1.TableHead, null, "Precio final"),
                    react_1["default"].createElement(table_1.TableHead, null, "Total"))),
            react_1["default"].createElement(table_1.TableBody, null,
                orderDetail && orderDetail.length > 0 ? (orderDetail.map(function (detail, index) { return (react_1["default"].createElement(table_1.TableRow, { key: index },
                    react_1["default"].createElement(table_1.TableCell, null, detail.cantidad),
                    react_1["default"].createElement(table_1.TableCell, null, detail.producto.id),
                    react_1["default"].createElement(table_1.TableCell, null, detail.producto.nombre),
                    react_1["default"].createElement(table_1.TableCell, null, detail.producto.descripcion),
                    react_1["default"].createElement(table_1.TableCell, null, format_price_1.formatPrice(detail.precioUnitario)),
                    react_1["default"].createElement(table_1.TableCell, null, format_price_1.formatPrice(detail.descuento)),
                    react_1["default"].createElement(table_1.TableCell, null, format_price_1.formatPrice(detail.precioFinal)),
                    react_1["default"].createElement(table_1.TableCell, null, format_price_1.formatPrice(detail.precioFinal * detail.cantidad)))); })) : !isLoading && orderDetail.length === 0 ? (react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableCell, { colSpan: 7 },
                        react_1["default"].createElement("div", { className: "text-gray-200 my-20" },
                            react_1["default"].createElement("div", { className: "flex justify-center" },
                                react_1["default"].createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
                            react_1["default"].createElement("h2", { className: "text-center" }, "No hay detalle disponible"))))) : null,
                isLoading &&
                    [1, 1, 1, 1, 1].map(function (e, i) { return (react_1["default"].createElement(table_1.TableRow, { key: i },
                        react_1["default"].createElement(table_1.TableCell, { colSpan: 7 },
                            react_1["default"].createElement("div", { className: "flex justify-between" },
                                react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" }),
                                react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4 mx-2" }),
                                react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4 mx-2" }),
                                react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4 mx-2" }),
                                react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4 mx-2" }))))); })))));
}
exports.TableOrderDetail = TableOrderDetail;
