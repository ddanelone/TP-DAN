"use strict";
exports.__esModule = true;
exports.ListClientBuilding = void 0;
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
function ListClientBuilding(_a) {
    var isLoading = _a.isLoading, clients = _a.clients, onSelectClient = _a.onSelectClient;
    return (React.createElement("div", { className: "w-full block" },
        !isLoading &&
            clients &&
            clients.map(function (client) { return (React.createElement("div", { key: client.id, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement("div", { className: "ml-6" },
                        React.createElement("h3", { className: "font-semibold" },
                            "Apellido: ",
                            client.apellido),
                        React.createElement("div", { className: "text-sm" },
                            "Nombre: ",
                            client.nombre,
                            " ",
                            React.createElement("br", null),
                            "D.N.I.: ",
                            client.dni,
                            " ",
                            React.createElement("br", null)))),
                React.createElement("div", { className: "ml-2" },
                    React.createElement(button_1.Button, { className: "w-8 h-8 p-0 bg-black text-white hover:bg-green-500", onClick: function () { return onSelectClient(client); } },
                        React.createElement(lucide_react_1.SquareCheck, { className: "w-5 h-5" }))))); }),
        isLoading &&
            [1, 1, 1, 1, 1].map(function (_, i) { return (React.createElement("div", { key: i, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" }),
                    React.createElement("div", { className: "ml-6" },
                        React.createElement(skeleton_1.Skeleton, { className: "w-[150px] h-4" }),
                        React.createElement(skeleton_1.Skeleton, { className: "w-[100px] h-4 mt-2" }))))); }),
        !isLoading && clients.length === 0 && (React.createElement("div", { className: "text-gray-200 my-20" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            React.createElement("h2", { className: "text-center" }, "No hay Clientes que coincidan")))));
}
exports.ListClientBuilding = ListClientBuilding;
exports["default"] = ListClientBuilding;
