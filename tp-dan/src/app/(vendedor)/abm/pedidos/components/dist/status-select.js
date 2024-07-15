"use strict";
exports.__esModule = true;
exports.SelectStatus = void 0;
var React = require("react");
var select_1 = require("@/components/ui/select");
var order_state_interface_1 = require("@/interfaces/order-state-interface");
function SelectStatus(_a) {
    var selectedStatus = _a.selectedStatus, onStatusChange = _a.onStatusChange;
    var allowedStatuses = [order_state_interface_1.Status.ENTREGADO, order_state_interface_1.Status.CANCELADO];
    return (React.createElement(select_1.Select, { value: selectedStatus || "", onValueChange: function (value) { return onStatusChange(value); } },
        React.createElement(select_1.SelectTrigger, { className: "w-full" },
            React.createElement(select_1.SelectValue, { placeholder: "Seleccione...", defaultValue: selectedStatus || "" })),
        React.createElement(select_1.SelectContent, null,
            React.createElement(select_1.SelectGroup, null,
                React.createElement(select_1.SelectLabel, null, "Estados"),
                allowedStatuses.map(function (status) { return (React.createElement(select_1.SelectItem, { key: status, value: status }, status)); })))));
}
exports.SelectStatus = SelectStatus;
