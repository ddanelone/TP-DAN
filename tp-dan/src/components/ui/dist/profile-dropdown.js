"use strict";
exports.__esModule = true;
exports.ProfileDropdown = void 0;
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var use_user_1 = require("@/hooks/use-user");
var auth_1 = require("@/lib/auth");
var navigation_1 = require("next/navigation");
var get_from_localstorage_1 = require("@/action/get-from-localstorage");
function ProfileDropdown() {
    var user = use_user_1.useUser();
    var router = navigation_1.useRouter();
    var salir = function () {
        //Verificar que no hayan quedado trazas de clientes ni obras en el localstorage
        var idClient = get_from_localstorage_1.getFromLocalstorage("idClient");
        if (idClient) {
            localStorage.removeItem("idClient");
        }
        var selectedBuilding = get_from_localstorage_1.getFromLocalstorage("selectedBuilding");
        if (selectedBuilding) {
            localStorage.removeItem("selectedBuilding");
        }
        auth_1.signOutAccount();
        router.push("/");
    };
    var redir = function () {
        router.push("/profile");
    };
    return (React.createElement(dropdown_menu_1.DropdownMenu, null,
        React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline" },
                React.createElement("span", { className: "mr-2" }, "Cuenta"),
                React.createElement(lucide_react_1.CircleUserRound, { className: "m-auto w-6 h-6" }))),
        React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "w-56" },
            React.createElement(dropdown_menu_1.DropdownMenuLabel, null,
                React.createElement("div", null, user === null || user === void 0 ? void 0 :
                    user.name,
                    " ", user === null || user === void 0 ? void 0 :
                    user.surname)),
            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            React.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return redir(); } },
                    React.createElement(lucide_react_1.User, { className: "mr-2 h-4 w-4" }),
                    React.createElement("span", null, "Perfil de usuario")),
                React.createElement(dropdown_menu_1.DropdownMenuItem, null,
                    React.createElement(lucide_react_1.FileText, { className: "mr-2 h-4 w-4" }),
                    React.createElement("span", null, "T\u00E9rminos y condiciones")),
                React.createElement(dropdown_menu_1.DropdownMenuItem, null,
                    React.createElement(lucide_react_1.LifeBuoy, { className: "mr-2 h-4 w-4" }),
                    React.createElement("span", null, "Soporte"))),
            React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
            React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return salir(); } },
                React.createElement(lucide_react_1.LogOut, { className: "mr-2 h-4 w-4" }),
                React.createElement("span", null, "Salir")))));
}
exports.ProfileDropdown = ProfileDropdown;
