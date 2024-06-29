"use strict";
exports.__esModule = true;
exports.SelectType = void 0;
var React = require("react");
var select_1 = require("@/components/ui/select");
function SelectType(_a) {
    var selectedType = _a.selectedType, onTypeChange = _a.onTypeChange;
    return (React.createElement(select_1.Select, { value: selectedType ? "Remodelación" : "Construcción", onValueChange: function (value) { return onTypeChange(value === "Remodelación"); } },
        React.createElement(select_1.SelectTrigger, { className: "w-full" },
            React.createElement(select_1.SelectValue, { placeholder: "Seleccione...", defaultValue: selectedType ? "Remodelación" : "Construcción" })),
        React.createElement(select_1.SelectContent, null,
            React.createElement(select_1.SelectGroup, null,
                React.createElement(select_1.SelectLabel, null, "Tipo de Obra"),
                React.createElement(select_1.SelectItem, { value: "Remodelaci\u00F3n" }, "Remodelaci\u00F3n"),
                React.createElement(select_1.SelectItem, { value: "Construcci\u00F3n" }, "Construcci\u00F3n")))));
}
exports.SelectType = SelectType;
