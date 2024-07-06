"use strict";

exports.metadata = void 0;
var navbar_1 = require("@/components/ui/navbar");
var items_1 = require("../../components/items");
exports.metadata = {
  title: "Productos",
  description: "Catálogo de productos",
};
var ClienteProducto = function () {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(navbar_1["default"], null),
    React.createElement(
      "div",
      {
        className:
          "md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36",
      },
      React.createElement(items_1["default"], null)
    )
  );
};
exports["default"] = ClienteProducto;
