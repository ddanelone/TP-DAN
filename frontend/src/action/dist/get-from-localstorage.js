"use client";
"use strict";
exports.__esModule = true;
exports.getFromLocalstorage = void 0;
exports.getFromLocalstorage = function (key) {
    if (typeof window !== "undefined") {
        var value = localStorage.getItem(key);
        if (!value)
            return null;
        return JSON.parse(value);
    }
    return null; // Devuelve null si no estás en el entorno del navegador
};
