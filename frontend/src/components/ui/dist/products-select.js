"use strict";
exports.__esModule = true;
exports.SelectCategoryes = void 0;
var React = require("react");
var select_1 = require("@/components/ui/select");
function SelectCategoryes() {
    return (React.createElement(select_1.Select, null,
        React.createElement(select_1.SelectTrigger, { className: "w-[180px]" },
            React.createElement(select_1.SelectValue, { placeholder: "Select a fruit" })),
        React.createElement(select_1.SelectContent, null,
            React.createElement(select_1.SelectGroup, null,
                React.createElement(select_1.SelectLabel, null, "Fruits"),
                React.createElement(select_1.SelectItem, { value: "apple" }, "Apple"),
                React.createElement(select_1.SelectItem, { value: "banana" }, "Banana"),
                React.createElement(select_1.SelectItem, { value: "blueberry" }, "Blueberry"),
                React.createElement(select_1.SelectItem, { value: "grapes" }, "Grapes"),
                React.createElement(select_1.SelectItem, { value: "pineapple" }, "Pineapple")))));
}
exports.SelectCategoryes = SelectCategoryes;
