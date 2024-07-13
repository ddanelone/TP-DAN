"use strict";
exports.__esModule = true;
exports.formatPrice = void 0;
exports.formatPrice = function (price) {
    if (price === undefined || price === null)
        return "0.00 ARS";
    var fixedPrice = parseFloat(price.toFixed(2));
    return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "ARS"
    }).format(fixedPrice);
};
