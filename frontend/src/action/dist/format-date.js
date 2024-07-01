"use strict";
exports.__esModule = true;
exports.formatDate = void 0;
exports.formatDate = function (date) {
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
};
