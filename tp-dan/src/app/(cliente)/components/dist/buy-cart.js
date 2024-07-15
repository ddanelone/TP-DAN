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
exports.BuyCart = void 0;
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
var format_price_1 = require("@/action/format-price");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var navigation_1 = require("next/navigation");
var react_hot_toast_1 = require("react-hot-toast");
var auth_1 = require("@/lib/auth");
var use_user_1 = require("@/hooks/use-user");
function BuyCart(_a) {
    var _this = this;
    var children = _a.children, cartItems = _a.cartItems, removeItem = _a.removeItem;
    var user = use_user_1.useUser();
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var router = navigation_1.useRouter();
    var _c = react_1.useState(null), client = _c[0], setClient = _c[1];
    var _d = react_1.useState(true), isLoading = _d[0], setIsLoading = _d[1];
    var getMyClientData = function () { return __awaiter(_this, void 0, void 0, function () {
        var emailUser, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailUser = user === null || user === void 0 ? void 0 : user.email;
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, auth_1.getClientByEmail(emailUser)];
                case 2:
                    res = _a.sent();
                    if (res) {
                        setClient(res);
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_hot_toast_1["default"].error("No se pudo recuperar los datos de Cliente asociado con este Usuario.", {
                        duration: 2500
                    });
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleRemoveItem = function (item) {
        removeItem(item);
    };
    var handlePurchase = function () { return __awaiter(_this, void 0, void 0, function () {
        var _i, cartItems_1, item, error_2, newOrder, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (cartItems.length === 0) {
                        react_hot_toast_1["default"].error("El carrito está vacío. No se puede realizar la compra.");
                        return [2 /*return*/];
                    }
                    if (!client) {
                        react_hot_toast_1["default"].error("No se pudo recuperar los datos del cliente. Inténtalo nuevamente.");
                        return [2 /*return*/];
                    }
                    else {
                        /* ==========  ACA HAY QUE CAMBIAR LA LOGICA ========== */
                        if ((client === null || client === void 0 ? void 0 : client.maximoDescubierto) !== undefined &&
                            client.maximoDescubierto <
                                cartItems.reduce(function (acc, item) { return acc + item.precio * item.cantidad; }, 0)) {
                            react_hot_toast_1["default"].error("No puede hacer este pedido porque no tiene suficiente crédito autorizado.");
                            return [2 /*return*/];
                        }
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, 10, 11]);
                    _i = 0, cartItems_1 = cartItems;
                    _a.label = 2;
                case 2:
                    if (!(_i < cartItems_1.length)) return [3 /*break*/, 7];
                    item = cartItems_1[_i];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, auth_1.checkStockProducto(item.id, item.cantidad)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    react_hot_toast_1["default"].error(error_2.message, { duration: 2500 });
                    setIsLoading(false);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7:
                    newOrder = {
                        fecha: new Date(),
                        numeroPedido: undefined,
                        usuario: user ? user.email : undefined,
                        observaciones: "",
                        cliente: {
                            id: client.id,
                            nombre: client.nombre,
                            apellido: client.apellido,
                            correoElectronico: client.correoElectronico,
                            dni: client.dni,
                            cuit: client.cuit
                        },
                        total: cartItems.reduce(function (acc, item) { return acc + item.precio * item.cantidad; }, 0),
                        //estado: Status.EN_PREPARACION,
                        detalle: cartItems.map(function (item) { return ({
                            cantidad: item.cantidad,
                            producto: item,
                            precioUnitario: item.precio,
                            descuento: item.descuento,
                            precioFinal: item.precio * item.cantidad
                        }); }),
                        historialEstado: []
                    };
                    console.log("Orden a persistir :", newOrder);
                    return [4 /*yield*/, auth_1.createPedido(newOrder)];
                case 8:
                    _a.sent();
                    react_hot_toast_1["default"].success("Pedido realizado con éxito.");
                    router.push("/pedidos");
                    return [3 /*break*/, 11];
                case 9:
                    error_3 = _a.sent();
                    console.error(error_3);
                    react_hot_toast_1["default"].error("No puedes realizar el pedido: " + error_3, {
                        duration: 2500
                    });
                    return [3 /*break*/, 11];
                case 10:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var handleClose = function () {
        setOpen(false);
    };
    react_1.useEffect(function () {
        if (user) {
            getMyClientData();
        }
    }, [user]);
    return (React.createElement(dialog_1.Dialog, { open: open, onOpenChange: setOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true }, children),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[800px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Carrito de Compras"),
                React.createElement(dialog_1.DialogDescription, null, "Aqu\u00ED puedes ver y gestionar los productos que has a\u00F1adido a tu carrito.")),
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement("table", { className: "min-w-full bg-white" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Cantidad"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Nombre"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Precio"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Total"),
                            React.createElement("th", { className: "py-2 px-4 border-b" }, "Acciones"))),
                    React.createElement("tbody", null, cartItems.map(function (item) { return (React.createElement("tr", { key: item.id },
                        React.createElement("td", { className: "py-2 px-4 border-b text-center" }, item.cantidad),
                        React.createElement("td", { className: "py-2 px-4 border-b" }, item.nombre),
                        React.createElement("td", { className: "py-2 px-4 border-b text-right" }, format_price_1.formatPrice(item.precio)),
                        React.createElement("td", { className: "py-2 px-4 border-b text-right" }, format_price_1.formatPrice(item.precio * item.cantidad)),
                        React.createElement("td", { className: "py-2 px-4 border-b text-center" },
                            React.createElement(button_1.Button, { variant: "destructive", onClick: function () { return handleRemoveItem(item); } },
                                React.createElement(lucide_react_1.Trash2, null))))); })))),
            React.createElement(dialog_1.DialogFooter, null,
                React.createElement("div", { className: "flex justify-between w-full items-center" },
                    React.createElement("div", { className: "text-left" },
                        React.createElement(badge_1.Badge, { className: "mt-2 text-[14px]", variant: "outline" },
                            "Total a Pagar:",
                            " ",
                            format_price_1.formatPrice(cartItems.reduce(function (acc, item) { return acc + item.precio * item.cantidad; }, 0)))),
                    React.createElement("div", { className: "flex space-x-2" },
                        React.createElement(button_1.Button, { className: "bg-gray-200 text-gray-800 hover:bg-gray-300", onClick: handleClose }, "Agregar m\u00E1s productos"),
                        React.createElement(button_1.Button, { className: "bg-blue-600 text-white hover:bg-blue-700", onClick: handlePurchase },
                            isLoading && (React.createElement(lucide_react_1.LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" })),
                            "Crear Pedido")))))));
}
exports.BuyCart = BuyCart;
