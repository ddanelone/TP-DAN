"use strict";
exports.__esModule = true;
exports.TableView = void 0;
var react_1 = require("react");
var format_price_1 = require("@/action/format-price");
var button_1 = require("@/components/ui/button");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var create_update_item_form_1 = require("@/app/(vendedor)/abm/components/create-update-item-form");
var confirm_deletion_1 = require("@/app/(vendedor)/abm/components/confirm-deletion");
var add_item_to_cart_1 = require("@/app/(cliente)/components/add-item-to-cart");
function TableView(_a) {
    var items = _a.items, getItems = _a.getItems, deleteItem = _a.deleteItem, isLoading = _a.isLoading, addItem = _a.addItem;
    return (react_1["default"].createElement("div", { className: "hidden md:block" },
        react_1["default"].createElement(table_1.Table, null,
            react_1["default"].createElement(table_1.TableHeader, null,
                react_1["default"].createElement(table_1.TableRow, null,
                    react_1["default"].createElement(table_1.TableHead, { className: "w-[100px]" }, "Nombre"),
                    react_1["default"].createElement(table_1.TableHead, null, "Descripci\u00F3n"),
                    react_1["default"].createElement(table_1.TableHead, null, "Categor\u00EDa"),
                    react_1["default"].createElement(table_1.TableHead, null, "Stock Actual"),
                    react_1["default"].createElement(table_1.TableHead, null, "Stock M\u00EDnimo"),
                    react_1["default"].createElement(table_1.TableHead, null, "Precio"),
                    react_1["default"].createElement(table_1.TableHead, { className: "text-center w-[250px]" }, "Acciones"))),
            react_1["default"].createElement(table_1.TableBody, null,
                !isLoading &&
                    items &&
                    items.map(function (item) { return (react_1["default"].createElement(table_1.TableRow, { key: item.id },
                        react_1["default"].createElement(table_1.TableCell, { className: "font-semibold w-[350px]" }, item.nombre),
                        react_1["default"].createElement(table_1.TableCell, { className: "font-semibold w-[350px]" }, item.descripcion),
                        react_1["default"].createElement(table_1.TableCell, null, item.categoria),
                        react_1["default"].createElement(table_1.TableCell, null, item.stockActual),
                        react_1["default"].createElement(table_1.TableCell, null, item.stockMinimo),
                        react_1["default"].createElement(table_1.TableCell, null, format_price_1.formatPrice(item.precio)),
                        react_1["default"].createElement(table_1.TableCell, { className: "text-center" },
                            getItems && (react_1["default"].createElement(create_update_item_form_1.CreateUpdateItem, { itemToUpdate: item, getItems: getItems },
                                react_1["default"].createElement(button_1.Button, null,
                                    react_1["default"].createElement(lucide_react_1.SquarePen, null)))),
                            deleteItem && (react_1["default"].createElement(confirm_deletion_1.ConfirmDeletion, { deleteItem: deleteItem, item: item },
                                react_1["default"].createElement(button_1.Button, { className: "ml-4", variant: "destructive" },
                                    react_1["default"].createElement(lucide_react_1.Trash2, null)))),
                            addItem && (react_1["default"].createElement(add_item_to_cart_1["default"], { item: item, addItem: addItem },
                                react_1["default"].createElement(button_1.Button, null,
                                    react_1["default"].createElement(lucide_react_1.ShoppingCart, null))))))); }),
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
        !isLoading && items.length === 0 && (react_1["default"].createElement("div", { className: "text-gray-200 my-20" },
            react_1["default"].createElement("div", { className: "flex justify-center" },
                react_1["default"].createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            react_1["default"].createElement("h2", { className: "text-center" }, "No hay productos disponibles")))));
}
exports.TableView = TableView;
