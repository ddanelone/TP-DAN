"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var api = axios_1["default"].create({
    baseURL: "http://localhost:8080/api",
    //baseURL: "http://gateway-server:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
exports["default"] = api;
