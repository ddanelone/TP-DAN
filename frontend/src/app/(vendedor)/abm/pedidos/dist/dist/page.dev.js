"use strict";

exports.metadata = void 0;

var navbar_1 = require("@/components/ui/navbar");

var order_manager_1 = require("../components/order-manager");

exports.metadata = {
  title: "Pedidos",
  description: "ABM de Pedidos"
};

var VendedorPedido = function VendedorPedido() {
  return React.createElement("div", null, React.createElement(navbar_1["default"], null), React.createElement("div", {
    className: "md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36"
  }, React.createElement(order_manager_1["default"], null)));
};

exports["default"] = VendedorPedido;