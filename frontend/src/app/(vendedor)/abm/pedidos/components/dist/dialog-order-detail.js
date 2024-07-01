"use client";
"use strict";
exports.__esModule = true;
exports.DialogOrderDetail = void 0;
var dialog_1 = require("@/components/ui/dialog");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var table_detail_order_1 = require("./table-detail-order");
function DialogOrderDetail(_a) {
    var children = _a.children, orderToView = _a.orderToView, orderDetail = _a.orderDetail, getOrders = _a.getOrders, isLoading = _a.isLoading;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
            React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
            React.createElement(dialog_1.DialogContent, { className: "max-w-full w-full" },
                React.createElement(dialog_1.DialogHeader, null,
                    React.createElement(dialog_1.DialogTitle, null, "Pedido"),
                    React.createElement(dialog_1.DialogDescription, null, "Detalle de su Orden")),
                React.createElement("div", { className: "w-full block" },
                    React.createElement(table_detail_order_1.TableOrderDetail, { orderToView: orderToView, orderDetail: orderToView.detalle, getOrders: getOrders, isLoading: isLoading })),
                React.createElement(dialog_1.DialogFooter, null,
                    React.createElement(button_1.Button, { onClick: function () { return setOpen(false); } }, "Cerrar"))))));
}
exports.DialogOrderDetail = DialogOrderDetail;
exports["default"] = DialogOrderDetail;
