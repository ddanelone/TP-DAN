"use client";
"use strict";
exports.__esModule = true;
exports.StatusHistoryView = void 0;
var dialog_1 = require("@/components/ui/dialog");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var list_history_order_1 = require("@/app/(vendedor)/abm/components/list-history-order");
function StatusHistoryView(_a) {
    var children = _a.children, order = _a.order;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
            React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
            React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
                React.createElement(dialog_1.DialogHeader, null,
                    React.createElement(dialog_1.DialogTitle, null, "Historial de Estados"),
                    React.createElement(dialog_1.DialogDescription, null, "Evoluci\u00F3n del Pedido")),
                React.createElement("div", { className: "w-full block" },
                    React.createElement(list_history_order_1.ListHistoryOrders, { order: order })),
                React.createElement(dialog_1.DialogFooter, null,
                    React.createElement(button_1.Button, { onClick: function () { return setOpen(false); } }, "Cerrar"))))));
}
exports.StatusHistoryView = StatusHistoryView;
exports["default"] = StatusHistoryView;
