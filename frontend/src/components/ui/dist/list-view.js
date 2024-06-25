"use strict";
exports.__esModule = true;
exports.ListView = void 0;
var format_price_1 = require("@/action/format-price");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var badge_1 = require("@/components/ui/badge");
var create_update_item_form_1 = require("@/app/(vendedor)/abm/components/create-update-item-form");
var confirm_deletion_1 = require("@/app/(vendedor)/abm/components/confirm-deletion");
var add_item_to_cart_1 = require("@/app/(cliente)/components/add-item-to-cart");
exports.ListView = function (_a) {
    var items = _a.items, getItems = _a.getItems, deleteItem = _a.deleteItem, isLoading = _a.isLoading, addItem = _a.addItem;
    return (React.createElement("div", { className: "block md:hidden" },
        !isLoading &&
            items &&
            items.map(function (item) { return (React.createElement("div", { key: item.id, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement("div", { className: "ml-6" },
                        React.createElement("h3", { className: "font-semibold" }, item.nombre),
                        React.createElement("div", { className: "text-sm" },
                            "Descripci\u00F3n: ",
                            item.descripcion,
                            " ",
                            React.createElement("br", null),
                            "Categor\u00EDa: ",
                            item.categoria,
                            " ",
                            React.createElement("br", null),
                            "Stock Actual: ",
                            item.stockActual,
                            " ",
                            React.createElement("br", null),
                            "Stock M\u00EDnimo: ",
                            item.stockMinimo,
                            " ",
                            React.createElement("br", null),
                            "Precio: ",
                            format_price_1.formatPrice(item.precio),
                            " ",
                            React.createElement("br", null),
                            React.createElement(badge_1.Badge, { className: "mt-2", variant: "outline" },
                                "Total: ",
                                format_price_1.formatPrice(item.precio * 1000))))),
                React.createElement("div", { className: "ml-2" },
                    getItems && (React.createElement(create_update_item_form_1.CreateUpdateItem, { itemToUpdate: item, getItems: getItems },
                        React.createElement(button_1.Button, { className: "w-8 h-8 p-0" },
                            React.createElement(lucide_react_1.SquarePen, { className: "w-5 h-5" })))),
                    deleteItem && (React.createElement(confirm_deletion_1.ConfirmDeletion, { deleteItem: deleteItem, item: item },
                        React.createElement(button_1.Button, { className: "w-8 h-8 p-0", variant: "destructive" },
                            React.createElement(lucide_react_1.Trash2, { className: "w-5 h-5" })))),
                    addItem && (React.createElement(add_item_to_cart_1["default"], { item: item, addItem: addItem },
                        React.createElement(button_1.Button, null,
                            React.createElement(lucide_react_1.ShoppingCart, null))))))); }),
        isLoading &&
            [1, 1, 1, 1, 1].map(function (item, i) { return (React.createElement("div", { key: i, className: "flex items-center mb-6 justify-between border border-solid border-gray-300 rounded-xl p-6" },
                React.createElement("div", { className: "flex justify-start items-center" },
                    React.createElement(skeleton_1.Skeleton, { className: "w-16 h-16 rounded-xl" }),
                    React.createElement("div", { className: "ml-6" },
                        React.createElement(skeleton_1.Skeleton, { className: "w-[150px] h-4" }),
                        React.createElement(skeleton_1.Skeleton, { className: "w-[100px] h-4 mt-2" }))))); }),
        !isLoading && items.length === 0 && (React.createElement("div", { className: "text-gray-200 my-20" },
            React.createElement("div", { className: "flex justify-center" },
                React.createElement(lucide_react_1.LayoutList, { className: "w-[120px] h-[120px]" })),
            React.createElement("h2", { className: "text-center" }, "No hay productos disponibles")))));
};
exports["default"] = exports.ListView;
