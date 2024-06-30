"use client";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var use_user_1 = require("@/hooks/use-user");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var react_hot_toast_1 = require("react-hot-toast");
var badge_1 = require("@/components/ui/badge");
var auth_1 = require("@/lib/auth");
var lucide_react_1 = require("lucide-react");
var buy_cart_1 = require("./buy-cart");
var table_view_1 = require("@/components/ui/table-view");
var list_view_1 = require("@/components/ui/list-view");
var Items = function () {
    var user = use_user_1.useUser();
    var _a = react_1.useState([]), items = _a[0], setItems = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState([]), cart = _c[0], setCart = _c[1]; // Estado para el carrito
    /* ========== Cargar los productos en la tabla ========== */
    var getItems = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.getProducts()];
                case 2:
                    res = _a.sent();
                    setItems(res);
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
    }); };
    react_1.useEffect(function () {
        if (user)
            getItems();
    }, [user]);
    /* ========== Agregar un item al carrito ========== */
    var addItemToCart = function (item) {
        var existingItem = cart.find(function (cartItem) { return cartItem.id === item.id; });
        if (existingItem) {
            react_hot_toast_1["default"].error("El producto ya está en el carrito", { duration: 2500 });
        }
        else {
            setCart(function (prevCart) { return __spreadArrays(prevCart, [item]); });
            react_hot_toast_1["default"].success("Producto agregado al carrito");
        }
    };
    /* ========== Eliminar un item del carrito ========== */
    var removeItemFromCart = function (item) {
        setCart(cart.filter(function (cartItem) { return cartItem.id !== item.id; }));
    };
    /* ========== Lógica para concretar la compra ========== */
    var handlePurchase = function () {
        console.log("Comprando los productos en el carrito:", cart);
        react_hot_toast_1["default"].success("Compra realizada correctamente", { duration: 2500 });
        setCart([]);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "flex justify-between items-center m-4 mb-8" },
            React.createElement("div", null,
                React.createElement("h1", { className: "text-2xl ml-1" }, "Nuestros Productos"),
                items.length > 0 && (React.createElement(badge_1.Badge, { className: "mt-2 text-[14px]", variant: "outline" }, "SECCI\u00D3N EXCLUSIVA PARA CLIENTES"))),
            React.createElement(buy_cart_1.BuyCart, { cartItems: cart, removeItem: removeItemFromCart },
                React.createElement(button_1.Button, { className: "px-6" },
                    React.createElement("span", { className: "flex items-center" },
                        "Ver Carrito",
                        React.createElement("span", { className: "inline-block bg-gray-200 rounded-full p-1 ml-2" },
                            React.createElement(lucide_react_1.ShoppingCart, { className: "text-gray-600", size: 20 })))))),
        React.createElement(table_view_1.TableView, { items: items, isLoading: isLoading, addItem: addItemToCart }),
        React.createElement(list_view_1.ListView, { items: items, isLoading: isLoading, addItem: addItemToCart })));
};
exports["default"] = Items;