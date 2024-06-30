"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var logo_1 = require("@/components/logo");
var sign_up_form_1 = require("./components/sign-up.form");
exports.metadata = {
    title: "Registrar",
    description: "Cree una cuenta de usuario para acceder al sistema"
};
var SignUp = function () {
    return (React.createElement("div", { className: "flex justify-center items-center md:h-[95vh] md:px-10 lg:px-26" },
        React.createElement("div", { className: "container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0" },
            React.createElement("div", { className: "pt-10 lg:p-8 flex items-center md:h-[70vj]" },
                React.createElement("div", { className: "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450]" },
                    React.createElement(sign_up_form_1["default"], null))),
            React.createElement("div", { className: "relative hidden h-full flex-col p-10 text-white lg:flex" },
                React.createElement("div", { className: "bg-auth absolute inset-0" }),
                React.createElement(logo_1["default"], null),
                React.createElement("div", { className: "relative z-20 mt-auto" },
                    React.createElement("p", { className: "text-lg" }, "Sistemas Empresarios Software"),
                    React.createElement("footer", { className: "text-sm" }, "\u00A9 Cosolito-Danelone-Margitic"))))));
};
exports["default"] = SignUp;