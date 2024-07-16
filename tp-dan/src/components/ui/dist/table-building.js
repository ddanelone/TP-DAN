"use strict";
exports.__esModule = true;
exports.TableBuilding = void 0;
var react_1 = require("react");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var button_1 = require("./button");
var create_update_building_1 = require("@/app/(vendedor)/abm/obras/components/create-update-building");
var confirm_deletion_building_1 = require("@/app/(vendedor)/abm/obras/components/confirm-deletion-building");
var set_in_localstorage_1 = require("@/action/set-in-localstorage");
function TableBuilding(_a) {
    var isLoading = _a.isLoading, buildings = _a.buildings, getBuildings = _a.getBuildings, deleteBuilding = _a.deleteBuilding, existingBuilding = _a.existingBuilding;
    var _b = react_1.useState(null), selectedBuilding = _b[0], setSelectedBuilding = _b[1];
    var handleSelectBuilding = function (building) {
        if ((selectedBuilding === null || selectedBuilding === void 0 ? void 0 : selectedBuilding.id) === building.id) {
            setSelectedBuilding(null);
            localStorage.removeItem("selectedBuilding");
        }
        else {
            setSelectedBuilding(building);
            set_in_localstorage_1.setInLocalstorage("selectedBuilding", building);
            existingBuilding();
        }
    };
    return (react_1["default"].createElement("div", { className: "hidden md:block" },
        react_1["default"].createElement(table_1.Table, null,
            react_1["default"].createElement(table_1.TableHeader, null,
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, { colSpan: 2, className: "text-center" }, "Cliente"),
                    react_1["default"].createElement(table_1.TableHead, { colSpan: 7, className: "text-center" }, "Obra")),
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[200px]" }, "Apellido"),
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[200px]" }, "Nombre"),
                    react_1["default"].createElement(table_1.TableHead, null, "Calle"),
                    react_1["default"].createElement(table_1.TableHead, null, "Altura"),
                    react_1["default"].createElement(table_1.TableHead, null, "Ciudad"),
                    react_1["default"].createElement(table_1.TableHead, null, "Presupuesto"),
                    react_1["default"].createElement(table_1.TableHead, null, "Estado"),
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[25px]" }, "Latitud"),
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[25px]" }, "Longitud"),
                    getBuildings && deleteBuilding && (react_1["default"].createElement(table_1.TableHead, { className: "text-center w-[250px]" }, "Acciones")))),
            react_1["default"].createElement(table_1.TableBody, null,
                !isLoading &&
                    buildings &&
                    buildings.map(function (building) {
                        var _a, _b, _c, _d;
                        return (react_1["default"].createElement(table_1.TableRow, { key: building.id },
                            react_1["default"].createElement(table_1.TableCell, null, (_b = (_a = building.cliente) === null || _a === void 0 ? void 0 : _a.apellido) !== null && _b !== void 0 ? _b : "N/A"),
                            react_1["default"].createElement(table_1.TableCell, null, (_d = (_c = building.cliente) === null || _c === void 0 ? void 0 : _c.nombre) !== null && _d !== void 0 ? _d : "N/A"),
                            react_1["default"].createElement(table_1.TableCell, null, building.calle),
                            react_1["default"].createElement(table_1.TableCell, null, building.altura),
                            react_1["default"].createElement(table_1.TableCell, null, building.ciudad),
                            react_1["default"].createElement(table_1.TableCell, null, building.presupuesto),
                            react_1["default"].createElement(table_1.TableCell, null, building.estado),
                            react_1["default"].createElement(table_1.TableCell, { className: "w-[50px]" }, building.lat),
                            react_1["default"].createElement(table_1.TableCell, { className: "w-[50px]" }, building.lng),
                            react_1["default"].createElement(table_1.TableCell, { className: "text-center" },
                                !getBuildings && (react_1["default"].createElement(button_1.Button, { className: "ml-4", onClick: function () { return handleSelectBuilding(building); } }, (selectedBuilding === null || selectedBuilding === void 0 ? void 0 : selectedBuilding.id) === building.id ? "✔️" : "❌")),
                                getBuildings && (react_1["default"].createElement(create_update_building_1.CreateUpdateBuilding, { isLoading: isLoading, buildingToUpdate: building, getBuildings: getBuildings },
                                    react_1["default"].createElement(button_1.Button, { className: "ml-4" },
                                        react_1["default"].createElement(lucide_react_1.SquarePen, null)))),
                                deleteBuilding && (react_1["default"].createElement(confirm_deletion_building_1.ConfirmDeletionBuilding, { deleteBuilding: deleteBuilding, building: building },
                                    react_1["default"].createElement(button_1.Button, { className: "ml-4 mt-4", variant: "destructive" },
                                        react_1["default"].createElement(lucide_react_1.Trash2, null)))))));
                    }),
                isLoading &&
                    [1, 1, 1, 1, 1].map(function (e, i) { return (react_1["default"].createElement(table_1.TableRow, { key: i },
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        react_1["default"].createElement(table_1.TableCell, null,
                            react_1["default"].createElement(skeleton_1.Skeleton, { className: "w-full h-4" })))); }))),
        !isLoading && buildings.length === 0 && (react_1["default"].createElement("div", { className: "text-gray-200 my-20" },
            react_1["default"].createElement("div", { className: "flex justify-center" },
                react_1["default"].createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            react_1["default"].createElement("h2", { className: "text-center" }, "No hay obras para mostrar")))));
}
exports.TableBuilding = TableBuilding;
