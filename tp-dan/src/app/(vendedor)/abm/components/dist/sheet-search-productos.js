"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SheetSearchProducts = void 0;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var sheet_1 = require("@/components/ui/sheet");
var lucide_react_1 = require("lucide-react");
var auth_1 = require("@/lib/auth");
function SheetSearchProducts(_a) {
    var _this = this;
    var items = _a.items, setItems = _a.setItems, getItems = _a.getItems;
    var _b = react_1.useState(undefined), id = _b[0], setId = _b[1];
    var _c = react_1.useState(""), nombre = _c[0], setNombre = _c[1];
    var _d = react_1.useState(undefined), precioMin = _d[0], setPrecioMin = _d[1];
    var _e = react_1.useState(undefined), precioMax = _e[0], setPrecioMax = _e[1];
    var _f = react_1.useState(false), isSheetOpen = _f[0], setIsSheetOpen = _f[1];
    var _g = react_1.useState(items), filteredItems = _g[0], setFilteredItems = _g[1];
    var _h = react_1.useState(false), hasFetched = _h[0], setHasFetched = _h[1];
    var _j = react_1.useState(false), isLoading = _j[0], setIsLoading = _j[1];
    var filterItems = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.searchProducts(0, 10, id, nombre, precioMin, precioMax)];
                case 2:
                    data = (_a.sent()).data;
                    setFilteredItems(data);
                    setItems(data);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [id, nombre, precioMin, precioMax, setItems]);
    react_1.useEffect(function () {
        if (!hasFetched) {
            getItems().then(function () { return setHasFetched(true); });
        }
    }, [getItems, hasFetched]);
    var searchGo = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, filterItems()];
                case 1:
                    _a.sent();
                    setIsSheetOpen(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var closeWindows = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getItems()];
                case 1:
                    _a.sent();
                    resetFilters();
                    setIsSheetOpen(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var resetFilters = function () {
        setId(undefined);
        setNombre("");
        setPrecioMin(undefined);
        setPrecioMax(undefined);
        setFilteredItems(items); // Reset filtered items to the original items
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
                React.createElement(button_1.Button, { type: "button", onClick: searchGo },
                    isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                    "Aplicar Filtro")))));
}
exports.SheetSearchProducts = SheetSearchProducts;
exports["default"] = SheetSearchProducts;
