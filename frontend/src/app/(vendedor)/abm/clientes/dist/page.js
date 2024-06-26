"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var navbar_1 = require("@/components/ui/navbar");
var client_manager_1 = require("./components/client-manager");
exports.metadata = {
    title: "Clientes",
    description: "ABM de Clientes"
};
var Dashboard = function () {
    return (React.createElement("div", null,
        React.createElement(navbar_1["default"], null),
        React.createElement("div", { className: "md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36" },
            React.createElement(client_manager_1["default"], null))));
};
exports["default"] = Dashboard;
