"use strict";
exports.__esModule = true;
exports.ListHistoryOrders = void 0;
var badge_1 = require("@/components/ui/badge");
var format_date_1 = require("@/action/format-date");
exports.ListHistoryOrders = function (_a) {
    var order = _a.order;
    console.log("Order to view:", order);
    if (!order.historialEstado || order.historialEstado.length === 0) {
        console.log("No historialEstado to display");
        return (React.createElement("div", { className: "w-full block" },
            React.createElement("p", null, "No hay historial de estados disponible.")));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "w-full block h-96 overflow-y-auto" },
            React.createElement("div", { className: "flex justify-start items-center" },
                React.createElement("div", { className: "ml-6" },
                    React.createElement("h3", { className: "font-semibold" },
                        "N\u00FAmero de Orden: ",
                        order.numeroPedido),
                    React.createElement("div", { className: "text-sm" },
                        "Fecha Cambio:",
                        " ",
                        order.fecha ? format_date_1.formatDate(new Date(order.fecha)) : "N/A",
                        " ",
                        React.createElement("br", null),
                        "Cliente Nombre: ",
                        order.cliente.nombre,
                        " ",
                        React.createElement("br", null),
                        "Apellido: ",
                        order.cliente.apellido,
                        " ",
                        React.createElement("br", null)))),
            order.historialEstado.map(function (historial, index) { return (React.createElement("div", { key: index, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement("div", { className: "ml-6" },
                        React.createElement("div", { className: "text-sm" },
                            "Fecha Cambio:",
                            " ",
                            historial.fechaCambio
                                ? format_date_1.formatDate(new Date(historial.fechaCambio))
                                : "N/A",
                            " ",
                            React.createElement("br", null),
                            "Usuario: ",
                            historial.usuarioCambio,
                            " ",
                            React.createElement("br", null),
                            React.createElement(badge_1.Badge, { className: "mt-2", variant: "outline" },
                                "Estado: ",
                                historial.estado)))))); }))));
};
