"use strict";
exports.__esModule = true;
exports.SelectStatus = void 0;
var React = require("react");
var select_1 = require("@/components/ui/select");
var estado_enum_interface_1 = require("@/interfaces/estado-enum.interface");
function SelectStatus(_a) {
    var selectedStatus = _a.selectedStatus, onStatusChange = _a.onStatusChange;
    return (React.createElement(select_1.Select, { value: selectedStatus || "", onValueChange: function (value) { return onStatusChange(value); } },
        React.createElement(select_1.SelectTrigger, { className: "w-full" },
            React.createElement(select_1.SelectValue, { placeholder: "Seleccione...", defaultValue: selectedStatus || "" })),
        React.createElement(select_1.SelectContent, null,
            React.createElement(select_1.SelectGroup, null,
                React.createElement(select_1.SelectLabel, null, "Estado"),
                Object.values(estado_enum_interface_1.Estados).map(function (status) { return (React.createElement(select_1.SelectItem, { key: status, value: status }, status)); })))));
}
exports.SelectStatus = SelectStatus;
