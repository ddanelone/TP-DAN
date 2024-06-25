"use client";
"use strict";
exports.__esModule = true;
exports.getFromLocalstorage = void 0;
exports.getFromLocalstorage = function (key) {
    return JSON.parse(localStorage.getItem(key));
};
