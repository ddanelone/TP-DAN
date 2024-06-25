"use strict";
exports.__esModule = true;
exports.TableView = void 0;
var format_price_1 = require("@/action/format-price");
var button_1 = require("@/components/ui/button");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var create_update_item_form_1 = require("./create-update-item-form");
var confirm_deletion_1 = require("./confirm-deletion");
var skeleton_1 = require("@/components/ui/skeleton");
function TableView(_a) {
    var items = _a.items, getItems = _a.getItems, deleteItem = _a.deleteItem, isLoading = _a.isLoading;
    return (React.createElement("div", { className: "hidden md:block" },
        React.createElement(table_1.Table, null,
            React.createElement(table_1.TableHeader, null,
                React.createElement(table_1.TableRow, null,
                    React.createElement(table_1.TableHead, { className: "w-[100px]" }, "Nombre"),
                    React.createElement(table_1.TableHead, null, "Descripci\u00F3n"),
                    React.createElement(table_1.TableHead, null, "Categor\u00EDa"),
                    React.createElement(table_1.TableHead, null, "Stock Actual"),
                    React.createElement(table_1.TableHead, null, "Stock M\u00EDnimo"),
                    React.createElement(table_1.TableHead, null, "Precio"),
                    React.createElement(table_1.TableHead, { className: "text-center w-[250px]" }, "Acciones"))),
            React.createElement(table_1.TableBody, null,
                !isLoading &&
                    items &&
                    items.map(function (item) { return (React.createElement(table_1.TableRow, { key: item.id },
                        React.createElement(table_1.TableCell, { className: "font-semibold w-[350px]" }, item.nombre),
                        React.createElement(table_1.TableCell, { className: "font-semibold w-[350px]" }, item.descripcion),
                        React.createElement(table_1.TableCell, null, item.categoria),
                        React.createElement(table_1.TableCell, null, item.stockActual),
                        React.createElement(table_1.TableCell, null, item.stockMinimo),
                        React.createElement(table_1.TableCell, null, format_price_1.formatPrice(item.precio)),
                        React.createElement(table_1.TableCell, { className: "text-center" },
                            React.createElement(create_update_item_form_1.CreateUpdateItem, { itemToUpdate: item, getItems: getItems },
                                React.createElement(button_1.Button, null,
                                    React.createElement(lucide_react_1.SquarePen, null))),
                            React.createElement(confirm_deletion_1.ConfirmDeletion, { deleteItem: deleteItem, item: item },
                                React.createElement(button_1.Button, { className: "ml-4", variant: "destructive" },
                                    React.createElement(lucide_react_1.Trash2, null)))))); }),
                isLoading &&
                    [1, 1, 1, 1, 1].map(function (e, i) { return (React.createElement(table_1.TableRow, { key: i },
                        React.createElement(table_1.TableCell, null,
                            React.createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" })),
                        React.createElement(table_1.TableCell, null,
                            React.createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        React.createElement(table_1.TableCell, null,
                            React.createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        React.createElement(table_1.TableCell, null,
                            React.createElement(skeleton_1.Skeleton, { className: "w-full h-4" })),
                        React.createElement(table_1.TableCell, null,
                            React.createElement(skeleton_1.Skeleton, { className: "w-full h-4" })))); }))),
        !isLoading && items.length === 0 && (React.createElement("div", { className: "text-gray-200 my-20" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            React.createElement("h2", { className: "text-center" }, "No hay productos disponibles")))));
}
exports.TableView = TableView;
