"use client";
"use strict";
exports.__esModule = true;
exports.setInLocalstorage = void 0;
exports.setInLocalstorage = function (key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
};
