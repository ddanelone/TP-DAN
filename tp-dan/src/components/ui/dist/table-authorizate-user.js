"use strict";
exports.__esModule = true;
exports.TableAuthorizateUser = void 0;
var react_1 = require("react");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var button_1 = require("./button");
var confirm_deletion_user_1 = require("@/app/(cliente)/usuarios/components/confirm-deletion-user");
var create_update_user_1 = require("@/app/(cliente)/usuarios/components/create-update-user");
function TableAuthorizateUser(_a) {
    var isLoading = _a.isLoading, userAuths = _a.userAuths, getUsers = _a.getUsers, deleteUser = _a.deleteUser;
    return (react_1["default"].createElement("div", { className: "hidden md:block" },
        react_1["default"].createElement(table_1.Table, null,
            react_1["default"].createElement(table_1.TableHeader, null,
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[100px]" }, "Apellido"),
                    react_1["default"].createElement(table_1.TableHead, null, "Nombre"),
                    react_1["default"].createElement(table_1.TableHead, null, "Correo Electr\u00F3nico"),
                    react_1["default"].createElement(table_1.TableHead, null, "DNI"),
                    react_1["default"].createElement(table_1.TableHead, { className: "text-center w-[250px]" }, "Acciones"))),
            react_1["default"].createElement(table_1.TableBody, null,
                !isLoading &&
                    userAuths &&
                    userAuths.map(function (userAuth) { return (react_1["default"].createElement(table_1.TableRow, { key: userAuth.id },
                        react_1["default"].createElement(table_1.TableCell, { className: "font-semibold" }, userAuth.apellido),
                        react_1["default"].createElement(table_1.TableCell, null, userAuth.nombre),
                        react_1["default"].createElement(table_1.TableCell, null, userAuth.correoElectronico),
                        react_1["default"].createElement(table_1.TableCell, null, userAuth.dni),
                        react_1["default"].createElement(table_1.TableCell, { className: "text-center" },
                            react_1["default"].createElement(create_update_user_1.CreateUpdateUser, { userToUpdate: userAuth, getUsers: getUsers },
                                react_1["default"].createElement(button_1.Button, null,
                                    react_1["default"].createElement(lucide_react_1.SquarePen, null))),
                            react_1["default"].createElement(confirm_deletion_user_1.ConfirmDeletionUser, { deleteUser: deleteUser, userAuth: userAuth },
                                react_1["default"].createElement(button_1.Button, { className: "ml-4", variant: "destructive" },
                                    react_1["default"].createElement(lucide_react_1.Trash2, null)))))); }),
                isLoading &&
                    [1, 1, 1, 1, 1].map(function (e, i) { return (react_1["default"].createElement(table_1.TableRow, { key: i },
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })))); }))),
        !isLoading && userAuths.length === 0 && (react_1["default"].createElement("div", { className: "text-gray-200 my-20" },
            react_1["default"].createElement("div", { className: "flex justify-center" },
                react_1["default"].createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            react_1["default"].createElement("h2", { className: "text-center" },
                " ",
                "No tiene Usuarios habilitados para operar por usted")))));
}
exports.TableAuthorizateUser = TableAuthorizateUser;
