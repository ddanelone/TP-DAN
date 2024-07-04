"use client";
"use strict";
exports.__esModule = true;
exports.getFromLocalstorage = void 0;
exports.getFromLocalstorage = function (key) {
    var value = localStorage.getItem(key);
    if (!value)
        return null;
    return JSON.parse(value);
};
