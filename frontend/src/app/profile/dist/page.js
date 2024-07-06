"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var navbar_1 = require("@/components/ui/navbar");
var profile_edit_1 = require("../components/profile-edit");
exports.metadata = {
  title: "DAN 2024",
  description: "Gestión Integral",
};
var Profile = function () {
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
      React.createElement(profile_edit_1["default"], null)
    )
  );
};
exports["default"] = Profile;
