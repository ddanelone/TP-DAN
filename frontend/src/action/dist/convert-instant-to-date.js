"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DateConverter = function (_a) {
    var order = _a.order;
    var _b = react_1.useState(""), formattedDate = _b[0], setFormattedDate = _b[1];
    react_1.useEffect(function () {
        if (order.fecha) {
            var date = new Date(order.fecha);
            var formatted = date.toLocaleDateString("es-AR");
            setFormattedDate(formatted);
        }
    }, [order.fecha]);
    return (React.createElement("div", null,
        React.createElement("p", null, formattedDate)));
};
exports["default"] = DateConverter;
