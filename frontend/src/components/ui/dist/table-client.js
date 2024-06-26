"use strict";
exports.__esModule = true;
exports.TableClient = void 0;
var react_1 = require("react");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var button_1 = require("./button");
var create_update_client_1 = require("@/app/(vendedor)/abm/clientes/components/create-update-client");
var confirmDeletionClient_1 = require("@/app/(vendedor)/abm/clientes/components/confirmDeletionClient");
function TableClient(_a) {
    var isLoading = _a.isLoading, clients = _a.clients, getClients = _a.getClients, deleteClient = _a.deleteClient;
    return (react_1["default"].createElement("div", { className: "hidden md:block" },
        react_1["default"].createElement(table_1.Table, null,
            react_1["default"].createElement(table_1.TableHeader, null,
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[100px]" }, "Apellido"),
                    react_1["default"].createElement(table_1.TableHead, null, "Nombre"),
                    react_1["default"].createElement(table_1.TableHead, null, "Correo Electr\u00F3nico"),
                    react_1["default"].createElement(table_1.TableHead, null, "CUIT"),
                    react_1["default"].createElement(table_1.TableHead, null, "M\u00E1ximo Descubierto"),
                    react_1["default"].createElement(table_1.TableHead, { className: "text-center w-[250px]" }, "Acciones"))),
            react_1["default"].createElement(table_1.TableBody, null,
                !isLoading &&
                    clients &&
                    clients.map(function (client) { return (react_1["default"].createElement(table_1.TableRow, { key: client.id },
                        react_1["default"].createElement(table_1.TableCell, { className: "font-semibold" }, client.apellido),
                        react_1["default"].createElement(table_1.TableCell, null, client.nombre),
                        react_1["default"].createElement(table_1.TableCell, null, client.correoElectronico),
                        react_1["default"].createElement(table_1.TableCell, null, client.cuit),
                        react_1["default"].createElement(table_1.TableCell, { className: "w-[ 50px]" }, client.maximoDescubierto),
                        react_1["default"].createElement(table_1.TableCell, { className: "text-center" },
                            react_1["default"].createElement(create_update_client_1.CreateUpdateClient, { clientToUpdate: client, getClients: getClients },
                                react_1["default"].createElement(button_1.Button, null,
                                    react_1["default"].createElement(lucide_react_1.SquarePen, null))),
                            react_1["default"].createElement(confirmDeletionClient_1.ConfirmDeletionClient, { deleteClient: deleteClient, client: client },
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
        !isLoading && clients.length === 0 && (react_1["default"].createElement("div", { className: "text-gray-200 my-20" },
            react_1["default"].createElement("div", { className: "flex justify-center" },
                react_1["default"].createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            react_1["default"].createElement("h2", { className: "text-center" }, "Nada para ver por aqu\u00ED...")))));
}
exports.TableClient = TableClient;
