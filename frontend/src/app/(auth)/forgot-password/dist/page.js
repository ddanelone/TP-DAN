"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var recover_password_form_1 = require("../components/recover-password.form");
exports.metadata = {
  title: "Recuperar contraseña",
  description:
    "Te enviaremos un correo electrónico con instrucciones para recuperar tu contraseña",
};
var ForgotPassword = function () {
  return React.createElement(
    "div",
    { className: "pt-10 lg:p-8 flex items-center md:h-[70vh]" },
    React.createElement(
      "div",
      {
        className:
          "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]",
      },
      React.createElement(recover_password_form_1["default"], null)
    )
  );
};
exports["default"] = ForgotPassword;
