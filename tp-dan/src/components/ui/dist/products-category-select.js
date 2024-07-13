"use strict";
exports.__esModule = true;
exports.SelectCategoryes = void 0;
var React = require("react");
var select_1 = require("@/components/ui/select");
var product_category_interface_1 = require("@/interfaces/product-category-interface");
function SelectCategoryes(_a) {
    var selectedCategory = _a.selectedCategory, onCategoryChange = _a.onCategoryChange;
    return (React.createElement(select_1.Select, { value: selectedCategory || "", onValueChange: function (value) { return onCategoryChange(value); } },
        React.createElement(select_1.SelectTrigger, { className: "w-full" },
            React.createElement(select_1.SelectValue, { placeholder: "Seleccione...", defaultValue: selectedCategory || "" })),
        React.createElement(select_1.SelectContent, null,
            React.createElement(select_1.SelectGroup, null,
                React.createElement(select_1.SelectLabel, null, "Categor\u00EDas"),
                Object.values(product_category_interface_1.Category).map(function (category) { return (React.createElement(select_1.SelectItem, { key: category, value: category }, category)); })))));
}
exports.SelectCategoryes = SelectCategoryes;
