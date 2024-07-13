"use strict";
exports.__esModule = true;
exports.ListBuilding = void 0;
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var badge_1 = require("@/components/ui/badge");
var create_update_building_1 = require("@/app/(vendedor)/abm/obras/components/create-update-building");
var confirm_deletion_building_1 = require("@/app/(vendedor)/abm/obras/components/confirm-deletion-building");
function ListBuilding(_a) {
    var isLoading = _a.isLoading, buildings = _a.buildings, getBuildings = _a.getBuildings, deleteBuilding = _a.deleteBuilding;
    return (React.createElement("div", { className: "block md:hidden" },
        !isLoading &&
            buildings &&
            buildings.map(function (building) {
                var _a, _b;
                return (React.createElement("div", { key: building.id, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                    React.createElement("div", { className: "flex justify-start items-center" },
                        React.createElement("div", { className: "ml-6" },
                            React.createElement("h3", { className: "font-semibold" },
                                "Cliente: ", (_a = building.cliente) === null || _a === void 0 ? void 0 :
                                _a.nombre,
                                ",",
                                " ", (_b = building.cliente) === null || _b === void 0 ? void 0 :
                                _b.apellido),
                            React.createElement("div", { className: "text-sm" },
                                "Calle: ",
                                building.calle,
                                "Altura: ",
                                building.altura,
                                " ",
                                React.createElement("br", null),
                                "Ciudad: ",
                                building.ciudad,
                                " ",
                                React.createElement("br", null),
                                "Presupuesto: ",
                                building.presupuesto,
                                " ",
                                React.createElement("br", null),
                                "Latitud: ",
                                building.lat,
                                " ",
                                React.createElement("br", null),
                                "Longitud: ",
                                building.lng,
                                React.createElement("br", null),
                                React.createElement(badge_1.Badge, { className: "mt-2", variant: "outline" },
                                    "Estado: ",
                                    building.estado)))),
                    React.createElement("div", { className: "ml-2" },
                        getBuildings && (React.createElement(create_update_building_1.CreateUpdateBuilding, { isLoading: isLoading, buildingToUpdate: building, getBuildings: getBuildings },
                            React.createElement(button_1.Button, { className: "w-8 h-8 p-0" },
                                React.createElement(lucide_react_1.SquarePen, { className: "w-5 h-5" })))),
                        deleteBuilding && (React.createElement(confirm_deletion_building_1.ConfirmDeletionBuilding, { deleteBuilding: deleteBuilding, building: building },
                            React.createElement(button_1.Button, { className: "w-8 h-8 p-0 mt-4", variant: "destructive" },
                                React.createElement(lucide_react_1.Trash2, { className: "w-5 h-5" })))))));
            }),
        isLoading &&
            [1, 1, 1, 1, 1].map(function (item, i) { return (React.createElement("div", { key: i, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" }),
                    React.createElement("div", { className: "ml-6" },
                        React.createElement(skeleton_1.Skeleton, { className: "w-[150px] h-4" }),
                        React.createElement(skeleton_1.Skeleton, { className: "w-[100px] h-4 mt-2" }))))); }),
        !isLoading && buildings.length === 0 && (React.createElement("div", { className: "text-gray-200 my-20" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            React.createElement("h2", { className: "text-center" }, "No hay productos disponibles")))));
}
exports.ListBuilding = ListBuilding;
exports["default"] = ListBuilding;