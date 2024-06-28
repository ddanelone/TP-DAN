"use strict";
exports.__esModule = true;
exports.ListClient = void 0;
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var badge_1 = require("@/components/ui/badge");
var confirmDeletionClient_1 = require("@/app/(vendedor)/abm/clientes/components/confirmDeletionClient");
var create_update_client_1 = require("@/app/(vendedor)/abm/clientes/components/create-update-client");
exports.ListClient = function (_a) {
    var isLoading = _a.isLoading, clients = _a.clients, getClients = _a.getClients, deleteClient = _a.deleteClient;
    return (React.createElement("div", { className: "w-full block md:hidden" },
        !isLoading &&
            clients &&
            clients.map(function (client) { return (React.createElement("div", { key: client.id, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement("div", { className: "ml-6" },
                        React.createElement("h3", { className: "font-semibold" }, client.apellido),
                        React.createElement("div", { className: "text-sm" },
                            "Nombre: ",
                            client.nombre,
                            " ",
                            React.createElement("br", null),
                            "D.N.I.: ",
                            client.dni,
                            " ",
                            React.createElement("br", null),
                            "C.U.I.T.: ",
                            client.cuit,
                            " ",
                            React.createElement("br", null),
                            "Correo Electr\u00F3nico: ",
                            client.correoElectronico,
                            " ",
                            React.createElement("br", null),
                            "M\u00E1xima Cantidad Obras: ",
                            client.cantidad_obras,
                            React.createElement("br", null),
                            React.createElement(badge_1.Badge, { className: "mt-2", variant: "outline" },
                                "M\u00E1ximo Autorizado: ",
                                client.maximoDescubierto)))),
                React.createElement("div", { className: "ml-2" },
                    getClients && (React.createElement(create_update_client_1.CreateUpdateClient, { clientToUpdate: client, getClients: getClients },
                        React.createElement(button_1.Button, { className: "w-8 h-8 p-0" },
                            React.createElement(lucide_react_1.SquarePen, { className: "w-5 h-5" })))),
                    deleteClient && (React.createElement(confirmDeletionClient_1.ConfirmDeletionClient, { deleteClient: deleteClient, client: client },
                        React.createElement(button_1.Button, { className: "ml-4", variant: "destructive" },
                            React.createElement(lucide_react_1.Trash2, null))))))); }),
        isLoading &&
            [1, 1, 1, 1, 1].map(function (item, i) { return (React.createElement("div", { key: i, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" }),
                    React.createElement("div", { className: "ml-6" },
                        React.createElement(skeleton_1.Skeleton, { className: "w-[150px] h-4" }),
                        React.createElement(skeleton_1.Skeleton, { className: "w-[100px] h-4 mt-2" }))))); }),
        !isLoading && clients.length === 0 && (React.createElement("div", { className: "text-gray-200 my-20" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            React.createElement("h2", { className: "text-center" }, "No hay productos disponibles")))));
};
exports["default"] = exports.ListClient;
