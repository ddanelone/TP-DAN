"use strict";
exports.__esModule = true;
exports.SheetSearchProducts = void 0;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var sheet_1 = require("@/components/ui/sheet");
var lucide_react_1 = require("lucide-react");
function SheetSearchProducts(_a) {
    var isLoading = _a.isLoading, items = _a.items, setItems = _a.setItems, getItems = _a.getItems;
    var _b = react_1.useState(undefined), id = _b[0], setId = _b[1];
    var _c = react_1.useState(""), nombre = _c[0], setNombre = _c[1];
    var _d = react_1.useState(undefined), precioMin = _d[0], setPrecioMin = _d[1];
    var _e = react_1.useState(undefined), precioMax = _e[0], setPrecioMax = _e[1];
    var _f = react_1.useState(false), isSheetOpen = _f[0], setIsSheetOpen = _f[1];
    var _g = react_1.useState(items), filteredItems = _g[0], setFilteredItems = _g[1];
    var _h = react_1.useState(false), hasFetched = _h[0], setHasFetched = _h[1];
    var filterItems = react_1.useCallback(function () {
        getItems();
        var filtered = items.filter(function (item) {
            return ((id === undefined || item.id === id) &&
                (!nombre || item.nombre.toLowerCase().includes(nombre.toLowerCase())) &&
                (precioMin === undefined || item.precio >= precioMin) &&
                (precioMax === undefined || item.precio <= precioMax));
        });
        setFilteredItems(filtered);
    }, [id, nombre, precioMin, precioMax]);
    react_1.useEffect(function () {
        if (!hasFetched) {
            getItems().then(function () { return setHasFetched(true); });
        }
        filterItems();
    }, [getItems, hasFetched, filterItems]);
    var searchGo = function () {
        setItems(filteredItems);
        setIsSheetOpen(false);
    };
    var closeWindows = function () {
        getItems();
        resetFilters();
        setIsSheetOpen(false);
    };
    var resetFilters = function () {
        setId(undefined);
        setNombre("");
        setPrecioMin(undefined);
        setPrecioMax(undefined);
        filterItems();
    };
    return (React.createElement(sheet_1.Sheet, { open: isSheetOpen, onOpenChange: setIsSheetOpen },
        React.createElement(sheet_1.SheetTrigger, { asChild: true },
            React.createElement(button_1.Button, { className: "px-6", onClick: function () { return setIsSheetOpen(true); } },
                isLoading ? "Filtrando..." : "Buscar Productos",
                isLoading && React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }))),
        React.createElement(sheet_1.SheetContent, null,
            React.createElement(sheet_1.SheetHeader, null,
                React.createElement(sheet_1.SheetTitle, null, "Criterios de b\u00FAsqueda"),
                React.createElement(sheet_1.SheetDescription, null, "Ingrese al menos UN criterio para comenzar")),
            React.createElement("div", { className: "grid gap-4 py-4" },
                React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                    React.createElement(label_1.Label, { htmlFor: "id", className: "text-right" }, "Id"),
                    React.createElement(input_1.Input, { id: "id", placeholder: "id?", className: "col-span-3", value: id === undefined ? "" : id, onChange: function (e) {
                            return setId(e.target.value ? parseInt(e.target.value) : undefined);
                        } })),
                React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                    React.createElement(label_1.Label, { htmlFor: "nombre", className: "text-right" }, "Nombre"),
                    React.createElement(input_1.Input, { id: "nombre", placeholder: "Producto?", className: "col-span-3", value: nombre, onChange: function (e) { return setNombre(e.target.value); } })),
                React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                    React.createElement(label_1.Label, { htmlFor: "precioMin", className: "text-right" }, "Precio M\u00EDnimo"),
                    React.createElement(input_1.Input, { id: "precioMin", placeholder: "precio m\u00EDnimo?", className: "col-span-3", value: precioMin === undefined ? "" : precioMin, onChange: function (e) {
                            return setPrecioMin(e.target.value ? parseFloat(e.target.value) : undefined);
                        } })),
                React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                    React.createElement(label_1.Label, { htmlFor: "precioMax", className: "text-right" }, "Precio M\u00E1ximo"),
                    React.createElement(input_1.Input, { id: "precioMax", placeholder: "precio m\u00E1ximo?", className: "col-span-3", value: precioMax === undefined ? "" : precioMax, onChange: function (e) {
                            return setPrecioMax(e.target.value ? parseFloat(e.target.value) : undefined);
                        } }))),
            React.createElement(sheet_1.SheetFooter, null,
                React.createElement(button_1.Button, { type: "button", onClick: closeWindows }, "Cancelar"),
                React.createElement(button_1.Button, { type: "button", onClick: searchGo }, "Aplicar Filtro")))));
}
exports.SheetSearchProducts = SheetSearchProducts;
exports["default"] = SheetSearchProducts;
