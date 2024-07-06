"use strict";

exports.metadata = void 0;
var navbar_1 = require("@/components/ui/navbar");
var building_manager_1 = require("../components/building-manager");
exports.metadata = {
  title: "Obras",
  description: "ABM de Obras",
};
var VendedorObra = function () {
  return React.createElement(
    "div",
    null,
    React.createElement(navbar_1["default"], null),
    React.createElement(
      "div",
      {
        className:
          "md:border border-solid border-gray-300 rounded-3xl p-3 md:m-6 lg:mx-36",
      },
      React.createElement(building_manager_1["default"], null)
    )
  );
};
exports["default"] = VendedorObra;
