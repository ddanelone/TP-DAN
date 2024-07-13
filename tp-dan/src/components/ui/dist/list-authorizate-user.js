"use strict";
exports.__esModule = true;
exports.ListAuthorizateUser = void 0;
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var badge_1 = require("@/components/ui/badge");
var create_update_user_1 = require("@/app/(cliente)/usuarios/components/create-update-user");
var confirm_deletion_user_1 = require("@/app/(cliente)/usuarios/components/confirm-deletion-user");
function ListAuthorizateUser(_a) {
    var isLoading = _a.isLoading, userAuths = _a.userAuths, getUsers = _a.getUsers, deleteUser = _a.deleteUser;
    return (React.createElement("div", { className: "w-full block md:hidden" },
        !isLoading &&
            userAuths &&
            userAuths.map(function (user) { return (React.createElement("div", { key: user.id, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement("div", { className: "ml-6" },
                        React.createElement("h3", { className: "font-semibold" }, user.apellido),
                        React.createElement("div", { className: "text-sm" },
                            "Nombre: ",
                            user.nombre,
                            " ",
                            React.createElement("br", null),
                            "D.N.I.: ",
                            user.dni,
                            " ",
                            React.createElement("br", null),
                            React.createElement(badge_1.Badge, { className: "mt-2", variant: "outline" },
                                "Correo Electr\u00F3nico: ",
                                user.correoElectronico)))),
                React.createElement("div", { className: "ml-2" },
                    getUsers && (React.createElement(create_update_user_1.CreateUpdateUser, { userToUpdate: user, getUsers: getUsers },
                        React.createElement(button_1.Button, { className: "w-8 h-8 p-0" },
                            React.createElement(lucide_react_1.SquarePen, { className: "w-5 h-5" })))),
                    deleteUser && (React.createElement(confirm_deletion_user_1.ConfirmDeletionUser, { deleteUser: deleteUser, userAuth: user },
                        React.createElement(button_1.Button, { className: "ml-4", variant: "destructive" },
                            React.createElement(lucide_react_1.Trash2, null))))))); }),
        isLoading &&
            [1, 1, 1, 1, 1].map(function (item, i) { return (React.createElement("div", { key: i, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" }),
                    React.createElement("div", { className: "ml-6" },
                        React.createElement(skeleton_1.Skeleton, { className: "w-[150px] h-4" }),
                        React.createElement(skeleton_1.Skeleton, { className: "w-[100px] h-4 mt-2" }))))); }),
        !isLoading && userAuths.length === 0 && (React.createElement("div", { className: "text-gray-200 my-20" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            React.createElement("h2", { className: "text-center" }, "No tiene Usuarios habilitados para operar por usted")))));
}
exports.ListAuthorizateUser = ListAuthorizateUser;
exports["default"] = ListAuthorizateUser;
