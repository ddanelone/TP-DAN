"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var logo_1 = require("@/components/logo");
var sign_in_form_1 = require("./components/sign-in.form");
exports.metadata = {
    title: "Login",
    description: "Acceder al sistema de gestión de la empresa"
};
var AuthPage = function () {
    return (React.createElement("div", { className: "flex justify-center items-center md:h-[95vh] md:px-10 lg:px-26" },
        React.createElement("div", { className: "container h-[85vh] flex-col justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0" },
            React.createElement("div", { className: "relative hidden h-full flex-col p-10 text-white lg:flex" },
                React.createElement("div", { className: "bg-auth absolute inset-0" }),
                React.createElement(logo_1["default"], null),
                React.createElement("div", { className: "relative z-20 mt-auto" },
                    React.createElement("p", { className: "text-lg" }, "Brindando soluciones desde 2021"),
                    React.createElement("footer", { className: "text-sm" }, "\u00A9 Cosolito-Danelone-Margitic"))),
            React.createElement("div", { className: "pt-10 lg:p-8 flex items-center md:h-[70vh]" },
                React.createElement("div", { className: "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]" },
                    React.createElement(sign_in_form_1["default"], null))))));
};
exports["default"] = AuthPage;
